# Forbidden Patterns in Auth Module

- **Do not** add generic global error handling here; this is for authentication layout only.
- **Do not** use `window.localStorage` directly.
- **Do not** use inline CSS colors in JSX files; strictly use the design system classes.
- **Do not** use generic component suffixes (like `LoginVisual` or `LoginHeader`); ensure strict architectural suffixes (`LoginMobileHeader`, `LoginHeroSection`).
- **Do not** use HTTP status codes manually.
