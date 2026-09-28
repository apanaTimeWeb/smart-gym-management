# Mobile Theme Contract

> This is the canonical theme contract for the React Native application. It implements the exact tokens defined in `MOBILE_UI_UX_DESIGN.md`. Empty sections are forbidden.

## 1. Color Tokens

| Token | Light | Dark |
|---|---|---|
| `primary` | `#4F46E5` | `#4F46E5` |
| `on-primary` | `#FFFFFF` | `#FFFFFF` |
| `destructive` | `#EF4444` | `#DC2626` |
| `on-destructive` | `#FFFFFF` | `#FFFFFF` |
| `muted` | `#71717A` | `#A1A1AA` |
| `on-muted` | `#FFFFFF` | `#18181B` |
| `background` | `#FFFFFF` | `#09090B` |
| `card` | `#F4F4F5` | `#18181B` |
| `border` | `#E4E4E7` | `#27272A` |
| `foreground` | `#09090B` | `#FAFAFA` |
| `focus-ring` | `#6366F1` | `#818CF8` |
| `skeleton-base` | `#E4E4E7` | `#27272A` |
| `skeleton-highlight` | `#F4F4F5` | `#3F3F46` |

## 2. Status Colors

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

## 3. Payment Mode Color Tokens

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

## 4. Chart Palette

| Token | Light | Dark |
|---|---|---|
| `chart-primary` | `#4F46E5` | `#6366F1` |
| `chart-success` | `#10B981` | `#22C55E` |
| `chart-warning` | `#F59E0B` | `#F59E0B` |
| `chart-danger` | `#EF4444` | `#EF4444` |
| `chart-secondary`| `#DB2777` | `#EC4899` |
| `chart-info` | `#0891B2` | `#06B6D4` |

## 5. Spacing Tokens

| Token | Value (dp) | Usage |
|---|---|---|
| `spacing-xs` | 4 | Between icon and text |
| `spacing-sm` | 8 | Between stacked list items |
| `spacing-md` | 16 | Default screen padding, card padding |
| `spacing-lg` | 24 | Between major screen sections |
| `spacing-xl` | 32 | Bottom sheet bottom padding |
| `spacing-2xl` | 48 | Empty state top margin |

## 6. Typography Tokens

| Token | Font Size | Font Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `heading-1` | 32 | 700 (Bold) | 40 | -0.02em |
| `heading-2` | 24 | 700 (Bold) | 32 | -0.01em |
| `heading-3` | 20 | 600 (Semibold) | 28 | 0 |
| `body-lg` | 18 | 400 (Regular) | 26 | 0 |
| `body-base` | 16 | 400 (Regular) | 24 | 0 |
| `body-sm` | 14 | 400 (Regular) | 20 | 0 |
| `caption` | 12 | 500 (Medium) | 16 | 0.01em |
| `label` | 10 | 600 (Semibold) | 12 | 0.02em |

## 7. Border Radius Tokens

| Token | Value (dp) | Usage |
|---|---|---|
| `radius-sm` | 4 | Checkboxes, small tags |
| `radius-md` | 8 | Buttons, text inputs |
| `radius-lg` | 12 | Cards, list containers |
| `radius-xl` | 16 | Bottom sheets, dialogs |
| `radius-full` | 9999 | Avatars, icon buttons |

## 8. Shadow / Elevation Tokens

| Level | Effect (iOS-style shadow) | Effect (Android-style elevation) |
|---|---|---|
| `shadow-sm` | opacity 0.05, radius 2 | elevation 1 |
| `shadow-md` | opacity 0.1, radius 6 | elevation 3 |
| `shadow-lg` | opacity 0.15, radius 12 | elevation 8 |

## 9. Icon Tokens

`icon-stroke-default = 1.75`

Icon sizes:
`icon-sm (16)`, `icon-md (20)`, `icon-lg (24)`

## 10. Layout Tokens

`button-min-width = 120`

## 11. Touch Target Tokens

| Token | Minimum Size (dp) | Rule |
|---|---|---|
| `touch-target-min` | 44 | Every interactive element must be at least 44x44. |

## 12. Z-Index / Elevation Layer Tokens

Layering is controlled by named `zIndex` tokens. Android elevation is defined separately by the shadow/elevation token system.

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

## 13. Motion / Duration Tokens

| Token | Duration (ms) | Usage |
|---|---|---|
| `duration-fast` | 150 | Hover, press, small color transitions |
| `duration-normal`| 250 | Modal entrance, bottom sheet slide |
| `duration-slow` | 400 | Complex structural layout shifts |

## 14. Opacity Tokens

| Token | Value | Usage |
|---|---|---|
| `opacity-disabled` | 0.5 | Disabled buttons, disabled text |
| `opacity-overlay` | 0.6 | Modal backdrop, bottom sheet backdrop |
| `opacity-loading` | 0.7 | Loading button state |
