# Forbidden Patterns for `auth/login`

1. Do not access Auth backend endpoints directly from `AuthLoginForm.tsx`.
2. Do not return, store, or render access/refresh tokens in the browser.
3. Do not use `gymsmart_user` as authentication authority.
4. Do not duplicate dashboard redirect decisions; use `AuthRoleRedirectUtils`.
5. Do not import role business modules.
6. Do not use raw colors, arbitrary theme Tailwind values, or semantic background opacity modifiers.
7. Do not hardcode user-facing Login copy in JSX; use `useTranslations('AUTH_LOGIN')`.
8. Do not render development demo controls unless `AuthClientRuntimeConfig.isLoginDemoEnabled()` is true.
9. Do not let the public demo flag enable server-side demo sessions; the server must independently require `AUTH_DEMO_MODE` and non-production runtime.
10. Do not create a new browser-visible demo-token generation path.
11. Do not bypass the Zod Login schema.
12. Do not create mutation state in Zustand or Context.
13. Do not leave buttons, links, or icon controls without a deterministic action and verification reference.
14. Do not remove `data-testid` attributes from interactive or critical-state elements.
15. Do not remove `motion-safe:` guards from animated/transitioning Login elements.
16. Do not move component logic back into JSX once it belongs in `useAuthLoginForm.ts`.
17. Do not use render-only tests as a substitute for interaction tests.
18. Do not rename framework-reserved route files.
19. Do not modify unrelated application roles to repair Login.
20. Never hardcode a second Login hero icon/configuration array inside a component when the value is static presentation configuration; keep it in `AuthLoginSharedConstants.ts`.
21. Never report demo-login functionality as fully verified unless the demo button, loading state, server gate, session result, and redirect are all behaviorally verified.
22. Never assume `/logo.png` or `/gym-hero.jpg` exist in the host application; verify the host asset contract.
