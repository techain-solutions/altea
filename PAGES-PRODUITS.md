# Pages produits dédiées — ALTEA

Une page produit dédiée par produit de `collections/all` (4 produits au
2026-09-08), livrée sous forme de fichiers de thème prêts à intégrer.

> **Ce document remplace la version précédente.** Celle-ci décrivait quatre
> templates qui n'ont jamais été commités : le commit `0cd86ab`
> (« sync des réglages depuis Shopify ») avait écrasé le travail local.

---

## 1. Contexte technique à connaître avant de publier

| Constat | Conséquence |
|---|---|
| **Le site en ligne ne tourne pas sur ce thème.** `alteastores.com` tourne sur Shrine PRO 1.5.0 ; ce dépôt est le Debutify 8.13 destiné à le remplacer. | Tout le contenu marketing du site actuel est du Liquid codé en dur, en arabe sur 3 fiches sur 4. Il n'est pas repris tel quel, mais il a servi de **source de vérité** pour la copie ci-dessous. |
| **Les commandes ne passent pas par le checkout Shopify.** L'app embed **Releasit COD Form** masque le bouton d'ajout au panier natif et injecte son propre formulaire (nom, téléphone, ville, adresse), puis crée la commande via son app proxy. | Voir §6 : les app embeds doivent être réactivés sur ce thème avant publication, et l'offre 2 × 599 DH doit être configurée **dans Releasit**, pas seulement dans Shopify. |
| Aucun app embed n'est activé dans `config/settings_data.json` de ce thème. | Publier en l'état ferait disparaître le formulaire COD et le bouton WhatsApp. |

---

## 2. Fichiers livrés

### Sections réutilisables (nouvelles)

| Fichier | Rôle |
|---|---|
| `sections/altea-benefits.liquid` + `assets/section-altea-benefits.css` | Grille de bénéfices : icône, titre, texte. 2/3/4 colonnes. |
| `sections/altea-feature-rows.liquid` + `assets/section-altea-feature-rows.css` | Lignes image/texte alternées, avec points clés à coche dorée. L'image peut être reprise **directement d'un média du produit** (réglage « À défaut, média du produit n° »), sans re-téléversement. |
| `sections/altea-steps.liquid` + `assets/section-altea-steps.css` | Étapes numérotées 01/02/03, reliées par un filet doré sur desktop. |
| `sections/altea-final-cta.liquid` + `assets/section-altea-final-cta.css` | Rappel d'offre de fin de page. **Le prix affiché est lu dans Shopify**, jamais écrit dans la section. |

### Blocs de colonne d'achat (nouveaux)

| Fichier | Rôle |
|---|---|
| `blocks/_altea-highlights.liquid` + `assets/altea-highlights.css` | Points clés sous le prix. Contenu richtext piloté par le marchand. |
| `blocks/_altea-offer.liquid` + `assets/altea-offer.css` + `assets/altea-offer.js` | Sélecteur « Choisissez votre offre » (1 / 2 unités). Voir §5. |

### Sections existantes enfin utilisées

`sections/altea-product-specs.liquid` (livrée à l'étape 5, orpheline jusqu'ici)
est branchée sur les quatre fiches.

### Templates

```
templates/product.altea-breeze.json
templates/product.altea-detecteur-fumee.json
templates/product.altea-detecteur-gaz.json
templates/product.altea-couverture-anti-feu.json
```

`templates/product.json` reste le gabarit par défaut, **inchangé** : les
nouvelles pages sont des suffixes de template, donc réversibles produit par
produit d'un clic dans l'admin.

### Fichier cœur Debutify modifié

`sections/main-product.liquid` — **trois lignes** : déclaration des deux
nouveaux types de blocs (`_altea-offer`, `_altea-highlights`) dans la liste
blanche du schéma. Aucune autre modification du thème.

### Localisation

- `locales/ar.json` — **créé**. Copie de la locale par défaut, avec les clés
  `altea.*` traduites en arabe. Les chaînes Debutify y restent en anglais :
  les traduire intégralement est hors périmètre, et Shopify retombe de toute
  façon sur la locale par défaut pour les clés non traduites.
- Les 25 locales storefront reçoivent la sous-arborescence `altea` (français
  dans `fr.json`, arabe dans `ar.json`, anglais ailleurs). Cette répercussion
  sur toutes les langues est nécessaire : sans elle, Theme Check signale une
  erreur `MatchingTranslations` par locale.
- `locales/ar.schema.json` n'a **pas** été créé : il ne traduirait que
  l'interface de l'éditeur de thème, et il aurait recopié trois avertissements
  HTML présents dans le fichier Debutify d'origine.

---

## 3. Affectation des templates

Dans **Admin Shopify → Produits → *le produit* → Modèle de thème**, choisir le
suffixe indiqué. Le suffixe n'apparaît dans la liste qu'une fois les fichiers
publiés sur le thème.

