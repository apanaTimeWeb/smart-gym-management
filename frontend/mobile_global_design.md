# Mobile Global Design System — Framework-Agnostic Token Source

> This is the single source of truth for every visual value used in the app.
> Implementation module differs by framework (a theme object/config for React
> Native, a `ThemeData`/`ColorScheme` extension for Flutter) — but the VALUES
> below and the "no magic values anywhere" discipline are universal.

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

## 2. Spacing Scale
`4, 8, 12, 16, 20, 24, 32, 40, 48` (density-independent units). Never use a
value outside this scale without a documented exception.

## 3. Typography Scale

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

## 6. Touch Targets
`min-touch-target = 44` (iOS pt) / `48` (Android dp) — every tappable element
must meet this via minimum height/width or padding.

## 7. Motion
- Standard press feedback: scale to `0.96` on press, spring back with medium
  damping.
- Standard screen-transition fade/slide: `~250ms` duration, ease-out curve.
- All presets centralized in one shared animation-config module — never
  redefined inline per screen.

## 8. Chart Palette
Series color order (applied consistently across every chart in the app):
`primary, #22C55E, #F59E0B, #EC4899, #06B6D4`.

## 9. Elevation / Shadow

| Level | Effect (iOS-style shadow) | Effect (Android-style elevation) |
|---|---|---|
| `shadow-sm` | opacity 0.05, radius 2 | elevation 1 |
| `shadow-md` | opacity 0.1, radius 6 | elevation 3 |
| `shadow-lg` | opacity 0.15, radius 12 | elevation 8 |

## 10. Semantic Color Usage (How to Apply Tokens — No Guessing)

Every color token has ONE canonical usage. Never apply a token outside its role.

| Token | Foreground (text/icon) | Background | Border |
|---|---|---|---|
| `primary` | Active tab label, selected icon | Primary button fill | Active input ring |
| `destructive` | Error message text, delete icon | Destructive button fill | Error input border |
| `muted` | Placeholder text, disabled label | Skeleton shimmer base | Disabled input border |
| `foreground` | All body text | — | — |
| `background` | — | Screen root background | — |
| `card` | — | Card / surface / bottom sheet | — |
| `border` | — | — | Dividers, default input border |

**Rule:** Never use `primary` for body text. Never use `foreground` as a background.
Token names describe intent, not appearance — they resolve differently in light vs dark mode.

## 11. Form Interaction States (All 9 States — No Invented Colors)

Every input field (text, select, date picker) MUST support all applicable states.
Token values below are used for the input **border and label color** only.

| State | Border color token | Label color token | Notes |
|---|---|---|---|
| `default` | `border` | `muted` | Resting state |
| `focused` | `primary` | `primary` | Active input — platform focus ring |
| `filled` | `border` | `foreground` | Has a value, not focused |
| `error` | `destructive` | `destructive` | After validation failure |
| `success` | `#22C55E` (chart green) | `#22C55E` | After successful validation |
| `disabled` | `border` (50% opacity) | `muted` (50% opacity) | Non-interactive |
| `read-only` | `border` (dashed) | `muted` | Displayed but not editable |
| `loading` | `border` | `muted` | Async options loading (e.g. remote select) |
| `warning` | `#F59E0B` (chart amber) | `#F59E0B` | Soft advisory — not a hard error |

Inline validation error messages appear **below** the field in `caption` typography, `destructive` color.

## 12. Async / Content UI States (Mandatory — No Component is Exempt)

Every screen section that loads data MUST implement all applicable states.
No component may ship without its loading, empty, and error states.

| State | When to show | Implementation |
|---|---|---|
| **Loading / skeleton** | Data fetch in progress | A skeleton component that mimics the exact layout of the real content. Use `muted` at 30% opacity for shimmer base, 50% for shimmer highlight. **Never a full-screen spinner for content areas** — spinner only for button-level actions. |
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

## 15. Sensitive Data Masking — Visual Specification (Rule 30)

Any field displaying sensitive personal or financial data MUST be masked by default
in list views, card components, and summary screens. Full values appear ONLY in
dedicated detail/profile screens.

| Data Type | Masked Display | Full Display (detail screen only) |
|---|---|---|
| Phone number | `98****2310` (first 2 + last 4) | `9876542310` |
| National ID / Aadhaar | `**** **** 2310` (last 4 only) | Full number |
| Bank account / card | `**** 2310` (last 4 only) | Full number |
| Payment amount (bulk list) | Summarized total only | Per-record amount |

**Token:** Masked text uses `muted` color token at 80% opacity — visually distinct
from real data without being invisible.

**Implementation:** ONE central `maskSensitiveData(value, type)` utility in
`src/core/utils/maskSensitiveData.ts`. No component may implement its own masking
logic inline.

---

## 16. Confirmation Bottom Sheet — Visual Specification (Rule 31)

Every destructive or financial action MUST route through a single shared
`ConfirmBottomSheet` component before executing. Never use ad-hoc `Alert.alert()`
or per-screen confirmation dialogs.

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
| Confirm button | `destructive` fill, white text |
| Confirm (loading) | `destructive` fill, `Loader` spinner, `disabled` |

**Z-index:** `z-bottom-sheet` (40) from Section 14.

**Rule:** The confirm button MUST show a loading spinner and be `disabled` while
the mutation is in flight — never allow double-submission.

---

## 17. Loading Button State & Pessimistic UI Tokens (Rule 32)

### Loading Button State
When any button triggers an async action it MUST transition to a loading state
immediately on tap — retaining its size so the layout does not shift.

| State | Visual |
|---|---|
| Default | Label text, `primary` fill |
| Loading | Label hidden (or shifted), `Loader` icon `animate-spin`, `disabled=true`, same fill color at 70% opacity |
| Success | Brief checkmark flash (150ms), then revert or navigate |
| Error | Revert to default state — error shown in toast or inline field |

**Token:** Loading spinner uses white on `primary`/`destructive` fill buttons.
Spinner size: `icon-sm` (16px).

### Pessimistic UI Rule
For financial and destructive mutations the UI list/store/cache MUST only update
AFTER a `2xx` response — never before.

| Mutation type | UI update timing | On error |
|---|---|---|
| Financial (payment, refund, payroll) | After `2xx` only | Restore previous state + toast `response.message` |
| Destructive (delete, suspend, exit) | After `2xx` only | Restore previous state + toast `response.message` |
| Non-destructive (rename, add note) | Optimistic allowed | Roll back cleanly + toast |

**Rule:** Never hardcode error strings in the UI — always surface `response.message`
from the backend envelope (consistent with mobile Rule 32 and backend Rule 28).
