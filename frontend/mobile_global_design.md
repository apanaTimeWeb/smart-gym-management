# Mobile Global Design System — Framework-Agnostic Token Source

> This file is the **canonical visual values source** — it defines what every
> token is worth in light and dark mode. `mobile_theme_contract.md` is the
> **AI-readable catalogue** derived from this file; it lists every token name,
> value, and usage context in one scannable table. The two-layer hierarchy is:
> `mobile_global_design.md` (values specification) →
> `mobile_theme_contract.md` (executable AI reference) →
> Framework theme module → Feature UI.
> Implementation differs by framework (a theme object/config for React
> Native, a `ThemeData`/`ColorScheme` extension for Flutter) — but the VALUES
> below and the "no magic values anywhere" discipline are universal.

## Global Token Enforcement Rule

No feature/screen/component may contain:
- raw hex/RGB colors
- arbitrary spacing values
- arbitrary font sizes
- arbitrary radius values
- arbitrary icon sizes
- arbitrary animation durations
- arbitrary shadow/elevation values
- arbitrary z-index/elevation values

Every visual value must resolve through a documented global token, unless the exception is explicitly documented.

## Token Architecture Chain

`mobile_global_design.md`
→ framework theme module
→ `mobile_theme_contract.md`
→ feature UI

- This file owns canonical visual values.
- The framework theme module implements them.
- The theme contract catalogs the exact dependencies.
- Feature UI consumes semantic tokens only.
- Feature UI never hardcodes global values.
- Feature UI never guesses token names.

## 1. Color Tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `background` | #FFFFFF | #0B0B0F | Screen background |
| `foreground` | #0B0B0F | #F5F5F7 | Primary text |
| `card` | #F8F8FA | #16161C | Card/surface background |
| `primary` | #4F46E5 | #6366F1 | Primary actions, active states |
| `destructive` | #DC2626 | #EF4444 | Errors, delete actions |
| `border` | #E5E5EA | #2A2A32 | Dividers, input borders |
| `muted` | #71717A | #A1A1AA | Secondary/disabled text |
| `on-primary` | #FFFFFF | #FFFFFF | Text/icon on primary fill |
| `on-destructive` | #FFFFFF | #FFFFFF | Text/icon on destructive fill |
| `on-success` | #064E3B | #FFFFFF | Text/icon on success fill |
| `on-info` | #1E3A8A | #FFFFFF | Text/icon on info fill |
| `focus-ring` | #A16207 | #EAB308 | Input focus and keyboard focus |
| `skeleton-base` | #E5E5EA | #2A2A32 | Skeleton shimmer base |
| `skeleton-highlight` | #F5F5F7 | #3F3F46 | Skeleton shimmer highlight |

### Opacity Tokens
| Token | Value | Usage |
|---|---|---|
| `opacity-disabled` | 0.5 | Disabled interactive elements |
| `opacity-loading` | 0.7 | Button loading states |
| `opacity-masked` | 0.8 | Sensitive data masking |

## 2. Spacing Scale
Feature UI must use these named spacing tokens and may not invent arbitrary spacing:
`space-1 = 4`
`space-2 = 8`
`space-3 = 12`
`space-4 = 16`
`space-5 = 20`
`space-6 = 24`
`space-7 = 32`
`space-8 = 40`
`space-9 = 48`

## 3. Typography Scale

- **Font-family strategy:** System UI font stack is default. Framework may substitute platform-native equivalent.
- **Line-height:**
  - `line-height-body = 1.5`
  - `line-height-heading = 1.2`
- **Letter-spacing:**
  - `letter-spacing-caption = 0.5`
  - `letter-spacing-heading = -0.5`

Every typography visual value must resolve to a named token unless an explicit exception is documented.
Size values are expressed in platform-independent typography units; framework theme modules MUST translate them to native text units.