| Produit | Handle | Suffixe |
|---|---|---|
| Mini Ventilateur Portable ALTEA Breeze™ | `altea-breeze-le-froid-au-creux-de-la-main` | `altea-breeze` |
| Détecteur de Fumée Intelligent ALTEA™ | `detecteur-de-fumee-altea-10-ans` | `altea-detecteur-fumee` |
| Détecteur de Fuite de Gaz et Monoxyde de Carbone 2 en 1 | `detecteur-gaz` | `altea-detecteur-gaz` |
| Couverture Anti-Feu Altea™ 1,2 × 1,2 m | `couverture-anti-feu-altea™-1-2-1-2-m-eteignez-un-depart-de-feu-en-3-secondes` | `altea-couverture-anti-feu` |

---

## 4. Structure des pages

### Colonne d'achat (les quatre fiches)

```
titre → prix + prix barré → description Shopify → points clés
→ [variantes] → [offre ALTEA — gaz & CO] → [quantité] → boutons d'achat
→ réassurance → volets repliables
```

Deux corrections par rapport à `templates/product.json` :

- **Le sélecteur de variante passe avant le bouton d'achat.** Dans le gabarit
  par défaut il vient après : sur le détecteur gaz (2 coloris) et le Breeze™
  (4 coloris), le client pouvait valider sans avoir choisi.
- **Le bloc sous-titre est retiré.** Il pointait sur
  `product.metafields.descriptors.subtitle`, vide sur les quatre produits. La
  description Shopify — un paragraphe court, déjà en français — joue ce rôle.

Le bloc note/avis n'est pas utilisé : aucune donnée d'avis n'est configurée sur
la boutique, et afficher une note vide ou nulle serait trompeur.

La zone d'achat reste lisible que le bouton natif soit affiché ou masqué par
Releasit : ni la réassurance ni les volets ne dépendent de sa présence.

### Sections sous la colonne d'achat

Elles diffèrent d'une fiche à l'autre : chaque page ne contient que ce que
l'information vérifiée soutient. Aucune section de remplissage.

| Fiche | Sections |
|---|---|
| **Breeze** | Image/texte (double technologie) · Tableau comparatif · Étapes (« prêt en 3 secondes ») · Fiche technique · Avis clients · FAQ (6) · Rappel d'offre |
| **Détecteur de fumée** | Bénéfices · Image/texte (capteur, grille anti-insectes, 10 ans) · Étapes (installation) · Fiche technique · FAQ (7) · Rappel d'offre |
| **Détecteur gaz & CO** | Bénéfices · Image/texte (deux capteurs, alerte progressive, écran) · Étapes (mise en service + conduite à tenir) · Tableau comparatif · Fiche technique (20 lignes) · FAQ (8) · Rappel d'offre |
| **Couverture anti-feu** | Bénéfices · Étapes (les trois gestes) · Image/texte (matière, pochette) · Fiche technique · FAQ (6) · Rappel d'offre |

La section « Avis clients » n'existe que sur le Breeze : ce sont les trois avis
nommés déjà publiés sur la fiche en ligne. Aucun avis n'a été inventé pour les
trois autres produits.

La galerie est passée en mode **miniatures** (`gallery_layout: thumbnail`) : le
gabarit par défaut empilait toutes les images, ce qui repoussait la colonne
d'achat très bas sur les fiches à 8-11 visuels. La vidéo de la couverture
anti-feu est rendue nativement par cette galerie.

---

## 5. Offre « 2 détecteurs = 599 DH »

### Côté thème

`blocks/_altea-offer.liquid` affiche deux cartes radio. **Tous les montants sont
calculés en Liquid à partir de la variante Shopify** : le prix unitaire, le
total plein du lot (2 × prix) et l'économie (total plein − prix de l'offre).
Rien n'est écrit en dur — si le prix produit change dans l'admin, l'affichage
suit et l'économie est recalculée.

Seul le **prix du lot** est un réglage de bloc (`offer_price`, en dirhams). Il
doit correspondre exactement à la remise configurée côté Shopify/Releasit.

Garde-fou : si `offer_price` est vide, nul, ou supérieur ou égal au prix plein
du lot, **le bloc ne s'affiche pas du tout**. Il ne peut pas annoncer une fausse
économie.

Le sélecteur de quantité Debutify est retiré de cette fiche : l'offre pilote
seule la quantité, deux contrôles se contrediraient.

Mécanique : un `<input type="hidden" name="quantity" form="product-form-…">`
couvre la soumission native et « Acheter maintenant » ; `getFormData()` — le
point d'extension que `product-form.js` appelle sur tout élément
`[data-form-data]` — normalise la quantité pour l'envoi AJAX. Aucun fichier
JavaScript Debutify n'a été modifié.

### Côté administration — **obligatoire**

Le thème **ne simule aucun prix**. Tant que les deux configurations ci-dessous
n'existent pas, le client sera facturé 678 DH pour deux unités.

1. **Releasit COD Form → Quantity Offers**, sur le détecteur gaz & CO :
   palier 1 unité = 339 DH, palier 2 unités = 599 DH.
   C'est ce qui rend juste le total de la commande COD — le chemin réellement
   emprunté par les clients aujourd'hui.
