# React Native Global Design System — Token Source

Spacing / radius / icon / touch-target values → dp-equivalent React Native layout units.
Typography → React Native text scale / fontSize.
Animation durations → milliseconds.
Opacity → normalized 0–1.
Layering is controlled by named `zIndex` tokens.
Android elevation is defined separately by the shadow/elevation token system.

> `MOBILE_UI_UX_DESIGN.md` is the **canonical visual-values source** and the
> **AI-readable token catalogue**. It defines what every token is worth in light
> and dark mode, and lists every token name, value, and usage context in one
> scannable table that AI agents read before writing any styled component.
>
> Hierarchy:
>
> `MOBILE_UI_UX_DESIGN.md`
> → React Native theme module
> → Feature UI
>
> The VALUES below and the "no magic values anywhere" discipline are universal.

---

## PLATFORM APPLICABILITY MATRIX

This document governs the **React Native mobile application only**. Rules reference mobile-specific technologies such as `AccessibilityInfo`, `SafeAreaView`, `Platform.OS`, and React Native's Flexbox layout model.

| Rule Area | Mobile (React Native) | Web (Next.js) | Shared / Both |
|---|---|---|---|
| React Native Flexbox, `StyleSheet`, dp units | ✅ | ❌ | — |
| Color tokens and semantic naming | ✅ | ✅ (see WEB_FRONTEND_UI_UX_DESIGN.md) | ✅ |
| Accessibility (via `AccessibilityInfo`, roles, hints) | ✅ | ❌ (uses ARIA/WCAG) | — |
| Safe area handling (`useSafeAreaInsets`) | ✅ | ❌ | — |
| Platform conventions (iOS / Android back navigation) | ✅ | ❌ | — |
| Touch targets (44pt iOS / 48dp Android) | ✅ | ❌ (web uses 44×44px) | — |
| `prefers-reduced-motion` via `AccessibilityInfo.isReduceMotionEnabled()` | ✅ | ❌ (web uses CSS media query) | — |
| Dynamic Type / Android font scaling | ✅ | ❌ | — |
| Status/payment/chart token palette | ✅ | ✅ | ✅ |
| Feature isolation, module naming, AI repair boundary | ✅ | ✅ | ✅ |
| Security principles (auth, permissions, PII masking) | ✅ | ✅ | ✅ |

**Conflict Resolution Hierarchy:** When rules in this document conflict with each other or with other documents, resolve using this precedence order (highest to lowest):
1. **Security & Privacy** — authentication, authorization, PII handling
2. **Legal / Compliance** — accessibility standards, data protection requirements
3. **Accessibility** — Dynamic Type, screen-reader support, reduced motion
4. **Platform Conventions** — iOS and Android expected native behaviors
5. **Product Requirements** — documented business feature needs
6. **Architecture Rules** — isolation, naming, token discipline
7. **Visual Preferences** — colors, animations, spacing aesthetics

Deviations from this hierarchy MUST be documented in the affected feature's `_features.md`.

---

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

Every visual value must resolve through a documented global token.

**Exception Process — Controlled Runtime Values:**
Locally derived layout values are permitted ONLY when the value cannot be expressed as a static token AND an explicit `// design-exception: <reason>` comment documents why. Permitted exception categories:
- Safe-area insets (from `useSafeAreaInsets()`) — device-dependent at runtime
- Device screen dimensions (from `Dimensions.get('window')`) — cannot be a static token
- Keyboard offset height — varies per device and input type
- Image aspect ratios computed from API-provided dimensions
- Animation interpolation output ranges — runtime-derived from gesture values
- Platform-native component sizing requirements where the system component dictates a specific size

When a runtime-derived value proves reusable across multiple features, it MUST be promoted to a named token.

