/*
  ALTEA — Selecteur d'offre par quantite.

  Deux chemins d'ecriture de la quantite, volontairement redondants :

  1. Un <input type="hidden" name="quantity" form="product-form-...">, associe
     au formulaire produit par l'attribut `form`. Il couvre la soumission
     native et « Acheter maintenant », sans dependre de JavaScript.
  2. getFormData(), le point d'extension que product-form.js appelle sur tout
     element [data-form-data] avant l'envoi AJAX. Il normalise la quantite
     meme si un autre champ « quantity » traine dans le formulaire.

  Le bloc ne touche jamais au prix du panier : il ne fait que choisir une
  quantite. Quand une variante est modifiee, il recalcule seulement les
  montants informatifs affiches dans ses cartes.
*/
if (!customElements.get('altea-offer')) {
  customElements.define(
    'altea-offer',
    class AlteaOffer extends HTMLElement {
      connectedCallback() {
        this.hiddenInput = this.querySelector('[data-altea-offer-quantity]');
        this.radios = Array.from(this.querySelectorAll('.altea-offer__radio'));
        this.variantInput = this.closest('product-info')?.querySelector('product-form input[name="id"]');
        this.variants = this.parseVariants();

        this.onChange = this.onChange.bind(this);
        this.onVariantChange = this.onVariantChange.bind(this);
        this.radios.forEach((radio) => radio.addEventListener('change', this.onChange));
        this.variantInput?.addEventListener('change', this.onVariantChange);

        this.syncQuantity();
        this.onVariantChange();
      }

      disconnectedCallback() {
        this.radios.forEach((radio) => radio.removeEventListener('change', this.onChange));
        this.variantInput?.removeEventListener('change', this.onVariantChange);
      }

      get quantity() {
        const checked = this.radios.find((radio) => radio.checked);
        const value = parseInt(checked && checked.value, 10);
        return Number.isFinite(value) && value > 0 ? value : 1;
      }

      onChange() {
        this.syncQuantity();
      }

      parseVariants() {
        try {
          return JSON.parse(this.dataset.variants || '[]');
        } catch (error) {
          return [];
        }
      }

      onVariantChange() {
        const variantId = this.variantInput?.value;
        const variant = this.variants.find(({ id }) => String(id) === String(variantId));
        if (!variant) return;

        const bundlePrice = Number(this.dataset.bundlePrice);
        const bundleQuantity = Number(this.dataset.bundleQuantity);
        const unitPrice = Number(variant.price);
        const regularBundlePrice = unitPrice * bundleQuantity;
        const savings = regularBundlePrice - bundlePrice;

        if (!Number.isFinite(bundlePrice) || !Number.isFinite(bundleQuantity) || bundleQuantity < 2) return;

        this.hidden = savings <= 0;
        if (this.hidden) return;

        this.querySelectorAll('[data-altea-offer-unit-price]').forEach((element) => {
          element.textContent = this.formatMoney(unitPrice);
        });
        this.querySelectorAll('[data-altea-offer-bundle-regular-value]').forEach((element) => {
          element.textContent = this.formatMoney(regularBundlePrice);
        });
        this.querySelectorAll('[data-altea-offer-savings]').forEach((element) => {
          element.textContent = (element.dataset.savingsTemplate || '').replace('__amount__', this.formatMoney(savings));
        });
      }

      formatMoney(amount) {
        if (window.Shopify && typeof window.Shopify.formatMoney === 'function') {
          return window.Shopify.formatMoney(amount);
        }

        return (amount / 100).toFixed(2);
      }

      // Tient a jour le champ cache et, s'il existe, le selecteur de quantite
      // Debutify — pour que les deux ne puissent jamais se contredire.
      syncQuantity() {
        const quantity = this.quantity;

        if (this.hiddenInput) this.hiddenInput.value = quantity;

        const selectorId = this.dataset.quantityInput;
        const selector = selectorId ? document.getElementById(selectorId) : null;
        if (selector && selector.value !== String(quantity)) {
          selector.value = quantity;
          selector.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      // Contrat impose par product-form.js : la valeur de retour est
      // destructuree en { discountCode, hasMultipleItems }.
      // discountCode: false => aucune redirection vers /cart n'est declenchee.
      getFormData(event, formData, hasMultipleItems) {
        formData.set('quantity', this.quantity);
        return { discountCode: false, hasMultipleItems: hasMultipleItems };
      }
    }
  );
}