2. **Shopify → Réductions → Créer → Réduction automatique →
   *Montant de réduction sur les produits*** :
   produit « Détecteur de Fuite de Gaz et Monoxyde de Carbone 2 en 1 »,
   quantité minimale **2**, montant fixe **79 DH**, *appliqué une seule fois par
   commande*, activée.
   C'est ce qui rend juste le panier et le checkout natifs.

### Point à trancher après réactivation de Releasit

Releasit peut afficher **son propre** sélecteur de paliers dans le formulaire
COD. Deux sélecteurs d'offre à l'écran seraient déroutants, et le choix fait
dans l'un ne se propagerait pas à l'autre. Après réactivation de l'app embed,
il faut donc choisir :

- **soit** désactiver le bloc de paliers de Releasit et garder l'UI ALTEA
  (à condition de vérifier que la quantité de notre sélecteur est bien reprise
  par le formulaire COD) ;
- **soit** garder le sélecteur de Releasit et masquer le bloc « Altea — Offre
  quantité » dans l'éditeur de thème (un clic, aucune suppression de fichier).

Ce point n'a pas pu être tranché ici : le comportement de Releasit n'est pas
observable sans l'app active sur le thème.

### Hors périmètre

Le lot « Détecteur gaz + Couverture anti-feu = 499 DH » **n'a pas** été
implémenté : il a été explicitement reporté.

---

## 6. Actions à faire dans l'admin Shopify

1. Affecter les quatre suffixes de template (§3).
2. **Réactiver les app embeds sur ce thème avant publication** :
   Releasit COD Form, Releasit Bundle, WhatsApp Chat Button. Sans cela, le flux
   de commande COD disparaît.
3. Configurer les deux volets de l'offre 2 × 599 DH (§5).
4. Traduire le contenu marchand en arabe dans **Translate & Adapt** : titres,
   descriptions, et réglages des sections ALTEA. L'arabe existe déjà, vérifié,
   sur les fiches du site actuel — il peut être repris tel quel.
5. **Ajouter un texte alternatif aux 34 images produit.** Aucune n'en a
   aujourd'hui : c'est une donnée produit, pas du thème.
6. Vérifier le format monétaire de la boutique si l'affichage « DH » est
   préféré à « dh » (réglage boutique, pas thème).

---

## 7. Règle de contenu appliquée

Chaque affirmation des quatre fiches provient du site ALTEA en ligne, des
données produit Shopify, ou de la présente commande client. Aucune
certification, portée de détection, autonomie, décibel, norme ou garantie n'a
été inventée. Les normes et certifications sont présentées comme **annoncées
par le fabricant**, jamais comme vérifiées par ALTEA.

Deux incohérences du site actuel n'ont pas été reproduites : des prix codés en
dur qui divergent du prix réel (`499,99` affiché contre `499,00` en base) et une
remise annoncée à « −24 % » alors qu'elle est de 23 %. Les nouvelles pages
calculent tout à partir des données Shopify.

---

## 8. Ce qui a été vérifié, et ce qui ne pouvait pas l'être

**Vérifié**

- **Shopify Theme Check** : 384 offenses avant, 384 après — **aucune nouvelle**.
  (Les 384 sont préexistantes au thème Debutify.)
- **Validation structurelle des templates** : chaque section référencée existe,
  chaque type de bloc est accepté par son parent, chaque identifiant de réglage
  existe dans le schéma correspondant. Un réglage mal nommé serait ignoré en
  silence par Shopify — ce contrôle l'attrape.
- **Responsive et RTL** des nouvelles feuilles de style, mesurés à
  **375 / 390 / 768 / 1440 px**, en `dir=ltr` et `dir=rtl` : aucun débordement
  horizontal, colonnes conformes (bénéfices 1/2/4, image-texte 1/2, étapes
  1/auto/exact), et miroir correct des cartes d'offre, des coches et du filet
  des étapes.

**Non vérifiable depuis ce poste**

Le CLI Shopify n'y est pas authentifié : ni `shopify theme dev`, ni rendu réel
des quatre pages, ni test du parcours panier. Restent donc à contrôler après
publication sur un thème de préproduction : le rendu Liquid effectif, la
sélection de variante, l'ajout au panier à 1 et 2 unités, et le comportement du
formulaire Releasit.

---

## 9. Anomalies repérées, non corrigées

Hors périmètre (« pages produits uniquement »), signalées pour décision :

1. **La page d'accueil ALTEA a été perdue.** Le commit `0cd86ab` a supprimé
   1268 lignes de `templates/index.json`. `sections/altea-hero.liquid` existe
   toujours mais n'est référencée nulle part, et la home affiche encore du
   contenu de démonstration FITNOVA.
2. `templates/product.json` (gabarit par défaut) contient toujours la section
   `custom-liquid` « Why choose FITNOVA », en anglais. Elle n'apparaît pas sur
   les quatre nouvelles fiches, mais reste visible sur tout produit qui ne se
   verrait pas affecter un suffixe.
3. `layout/theme.liquid` expédie en production un `console.log` de mesure du
   temps de rendu.
4. Le thème actuellement en ligne (Shrine PRO 1.5.0) est une version piratée :
   son code contient un jeton `…_nulled_by_…`. À prendre en compte avant toute
   opération de mise à jour ou de support sur ce thème.