| Token | Size | Weight | Usage |
|---|---|---|---|
| `caption` | 12 | 400 | Captions, timestamps |
| `body-sm` | 14 | 400 | Body secondary |
| `body` | 16 | 400 | Body primary |
| `heading-sm` | 18 | 600 | Section headers |
| `heading-lg` | 22 | 700 | Screen titles |

## 4. Radius Scale
`radius-sm (4)`, `radius-md (8)`, `radius-lg (12)`, `radius-xl (16)`, `radius-full`
— cards default to `radius-lg`, buttons/inputs to `radius-md`.

## 5. Icon Sizes
`icon-sm (16)`, `icon-md (20)`, `icon-lg (24)` — default stroke/weight `1.75`.

Never use 17, 18, 21, 22, 23 etc. 
**Note:** Icon visual size and interactive hit area are separate concepts. No arbitrary icon sizes. Touch targets remain governed by the 44 iOS pt / 48 Android dp rule.

## 6. Touch Targets
`min-touch-target = 44` (iOS pt) / `48` (Android dp) — every tappable element
must meet this via minimum height/width or padding.

## 7. Motion
- **Press configuration:** 
  - `press-scale = 0.96`
  - `spring-medium` = canonical framework-specific preset defined in the shared animation-config module. Feature UI MUST never define its own spring parameters.
- Standard screen-transition fade/slide: `duration-slow` (300ms) duration, ease-out curve.
- All presets centralized in one shared animation-config module — never
  redefined inline per screen.
- **`prefers-reduced-motion` compliance (mandatory):** Always check the OS
  reduced-motion setting before playing non-essential animations. Users with
  vestibular disorders or motion sensitivity configure this at the OS level.
  - React Native: `import { AccessibilityInfo } from 'react-native'` — use
    `AccessibilityInfo.isReduceMotionEnabled()` or the `useReduceMotion()` hook
    from `react-native-reanimated` to skip or shorten animations.
  - Flutter: `MediaQuery.of(context).disableAnimations` — if `true`, skip
    all non-essential `AnimationController` transitions.
  - **Rule:** Any animation that is purely decorative (card hover lift, skeleton
    shimmer, screen transition) MUST be skipped or reduced to an instant
    state-change when reduced-motion is enabled. Functional animations (e.g.
    a spinner indicating in-progress work) may remain.

### Motion Token Scale
All animation durations MUST use these named tokens — never arbitrary inline values:

| Token | Duration | Usage |
|---|---|---|
| `duration-fast` | 150ms | Micro-interactions: button press, checkbox toggle |
| `duration-base` | 200ms | Standard transitions: hover/press states, dropdown open |
| `duration-slow` | 300ms | Screen-level transitions: bottom sheet open, modal appear |
| `duration-xslow` | 500ms | Complex layout shifts: skeleton → content swap |

## 8. Status & Semantic Colors

Every status badge, label, and icon color MUST use these tokens — never raw hex
values inline. Global design defines only semantic visual meaning such as success, warning, danger, info, neutral, and purple.

| Token | Light | Dark |
|---|---|---|
| `status-success-text` | `#064E3B` | `#22C55E` |
| `status-success-bg` | `#D1FAE5` | `#064E3B` |
| `status-warning-text` | `#92400E` | `#F59E0B` |
| `status-warning-bg` | `#FEF3C7` | `#451A03` |
| `status-danger-text` | `#7F1D1D` | `#EF4444` |
| `status-danger-bg` | `#FEE2E2` | `#450A0A` |
| `status-info-text` | `#1E3A8A` | `#3B82F6` |
| `status-info-bg` | `#DBEAFE` | `#1E3A5F` |
| `status-neutral-text` | `#3F3F46` | `#A1A1AA` |
| `status-neutral-bg` | `#F4F4F5` | `#1E1E2E` |
| `status-purple-text` | `#581C87` | `#C084FC` |
| `status-purple-bg` | `#F3E8FF` | `#3B0764` |

