# Settings Module Features & Architecture

## Overview
The Settings module (`app/(erp)/settings`) allows gym administrators to configure global application settings, including Gym Profile, Notifications, Roles & Permissions, App Integrations, and General System Preferences.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `settings_components/`
- `SettingsMain/SettingsMain.tsx`: The primary Client Component layout wrapper that initiates the `SettingsProvider` and renders the content.
- `SettingsNav/SettingsNav.tsx`: Displays a grid of cards that acts as the primary navigation between different settings categories.
- `SettingsContent/SettingsContent.tsx`: The main dynamic area. Currently, it renders the form for 'Gym Profile' and acts as a placeholder for other tabs.
- `SettingsBanner/SettingsBanner.tsx`: A static, promotional banner displayed at the bottom of the page for free demos.

### 2. `settings_context/`
- `useSettingsLogic.ts`: An isolated custom hook containing the React logic to fetch, update, and manage form state for application settings.
- `SettingsContext.tsx`: The single source of truth for the settings UI state. It consumes `useSettingsLogic` and distributes state without prop drilling.

### 3. `settings_types/`
- `settings_types.ts`: Contains TypeScript definitions like `SettingsContextType`.

### 4. `settings_utils/`
- `SettingsSharedConstants.ts`: Centralizes static data like the configuration array for the settings navigation cards (icons, colors, titles) and the empty form schema.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `SettingsMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `settings.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--settings-bg-card`) ensuring theme independence.
