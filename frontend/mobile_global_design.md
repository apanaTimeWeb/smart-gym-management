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