**Rule:** Each feature owns its own status-to-semantic-token mapping inside its feature folder (e.g., `/features/members/config/membersStatusConfig.ts`). Do NOT make global design responsible for feature business-status mapping (like `Active`, `Paid`, `Pending`).

## 8a. Payment Mode Color Tokens

Payment mode colors are separated from status colors to avoid visual collision. Keep payment visual tokens global, but do not put payment business logic or feature mappings in this file.

| Token | Light | Dark |
|---|---|---|
| `pay-cash-text` | `#0F766E` | `#5EEAD4` |
| `pay-cash-bg` | `#CCFBF1` | `#134E4A` |
| `pay-upi-text` | `#0E7490` | `#67E8F9` |
| `pay-upi-bg` | `#CFFAFE` | `#164E63` |
| `pay-card-text` | `#334155` | `#94A3B8` |
| `pay-card-bg` | `#F1F5F9` | `#1E293B` |
| `pay-bank-text` | `#0369A1` | `#38BDF8` |
| `pay-bank-bg` | `#E0F2FE` | `#0C4A6E` |

## 9. Chart Palette
Series color order (applied consistently across every chart in the app). Charts in feature UI must consume only these semantic tokens.

| Token | Light | Dark |
|---|---|---|
| `chart-primary` | `#4F46E5` | `#6366F1` |
| `chart-success` | `#10B981` | `#22C55E` |
| `chart-warning` | `#F59E0B` | `#F59E0B` |
| `chart-danger` | `#EF4444` | `#EF4444` |
| `chart-secondary`| `#DB2777` | `#EC4899` |
| `chart-info` | `#0891B2` | `#06B6D4` |

## 9. Elevation / Shadow

| Level | Effect (iOS-style shadow) | Effect (Android-style elevation) |
|---|---|---|
| `shadow-sm` | opacity 0.05, radius 2 | elevation 1 |
| `shadow-md` | opacity 0.1, radius 6 | elevation 3 |
| `shadow-lg` | opacity 0.15, radius 12 | elevation 8 |

## 10. Core Semantic Color Usage (How to Apply Tokens — No Guessing)

Every color token has ONE canonical usage. Never apply a token outside its role.

| Token | Foreground (text/icon) | Background | Border |
|---|---|---|---|
| `primary` | Active tab label, selected icon | Primary button fill | — |
| `destructive` | Error message text, delete icon | Destructive button fill | Error input border |
| `muted` | Placeholder text, disabled label | — | Disabled input border |
| `foreground` | All body text | — | — |
| `background` | — | Screen root background | — |
| `card` | — | Card / surface / bottom sheet | — |
| `border` | — | — | Dividers, default input border |
| `on-*` | Text/icon over corresponding fill | — | — |
| `focus-ring` | — | — | Input/keyboard focus ring |
| `skeleton-*` | — | Skeleton shimmer effects | — |
| `status-*-text` | Status badge text | — | — |
| `status-*-bg` | — | Status badge background | — |
| `pay-*-text` | Payment badge text | — | — |
| `pay-*-bg` | — | Payment badge background | — |
| `chart-*` | Chart series data | Chart fill | Chart border |

**Rule:** Never use `primary` for body text. Never use `foreground` as a background.
Token names describe intent, not appearance — they resolve differently in light vs dark mode.

## 11. Form Interaction States (All 9 States — No Invented Colors)

Every input field (text, select, date picker) MUST support all applicable states.
Token values below are used for the input **border and label color** only.

| State | Border color token | Label color token | Notes |
|---|---|---|---|
| `default` | `border` | `muted` | Resting state |
| `focused` | `focus-ring` | `primary` | Active input — platform focus ring |
| `filled` | `border` | `foreground` | Has a value, not focused |
| `error` | `destructive` | `destructive` | After validation failure |
| `success` | `status-success-text` | `status-success-text` | After successful validation |
| `disabled` | `border` (`opacity-disabled`) | `muted` (`opacity-disabled`) | Non-interactive |
| `read-only` | `border` (dashed) | `muted` | Displayed but not editable |
| `loading` | `border` | `muted` | Async options loading (e.g. remote select) |
| `warning` | `status-warning-text` | `status-warning-text` | Soft advisory — not a hard error |