```typescript
// ✅ PERMITTED — runtime-derived exception with documentation
const { bottom } = useSafeAreaInsets();
<View style={{ paddingBottom: bottom + tokens.space[4] }} />
// design-exception: safe-area inset is device-dependent at runtime

// ❌ FORBIDDEN — arbitrary value without justification
<View style={{ paddingBottom: 34 }} />
```

## Token Architecture Chain

`MOBILE_UI_UX_DESIGN.md`
→ React Native theme module
→ feature UI

- This file owns canonical visual values.
- The React Native theme module implements them.
- The theme module catalogs the exact dependencies.
- Feature UI consumes semantic tokens only.
- Feature UI never hardcodes global values.
- Feature UI never guesses token names.

> **CRITICAL WARNING TO AI AGENTS (COMPONENT ISOLATION):**
> Do NOT attempt to "DRY up" business-aware components (e.g., Date Filters with presets, Status Badges with hardcoded text) by moving them to global folders like `widgets/common/` or `ui/`. 
> Global UI folders are STRICTLY for zero-business, dumb primitives. Business components MUST be duplicated per feature.

## 1A. Contrast Validation (WCAG AA)

Every semantic foreground/background pair used for normal UI text MUST meet WCAG AA contrast requirements (4.5:1 for normal text).
The theme module MUST be contrast-tested for all Light/Dark semantic pairs.
CI/design validation MUST fail when an approved text/background pair falls below the required threshold.

