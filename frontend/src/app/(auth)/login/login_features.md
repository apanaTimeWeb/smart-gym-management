# Login Module Architecture

## Directory Structure
- `login.css`: Contains CSS variables (e.g., `--login-primary`, `--login-bg-page`) derived from `global_design_system.md` for extreme theme isolation.
- `login_constants/LoginSharedConstants.ts`: Centralizes static texts, API paths, and asset paths used in the Login flow.
- `login_context/LoginContext.tsx`: Manages React states (`email`, `password`, `loading`, `error`, `showPassword`) and encapsulates the `handleLogin` API flow logic.
- `login_components/`: Contains isolated micro-components that only concern themselves with the UI layout and reading from the `LoginContext`.
  - `LoginVisual/LoginVisual.tsx`: Renders the desktop left-side visual banner.
  - `LoginHeader/LoginHeader.tsx`: Renders the mobile logo banner.
  - `LoginForm/LoginForm.tsx`: Renders the inputs and the submit button.

## Future Modifications
- To change text or paths, edit `login_constants/LoginSharedConstants.ts`.
- To modify the login sequence logic, edit `login_context/LoginContext.tsx`.
- To edit colors, update the CSS variables in `login.css`.
- To update the form layout, edit `login_components/LoginForm/LoginForm.tsx`.
