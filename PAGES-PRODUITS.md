# Pages produits dédiées — ALTEA

Une page produit dédiée par produit de `collections/all` (4 produits au
2026-09-08), livrée sous forme de fichiers de thème prêts à intégrer.

---

## 1. Fichiers livrés

### Nouveaux (à ajouter)

| Fichier | Rôle |
|---|---|
| `sections/altea-product-specs.liquid` | Section réutilisable « Fiche technique » (tableau + panneau « Dans la boîte »). Éditable dans l'éditeur de thème. |
| `assets/section-altea-product-specs.css` | Styles de la section, en tokens `--altea-*`, propriétés logiques, RTL natif. |
| `templates/product.altea-couverture-anti-feu.json` | Page de la couverture anti-feu |
| `templates/product.altea-detecteur-gaz.json` | Page du détecteur gaz + CO |
| `templates/product.altea-detecteur-fumee.json` | Page du détecteur de fumée |
| `templates/product.altea-breeze.json` | Page du ventilateur Breeze™ |

### Inchangés

Aucun fichier existant n'a été modifié. `templates/product.json` reste le
gabarit par défaut : les nouvelles pages sont des **suffixes de template**,
donc réversibles produit par produit d'un clic dans l'admin.

---

## 2. Affectation des templates

Dans **Admin Shopify → Produits → *le produit* → Modèle de thème**, choisir
le suffixe indiqué :

| Handle produit | Fichier | Suffixe à sélectionner |
|---|---|---|
| `couverture-anti-feu-altea™-1-2-1-2-m-eteignez-un-depart-de-feu-en-3-secondes` | `product.altea-couverture-anti-feu.json` | `altea-couverture-anti-feu` |
| `detecteur-gaz` | `product.altea-detecteur-gaz.json` | `altea-detecteur-gaz` |
| `detecteur-de-fumee-altea-10-ans` | `product.altea-detecteur-fumee.json` | `altea-detecteur-fumee` |
| `altea-breeze-le-froid-au-creux-de-la-main` | `product.altea-breeze.json` | `altea-breeze` |

Le suffixe n'apparaît dans la liste qu'une fois les fichiers publiés sur le
thème.

---

## 3. Structure d'une page

Ordre des sections, identique sur les quatre fiches :

1. **Séparateur** + **Fil d'Ariane** — le fil d'Ariane, désactivé dans le
   gabarit par défaut, est réactivé ici.
2. **`main-product`** — colonne d'achat, réordonnée (voir §4).
3. **Bandeau défilant** (hérité du gabarit par défaut).
4. **Pourquoi ce produit** — `dbtfy-guarantee`, 4 arguments spécifiques au produit.
5. **Bénéfices illustrés** — `dbtfy-text-column-with-img`, 3 colonnes image + texte.
6. **Fiche technique** — `altea-product-specs`, 8 lignes + « Dans la boîte » + mention légale.
7. **ALTEA face aux alternatives** — `comparison-table`, 5 lignes de comparaison propres au produit.
8. **Avis** — `dbtfy-testimonials`, 4 avis contextualisés (produit + ville).
9. **FAQ produit** — `dbtfy-faq`, 6 questions spécifiques, la première ouverte par défaut.
10. **Produits associés** + **Vus récemment**.

Sections du thème de démonstration FITNOVA retirées de ces pages :
`custom-liquid` (bloc « Why choose FITNOVA »), `rich-text`, la FAQ générique et
les deux widgets d'avis désactivés.

---

## 4. Décisions prises dans la colonne d'achat

- **Ordre des blocs corrigé.** `templates/product.json` place le sélecteur de
  variante *après* le bouton d'ajout au panier. Sur le détecteur gaz (2
  coloris) et le Breeze™ (4 coloris), le client peut donc valider avant
  d'avoir choisi. Le nouvel ordre est : titre → note → sous-titre → prix →
  points clés → description → variantes → quantité → achat → réassurance →
  volets repliables.
- **Sous-titre renseigné.** Le bloc pointait sur
  `product.metafields.descriptors.subtitle`, vide sur les quatre produits : la
  ligne ne s'affichait pas. Le texte est désormais écrit dans le template.
  Si ce metafield est rempli plus tard, il suffit de remettre la valeur Liquid.
- **Volets repliables réaffectés.** Ils dupliquaient la description déjà
  affichée au-dessus. Ils portent maintenant « Livraison & paiement »,
  « Garantie & retours » et « Besoin d'un conseil ? » — les informations qui
  manquaient sur le chemin de conversion COD.
- **Bloc réassurance** (`_product_icon-with-text`) ajouté sous le bouton
  d'achat : 3 arguments courts, différents sur chaque produit.

---

## 5. Points à vérifier après publication

1. **Images des colonnes bénéfices.** Elles référencent les fichiers déjà
   présents dans **Contenu → Fichiers** de la boutique, sous la forme
   `shopify://shop_images/<nom-du-fichier>`. Si une colonne s'affiche sans
   image, ouvrir la section dans l'éditeur et re-sélectionner le fichier — le
   nom exact est visible dans le JSON du template.
2. **Logos du tableau comparatif.** `shop_logo` et `competitor_logo` ne sont
   pas renseignés (hérités de la home, où ils sont vides). À ajouter dans
   l'éditeur si vous voulez des logos plutôt que les seuls libellés
   « ALTEA » / « Vendeurs génériques ».
3. **Icônes de réassurance.** Les icônes de la section « Pourquoi ce produit »
   sont des noms Material Symbols (`bolt`, `sensors`, `battery_full`,
   `ac_unit`…). Si l'une ne s'affiche pas, la remplacer dans l'éditeur.
4. **Rendu RTL.** La section « Fiche technique » est écrite en propriétés
   logiques et se reflète seule. Les sections Debutify réutilisées bénéficient
   des correctifs déjà présents dans `assets/altea-brand.css`.

---

## 6. Anomalie repérée, non corrigée

`templates/index.json` renseigne `"container_size": "container"` sur
`altea_guarantee`, `altea_comparison` et `altea_testimonials`. Cette valeur
n'existe pas dans le CSS du thème — la classe réelle est `page-width` — et ces
trois sections de la page d'accueil s'affichent donc sans marges latérales.

Les pages produits utilisent la bonne valeur. La page d'accueil n'a pas été
touchée : c'est un changement visible sur la home, à valider séparément.

*(Exception : `dbtfy-faq` attend réellement la valeur `container`, qu'il
convertit lui-même en `page-width`. Elle est correcte partout.)*
