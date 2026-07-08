# Settings Module Features & Architecture

## Overview
The Settings module (`app/(erp)/settings`) allows gym administrators to configure global application settings, including Gym Profile, Notifications, Roles & Permissions, App Integrations, and General System Preferences.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `settings_components/`
- `SettingsNav/SettingsNav.tsx`: Displays a grid of cards that acts as the primary navigation between different settings categories.
- `SettingsContent/SettingsContent.tsx`: The main dynamic area. Currently, it renders the form for 'Gym Profile' and acts as a placeholder for other tabs.
- `SettingsBanner/SettingsBanner.tsx`: A static, promotional banner displayed at the bottom of the page for free demos.

### 2. `settings_context/`
- `SettingsContext.tsx`: The single source of truth for the settings UI state. Manages the active tab, the form values, and the `fetch` and `save` API calls to the `/settings` endpoint.

### 3. `settings_utils/`
- `SettingsSharedConstants.ts`: Centralizes static data like the configuration array for the settings navigation cards (icons, colors, titles) and the empty form schema.

### 4. Root Files
- `page.tsx`: Initializes the `SettingsProvider` and acts as the structural wrapper, cleanly rendering the Navigation, Content, and Banner components.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `settings.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--settings-bg-card`) ensuring theme independence.
