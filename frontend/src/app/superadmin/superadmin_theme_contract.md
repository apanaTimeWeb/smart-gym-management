# Superadmin — Theme Contract

## Required Semantic Tokens
Superadmin feature JSX must consume the global semantic design tokens already defined by the application: `bg-page`, `bg-card`, `bg-input`, `bg-skeleton-base`, `bg-skeleton-highlight`, `text-primary`, `text-secondary`, `text-disabled`, `text-success`, `text-warning`, `text-danger`, `text-info`, semantic borders, and approved `shadow-*` semantic tokens.

## Interaction
Interactive elements must provide visible focus states and respect the global motion policy by using approved motion-safe transitions/animation tokens. Destructive actions use confirmation UI.

## Responsive
Feature layouts must remain usable at desktop, tablet, and narrow mobile widths around 320px. Dense tables use the approved mobile strategy; sticky/overflowing UI must not create unintended horizontal overflow.

## Prohibited
No hardcoded hex colors in feature JSX, no arbitrary CSS-variable Tailwind values, no generic shadow scale where a semantic token exists, and no feature-specific global token definitions.
