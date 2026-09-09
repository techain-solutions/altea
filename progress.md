# Project Progress

## Business Context
ALTEA Stores sells four safety and comfort products in Morocco. Goal: preview four premium, product-specific Shopify PDPs on a separate unpublished Debutify theme without changing the published Shrine theme.

## Design Decisions
- Preserve ALTEA navy/gold/white visual system.
- Use existing committed four alternate product templates and product-specific section compositions.
- Keep current product templateSuffix values unchanged while previewing; use explicit `view` templates on unpublished `altea/main`.
- Keep branded ALTEA Gas & CO quantity cards; defer store-wide Shopify/Releasit price configuration to go-live.
- Preserve COD, tracking, variant, media, and RTL behavior; do not mutate published theme or product records.

## Tasks
### ✅ Completed
- Live ALTEA collection and all four active PDPs researched.
- Shopify catalog, active products, prices, variants, media, and unpublished target theme audited.
- Existing ALTEA implementation at commit 34a38e1 confirmed on clean main.
- Existing Theme Check baseline captured: 384 pre-existing offenses; no new ALTEA findings.
- Theme delta uploaded to unpublished `altea/main` (theme ID `155051687988`) with `--nodelete` semantics; published `sn-1-5-0` remains `MAIN`.
- All four alternate templates and 25 locale files verified remotely by checksum/size.
- All four preview URLs loaded successfully with Shopify's `altea/main Draft` preview bar.
- Preview QA confirmed product-specific copy, prices, media, COD messaging, variant controls, offer selector, quantity selector, FAQ, and CTA sections.
- Arabic-locale preview loaded without template errors; no product or live-theme mutations were made.
### 🔄 In Progress
- Final source/working-tree verification and handoff.
### ⏳ Pending
- Merchant go-live actions: assign suffixes only when Debutify is ready to publish; configure Releasit and Shopify 2-for-599 pricing; add product image alt text.
- Publish only after separate approval.

## Issues
- Normal Shopify CLI wrapper points to missing `/opt/homebrew/opt/node/bin/node`; direct Node launcher works.
- Shopify Liquid validator dependency `@shopify/theme-check-common` is absent from the skill runtime; Theme Check remains available.
- Four alternate templates were initially absent from remote `altea/main`; they are now uploaded and verified.
- Shopify theme file validation required `separator_height` to be at least 65; all four templates now use 65.

## Next Steps
- Commit the progress log and template constraint fix, then hand off preview links; do not publish or assign product suffixes until separately approved.