Inline validation error messages appear **below** the field in `caption` typography, `destructive` color.

## 12. Async / Content UI States (Mandatory — No Component is Exempt)

Every screen section that loads data MUST implement all applicable states.
No component may ship without its loading, empty, and error states.

| State | When to show | Implementation |
|---|---|---|
| **Loading / skeleton** | Data fetch in progress | A skeleton component that mimics the exact layout of the real content. Use `skeleton-base` for shimmer base, `skeleton-highlight` for shimmer highlight. **Never a full-screen spinner for content areas** — spinner only for button-level actions. |
| **Empty** | Fetch succeeded, zero results | A dedicated `[Feature]EmptyState` component with a contextual icon, a short human-readable message, and a primary CTA (e.g. "Add your first member"). Never a blank white screen. |
| **Error** | Fetch failed or network error | A `[Feature]ErrorFallback` component showing a brief message from `response.message` (backend-driven), a "Try again" retry button, and optionally a help link. Never expose raw error objects. |
| **Permission denied** | User lacks role access to the resource | A `[Feature]PermissionDenied` component explaining the access restriction. Never show a blank screen or a cryptic error code. |
| **Offline** | No network detected (if offline is a declared feature) | An inline offline banner (not a full-screen takeover) with the last-cached data still visible. Only for features that explicitly declare offline support in `_features.md`. |

## 13. Safe Area & Notch Handling

Mobile screens have physical obstructions (notch, Dynamic Island, home indicator, status bar).
Every screen MUST account for safe areas — never let interactive content sit under them.

- Wrap screen roots in the platform's safe-area provider:
  - RN: `<SafeAreaView>` from `react-native-safe-area-context` — never the core `SafeAreaView`.
  - Flutter: `SafeArea` widget at the scaffold level.
- **Bottom tab bars and floating action buttons** MUST add bottom safe-area inset padding
  so they are not hidden behind the home indicator on notchless devices.
- **Full-screen modals and bottom sheets** MUST respect top safe area inset (status bar height).
- Never hardcode a numeric inset value (e.g. `paddingTop: 44`) — always read from the
  platform's `useSafeAreaInsets()` hook (RN) or `MediaQuery.of(context).padding` (Flutter).
- `SafeAreaView` must be applied at the **screen level**, not inside individual components —
  components are unaware of screen geometry.

## 14. Z-Index / Elevation Stack

Define a named z-index scale so overlapping elements are never resolved with arbitrary numbers.

| Token | Value | Usage |
|---|---|---|
| `z-base` | 0 | Default screen content |
| `z-sticky` | 10 | Sticky list section headers |
| `z-fab` | 20 | Floating action button |
| `z-bottom-tab` | 30 | Bottom tab navigation bar |
| `z-bottom-sheet` | 40 | Bottom sheet / action sheet |
| `z-modal` | 50 | Modal dialogs |
| `z-toast` | 60 | Toast / snackbar notifications |
| `z-overlay` | 70 | Full-screen loading overlay |

**Rule:** Never use a raw z-index / elevation number outside this table.
If a new layer type is needed, extend this table — don't invent an arbitrary value inline.

## 15. Sensitive Data Masking — Visual Specification

Any field displaying sensitive personal or financial data MUST be masked by default
in list views, card components, and summary screens. Full values appear ONLY in
dedicated detail/profile screens.

| Data Type | Masked Display | Full Display (detail screen only) |
|---|---|---|
| Phone number | `98****2310` (first 2 + last 4) | `9876542310` |
| National ID / Aadhaar | `**** **** 2310` (last 4 only) | Full number |
| Bank account / card | `**** 2310` (last 4 only) | Full number |
| Payment amount (bulk list) | Summarized total only | Per-record amount |