Ensure `primary` (#4F46E5) and `destructive` (#DC2626) against `on-primary` (#FFFFFF) and `on-destructive` (#FFFFFF) pass this contrast validation before final theme lock.

## 1B. Semantic Accessibility Tokens

Mobile UI quality requires proper focus states, screen-reader semantics, and contrast targets. The theme MUST define and consume accessibility tokens (e.g., `focus-visible`, `focus-ring-width`, `focus-ring-offset`, and disabled-state semantics) to ensure screen-reader feedback, keyboard/switch-control navigation, and error/success announcements are universally consistent.

## 1C. Mobile Accessibility Requirements (Comprehensive)

All screens and components MUST meet these mobile accessibility standards:

### Screen Reader (VoiceOver / TalkBack)
- Every interactive element MUST have a meaningful `accessibilityLabel` prop. Never rely on visible text alone when the element is an icon or has ambiguous purpose.
- Use `accessibilityHint` to describe the outcome of an action where the label alone is insufficient (e.g., `accessibilityLabel="Delete member"` + `accessibilityHint="Permanently removes the member and all their data"`).
- Use `accessibilityRole` to communicate the semantic role: `button`, `link`, `header`, `checkbox`, `switch`, `image`, `text`, `none`, etc.
- Use `accessibilityState` to communicate dynamic states: `{ disabled, selected, checked, busy, expanded }`.
- Use `accessibilityValue` for progress, sliders, and stepped controls.
- Use `accessible={false}` on purely decorative elements to exclude them from the screen reader traversal order.
- Logical focus/traversal order MUST follow the visual reading order top-to-bottom, left-to-right.

### Touch Targets
- Every tappable element MUST meet the platform minimum: **44pt on iOS, 48dp on Android**.
- Use `hitSlop` to extend the touch area without changing the visual size for smaller controls.
- Never rely only on visual size — small icons can pass visually but fail accessibility without `hitSlop`.

### Dynamic Type / Font Scaling
- All `<Text>` components MUST support `allowFontScaling={true}` (the RN default).
- Set `maxFontSizeMultiplier` where needed to prevent layout breakage, with a documented maximum of 1.5× before requiring layout accommodation.
- Test all screens at the largest accessibility text size on both platforms.

### High Contrast Support
- Where the platform supports high-contrast mode, verify token pairs maintain sufficient contrast at high-contrast settings.
- Never use low-contrast muted text for critical information (errors, warnings, primary actions).

### Error and Status Announcements
- Error messages that appear inline after an async action MUST be announced to screen readers via `accessibilityLiveRegion='polite'` (non-critical) or `'assertive'` (critical errors).
- Success confirmations MUST also be announced.
- Never rely only on color to communicate an error (pair with icon + text).

### Reduced Motion (already in Section 7 — cross-reference)
- Non-essential animations MUST respect `AccessibilityInfo.isReduceMotionEnabled()`.
- See Section 7 for full reduced-motion rules.

## 1. Color Tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `background` | #FFFFFF | #0B0B0F | Screen background |
| `foreground` | #0B0B0F | #F5F5F7 | Primary text |
| `card` | #F8F8FA | #16161C | Card/surface background |
| `primary` | #4F46E5 | #4F46E5 | Primary actions, active states |
| `primary-text` | #4F46E5 | #818CF8 | Text links, primary text buttons |
| `destructive` | #DC2626 | #DC2626 | Errors, delete actions |
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

### React Native Typography Contract

All typography values MUST be expressed as explicit React Native unit properties. "Platform-independent units" are not sufficient — specify the exact numeric values below:

| Token | `fontSize` | `lineHeight` | `letterSpacing` | `fontWeight` | Usage |
|---|---|---|---|---|---|
| `caption` | 12 | 18 | 0.5 | `'400'` | Captions, timestamps |
| `body-sm` | 14 | 21 | 0 | `'400'` | Body secondary |
| `body` | 16 | 24 | 0 | `'400'` | Body primary |
| `heading-sm` | 18 | 22 | -0.5 | `'600'` | Section headers |
| `heading-lg` | 22 | 28 | -0.5 | `'700'` | Screen titles |

**Font family contract:**
- Default: System UI font stack (`System` — resolves to San Francisco on iOS, Roboto on Android).
- Custom fonts: Must be loaded via `expo-font` or React Native font linking. Never hardcode a platform-specific font family name directly in JSX.
- Fallback: If a custom font fails to load, always fall back to the system default.

**Truncation behavior:**
- Single-line truncation: `numberOfLines={1}` + `ellipsizeMode='tail'`
- Multi-line truncation: `numberOfLines={N}` + `ellipsizeMode='tail'`
- Never clip text without a visible indicator that content was truncated.

**Font Scaling — Dynamic Type (iOS) and Font Size (Android):**
- The theme MUST handle Dynamic Type and Android font scaling properly.
- Set `allowFontScaling={true}` (default) on all `<Text>` components unless a specific measured UI element has a documented exception.
- Set `maxFontSizeMultiplier` where allowing unbounded scaling would break a critical UI element. The maximum allowed multiplier before requiring layout accommodation is `1.5`.
- Developers MUST test all screens at the largest accessibility text size on both iOS and Android.
- NEVER hardcode pixel-specific layout dimensions that assume a fixed font size — use `flexShrink`, `flexWrap`, and `minHeight` to accommodate text growth.

## 4. Radius Scale
`radius-sm (4)`, `radius-md (8)`, `radius-lg (12)`, `radius-xl (16)`, `radius-full`
— cards default to `radius-lg`, buttons/inputs to `radius-md`.

## 5A. Layout Tokens

`button-min-width = 120`

## 5B. Icon Sizes

`icon-sm (16)`, `icon-md (20)`, `icon-lg (24)` — default stroke/weight `1.75`.

Use named `icon-*` size tokens. Introduce a new token when a supported icon library or specific platform convention strictly requires a new standard size.
**Note:** Icon visual size and interactive hit area are separate concepts. No arbitrary icon sizes without justification. Touch targets remain governed by the 44 iOS pt / 48 Android dp rule.

## 6. Touch Targets
`min-touch-target = 44` (iOS pt) / `48` (Android dp) — every tappable element
must meet this via minimum height/width or padding.

## 7. Motion
- **Press configuration:** 
  - `press-scale = 0.96`
  - `spring-medium` = canonical React Native preset defined in the shared animation-config module. Feature UI MUST never define its own spring parameters.
- Standard screen-transition fade/slide: `duration-slow` (300ms) duration, ease-out curve.
- All presets centralized in one shared animation-config module — never
  redefined inline per screen.
- **`prefers-reduced-motion` compliance (mandatory):** Always check the OS
  reduced-motion setting before playing non-essential animations. Users with
  vestibular disorders or motion sensitivity configure this at the OS level.
  - React Native: `import { AccessibilityInfo } from 'react-native'` — use
    `AccessibilityInfo.isReduceMotionEnabled()` or the `useReduceMotion()` hook
    from `react-native-reanimated` to skip or shorten animations.

  - **Rule:** Any animation that is purely decorative (card press / active / focus lift, skeleton
    shimmer, screen transition) MUST be skipped or reduced to an instant
    state-change when reduced-motion is enabled. Functional animations (e.g.
    a spinner indicating in-progress work) may remain.

  - **Non-animated equivalents required:** Every animated state change MUST have a
    non-animated equivalent that communicates the same information without motion.
    Motion must NEVER be the sole indicator of a state change. Examples:
    - Loading: spinner → static "Loading..." label fallback when reduced-motion enabled
    - Success: checkmark flash → instant checkmark display (no animation)
    - Screen transition: slide → instant cross-fade or direct render
    - Bottom sheet: slide-up → instant appear
    - Skeleton shimmer: animated shimmer → static muted placeholder

  - **Test requirement:** Every animated component MUST be tested with `AccessibilityInfo.isReduceMotionEnabled()` returning `true` to confirm non-animated behavior works correctly.

### Motion Token Scale
All animation durations MUST use these named tokens — never arbitrary inline values:

| Token | Duration | Usage |
|---|---|---|
| `duration-fast` | 150ms | Micro-interactions: button press, checkbox toggle |
| `duration-base` | 200ms | Standard transitions: press / active / focus/press states, dropdown open |
| `duration-slow` | 300ms | Screen-level transitions: bottom sheet open, modal appear |
| `duration-xslow` | 500ms | Complex layout shifts: skeleton → content swap |

## 8. Status & Semantic Colors

Every status badge, label, and icon color MUST use these tokens — never raw hex
values inline. Global design defines only semantic visual meaning such as success, warning, danger, info, neutral, and purple.

| Token | Light | Dark |
|---|---|---|
| `status-success-text` | `#064E3B` | `#86EFAC` |
| `status-success-bg` | `#D1FAE5` | `#064E3B` |
| `status-warning-text` | `#92400E` | `#F59E0B` |
| `status-warning-bg` | `#FEF3C7` | `#451A03` |
| `status-danger-text` | `#7F1D1D` | `#FCA5A5` |
| `status-danger-bg` | `#FEE2E2` | `#450A0A` |
| `status-info-text` | `#1E3A8A` | `#93C5FD` |
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
| `pay-bank-text` | `#0369A1` | `#7DD3FC` |
| `pay-bank-bg` | `#E0F2FE` | `#0C4A6E` |

## 9. Chart Palette
Series color order (applied consistently across every chart in the app). Charts in feature UI must consume only these semantic tokens.

| Token | Light | Dark |
|---|---|---|
| `chart-primary` | `#4F46E5` | `#818CF8` |
| `chart-success` | `#10B981` | `#86EFAC` |
| `chart-warning` | `#F59E0B` | `#F59E0B` |
| `chart-danger` | `#EF4444` | `#EF4444` |
| `chart-secondary`| `#DB2777` | `#EC4899` |
| `chart-info` | `#0891B2` | `#06B6D4` |

## 10. Elevation / Shadow

| Level | Effect (iOS-style shadow) | Effect (Android-style elevation) |
|---|---|---|
| `shadow-sm` | opacity 0.05, radius 2 | elevation 1 |
| `shadow-md` | opacity 0.1, radius 6 | elevation 3 |
| `shadow-lg` | opacity 0.15, radius 12 | elevation 8 |

## 11. Core Semantic Color Usage (How to Apply Tokens — No Guessing)

Every color token has ONE canonical usage. Never apply a token outside its role.

| Token | Foreground (text/icon) | Background | Border |
|---|---|---|---|
| `primary` | Primary button fill, selected primary icon | Primary button fill | — |
| `destructive` | Destructive button fill, delete icon | Destructive button fill | Error input border |
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

**Rule:** Never use `primary` for body text. Never use `destructive` for error text (use `status-danger-text` instead). Never use `foreground` as a background.
Token names describe intent, not appearance — they resolve differently in light vs dark mode.

## 12. Form Interaction States (All 9 States — No Invented Colors)

Every input field (text, select, date picker) MUST support all applicable states.
Token values below are used for the input **border and label color** only.

| State | Border color token | Label color token | Notes |
|---|---|---|---|
| `default` | `border` | `muted` | Resting state |
| `focused` | `focus-ring` | `primary-text` | Active input — platform focus ring |
| `filled` | `border` | `foreground` | Has a value, not focused |
| `error` | `destructive` | `status-danger-text` | After validation failure |
| `success` | `status-success-text` | `status-success-text` | After successful validation |
| `disabled` | `border` (`opacity-disabled`) | `muted` (`opacity-disabled`) | Non-interactive |
| `read-only` | `border` (dashed) | `muted` | Displayed but not editable |
| `loading` | `border` | `muted` | Async options loading (e.g. remote select) |
| `warning` | `status-warning-text` | `status-warning-text` | Soft advisory — not a hard error |

Inline validation error messages appear **below** the field in `caption` typography, `status-danger-text` color.

## 13. Async / Content UI States (Mandatory — No Component is Exempt)

Every screen section that loads data MUST implement all applicable states.
No component may ship without its loading, empty, and error states.

| State | When to show | Implementation |
|---|---|---|
| **Loading / skeleton** | Data fetch in progress | A skeleton component that mimics the exact layout of the real content. Use `skeleton-base` for shimmer base, `skeleton-highlight` for shimmer highlight. **Never a full-screen spinner for content areas** — spinner only for button-level actions. |
| **Empty** | Fetch succeeded, zero results | A dedicated `[Feature]EmptyState` component with a contextual icon, a short human-readable message, and a primary CTA (e.g. "Add your first member"). Never a blank white screen. |
| **Error** | Fetch failed or network error | A `[Feature]ErrorFallback` component showing a brief message from `response.message` (backend-driven), a "Try again" retry button, and optionally a help link. Never expose raw error objects. |
| **Permission denied** | User lacks role access to the resource | A `[Feature]PermissionDenied` component explaining the access restriction. Never show a blank screen or a cryptic error code. |
| **Offline** | No network detected (if offline is a declared feature) | An inline offline banner (not a full-screen takeover) with the last-cached data still visible. Only for features that explicitly declare offline support in `_features.md`. |

## 14. Safe Area & Notch Handling

Mobile screens have physical obstructions (notch, Dynamic Island, home indicator, status bar).
Every screen MUST account for safe areas — never let interactive content sit under them.

- Screen roots MUST use `SafeAreaView` from `react-native-safe-area-context`.
- Bottom tab bars and FABs MUST account for bottom safe-area insets.
- Full-screen modals and bottom sheets MUST account for top safe-area insets.
- Never hardcode inset values.
- `useSafeAreaInsets()` MUST be used wherever explicit inset handling is required.
- Safe-area handling belongs at screen/container level, not inside reusable business components.

## 15. Z-Index / Elevation Stack

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

## 16. Sensitive Data Masking — Visual Specification

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

## 17. Confirmation Bottom Sheet — Visual Specification

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

**Z-index:** `z-bottom-sheet` (40) from Section 15.

---

## 18. Button Visual Hierarchy & Loading State

### General Button Visual Hierarchy

| Button Type | Visual Contract |
|---|---|
| Primary | `primary` fill + `on-primary` text |
| Secondary / Outlined | `border` outline + `foreground` text |
| Ghost | transparent fill + `foreground` text |
| Destructive | `destructive` fill + `on-destructive` text |
| Icon button | icon token + `min-touch-target` |
| Text button / link | `primary-text` |

### Loading Button State
When any button triggers an async action it MUST transition to a loading state immediately on tap. The button width MUST remain unchanged. The accessible label MUST remain available. Prefer showing the label with a spinner rather than removing the label. Prevent double submission.

| State | Visual |
|---|---|
| Default | Label text, `primary` fill |
| Loading | Label remains available; spinner may be shown before or beside the label, `Loader` icon `RN ActivityIndicator`, `disabled=true`, same fill color at `opacity-loading` |
| Success | **Conditional — context-sensitive only:** Brief checkmark flash (`duration-fast`) is used ONLY when ALL of the following are true: (1) the user remains on the same screen, (2) a visible completion state is meaningful to the user, (3) the operation has confirmed final completion (not eventual consistency), (4) the action is NOT destructive, (5) navigation does NOT immediately follow. Skip the checkmark for: immediate navigation after submit, destructive operations (deletion, suspension), background/long-running operations, and operations with eventual consistency where the server response doesn't confirm final state. |
| Error | Revert to default state — error shown in toast or inline field |

**Token:** Loading spinner uses `on-primary` / `on-destructive` on primary/destructive fill buttons.
Spinner size: `icon-sm`.

---

## 19. Theme Contract Cross-Reference

This file (`MOBILE_UI_UX_DESIGN.md`) serves two roles simultaneously:
1. **VALUES source** — it defines what every token is worth in light and dark mode (the tables above).
2. **AI-readable catalogue** — it lists every token name, value, and usage context in one scannable table that AI agents read before writing any styled component.

**Hierarchy:**
```
MOBILE_UI_UX_DESIGN.md   ← this file (values + catalogue)
       ↓
React Native theme module  ← implements the token values from this file
       ↓
Feature UI                 ← consumes semantic tokens ONLY; never hardcodes values
```

**Workflow rule (when a new token is needed):**
1. Add the token to THIS file first — with light + dark values and a usage description.
2. Implement it in the React Native theme module (Rule 3).
3. List it in the owning feature's `[featureName]_theme_contract.md` (Rule 52A).
4. AI agents writing components MUST reference THIS document to pick token names — never guess a token name or hardcode a value from memory.


**Token categories that MUST be explicitly declared in the React Native theme module:**
- Color tokens (Section 1)
- Status text/background tokens (Section 8)
- Payment text/background tokens (Section 8a)
- Spacing tokens (Section 2)
- Typography line-height tokens (Section 3)
- Typography letter-spacing tokens (Section 3)
- Border radius tokens (Section 4)
- Layout tokens (Section 5A)
- Icon size tokens (Section 5B)
- Touch target tokens (Section 6)
- Motion duration tokens (Section 7)
- Press-scale/spring tokens (Section 7)
- Opacity tokens (Section 1)
- Skeleton tokens (Section 1)
- Elevation/shadow tokens (Section 10)
- Z-index/elevation stack (Section 15)

**CI Check Requirements (Mandatory Sync & Enforcements):**
CI MUST fail when:
- the React Native theme implementation references an unknown token;
- a required Light/Dark token pair is incomplete;
- token values are out of sync with the theme module;
- deprecated tokens are used;
- defined text/background semantic pairs fail WCAG AA contrast requirements;
- interactive controls fail the required minimum touch-target size (44pt/48dp);
- any screen component imports a raw color value or arbitrary size value without a `// design-exception:` comment.

**Token Validation Tooling (Required):**
A token-sync script MUST be included in the CI pipeline that:
1. Reads the theme module and verifies every token name maps to a value defined in this file.
2. Verifies every Light/Dark token pair is complete (no orphaned light-only or dark-only tokens).
3. Verifies no deprecated token names appear anywhere in the codebase.
4. Verifies all semantic text/background pairs meet WCAG AA contrast (4.5:1 for normal text).
5. Verifies all interactive control sizes meet the minimum 44pt/48dp touch target.

This script runs on every PR and blocks merge on failure.

---

## 20. Premium Native Micro-Interactions (The WOW Factor)

To ensure the application feels like a world-class, premium native app, **every developer and AI agent MUST adhere to these interaction details:**

1. **Universal Micro-Animations:** Use the motion tokens (Section 7) universally. Press states should scale down slightly (`press-scale = 0.96`). Bottom sheets must slide in smoothly. **Reduced-Motion Compliance:** Always respect the OS-level reduced-motion preference as strictly outlined in Section 7. Remove non-essential motion and never use animation as the sole indicator of a state change.
2. **Haptic Feedback:** Pair visual feedback with tactile feedback.
   - **Light Impact:** Minor UI changes (switches, dropdown toggles, pulling to refresh).
   - **Success Notification:** Completing a wizard, saving a form, processing payment.
   - **Error Notification:** Destructive actions, or when validation fails.
3. **Custom Scroll/Pull-to-Refresh:** Use native refresh controls tinted with the `primary` token.

---

## 21. Platform Convention Guidance (iOS & Android)

Mobile users expect familiar native behavior. UI that ignores platform conventions feels foreign and reduces trust. The following platform-specific behaviors MUST be respected:

### Navigation
| Convention | iOS | Android |
|---|---|---|
| Back navigation | Swipe-right gesture (native stack) + back button in nav bar | Hardware/software back button + swipe-right |
| Gesture navigation | Always use `react-navigation` native stack — never block gestures | Back handler MUST be wired for Android hardware back button |
| Confirmation before back | Show a bottom sheet confirmation when the user tries to go back from a dirty (unsaved) form | Same behavior |

### Safe Area & Status Bar
- Status bar style MUST be set per-screen using `expo-status-bar` or `react-native`'s `StatusBar`. Never hardcode a single global style.
- Full-screen modals MUST account for top safe area inset.
- Bottom tab bars MUST account for home indicator safe area.
- Use `react-native-safe-area-context` `<SafeAreaView>` at screen roots. Never hardcode inset values.

### Bottom Sheets & Action Sheets
- Use bottom sheets (slide-up panels) for contextual actions, not full modals. Bottom sheets feel native on both platforms.
- Use `@gorhom/bottom-sheet` or the project-approved equivalent — never build a custom bottom-sheet from scratch without documented approval.
- iOS: Action sheets for simple choices (3 or fewer options). Bottom sheet for richer content.
- Android: Bottom sheets for all contextual selection.

### Date & Time Pickers
- Use platform-native date/time pickers via `@react-native-community/datetimepicker` or `expo-date-picker`.
- Never use a custom HTML-style date picker in a native mobile context.
- Present date pickers in a bottom sheet on Android (system default) and as an inline or modal picker on iOS (context-dependent).

### Haptics
- Pair significant UI state changes with appropriate haptic feedback (`expo-haptics`):
  - `Haptics.impactAsync(ImpactFeedbackStyle.Light)` — minor UI interactions (tab switch, toggle)
  - `Haptics.notificationAsync(NotificationFeedbackType.Success)` — form submit, payment success
  - `Haptics.notificationAsync(NotificationFeedbackType.Error)` — validation failure, destructive action
- Never trigger haptics for purely visual/decorative events.

### Permissions Prompts
- Always request permissions with `expo-permissions` or the platform-specific APIs at the time of use, never at app launch.
- Always provide a clear in-app explanation of WHY the permission is needed before the system dialog appears.
- Handle denied permissions gracefully: show an informational UI with a link to Settings — never crash or show a blank screen.

### Icons
- Use `@expo/vector-icons` (or the project-approved icon library) with consistent size tokens from Section 5B.
- Never mix icon families within the same screen.
- iOS uses SF Symbols conventions for system-level actions (share, compose). Android uses Material Design icon conventions for system-level actions.
- Always pair icon-only controls with `accessibilityLabel`.

---

## DEFINITION OF DONE — Mobile UI/UX Release Checklist

A feature screen or component is NOT considered release-ready until ALL applicable items below are checked.

### Functional Completeness
- [ ] All documented user flows work end-to-end
- [ ] All form validations and error states trigger correctly
- [ ] All API-driven data renders from real fixture or backend response
- [ ] All mutations show correct success/error feedback

### State Coverage (Section 13 — Async / Content UI States)
- [ ] **Loading / skeleton:** Mimics exact layout of real content (never full-screen spinner)
- [ ] **Empty state:** `[Feature]EmptyState` with icon, message, and CTA where applicable
- [ ] **Error state:** `[Feature]ErrorFallback` with retry button and non-technical message
- [ ] **Permission denied:** `[Feature]PermissionDenied` with clear explanation
- [ ] **Offline:** Non-blocking banner (if feature declares offline support)

### Accessibility (Section 1C)
- [ ] All interactive elements have meaningful `accessibilityLabel`
- [ ] `accessibilityRole` set correctly on all interactive controls
- [ ] `accessibilityState` reflects current state (disabled, selected, busy)
- [ ] Logical traversal order matches visual reading order
- [ ] All touch targets ≥ 44pt (iOS) / 48dp (Android)
- [ ] `hitSlop` applied where visual size is smaller than minimum touch target
- [ ] Dynamic Type tested at largest accessibility size (both platforms)
- [ ] Reduced-motion behavior verified (non-animated equivalents work)
- [ ] Error/success states announced via `accessibilityLiveRegion`
- [ ] Color is never the sole state differentiator (text/icon pairing)

### Design System Compliance
- [ ] No raw hex/RGB/arbitrary values in any component (Section 1 — Global Token Rule)
- [ ] All runtime-derived exceptions documented with `// design-exception: <reason>`
- [ ] Typography uses token values from Section 3 (exact numeric `fontSize`, `lineHeight`, etc.)
- [ ] All animations use motion token durations from Section 7
- [ ] Reduced-motion guards applied to all non-essential animations (Section 7)
- [ ] Touch targets meet Section 6 minimums
- [ ] Z-index uses named tokens from Section 15

### Platform Conventions (Section 21)
- [ ] Back navigation works correctly on both iOS (swipe) and Android (hardware back)
- [ ] Safe area insets handled at screen root via `SafeAreaView`
- [ ] Status bar style set per-screen
- [ ] Platform-native date/time pickers used
- [ ] Haptic feedback paired with significant state changes
- [ ] Permission prompts requested at time of use with in-app explanation

### Security & Permissions
- [ ] Sensitive data masked per Section 16 rules
- [ ] No PII in error monitoring payloads
- [ ] Frontend permission checks are UX controls only — server-side auth enforced for all protected operations

### Token Sync & CI
- [ ] Token-sync CI script passes (no unknown tokens, no missing dark/light pairs)
- [ ] All semantic text/background pairs pass WCAG AA contrast check
- [ ] All interactive controls pass minimum touch-target size check

### Tests
- [ ] Unit tests for all business logic in hooks and utilities
- [ ] Reduced-motion behavior tested programmatically
- [ ] Accessibility props verified in component tests
- [ ] E2E tests for critical flows (login, CRUD, permissions)

### Documentation
- [ ] `[featureName]_theme_contract.md` lists all consumed tokens
- [ ] `[featureName]_features.md` updated for any flow, API, or permission change
- [ ] Runtime exceptions documented with `// design-exception:` comments
