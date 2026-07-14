# Login Module Architecture

## Directory Structure
- `page.tsx`: A Server Component responsible for checking the active session cookie (`gymsmart_user`). If a session exists, it performs a server-side redirect to the dashboard without sending any UI or JavaScript to the client.
- `login.css`: Contains CSS variables (e.g., `--login-primary`, `--login-bg-page`) derived from `global_design_system.md` for extreme theme isolation.
- `login_types/login_types.ts`: Contains isolated TypeScript definitions and interfaces used within the module.
- `login_constants/LoginSharedConstants.ts`: Centralizes static texts, API paths, and asset paths used in the Login flow.
- `login_components/`: Contains isolated micro-components that only concern themselves with the UI layout.
  - `LoginErrorBoundary/LoginErrorBoundary.tsx`: Typed Error Boundary component that wraps the login UI elements.
  - `LoginHeroSection/LoginHeroSection.tsx`: Renders the desktop left-side visual banner.
  - `LoginMobileHeader/LoginMobileHeader.tsx`: Renders the mobile logo banner.
  - `LoginForm/LoginForm.tsx`: Renders the inputs and the submit button. It acts strictly as a View layer.
  - `LoginForm/useLoginForm.ts`: A custom hook that isolates the React state (`email`, `password`, `loading`, `error`, `showPassword`) and encapsulates the `handleLogin` API flow logic strictly for the LoginForm.
  - `LoginForm/useLoginForm.test.ts`: Jest-compatible unit tests for the login hook.

## Future Modifications
- To change text or paths, edit `login_constants/LoginSharedConstants.ts`.
- To modify the login sequence logic, edit `login_components/LoginForm/useLoginForm.ts`.
- To edit colors, update the CSS variables in `login.css`.
- To update the form layout, edit `login_components/LoginForm/LoginForm.tsx`.