**Token:** Masked text uses `muted` color token at `opacity-masked` — visually distinct
from real data without being invisible.

---

## 16. Confirmation Bottom Sheet — Visual Specification

### Layout
```
┌─────────────────────────────────────┐
│  ████  [Warning icon — destructive] │  ← icon color: `destructive` token
│  [Action Title — heading-sm, bold]  │
│  [Description — body-sm, muted]     │  ← must state if irreversible
│  [Detail context if needed]         │
├─────────────────────────────────────┤
│  [Cancel — ghost, full width]       │
│  [Confirm — destructive fill, fw]   │  ← disabled + spinner while in-flight
└─────────────────────────────────────┘
```

### Token Mapping
| Element | Token |
|---|---|
| Sheet background | `card` |
| Warning icon | `destructive` |
| Title | `foreground`, `heading-sm` |
| Description | `muted`, `body-sm` |
| Cancel button | `border` outline, `foreground` text |
| Confirm button | `destructive` fill, `on-destructive` text |
| Confirm (loading) | `destructive` fill, `Loader` spinner, `disabled` |

**Z-index:** `z-bottom-sheet` (40) from Section 14.

---

## 17. Button Visual Hierarchy & Loading State

### General Button Visual Hierarchy

| Button Type | Visual Contract |
|---|---|
| Primary | `primary` fill + `on-primary` text |
| Secondary / Outlined | `border` outline + `foreground` text |
| Ghost | transparent fill + `foreground` text |
| Destructive | `destructive` fill + `on-destructive` text |
| Icon button | icon token + `min-touch-target` |
| Text button / link | `primary` text |

### Loading Button State
When any button triggers an async action it MUST transition to a loading state
immediately on tap — retaining its size so the layout does not shift.

| State | Visual |
|---|---|
| Default | Label text, `primary` fill |
| Loading | Label hidden (or shifted), `Loader` icon `animate-spin`, `disabled=true`, same fill color at `opacity-loading` |
| Success | Brief checkmark flash (`duration-fast`), then revert or navigate |
| Error | Revert to default state — error shown in toast or inline field |

**Token:** Loading spinner uses `on-primary` / `on-destructive` on primary/destructive fill buttons.
Spinner size: `icon-sm` (16px).

---

## 18. Theme Contract Cross-Reference

This file (`mobile_global_design.md`) is the VALUES source — it defines what every
token is worth in light and dark mode.

`mobile_theme_contract.md` (required by mobile Rule 52) is the CATALOGUE — it lists
every token name, its value from this file, and its exact usage context in one
scannable table that AI agents read before writing any styled component.

**Relationship:**
- When a new token is needed: add it to THIS file first (with light + dark values
  and a usage description), then add it to `mobile_theme_contract.md`, then
  implement it in the framework's theme module (Rule 3).
- AI agents writing components MUST reference `mobile_theme_contract.md` to pick
  token names — never guess a token name or hardcode a value from memory.
- The two files must stay in sync. A token present in one but not the other is a
  documentation bug — fix it in the same commit.

**Token categories that MUST appear in `mobile_theme_contract.md`:**
- Color tokens (Section 1)
- Status text/background tokens (Section 8)
- Payment text/background tokens (Section 8a)
- Spacing tokens (Section 2)
- Typography line-height tokens (Section 3)
- Typography letter-spacing tokens (Section 3)
- Border radius tokens (Section 4)
- Icon size tokens (Section 5)
- Touch target tokens (Section 6)
- Motion duration tokens (Section 7)
- Press-scale/spring tokens (Section 7)
- Opacity tokens (Section 1)
- Skeleton tokens (Section 1)
- Elevation/shadow tokens (Section 9)
- Z-index/elevation stack (Section 14)

**CI Check Requirements (Mandatory Sync):**
CI MUST fail when:
- a global token exists in this file but is omitted from `mobile_theme_contract.md`
- the contract references an unknown token
- a required Light/Dark token pair is incomplete
