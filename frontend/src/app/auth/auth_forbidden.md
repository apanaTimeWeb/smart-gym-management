# Forbidden Patterns for `auth`

1. **No browser-visible Auth tokens:** Access or refresh tokens MUST NOT be returned from browser-facing Auth routes or stored in browser storage.
2. **No arbitrary token-to-cookie bridge:** A client-provided token MUST NOT be accepted by an Auth route solely to create an HTTP-only session cookie. Legacy `/auth/set-cookie` is retired.
3. **No static privileged session:** Never hardcode a Superadmin/admin/session token, user record, or refresh token into a production-capable Auth route.
4. **No cross-role business imports:** Never import business logic, types, constants, stores, hooks, schemas, fixtures, or API services from `/admin`, `/manager`, `/trainer`, `/superadmin`, or sibling business modules.
5. **No relative imports:** Use `@/` absolute imports for module dependencies.
6. **No barrel files:** Do not create `index.ts` aggregation files inside the module.
7. **No arbitrary Tailwind values:** Use the semantic design-system tokens and approved Tailwind utilities.
8. **No semantic background opacity modifiers:** Do not use patterns such as `bg-success/10` or `bg-primary/20`.
9. **No hardcoded theme colors:** Do not use raw hex/RGBA colors in JSX when a semantic token exists.
10. **No API data in Context/Zustand:** Server state belongs to the documented server-state layer; UI-only state may remain local.
11. **No API calls from View components:** Components render state and delegate actions to the Login hook/Auth API layer.
12. **No hardcoded Auth redirect routes at call sites:** Use `AuthUrlConfig`.
13. **No hardcoded HTTP status codes:** Use `StatusCodes` constants.
14. **No `any`, `@ts-ignore`, or `@ts-nocheck`.**
15. **No unsigned user-cookie trust:** Production authentication/redirect decisions MUST NOT trust `gymsmart_user` as an authentication authority; verify the access session through the backend session endpoint.
15. **No fake success:** A mutation is not successful merely because a toast/message is shown; the resulting session/UI state must actually change.
16. **No placeholder tests:** Tests must verify user actions and observable outcomes, not merely component existence.
17. **No hover-only or keyboard-inaccessible interaction:** Focus-visible and keyboard operation are mandatory.
18. **No generic responsibility comments:** Responsibility comments must describe actual data/ownership boundaries.
19. **No production demo login exposure:** Development demos require explicit non-production/demo flags on both client visibility and server execution.
