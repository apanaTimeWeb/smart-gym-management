# 🎨 SMART GYM 360 — GLOBAL DESIGN SYSTEM

## PLATFORM APPLICABILITY MATRIX

This document governs the **web frontend only** (Next.js / React / Tailwind). Rules reference web-specific technologies such as semantic HTML, Tailwind CSS, `prefers-reduced-motion` media queries, and CSS variables.

| Rule Area | Web (Next.js) | Mobile (React Native) | Shared / Both |
|---|---|---|---|
| Semantic HTML, Tailwind classes, CSS variables | ✅ | ❌ | — |
| Color tokens and semantic naming | ✅ | ✅ (see MOBILE_UI_UX_DESIGN.md) | ✅ |
| Accessibility (WCAG 2.2 AA) | ✅ | ✅ (via AccessibilityInfo) | ✅ |
| Responsive breakpoints (mobile/tablet/desktop) | ✅ | ❌ (React Native uses Flexbox) | — |
| Dark/Light mode via CSS variables | ✅ | ❌ (RN uses theme context) | — |
| Status/payment/chart token palette | ✅ | ✅ | ✅ |
| `prefers-reduced-motion` via Tailwind `motion-safe:` | ✅ | ❌ (RN uses AccessibilityInfo) | — |
| Typography scale and font loading | ✅ (`next/font`) | ❌ (RN uses native fonts) | — |
| CTA gradient restriction (ERP dashboard) | ✅ | ✅ | ✅ |

**Conflict Resolution Hierarchy:** When rules in this document conflict with each other or with other documents, resolve using this precedence order (highest to lowest):
1. **Security & Privacy** — authentication, authorization, PII handling
2. **Legal / Compliance** — WCAG 2.2 AA, data protection requirements
3. **Accessibility** — WCAG, keyboard navigation, screen-reader support
4. **Platform Conventions** — browser/OS expected behavior
5. **Product Requirements** — documented business feature needs
6. **Architecture Rules** — isolation, naming, state management
7. **Visual Preferences** — colors, spacing, micro-animations

Deviations from this hierarchy MUST be documented in the affected module's `[moduleName]_features.md`.

---

This document defines the application's global visual language, semantic theme tokens, interaction patterns, accessibility visual rules, responsive visual rules, and zero-business UI conventions.

This document is NOT intended to be copied wholesale into every feature-module prompt.

Feature modules consume the global design system through semantic theme tokens and approved zero-business UI primitives.

Every feature module must maintain its own `[moduleName]_theme_contract.md` describing the exact global theme tokens it consumes.

### Specific Restrictions (The ERP Context)
- **Dashboard Consistency:** The ERP relies on the 5-color core architecture (Gold Primary, Blue Info, Green Success, Amber Warning, Red Danger).
- **CTA Gradients (Restricted):** Aggressive gradients are **strictly restricted** to Landing Page hero CTAs. They must NEVER be used inside the authenticated ERP dashboard.
- **External Brand / Integration Colors:** Official brand colors for social integrations (WhatsApp, Facebook, YouTube, Instagram) MUST be preserved in their native colors. Do not tint or re-color them to match the ERP theme. Do not make them part of the configurable ERP theme.

### Semantic Token Naming Rules
Ensure semantic token naming is internally consistent:
- `bg-primary` → primary background token
- `text-primary` → primary text token
- `bg-success` → success background token
- `text-success` → success text token
- `bg-danger` → danger background token
- `text-danger` → danger text token
Document the mapping clearly so an AI cannot confuse `--primary` with `--text-primary`.

---

## DESIGN SYSTEM OWNERSHIP BOUNDARY

### GLOBAL DESIGN SYSTEM owns:
- Semantic color tokens, Surface/elevation tokens, Typography, Radius scale
- Spacing/breakpoint visual rules, Focus-ring visual rules, Motion visual rules
- Button/card/table/form/dialog visual patterns
- Global responsive visual patterns and accessibility visual conventions
- Global shell geometry/presentation and zero-business UI primitive styling
- Approved visual treatment for charts, drag/drop, tooltips, toasts, loading, empty and error states

### ROLE CONTAINER owns:
- Role-specific sidebar/navigation items, grouping, shell labels
- Role-specific business page visibility and business context

### FEATURE MODULE owns:
- Business statuses and status-to-semantic-color mapping
- Feature-specific icons, static UI constants, labels and configuration
- API/server data, module state, tests, MSW fixtures/handlers, feature behavior

### MODULE THEME CONTRACT owns:
- The exact list of global semantic tokens required by the module
- Any explicitly justified feature-local visual token

### GLOBAL DESIGN MUST NOT own:
- Business navigation configuration
- Business status registry
- Page-by-page business icon configuration
- Member/plan/payment/etc. business data
- Feature API behavior, specific constants, or business feature logic

> **CRITICAL WARNING TO AI AGENTS (COMPONENT ISOLATION):**
> Do NOT create or move "business-aware" components (e.g., Date Filters with "Last 3 Months" presets, Status Badges with hardcoded "Active" text) into global folders like `src/components/ui/` just to avoid code duplication. 
> Global design/UI folders are STRICTLY for zero-business, dumb primitives. Business components MUST be duplicated per feature.

---

## 1. COLOR PALETTE

*Note: For v1, the system defaults to Dark Mode. Light mode values are provided below for future-proofing and consistency.*

### Core Surface Tokens (The "Luxury Premium Gold" Theme)
| Token | Dark Mode (Default) | Light Mode | Usage |
|---|---|---|---|
| `--primary` | `#FACC15` (Premium Gold) | `#EAB308` | Primary buttons, active nav item, links |
| `--primary-hover` | `#EAB308` (Yellow-500) | `#CA8A04` | Primary button hover state |
| `--primary-subtle` | `rgba(250, 204, 21, 0.15)` | `#FEF9C3` | Soft badge backgrounds, selected row highlight |
| `--bg-page` | `#050505` (Soft Black) | `#F4F4F5` | Main page background |
| `--bg-card` | `#111111` (Elevated Dark) | `#FFFFFF` | Card, panel, table background |
| `--bg-sidebar` | `#050505` (Soft Black) | `#FAFAFA` | Sidebar background |
| `--bg-header` | `#111111` (Elevated Dark) | `#FFFFFF` | Top header background |
| `--bg-header-translucent` | `rgba(17, 17, 17, 0.8)` | `rgba(255, 255, 255, 0.8)` | Sticky header with blur |
| `--bg-input` | `#1A1A1A` (Deep Gray) | `#FFFFFF` | Input field background |
| `--bg-floating` | `#1A1A1A` | `#FFFFFF` | Inputs, code blocks, floating surfaces |
| `--bg-overlay` | `#242424` | `#FAFAFA` | Modals, dialogs, drawers |
| `--bg-popover` | `#2E2E2E` | `#F4F4F5` | Dropdowns, tooltips, command palette |
| `--surface-hover` | `rgba(250,204,21,0.08)` | `rgba(234,179,8,0.08)` | Table row hover, subtle interactive areas |
| `--surface-highlight`| `rgba(250,204,21,0.05)` | `rgba(234,179,8,0.05)` | Table header backgrounds |
| `--surface-zebra` | `#141414` | `#FAFAFA` | Alternating table rows |
| `--overlay-backdrop` | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.6)` | Modal/drawer background dims |
| `--focus-ring` | `#FACC15` | `#A16207` | Focus ring color |
| `--border` | `#27272A` (Zinc-800) | `#E4E4E7` | Card borders, table dividers, input borders |
| `--border-focus` | `#FACC15` | `#A16207` | Input border on focus |
| `--text-primary` | `#FFFFFF` | `#000000` | All primary text, headings, table values |
| `--text-secondary` | `#A1A1AA` | `#52525B` | Labels, captions, placeholder text |
| `--text-disabled` | `#52525B` | `#A1A1AA` | Disabled states |
| `--text-on-primary` | `#111111` | `#111111` | Text on primary buttons |
| `--text-on-danger` | `#FFFFFF` | `#FFFFFF` | Text on danger actions |
| `--text-on-warning` | `#111111` | `#111111` | Text on warning states |
| `--text-on-success` | `#FFFFFF` | `#FFFFFF` | Text on success states |
| `--text-on-info` | `#FFFFFF` | `#FFFFFF` | Text on info states |
| `--skeleton-base` | `#111111` | `#E4E4E7` | Loading skeleton base color |
| `--skeleton-highlight`| `#1A1A1A` | `#F4F4F5` | Loading skeleton shimmer highlight |

### Status Tokens (Separated Text & Background)
| Token | Dark Mode (Default) | Light Mode |
|---|---|---|
| `--success` | `#15803D` | `#047857` |
| `--warning` | `#F59E0B` | `#F59E0B` |
| `--danger` | `#B91C1C` | `#B91C1C` |
| `--info` | `#1D4ED8` | `#1D4ED8` |
| `--success-text` | `#4ADE80` | `#065F46` |
| `--success-bg` | `#064E3B` | `#D1FAE5` |
| `--warning-text` | `#FBBF24` | `#92400E` |
| `--warning-bg` | `#451A03` | `#FEF3C7` |
| `--danger-text` | `#F87171` | `#991B1B` |
| `--danger-bg` | `#450A0A` | `#FEE2E2` |
| `--info-text` | `#60A5FA` | `#1E40AF` |
| `--info-bg` | `#172554` | `#DBEAFE` |
| `--purple-text` | `#D8B4FE` | `#7E22CE` |
| `--purple-bg` | `#3B0764` | `#EDE9FE` |

### Payment Mode Tokens
| Token | Dark Mode (Default) | Light Mode |
|---|---|---|
| `--pay-cash-text` | `#5EEAD4` (Teal) | `#0F766E` |
| `--pay-cash-bg` | `#134E4A` | `#CCFBF1` |
| `--pay-upi-text` | `#67E8F9` (Cyan) | `#0E7490` |
| `--pay-upi-bg` | `#164E63` | `#CFFAFE` |
| `--pay-card-text` | `#CBD5E1` (Slate)| `#334155` |
| `--pay-card-bg` | `#1E293B` | `#F1F5F9` |
| `--pay-bank-text` | `#7DD3FC` (Sky) | `#0369A1` |
| `--pay-bank-bg` | `#0C4A6E` | `#E0F2FE` |

### Chart Semantic Tokens (GAP-10 Fix — Values Now Defined)
| Token | Dark Mode Value | Light Mode Value | Usage |
|---|---|---|---|
| `--chart-primary` | `#FACC15` (Gold) | `#EAB308` | Primary series (e.g., Gold) |
| `--chart-success` | `#4ADE80` (Green) | `#16A34A` | Positive series (e.g., Green) |
| `--chart-danger` | `#F87171` (Red) | `#DC2626` | Negative series (e.g., Red) |
| `--chart-warning` | `#FBBF24` (Amber) | `#F59E0B` | Warning series (e.g., Amber) |
| `--chart-info` | `#60A5FA` (Blue) | `#2563EB` | Info series (e.g., Blue) |
| `--chart-secondary` | `#D8B4FE` (Purple) | `#7C3AED` | Secondary breakdown (e.g., Purple) |
| `--chart-grid` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.06)` | Gridlines |
| `--chart-tooltip-bg` | `#111111` (= `--bg-card`) | `#FFFFFF` (= `--bg-card`) | Tooltip backgrounds |

> **AI AGENT NOTE:** These tokens MUST be defined in `globals.css` and mapped in `@theme inline` exactly as specified in the canonical `globals.css` template in `WEB_FRONTEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md`.

### Semantic Shadows (GAP-11 Fix — Values Now Defined)
The design document defines token meaning. The canonical global theme stylesheet (`globals.css`) defines actual values. Components must consume semantic tokens and must never contain raw shadow colors when a semantic token exists.
| Token | Dark Mode Value | Light Mode Value | Usage |
|---|---|---|---|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.4)` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Subtle elevation for cards |
| `--shadow-popover` | `0 4px 16px rgba(0,0,0,0.5)` | `0 4px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)` | Pronounced elevation for dropdowns |
| `--shadow-dialog` | `0 20px 60px rgba(0,0,0,0.6)` | `0 20px 60px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.08)` | Deep elevation for modals |
| `--shadow-toast` | `0 8px 24px rgba(0,0,0,0.5)` | `0 8px 24px rgba(0,0,0,0.12)` | Floating toast shadows |



### Border Radius Scale
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Small elements, checkboxes |
| `--radius-md` | `8px` | Buttons, Inputs, standard elements |
| `--radius-lg` | `12px` | Cards, Panels, standard containers |
| `--radius-xl` | `16px` | Modals, large surface areas |
| `--radius-full`| `999px` | Status badges, circular avatars |

---

## 1A. THEME IMPLEMENTATION ARCHITECTURE (Centrally Changeable)

The design document clearly establishes this architecture:

Theme source of truth: `globals.css` (or the existing canonical global theme stylesheet)
```text
      ↓
```
Tailwind semantic token mapping (e.g. `@theme inline`)
```text
      ↓
```
Module JSX uses semantic Tailwind classes

### Token Canonical Source & CI Validation

The canonical machine-readable token source is `globals.css`. All tokens MUST flow through this exact chain:

```
globals.css (:root / .dark blocks)
  → tailwind.config.ts (@theme inline / extend.colors)
  → JSX semantic Tailwind classes (e.g. bg-card, text-primary)
```

**Token Drift Prevention (CI Required):**
CI MUST fail when any of the following drift conditions are detected:
- A Tailwind class references a CSS variable not defined in `globals.css`.
- A token exists in `globals.css` but is missing from the `tailwind.config.ts` mapping table.
- A token has a light-mode value but no corresponding dark-mode override in `.dark {}`.
- Any JSX file contains `bg-[var(--*)]`, `text-[var(--*)]`, or raw hex colors (enforced by ESLint `tailwindcss/no-arbitrary-value`).
- A deprecated token name is used anywhere in the codebase.

**Validation tooling:** Add a token-sync check to the pre-commit hook and CI pipeline that mechanically verifies the `globals.css` → `tailwind.config.ts` mapping is complete and in-sync.

**Examples of proper JSX styling:**
- `bg-page`, `bg-card`, `bg-header`, `bg-primary`, `bg-overlay`
- `text-primary`, `text-secondary`, `border-border`, `ring-primary`, `bg-success`

**Forbidden usages in JSX (NEVER use these):**
- `bg-[var(--bg-card)]`
- `text-[var(--text-primary)]`
- `border-[var(--border)]`
- `ring-[var(--primary)]`
- `bg-[#1A1A1A]` or `text-[#050505]`
- Raw RGBA values when a semantic token can represent them.

**CRITICAL RULE: No Opacity Modifiers on Semantic Backgrounds**
- **NEVER use opacity modifiers on semantic backgrounds.** 
  - ❌ `bg-success/10`, `bg-primary/20`, `hover:bg-warning/10`
  - ✅ `bg-success-bg`, `bg-primary-subtle`, `hover:bg-warning-bg`
Opacity variants like `/10` destroy dark mode compatibility and fail WCAG contrast requirements. Always use the explicit `-bg` or `-subtle` tailwind classes.

**CRITICAL RULE: Solid Background Contrast**
- If you use a **Solid Background** class (e.g. `bg-primary`, `bg-danger`, `bg-success`, `bg-warning`), you **MUST** pair it with the appropriate contrasting text color.
  - ✅ `<button className="bg-danger text-on-danger">`
  - ✅ `<span className="bg-success text-on-success">`
  - ❌ `<div className="bg-warning">...text inside...</div>` (Implicit fallback text color will fail contrast against solid amber/red/green).
- If you are building a wrapper, table row, or card, you likely want the **Subtle** variant instead (`bg-danger-bg`, `bg-warning-bg`), where default text colors are safe to use.

Use CSS variable references directly only where they belong in the canonical global CSS/theme implementation itself.

### Exact Semantic Token Mapping
To remove ambiguity for AI generation, Tailwind classes MUST map to these underlying canonical CSS variables:

| Tailwind Class | CSS Variable |
|---|---|
| `bg-primary` | `--primary` |
| `bg-primary-hover` | `--primary-hover` |
| `bg-primary-subtle` | `--primary-subtle` |
| `text-primary` | `--text-primary` |
| `text-secondary` | `--text-secondary` |
| `text-disabled` | `--text-disabled` |
| `text-on-primary` | `--text-on-primary` |
| `text-on-danger` | `--text-on-danger` |
| `text-on-success` | `--text-on-success` |
| `text-on-info` | `--text-on-info` |
| `bg-success` | `--success` (Solid) |
| `bg-success-bg` | `--success-bg` (Subtle) |
| `text-success` | `--success-text` |
| `bg-danger` | `--danger` (Solid) |
| `bg-danger-bg` | `--danger-bg` (Subtle) |
| `text-danger` | `--danger-text` |
| `bg-warning` | `--warning` (Solid) |
| `bg-warning-bg` | `--warning-bg` (Subtle) |
| `text-warning` | `--warning-text` |
| `bg-info` | `--info` (Solid) |
| `bg-info-bg` | `--info-bg` (Subtle) |
| `text-info` | `--info-text` |
| `bg-page` | `--bg-page` |
| `bg-card` | `--bg-card` |
| `bg-header` | `--bg-header` |
| `bg-header-translucent` | `--bg-header-translucent` |
| `bg-sidebar` | `--bg-sidebar` |
| `bg-input` | `--bg-input` |
| `bg-floating` | `--bg-floating` |
| `bg-overlay` | `--bg-overlay` |
| `bg-popover` | `--bg-popover` |
| `bg-skeleton-base` | `--skeleton-base` |
| `bg-skeleton-highlight` | `--skeleton-highlight` |
| `bg-surface-hover` | `--surface-hover` |
| `bg-surface-highlight` | `--surface-highlight` |
| `bg-surface-zebra` | `--surface-zebra` |
| `shadow-card` | `--shadow-card` |
| `shadow-popover` | `--shadow-popover` |
| `shadow-dialog` | `--shadow-dialog` |
| `shadow-toast` | `--shadow-toast` |
| `border-border` | `--border` |
| `border-focus` | `--border-focus` |
| `ring-primary` | `--focus-ring` |
| `bg-purple-bg` | `--purple-bg` (Subtle purple) |
| `text-purple` | `--purple-text` |
| `bg-pay-cash-bg` | `--pay-cash-bg` (GAP-9 Fix) |
| `text-pay-cash` | `--pay-cash-text` (GAP-9 Fix) |
| `bg-pay-upi-bg` | `--pay-upi-bg` (GAP-9 Fix) |
| `text-pay-upi` | `--pay-upi-text` (GAP-9 Fix) |
| `bg-pay-card-bg` | `--pay-card-bg` (GAP-9 Fix) |
| `text-pay-card` | `--pay-card-text` (GAP-9 Fix) |
| `bg-pay-bank-bg` | `--pay-bank-bg` (GAP-9 Fix) |
| `text-pay-bank` | `--pay-bank-text` (GAP-9 Fix) |

---

## 1.b LAYOUT & GEOMETRY TOKENS

| Token | Desktop Default | Usage |
|---|---|---|
| `--layout-header-height` | `64px` | Top nav height |
| `--layout-sidebar-width` | `240px` | Main sidebar |
| `--layout-sidebar-width-collapsed` | `60px` | Icon-only sidebar |
| `--layout-content-padding` | `24px` | Page wrapper |
| `--control-height` | `40px` | Visual control height |
| `--touch-target-min` | `44px` | Minimum interactive touch area |
| `--table-row-height` | `48px` | Standard table row |
| `--table-row-height-compact`| `32px` | Compact UI mode |
| `--modal-width` | `480px` | Desktop dialog constraint |
| `--drawer-width` | `480px` | Slide-in panels |

---

## 1.c TYPOGRAPHY TOKENS

| Token | Value |
|---|---|
| `--font-size-page-title` | `22px` |
| `--font-size-section-title`| `16px` |
| `--font-size-badge` | `11px` |
| `--font-size-kpi` | `28px` |
| `--font-size-table-header` | `12px` |
| `--font-size-body` | `14px` |
| `--font-size-caption` | `12px` |

---

## 2. TYPOGRAPHY

- **Font Family:** `Inter` (Implementation details for loading the font should follow the frontend architecture documentation, but the font family requirement is strict).
- **Base font-size:** 14px

| Role | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Page Title (H1) | `var(--font-size-page-title)` | 700 Bold | `--text-primary` | One per page, top-left |
| Section Heading (H2) | `var(--font-size-section-title)` | 600 SemiBold | `--text-primary` | Section titles inside cards |
| Card Label | `var(--font-size-badge)` | 500 Medium | `--text-secondary` | UPPERCASED stat card labels |
| Stat Number | `var(--font-size-kpi)` | 700 Bold | `--text-primary` | Big KPI numbers on dashboard cards |
| Table Header | `var(--font-size-table-header)` | 600 SemiBold | `--text-secondary` | UPPERCASED column headers |
| Table Cell | `var(--font-size-body)` | 400 Normal | `--text-primary` | Row data values |
| Button Text | `var(--font-size-body)` | 500 Medium | Varies | Primary button → `--text-on-primary`, Ghost button → `--text-primary`, Text link → `--primary` |
| Input Text | `var(--font-size-body)` | 400 Normal | `--text-primary` | User-typed values |
| Caption / Helper | `var(--font-size-caption)` | 400 Normal | `--text-secondary` | Below inputs, footnotes |
| Error Message | `var(--font-size-caption)` | 400 Normal | `--danger-text` | Below invalid input fields |
| Badge Text | `var(--font-size-badge)` | 600 SemiBold | Varies | Status pill labels |

---

## 3. APP SHELL LAYOUT

Every authenticated page uses this shell. Auth pages (`login`, `signup`, `forgot-password`, `reset-password`) do NOT use this shell.

```
┌──────────────────────────────────────────────────────────────────┐
│  TOP HEADER (height: var(--layout-header-height), position: fixed, top: 0, full-width)  │
│  [☰ Collapse] [📚 Smart Gym 360 Logo]  ··· [🏢 Branch Name ▼] [🔔 Bell (badge count)] [👤 Avatar + Name ▼]  │
├────────────────┬─────────────────────────────────────────────────┤
│  SIDEBAR       │  MAIN CONTENT AREA                              │
│  width: var(--layout-sidebar-width) │  margin-left: var(--layout-sidebar-width) │
│  (collapsible  │  padding: var(--layout-content-padding)         │
│   to var(--layout-sidebar-width-collapsed), │  margin-top: var(--layout-header-height) (below header) │
│   icon-only    │                                                 │
│   mode on      │  [Breadcrumb: Dashboard > Students > Profile]  │
│   toggle)      │  [Page Title (H1) + subtitle]                  │
│                │  [Action Bar: filters left + CTA buttons right] │
│  position:     │  [Page Content: table / form / grid / charts]  │
│  fixed, left:0 │                                                 │
│  bg: --bg-sidebar                                               │
│  border-right: │  *Note: Sidebar nav items scroll independently  │
│  1px --border  │  (overflow-y-auto), header/toggle stay pinned.* │
└────────────────┴─────────────────────────────────────────────────┘
```

### Sidebar Nav Groups & Items (in order)
Navigation structure is role-owned/application-owned configuration. Global design defines how navigation looks; it does not define which business pages exist.

Each nav item has: [Icon] Label · Active state = Gold left border + `--surface-hover` background + subtle gold glow (`box-shadow: 0 0 15px var(--surface-hover)`)

---

## 4. STATUS BADGE RULES (Universal — Apply to ALL pages)

> **CRITICAL ARCHITECTURE RULE:** Global design defines semantic status visual tokens only. Feature modules own their domain status mapping. The design system must NOT contain a single global business status registry.

Badges are small pill-shaped labels: `border-radius: var(--radius-full)`, `padding: 2px 10px`, `font-size: 11px`, `font-weight: 600`.

| Semantic Token | Example Usage by Feature |
|---|---|
| `--success-bg` + `--success-text` | Feature Status Active / Resolved / Paid |
| `--warning-bg` + `--warning-text` | Feature Status Pending / Expiring / Held |
| `--danger-bg` + `--danger-text` | Feature Status Suspended / Failed / Overdue |
| `--info-bg` + `--info-text` | Feature Status New / Neutral |
| `--purple-bg` + `--purple-text` | Custom Feature Tags (e.g., Alumni) |

*(Note: Payment Modes (Cash, UPI, Card, Bank) use `--pay-*` tokens mapped in Section 1 to avoid visual collision with statuses).*

---

## 5. REUSABLE COMPONENT PATTERNS

### 5a. KPI / Stat Card
- Size: roughly 200–260px wide, height ~120px
- Structure: Top-left icon (32px, in a rounded square with subtle color background) + label (UPPERCASE, 11px, `--text-secondary`) · Below: Big number (`var(--font-size-kpi)` bold, `--text-primary`) · Bottom: Trend line (positive trend → `--success-text`, negative trend → `--danger-text`)
- Background: `--bg-card`, border: `1px solid var(--border)`, border-radius: var(--radius-lg), shadow: `var(--shadow-card)`
- Arranged in a row of 3–5 cards at the top of dashboard/report pages

### 5b. Data Table
- Header row: `background: var(--surface-highlight)`, UPPERCASE 12px `--text-secondary`, sortable columns show ↑↓ arrows on hover
- Data rows: alternating subtle zebra stripe (`var(--bg-card)` / `var(--surface-zebra)`), `var(--table-row-height)` row height
- Row hover: `background: var(--surface-hover)`, subtle highlight
- Inline row actions (rightmost column): small icon buttons — ✏️ Edit, 🗑️ Delete — visible on hover, focus-within, and keyboard tab.
- Pagination bar (below table): "Showing 1–25 of 143 results" + Previous / Next buttons + rows-per-page selector (10 / 25 / 50)
- Empty state (no rows): Centered SVG illustration + "No [items] found" (16px, `--text-secondary`) + optional CTA button

### Table Accessibility and Interaction Rules

- Tables must preserve semantic HTML structure: `table`, `thead`, `tbody`, `th`, `td`.
- Sortable headers must expose current sorting state through accessible labels.
- Row-click navigation must not prevent keyboard users from reaching inline actions.
- Row actions must be keyboard accessible and visible on `focus-within`. On touch/mobile use always-visible actions or an accessible overflow menu.
- On mobile, choose one documented pattern:
  1. Horizontal scroll with frozen primary identifier, or
  2. Convert each record into an accessible card layout.
- Never hide essential financial, status, or permission information solely because of viewport size.

### 5c. Form Layout
- **Simple form** (≤6 fields): single column, centered card, max-width 560px
- **Complex form** (>6 fields): two-column grid inside a full-width card, grouped in labeled sections separated by a horizontal rule
- Each field: Label above (14px, `--text-secondary`, bold) → Input below → Helper/error text below input (12px)
- Required fields: Label has red asterisk `*`
- Input styling: `background: var(--bg-input)`, `border: 1px solid var(--border)`, border-radius: var(--radius-md), padding: 10px 14px, focus: `border-color: var(--border-focus)` + subtle glow using `--focus-ring`
- Form footer: Buttons right-aligned — Cancel (ghost) | Save/Submit (primary)

### Form Interaction States

Every form field must explicitly support:
- Default
- Hover
- Focus-visible
- Filled
- Validation error
- Validation success where meaningful
- Disabled
- Read-only
- Loading/submitting

Accessibility requirements:
- Every input must have a programmatically associated `<label>`.
- Error text must be connected through `aria-describedby`.
- Invalid fields must expose `aria-invalid="true"`.
- Required fields must be marked semantically, not only through color.
- Error messages must be announced accessibly where appropriate.

### 5d. Modal / Dialog
- Overlay: `background: var(--overlay-backdrop)`, centered, `z-40` (Tailwind class — see Section 12 Z-Index Scale)
- Modal card: `background: var(--bg-overlay)`, border-radius: var(--radius-xl), padding: 28px. Desktop/tablet: `width: var(--modal-width)`, `max-width: var(--modal-width)`. Mobile: `width: min(calc(100vw - 24px), var(--modal-width))`. Prevent horizontal overflow, respect safe-area insets, ensure footer actions remain reachable above mobile browser UI. Shadow: `var(--shadow-dialog)`
- Structure: Title (18px bold) + Description text + Content area + Footer buttons
- **Confirmation/Destructive modal:** Icon = ⚠️ (amber) or 🗑️ (red) · Description explains what will happen · Buttons: "Cancel" (ghost, left) + "Confirm" (danger red, right)
- **Form modal / Drawer:** Slide-in from right, full-height, has its own form + Save/Cancel footer. Desktop: `width: var(--drawer-width)`. Mobile: `width: 100vw` (max `var(--drawer-width)` on larger screens).

### 5e. Visual Grid / Matrix
- CSS Grid, auto-fill columns (8–10 per row depending on count)
- Each cell: 64×64px, rounded: var(--radius-md), colored by status (see badge rules above)
- Cell content: locker/equipment number centered (bold, 13px)
- Hover: scales up slightly (`motion-safe:scale-105`), shows tooltip popover (member name + batch + expiry)
- Empty cell (free): click → quick-assign action
- Occupied cell (red): click → opens owning feature's detail action

### 5f. Kanban Board
- Horizontal scrollable columns container
- Each column = a status lane: header with status badge + count · Cards stacked vertically below
- Card: `background: var(--bg-card)`, border-radius: var(--radius-lg), padding: 14px, border-left: 3px solid var(--border)
- Card content: Name (bold), Phone (masked: 98****2310), tag/badge for batch or date

### 5g. Wizard / Stepper
- Left panel: vertical step list numbered 01–05, active step in `--primary`, completed steps with ✅ checkmark
- Right panel: current step form content
- Top: progress bar (fills from 0% → 100% as steps complete)
- Footer: "← Back" ghost button (left) + "Next →" primary button (right)

### 5h. Timeline (for follow-ups, history logs)
- Vertical line on left (2px, `--border`)
- Each entry: colored dot on line + date (bold, `--text-secondary`) + content card to the right
- Newest entry at top
### 5i. Command Palette (Ctrl+K)
- **Overlay:** `background: var(--overlay-backdrop)`
- **Modal card:** Centered, top-aligned (margin-top: 10vh). Desktop `max-width: 600px`. Mobile `width: calc(100vw - 24px)`.
- **Content:** Large input field with magnifying glass icon `🔍 Search or jump to...`.
- **Results:** Grouped by category (e.g., Pages, Recent Records, Actions). Result area must be scrollable, touch targets must remain accessible. Keyboard navigation (up/down) applies when a hardware keyboard is available.
- **Trigger:** Global `Ctrl+K` listener on all pages.

### 5j. Confirmation Drawer (Not just Modal)
- **Usage:** For complex confirmations requiring data context (e.g., "You are about to refund ₹5,000. Here are the transaction details: [...]").
- **Layout:** Slide-in from the right side, full-height. Desktop: `max-width: var(--drawer-width)`. Mobile: `width: 100vw`. Respect safe-area insets, no horizontal overflow, ensure footer remains reachable.
- **Footer:** Cancel (ghost) | Confirm Action (danger or primary).

### 5k. Inline Editable Cell Pattern
- **Usage:** For rapid editing inside data tables without opening a modal.
- **Default State:** Text display with `truncate`.
- **Active State (On click):** Input field appears in-place with `--border-focus` ring.
- **Save (On blur/Enter):** Save changes and revert to text display.
- **Cancel (On Escape):** Revert without saving.
- **Loading:** Show a small spinner inside the cell while the API call is in flight.

---

## 6. FEEDBACK & STATE PATTERNS

### Toast Notifications
- Position: Bottom-right corner, fixed (bottom: `max(12px, env(safe-area-inset-bottom))`)
- Size: Desktop 320px wide. Mobile: `width: min(320px, calc(100vw - 24px))`, no horizontal overflow. Padding: 16px, border-radius: var(--radius-lg)
- ✅ Success: `--success-text` left border + "✅ [message]"
- ❌ Error: `--danger-text` left border + "❌ [message]"
- Auto-dismiss after 4 seconds with slide-out animation

### Loading State
- Show skeleton loaders (using `--skeleton-base` and `--skeleton-highlight`) that match the exact layout of the page content
- Tables: show 5–8 skeleton rows with deterministic varied widths (not purely random per render, to avoid layout shift thrashing)
- Stat cards: show shimmer blocks the size of the card

### Empty State
- Centered in the content area
- Simple SVG icon (related to the entity — e.g., 🎓 for students, 💳 for payments)
- Heading: "No [items] yet" (16px, `--text-secondary`)
- Subtext: "Get started by adding your first [item]" (13px, `--text-secondary`)
- CTA button: Primary button "➕ Add [item]" (if user has permission)

### Form Validation
- Validate on submit + on blur
- Error: red border on input (`border-color: var(--danger-text)`) + error message below (12px, `--danger-text`)
- Success: green border on input after valid value entered

### Confirmation Dialogs
Destructive and irreversible actions require an appropriate confirmation UI according to the application security/interaction rules.

---

## 7. BUTTON HIERARCHY RULES

| Type | Style | Usage |
|---|---|---|
| **Primary** | Solid `--primary` background, `--text-on-primary` text, border-radius: var(--radius-md), padding: 10px 20px | Main CTA per page (one per view) |
| **Danger Primary** | Solid `--danger` background, `--text-on-danger` text | Destructive confirm actions (Delete, Blacklist, Exit) |
| **Ghost / Outlined** | Transparent bg, `--border` border, `--text-primary` text | Secondary actions (Cancel, Export, Back) |
| **Ghost Danger** | Transparent bg, `--danger-text` border, `--danger-text` text | Soft destructive (Mark Lost, Deactivate) |
| **Icon Button** | Visual `32px` (icon `18px`), minimum interactive hit area `var(--touch-target-min)` | Inline table row actions (Edit ✏️, Delete 🗑️) |
| **Text Link** | No bg, no border, `--primary` text, underline on hover | Navigation links, "Forgot Password?", "Add Category" |
| **Segmented Control** | Joined button group, selected = `--primary` bg | Payment mode selector (Cash/UPI/Card), view toggles |

### Button Placement Rules
- **Page-level CTA** (e.g., "Add Student", "New Admission"): TOP-RIGHT of the action bar
- **Form submit** (e.g., "Save", "Confirm"): BOTTOM-RIGHT of the form card
- **Destructive** (e.g., "Delete", "Blacklist"): Always paired with "Cancel" ghost button to its LEFT
- **Inline row actions**: Rightmost column of data tables. Visibility rules:
  - hover-visible on pointer devices
  - focus-within-visible for keyboard
  - accessible without hover on touch/mobile
  - never hover-only.
- **Wizard "Next/Back"**: Footer of wizard step — Back (left ghost) | Next (right primary)

---

## 8. RESPONSIVE BEHAVIOR

| Breakpoint | Behavior |
|---|---|
| Desktop ≥1280px | Full sidebar (240px) + full content. Tables show all columns. |
| Tablet 768–1279px | Sidebar collapses to icon-only (60px). Tables scroll horizontally. |
| Mobile <768px | Sidebar hidden, accessible via hamburger menu drawer. Tables become card-stacks. Forms single-column. KPI cards use horizontal scroll or 2-col grid. Charts use reduced height & simplified legend. <br><br>**Narrow Viewport Rule:** The mobile layout MUST remain usable at narrow viewport widths including approximately 320px CSS width. No unintended horizontal overflow is permitted unless the component's documented interaction pattern explicitly requires horizontal scrolling. |

### Fluid Layout Requirements (Between Breakpoints)

Fixed-breakpoint-only specifications fail at intermediate viewport sizes. The following **fluid layout rules** apply across the full viewport range:

- **Flexible grids:** Use CSS Grid or Flexbox with `auto-fill` / `auto-fit` and `minmax()` values so columns reflow naturally, not only at exact breakpoints.
- **min/max widths:** All column and container components MUST define `min-width` and `max-width` where content could overflow or collapse at intermediate widths.
- **Wrapping rules:** Flex containers holding buttons, filter bars, or form groups MUST use `flex-wrap` or `flex-col sm:flex-row` to prevent elements from bleeding off screen at non-breakpoint widths.
- **Horizontal scroll prevention:** No unintended horizontal scroll is permitted at ANY viewport width (including 375px, 414px, 480px, 640px intermediate widths). Acceptable exception: documented horizontal-scroll data tables with `overflow-x-auto` and `min-width` applied.
- **Zoom compatibility:** All layouts MUST remain fully functional at 200% browser zoom without horizontal overflow or overlapping content.
- **Text scaling:** Layouts MUST accommodate browser font-size scaling (user-set base font up to 200%) — use `rem`-relative units where practical.

### Responsive Testing Requirements

Before a feature is considered complete, it MUST be verified at all of these conditions:

| Test | Width / Condition | Pass Criteria |
|---|---|---|
| Narrow mobile | 320px | No horizontal overflow, all actions reachable |
| Standard mobile | 375px | Card layouts readable, tables use card-stack |
| Large mobile | 414px | No layout regressions |
| Intermediate | 600px | Fluid layout holds, no broken wrapping |
| Tablet | 768px | Sidebar collapses, tables scroll |
| Large tablet | 1024px | Desktop patterns visible, sidebar icon-only |
| Desktop | 1280px+ | Full layout, all columns visible |
| 200% zoom | Any device | No horizontal scroll, no overlapping |
| Long text | n/a | Localized strings (up to 2× English length) don't break layout |
| Text scale 150% | Browser zoom | All text readable, no overflow |

### Mobile Sidebar / Drawer Requirements
- Focus trap while drawer is open.
- Escape closes drawer.
- Backdrop closes drawer.
- Body/page scroll locked while open.
- Drawer content independently scrollable.
- Close control minimum 44×44 touch target.
- Safe-area support.
- Focus restored to the hamburger trigger after close.

---

## 9. ICON DICTIONARY & STYLING (Elite SaaS Standard)

> **CRITICAL RULE:** Global design defines iconography standards and approved icon family. Feature and role modules own semantic page/action icon selection.

### 9a. Icon Styling Rules
To achieve Linear/Stripe-level premium feel, icons must be uniform:
- **Family:** Lucide React
- **Size:** `size={18}` (18px is the sweet spot; do not use 16px or 24px).
- **Weight:** `strokeWidth={2}` (Never mix 1.5 and 2).
- **Default State:** `--text-secondary`
- **Hover State:** `--text-primary`
- **Active State:** `--primary`

---

## 10. CHART STYLE GUIDE

Charts must follow the approved chart library and this visual token contract. The design document defines token meaning. The canonical global theme stylesheet (`globals.css`) defines actual values. Components must consume semantic tokens and must never contain raw chart colors when a semantic token exists. 

| Chart Type | Colors |
|---|---|
| Bar Chart (grouped) | Primary: `var(--chart-primary)` · Secondary: `var(--chart-secondary)` |
| Line Chart | Line: `var(--chart-success)` · Area fill using transparent equivalent |
| Pie / Donut Chart | Slice colors: `--chart-primary`, `--chart-success`, `--chart-warning`, `--chart-info`, `--chart-secondary`, `--chart-danger` (in that order) |
| Horizontal Bar | Single color: `var(--chart-primary)` |

All charts: theme-controlled chart surface background (`var(--bg-card)` — resolves per light/dark mode), `--text-secondary` axis labels, gridlines `var(--chart-grid)`, tooltips with `var(--chart-tooltip-bg)` matching the design system.

---

## 11. THEMING & DARK/LIGHT MODE

This design system intrinsically supports both Dark and Light modes using CSS variables. 
When building modules or components, **ALWAYS follow these rules** to ensure seamless theme switching:

1. **Never use hardcoded Tailwind colors** for backgrounds or text (e.g., `bg-white`, `bg-gray-900`, `text-black`, `text-white`). Primary button text must use the semantic `text-on-primary` token — never the hardcoded `text-white` class, as this prevents the theme from centralizing foreground color changes.
2. **The One Canonical Pattern for CSS Variables:** Define the variable in `globals.css` → map it as a named token in `tailwind.config.ts` → use the Tailwind class name in JSX (e.g., `bg-card`, `text-primary`). **Never use `bg-[var(--bg-card)]` or `bg-[#1A1A2E]` directly in JSX.** This is the single source of truth that resolves any ambiguity between Rule 4 and Rule 36 of the Frontend Instructions.
3. **Theme Provider**: Ensure the app is wrapped in a `ThemeProvider` (like `next-themes`) that toggles a `.dark` class on the `<html>` or `<body>` tag.
4. **CSS Setup**: In your global CSS file (e.g., `globals.css`), define the light mode variables inside `:root { ... }` and the dark mode variables inside `.dark { ... }`.
5. **Gradients & Shadows**: For gradients and shadows, use variables like `var(--primary)` instead of hardcoded hex/rgba. Note that shadows like `shadow-dialog` handle dark/light transitions centrally via their semantic definitions.

---

## 12. PREMIUM UI & MICRO-INTERACTIONS (The WOW Factor)

To ensure the application feels like a world-class, premium SaaS, **every developer and AI agent MUST adhere to these interaction details:**

1. **Universal Micro-Animations:** No interactive element should change state instantly. 
   - Apply `motion-safe:transition-all motion-safe:duration-base ease-in-out` universally to buttons, cards, list items, and dropdown items.
   - **Hover effects:** Cards should elevate (`motion-safe:hover:-translate-y-1`), and buttons should have subtle brightness changes.
   - **Active states:** Buttons should scale down slightly when clicked (`motion-safe:active:scale-95`).

2. **Glassmorphism & Depth (Z-Axis Elevation):**
   - **Sticky Headers:** Must not be solid flat colors. Use translucent backgrounds with blur (e.g., `bg-header-translucent backdrop-blur-md`).
   - **Modals, Tooltips, & Dropdowns:** Must use deep, soft shadows to create physical separation from the background (e.g., `shadow-dialog` or `shadow-popover`).

3. **Custom Premium Scrollbars:**
   - Default browser scrollbars destroy the premium aesthetic.
   - Implement custom thin scrollbars globally via CSS: `::-webkit-scrollbar { width: 6px; height: 6px; }`, with a rounded thumb (`background-color: var(--border)`) and a transparent track.

4. **Strict Z-Index Layering Scale:**
   Never use random `z-50` or `z-999` classes. Strictly follow this scale to prevent UI collision:
   - `z-10`: Sticky Table Headers & Sticky Action Bars
   - `z-20`: Top App Header (Navbar)
   - `z-30`: Popovers, Tooltips, & Dropdowns
   - `z-40`: Modal Overlays & Dialogs
   - `z-50`: Toast Notifications & Critical Alerts

---

## 13. ENTERPRISE UX SAFEGUARDS & ACCESSIBILITY

To guarantee stability, safety, and compliance in an ERP environment, these rules are mandatory:

### WCAG 2.2 AA — Mandatory Compliance Standard

All UI produced for this application MUST meet **WCAG 2.2 AA** at minimum. This is a non-negotiable compliance requirement, not a best-effort guideline. The following are the specific measurable targets:

| Requirement | Standard | Implementation |
|---|---|---|
| Text contrast (normal, <18px / <14px bold) | ≥ 4.5:1 | Verified by token pairs in Section 1 |
| Text contrast (large, ≥18px / ≥14px bold) | ≥ 3:1 | Verified by token pairs in Section 1 |
| UI component contrast (focus ring, input border) | ≥ 3:1 against adjacent colors | `--focus-ring` and `--border` tokens |
| Keyboard navigation | All interactive elements reachable via Tab | No mouse-only interactions |
| Visible focus indicator | Clearly visible on all interactive elements | `focus-visible:ring-2 focus-visible:ring-primary` |
| Screen-reader labels | All icon-only controls have accessible names | `aria-label`, `aria-labelledby`, or visible text |
| Error announcements | Form errors announced to assistive tech | `aria-describedby`, `aria-live` where needed |
| Zoom support | Layout usable at 200% browser zoom | No horizontal scroll at 200% zoom except documented tables |
| Reduced motion | Non-essential animations suppressed | `motion-safe:` prefix on all animations (Section 29) |
| Status by color alone | Color is never the only state differentiator | Always pair color with text, icon, or pattern |
| Touch target minimum | ≥ 44×44px for all interactive targets | `--touch-target-min: 44px` token |

**WCAG 2.2 New Success Criteria (beyond 2.1):**
- **2.5.3 Target Size (Minimum):** Interactive controls must be at least 24×24px; where smaller, sufficient spacing between targets is required.
- **3.2.6 Consistent Help:** Help mechanisms (if present) must appear in consistent locations.
- **2.4.11 Focus Not Obscured:** Keyboard focus indicator must not be entirely hidden by sticky headers or overlays.

> **AI AGENT NOTE:** When generating any interactive component, run this mental checklist: (1) Is it keyboard-reachable? (2) Does it have an accessible label? (3) Does it have a visible focus state? (4) Are errors announced? (5) Does it work at 200% zoom?

1. **Data Overflow Strategy — Content Resilience Policy:**
   - **The Problem:** Unpredictably long user inputs (e.g., a 100-character email) will stretch and break responsive table and card layouts. Blanket truncation can hide important data, fail on mobile/touch devices, and create inaccessible interactions.
   - **Apply the following strategy based on content importance:**

   | Content type | Preferred strategy |
   |---|---|
   | Non-critical supplemental text (e.g., description preview) | `truncate` with Tooltip |
   | Critical data visible in a constrained table cell | Responsive wrapping or multi-line `line-clamp-N` |
   | Long-form content (notes, addresses) | Expandable disclosure (`Show more / Show less`) |
   | Full values needed for user action (e.g., email to copy) | Provide access via detail view or full-value field |

   - **Truncation rules when used:**
     - Only truncate where loss of visible content is acceptable for the use case.
     - `truncate` on a table column is acceptable for low-criticality preview text; never acceptable for the primary identifier or an actionable value.
   - **Tooltip rules when used:**
     - Tooltips MUST be keyboard-accessible (visible on focus, not only on hover).
     - Tooltips MUST be announced by screen readers (use `aria-describedby` or accessible tooltip primitives).
     - Tooltips MUST NOT be the only way to access critical text on touch devices (touch has no hover).
     - A Tooltip is appropriate only when the truncated content is supplemental; for critical content, use a disclosure or detail view instead.

2. **Irreversible Action Safeguards ("Type-to-Confirm"):**
   - **The Problem:** Standard confirmation modals are too easy to accidentally click through for catastrophic actions (like "Delete Entire Branch" or "Purge Financial Records").
   - **The Rule:** For highly destructive and irreversible actions, the modal MUST require the user to manually type a confirmation phrase (e.g., `Please type "DELETE" to confirm`) into an input field before the Danger button is enabled.

3. **Enterprise Accessibility (WCAG Focus Rings):**
   - **The Problem:** Default browser focus outlines (when users navigate via the `Tab` key) are often inconsistent or invisible in dark mode, failing WCAG accessibility standards.
   - **The Rule:** Never rely on default outlines. All interactive elements (Inputs, Buttons, Links, Dropdown Items) MUST explicitly define a `focus-visible` state that matches the design system.
   - **Snippet:** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`

4. **Keyboard Navigation and Screen Reader Requirements:**
   - All interactive UI must be usable using keyboard only.
   - Use correct ARIA labels for icon-only buttons (e.g., `<button aria-label="Delete">🗑️</button>`).
   - Logical Tab order must follow visual reading order.
   - Focus must be managed explicitly when modals/drawers open and close.
5. **Mobile & Touch Guidelines:**
   - On touch-only devices, hover must never be required for functionality.
   - Hover-only information must have a touch/focus alternative.
   - Hover visual effects must not block or replace tap interaction.
6. **Keyboard Shortcuts Scope:**
   - Global keyboard shortcuts apply where a keyboard is available.
   - Never make keyboard shortcuts the only route to functionality. Touch users must have visible/touch-accessible alternatives.
   - Dialogs must trap focus, autofocus an appropriate element, and restore focus to the trigger on close.
   - Escape must close dismissible dialogs, popovers, and menus.
   - Icon-only buttons must have accessible labels.
   - Status colors must never be the only way to communicate meaning.
   - Respect `prefers-reduced-motion` for non-essential animation.
   - Minimum contrast must meet WCAG AA requirements.

---

## 14. PRINT & EXPORT STYLES
Enterprise ERP users print receipts, invoices, and reports constantly.
- **`@media print` rules:** Must hide the sidebar, header, action bars, and toast notifications.
- **Print typography:** Ensure black text on a pure white background (no dark themes in print mode).
- **Pattern:** Use a `PrintableWrapper` component for areas of the screen that should survive the print stylesheet.

## 15. GLOBAL KEYBOARD SHORTCUT MAP
Power users expect keyboard navigation. Respect these shortcuts universally:
- `Ctrl + K`: Global search/command palette
- `Esc`: Close any open modal, drawer, or dropdown
- `Ctrl + S`: Submit the active form
- `?`: Show a keyboard shortcut help overlay

## 16. NOTIFICATION & ALERT BANNER PATTERNS
Unlike toasts (which auto-dismiss), alert banners are persistent inline messages.
- **Placement:** Sits immediately below the top header, pushing page content down.
- **Usage:** "Your subscription expires in 3 days", "Branch is in maintenance mode".
- **Styles:** Use the background colors mapped in Section 1 (e.g., `--warning-bg` for expiring warnings) with a clear dismissal `X` icon (if dismissible).

## 17. DATA DENSITY MODES
Enterprise users have different preferences for how much data fits on a screen.
- **Compact Mode:** `var(--table-row-height-compact)` row height, smaller font (`var(--font-size-caption)`). Zebra striping is preserved. For power users managing 500+ records.
- **Comfortable Mode (Default):** `var(--table-row-height)` row height, standard `var(--font-size-body)` font.
- **Implementation:** A toggle in settings/header switches between these modes. Save preference using the application's approved persistence utility (see Frontend Rule 61).

## 18. RIGHT-CLICK CONTEXT MENU PATTERN
- **Usage:** On tables and Kanban cards, custom context menu for quick actions.
  - Desktop pointer: right-click
  - Touch: accessible overflow menu (...) or optional long-press
  - Right-click must never be the only way to reach actions.
- **Actions:** Must mirror the inline action column only: ✏️ Edit, 🗑️ Delete, 📋 Copy ID.
- **Styling:** Small dropdown menu with `shadow-popover` matching the Glassmorphism rules (`z-30`).

## 19. TOOLTIP DESIGN SPECIFICATION
- **Background:** `var(--bg-popover)` with `1px solid var(--border)`.
- **Typography:** `12px`, `var(--text-primary)`.
- **Layout:** `max-width: 240px`, word-wrap enabled.
- **Arrow:** Small triangle pointing to the trigger element.
- **Animation/Delay:** 300ms show delay, 100ms hide delay (prevents flicker on mouse-over).
- **Z-index:** `z-30`.
- **Accessibility:** Tooltips must be accessible via keyboard focus and provide appropriate touch/mobile alternatives, not just hover.

## 20. FORM FIELD DISABLED & READ-ONLY STATES
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`, background `--bg-input` (no change), no focus ring.
- **Read-only:** Full opacity, `cursor: default`, subtle `--border` dashed instead of solid, no focus ring.
- **Filled/Success:** `border-color: var(--success-text)` with a small checkmark icon inside the input.

## 21. NUMBER & CURRENCY FORMATTING RULES
- **Currency:** Format INR using the Indian Numbering System: `₹1,23,456.00`. Other currencies must use their approved locale-aware formatting.
- **Large Numbers (KPIs):** Abbreviate appropriately (e.g., `₹12.4L`, `₹2.3Cr` for INR).
- **Percentages:** Always 1 decimal place: `12.5%`.
- **Negative Numbers:** Red color (`--danger-text`) with minus sign: `-₹500`.
- **Implementation:** Use the application's approved number/currency formatting utility.

## 22. TABLE COLUMN WIDTH STRATEGY
- **ID/Reference Columns:** Fixed narrow width (`w-24`).
- **Name Columns:** Flexible, `min-width` set, `truncate` class mandatory.
- **Status Badge Columns:** Fixed width (`w-28`), center-aligned.
- **Date Columns:** Fixed width (`w-32`).
- **Amount/Number Columns:** Fixed width, right-aligned (standard accounting convention).
- **Action Columns:** Fixed narrow width (`w-20`), right-aligned, never truncated.

## 23. RESPONSIVE AND MOBILE INTERACTION POLICY
- Define standard breakpoints centrally and do not introduce arbitrary one-off breakpoints.
- Desktop-first ERP layouts must remain fully usable at tablet widths.
- Sidebars must collapse into a controlled drawer on smaller screens.
- Minimum interactive touch target: 44 × 44px where practical.
- Dense data tables must use the approved mobile table strategy.
- Sticky action bars must not obscure form fields or mobile browser controls.
- Test core workflows at mobile, tablet, and desktop widths before merge.

## 24. ASYNC UI STATE SYSTEM

Every data-driven feature must define all of the following:

1. Loading State
   - Use layout-matching skeletons.
   - Avoid full-page spinners except for very short transitional actions.

2. Empty State
   - Explain why the list is empty.
   - Offer a contextual action where the user has permission to create/import data.

3. Error State
   - Use a concise user-safe explanation.
   - Provide Retry when appropriate.
   - Never expose raw technical errors.

4. Permission-Denied State
   - Explain that access is restricted.
   - Do not show disabled destructive controls without explanation.
   - Provide a clear next step, such as contacting an administrator, where suitable.

5. Offline/Connection State
   - Show a non-blocking connection indicator for realtime/network-dependent features.

## 25. DRAG & DROP INTERACTION PATTERN
- **Visuals:** Drag & drop must follow the approved interaction and visual pattern.
- **Dragging Item State:** `opacity: 0.5`, `cursor: grabbing`, subtle scale up `motion-safe:scale-105`.
- **Valid Drop Target:** `border: 2px dashed var(--primary)`, background `var(--surface-hover)`.
- **Invalid Drop Target:** `border: 2px dashed var(--danger-text)`.
- **Animation:** After drop, use a smooth snap animation (`motion-safe:transition-transform motion-safe:duration-base ease`).

## 26. LOADING BUTTON STATE
- **Behavior:** When a button triggers an async action, it must transition to a loading state.
- **Visuals:** The button retains its width, the text is replaced (or shifted) by a small spinner icon (e.g., `Loader2` from lucide-react with `motion-safe:animate-spin`), and `disabled={true}` is applied.

## 27. MOBILE CARD-STACK TABLE PATTERN
- **Behavior:** On mobile (<768px), standard data tables must collapse into a vertically stacked list of cards.
- **Layout:** Each row becomes a card. The primary identifier (Name/ID) becomes the card title. Status badges align top-right. Other columns become `Label: Value` pairs stacked inside the card.
- **Actions:** Inline actions appear at the bottom of the card or via a `...` dropdown menu.

## 28. GLOBAL LOADING, EMPTY, & ERROR STATES
- **Top Routing Progress:** Color: `--primary`.
- **Skeleton Loading:** Skeletons use `bg-skeleton-base` and a pulsing `bg-skeleton-highlight` gradient. Never use a generic spinner for full-page loading; always use structural skeletons mimicking the layout (e.g., tables, grids).
- **Empty States:** When a list or table returns 0 results, do NOT show a blank screen or empty table body. Show an empty state component with:
  - A subtle relevant icon (e.g., a file icon for missing invoices).
  - A muted text description (e.g., "No invoices found for this period").
  - A primary call-to-action button (e.g., "Create Invoice") if the user has permission.
- **Error Boundaries:** The UI should match the app shell, display a non-technical error summary, and provide a primary "Try Again" button that calls `reset()`.
- **Not Found States:** 404 pages must be beautifully branded, offering a clear "Back to Dashboard" button instead of a generic browser error.

---

## 29. MOTION ACCESSIBILITY — `prefers-reduced-motion` Compliance (WCAG 2.2 Mandatory)
Users with vestibular disorders, epilepsy, or motion sensitivity configure their OS to signal `prefers-reduced-motion: reduce`. Ignoring reduced-motion preferences creates accessibility and potential compliance risk. **All animations and transitions in this design system MUST respect this preference.**

### The Rule
- **Never hardcode `transition`, `animation`, or `transform` directly in Tailwind utility classes or CSS without a motion-safe guard.**
- Use Tailwind's `motion-safe:` and `motion-reduce:` variants to conditionally apply motion:
  ```html
  <!-- ✅ CORRECT — Animation only plays if user hasn't requested reduced motion -->
  <div class="motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1">
    Card
  </div>

  <!-- ✅ CORRECT — Provide a static alternative for reduced-motion users -->
  <div class="motion-safe:animate-spin motion-reduce:hidden">
    <Loader2 />
  </div>
  ```

### Global CSS Implementation
Add this to `globals.css` as a global override that instantly disables all motion for users who request it:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Motion Token Scale
All animation durations MUST use these defined tokens — never arbitrary `duration-[350ms]` values:
| Token | Duration | Usage |
|---|---|---|
| `duration-fast` | `150ms` | Micro-interactions: button press, checkbox toggle |
| `duration-base` | `200ms` | Standard transitions: hover states, dropdown open |
| `duration-slow` | `300ms` | Page-level transitions: modal open, drawer slide |
| `duration-xslow` | `500ms` | Complex layout shifts: skeleton → content swap |

### What Must Be Motion-Safe Guarded
Every instance of the following in JSX/CSS MUST have a `motion-safe:` prefix:
- `hover:-translate-y-1` → `motion-safe:hover:-translate-y-1`
- `animate-pulse` (skeletons) → `motion-safe:animate-pulse`
- `animate-spin` (spinners) → `motion-safe:animate-spin`
- `transition-all duration-base` → `motion-safe:transition-all motion-safe:duration-base`
- CSS `@keyframes` animations in `globals.css` → wrap in `@media (prefers-reduced-motion: no-preference) { ... }`

---

## 30. DARK MODE SURFACE ELEVATION SCALE (Depth Without Shadows)
In light mode, `box-shadow` is the primary tool for conveying visual depth (cards elevated above the page, modals elevated above cards). In dark mode, **shadows become nearly invisible against dark backgrounds** and can create a "muddy" visual. The industry-standard solution (used by Material Design 3, Linear, Vercel) is **Surface Elevation** — using subtle brightness steps to convey depth.

### The Problem
Using `shadow-2xl` in dark mode produces little to no visible depth cue. An AI generating a modal with `shadow-2xl` in dark mode will create a flat, undifferentiated UI where cards, modals, and dropdowns all look like they're on the same plane.

### The Solution — Elevation Layer Scale
Each layer of depth gets a slightly brighter background. The base page is the darkest; overlays get progressively lighter:

| Layer | Token | Dark Value | Light Value | Used For |
|---|---|---|---|---|
| **0 — Page** | `--bg-page` | `#050505` | `#F4F4F5` | Root page background |
| **1 — Raised** | `--bg-card` | `#111111` | `#FFFFFF` | Cards, table, panels |
| **2 — Floating** | `--bg-floating` | `#1A1A1A` | `#FFFFFF` | Inputs, code blocks |
| **3 — Overlay** | `--bg-overlay` | `#242424` | `#FAFAFA` | Modals, dialogs, drawers |
| **4 — Popover** | `--bg-popover` | `#2E2E2E` | `#F4F4F5` | Dropdowns, tooltips, command palette |

### Implementation Rules
1. **Add `--bg-floating`, `--bg-overlay`, and `--bg-popover`** to your `globals.css` `:root` (light) and `.dark` blocks alongside the existing tokens.
2. **Map them in `tailwind.config.ts`** as `bg-floating`, `bg-overlay`, `bg-popover` tokens.
3. **Modals and Dialogs** must use `bg-overlay` (not `bg-card`) so they visually lift above the card layer behind them.
4. **Dropdowns and Tooltips** must use `bg-popover`.
5. **Combine with subtle borders:** In dark mode, elevation alone is often not enough. Always add `border-border` to floating elements to provide a crisp edge definition, especially on lower-brightness monitors.
6. **Shadow is still used for Light Mode** — In light mode where shadows work, modals should still use `shadow-dialog`. This is the dual strategy: elevation for dark, shadow for light.

### Updated Z-Index Scale (Cross-Referenced with Section 12)
The elevation scale works together with the z-index scale from Section 12, but they are conceptually separate (Z-index controls stacking; elevation controls surface brightness):
| Z-Index | Elevation Layer | Background Token |
|---|---|---|
| `z-10` | Sticky headers | `bg-card` (Layer 1) |
| `z-20` | App header | `bg-card` (Layer 1) |
| `z-30` | Dropdowns, Tooltips | `bg-popover` (Layer 4) |
| `z-40` | Modals, Dialogs, Drawers | `bg-overlay` (Layer 3) |
| `z-50` | Toast notifications | `bg-overlay` (Layer 3) |

---

## 31. MODULE THEME PORTABILITY CONTRACT

Each feature module MUST contain a theme contract document describing its exact visual dependencies.

`[moduleName]_theme_contract.md`

The file must list:
1. Required semantic color tokens
2. Required surface tokens
3. Required typography tokens if the module uses non-default typography
4. Required radius tokens
5. Required shadow tokens if applicable
6. Required motion tokens if applicable
7. Required chart tokens if applicable
8. Any justified feature-local visual tokens

**Rules:**
* No hardcoded hex colors in feature JSX.
* No arbitrary CSS-variable Tailwind classes.
* No feature-specific global token definitions.
* The module may consume global semantic tokens.
* If copied into another project, the receiving project must only need to satisfy this documented token contract plus approved zero-business UI infrastructure.

**Canonical Example: `src/app/frontend_superadmin/superadmin_plans/superadmin_plans_theme_contract.md`**

Theme tokens required:
* `--primary`, `--primary-hover`
* `--bg-page`, `--bg-card`, `--bg-input`
* `--border`, `--border-focus`
* `--text-primary`, `--text-secondary`
* `--success-text`, `--success-bg`
* `--danger-text`, `--danger-bg`
* `--radius-md`, `--radius-lg`
* `--focus-ring`

---

*END OF GLOBAL DESIGN SYSTEM — Feature modules reference this system through their theme contract; the complete document is not required as module repair context.*

---

## 32. LOCALIZATION & CONTENT DESIGN CONSTRAINTS

Hardcoded English copy and fixed-width labels cause layout failures and expensive rework when localization is introduced. All UI design decisions MUST account for localization from the start.

### String Externalization Rule
All user-facing strings — button labels, column headers, table empty-state messages, status labels, error messages, toast copy, placeholder text, validation messages, and aria-labels — MUST be externalized via the approved i18n layer (`next-intl`). No hardcoded English strings in JSX, except:
- Debug-only developer messages (never shown to end users)
- Backend `message` strings rendered directly as-is per Rule 14 of the Architecture doc

### Layout Design for Long Translated Strings

English is typically the shortest language. Designs MUST accommodate translated text that can be **40–100% longer** than the English source. Specific requirements:

| Component | Design Constraint |
|---|---|
| Buttons | Must use `min-width`, not fixed width. Text must wrap or button must grow. |
| Table headers | Must support truncation with tooltip for long translations. |
| Navigation labels | Sidebar nav items must accommodate up to 20 chars. |
| Status badges | Badge `padding` must be flexible — not pixel-locked. |
| KPI card labels | Must use `line-clamp` or flexible height for 2-line labels. |
| Form labels | Must allow label text to wrap — never crop form labels. |
| Toast messages | Max-width container, word-wrap enabled — backend messages render as-is. |

### Locale-Aware Formatting
- **Dates:** Always format via `date-fns` or `dayjs` with locale parameter — never hardcode `DD/MM/YYYY`.
- **Numbers:** Use `Intl.NumberFormat` with the app locale — Indian numbering system for INR (`₹1,23,456.00`).
- **Currency:** Use `[module]FormatCurrency()` utility per Architecture Rule 80.
- **Pluralization:** Use `next-intl` plural rules — never hardcode `"1 member"` / `"2 members"` logic in JSX.

### Right-to-Left Readiness
Although RTL is not the current primary requirement, designs MUST NOT use hardcoded `margin-left`, `padding-left`, `text-align: left`, or `float: left` in reusable components. Use logical CSS properties (`margin-inline-start`, `padding-inline-start`) or Tailwind logical variants (`ms-*`, `ps-*`) in shared primitives.

### Localization File Location
Per Architecture Rule 18: locale files MUST be co-located inside the feature module at `[moduleName]_locales/[moduleName]_{lang}.json`. Never create a central `src/messages/` directory.

---

## MOTION TOKEN SPECIFICATION (GAP-7 Fix — Values Now Defined)

Motion duration tokens were previously named but never assigned values. They are now fully specified:

| Token | CSS Variable | `@theme inline` Key | Value | Usage |
|---|---|---|---|---|
| `duration-fast` | `--animate-duration-fast` | `--animate-duration-fast` | `150ms` | Quick micro-feedback (button press, toggle) |
| `duration-base` | `--animate-duration-base` | `--animate-duration-base` | `200ms` | Standard transitions (hover, focus, card elevation) |
| `duration-slow` | `--animate-duration-slow` | `--animate-duration-slow` | `300ms` | Tooltip/popover reveal, sidebar collapse |
| `duration-xslow` | `--animate-duration-xslow` | `--animate-duration-xslow` | `500ms` | Page-level entry, skeleton reveal |

### Motion Token Usage Pattern
```tsx
// ✅ CORRECT — semantic duration token via Tailwind
className="transition-all duration-base ease-in-out"

// ✅ CORRECT — motion-safe prefix (MANDATORY for all transitions)
className="motion-safe:transition-all motion-safe:duration-base ease-in-out"

// ❌ FORBIDDEN — hardcoded duration
className="transition-all duration-200"
```

> **AI AGENT NOTE:** ALL transition/animation class names MUST be prefixed with `motion-safe:`. This ensures they are disabled automatically when the user has `prefers-reduced-motion: reduce` set — no manual `@media` query needed. The `@media (prefers-reduced-motion: reduce)` override in `globals.css` is a safety net, not the primary mechanism.

---

## SKELETON ANIMATION PATTERN (GAP-7 Supplement)

Skeleton loading states MUST use these token-based patterns:

```tsx
// ✅ CORRECT — skeleton that respects design tokens and reduced motion
className="bg-skeleton-base rounded-radius-md motion-safe:animate-pulse"
```

```css
/* In globals.css — already defined */
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

---

## PURPLE TOKEN SPECIFICATION (GAP-8 Fix — Values Now Defined)

Purple tokens were listed in the payment section but never fully specified. They are used for premium plans, VIP members, and specialized status badges:

| Token | Dark Mode Value | Light Mode Value | Usage |
|---|---|---|---|
| `--purple-text` | `#D8B4FE` | `#7E22CE` | Purple foreground text (Premium label) |
| `--purple-bg` | `#3B0764` | `#EDE9FE` | Purple subtle background (Premium badge) |

### Tailwind Classes
| Tailwind Class | Maps to | Usage |
|---|---|---|
| `text-purple` | `--purple-text` | Badge text, label |
| `bg-purple-bg` | `--purple-bg` | Badge background |

Usage pattern:
```tsx
// ✅ CORRECT
<span className="text-purple bg-purple-bg px-2 py-0.5 rounded-full text-xs font-medium">
  Premium
</span>
```

---

## LOCALE/I18N FILE NAMING RULES (GAP-5 Fix)

The project uses `next-intl` for internationalization.

### Locale File Location
Per Architecture Rule 18, locales MUST be co-located inside the feature module, NEVER in a central `src/messages/` or `src/locales/` directory.

```text
src/app/(admin)/admin-members/_locales/
    ├── admin_members_en.json    ← English (default)
    ├── admin_members_hi.json    ← Hindi (optional)
    └── [moduleName]_[lang].json ← Pattern for future locales
```

### Feature Translation Key Naming
Translation keys MUST follow this pattern:
```
{role}.{module}.{section}.{key}
```

Example:
```json
{
  "manager": {
    "members": {
      "table": {
        "columns": {
          "name": "Name",
          "status": "Status",
          "joinDate": "Join Date"
        }
      },
      "add": {
        "title": "Add Member",
        "submit": "Add Member"
      }
    }
  }
}
```

### Rules
1. NEVER hardcode UI text strings directly in JSX — use `t('key')` from `next-intl`.
2. Backend `message` responses (Rule 14) are displayed as-is — do NOT pass them through the i18n system.
3. Locale detection is done globally via `next-intl` middleware — do NOT implement per-module locale detection.
4. The default locale is `en` (English) — all keys must exist in `en.json` before any other locale can add them.

---

*END OF GLOBAL DESIGN SYSTEM — Feature modules reference this system through their theme contract; the complete document is not required as module repair context.*

---

## DEFINITION OF DONE — Web UI/UX Release Checklist

A feature screen or component is NOT considered release-ready until ALL applicable items below are checked. This checklist is the final acceptance gate for AI-generated UI work.

### Functional Completeness
- [ ] All documented user flows work end-to-end (no placeholder `onClick` handlers)
- [ ] All form validations work client-side and display server errors correctly
- [ ] All mutations show correct success/error feedback via toast
- [ ] All API-driven data renders from real MSW fixture or backend response

### State Coverage (Section 24 — Async UI State System)
- [ ] **Loading state:** Layout-matching skeleton implemented (not a generic spinner)
- [ ] **Empty state:** Dedicated `[Module]EmptyState.tsx` with icon, message, and contextual CTA
- [ ] **Error state:** Non-technical error message + Retry button
- [ ] **Permission-denied state:** Clear restriction message + next-step guidance
- [ ] **Offline state:** Non-blocking indicator (if feature declares offline support)
- [ ] **Partial-data state:** UI handles nullable fields gracefully via `displayValue()`

### Accessibility (WCAG 2.2 AA — Section 13)
- [ ] All interactive elements keyboard-accessible (Tab navigation verified)
- [ ] All icon-only buttons have `aria-label`
- [ ] All form inputs have programmatic `<label>` association
- [ ] All error messages connected via `aria-describedby`
- [ ] Focus restored to trigger after modal/drawer close
- [ ] All animations guarded with `motion-safe:` prefix
- [ ] Color is never the sole state differentiator (text/icon pairing exists)
- [ ] Layout verified at 200% browser zoom — no horizontal scroll or overlap

### Responsive & Device Testing (Section 8)
- [ ] Tested at 320px — no horizontal overflow
- [ ] Tested at 768px (tablet) — sidebar collapses, tables scroll
- [ ] Tested at 1280px+ (desktop) — full layout correct
- [ ] Long translated strings (simulate 2× text length) don't break layouts
- [ ] All flex containers use `flex-wrap` or `flex-col sm:flex-row` for small screens

### Design System Compliance
- [ ] No hardcoded hex, RGB, or raw Tailwind colors in JSX
- [ ] No opacity modifiers on semantic backgrounds (`bg-success/10` forbidden)
- [ ] All semantic backgrounds paired with correct text-on-* token
- [ ] Z-index scale respected (Section 12)
- [ ] `motion-safe:` prefix on all transitions and animations (Section 29)

### Security & Permissions
- [ ] Frontend permission checks control UI visibility only (not authorization enforcement)
- [ ] Server-side authorization enforced for every protected operation
- [ ] Sensitive data masked in list views via `maskSensitiveData()` (Rule 43)
- [ ] No tokens, secrets, or PII in error logs or analytics

### Localization (Section 32)
- [ ] No hardcoded English strings in JSX (all via `t('key')`)
- [ ] Button/label/header containers accommodate 2× text length without overflow
- [ ] Dates/numbers/currency use locale-aware formatters

### API Integration
- [ ] All displayed fields have a documented API source in `[moduleName]_features.md`
- [ ] MSW fixture covers all rendered UI fields (Rule 75D)
- [ ] No component-level hardcoded business fallback data

### Tests
- [ ] Unit/component tests cover loading, empty, error, and success states
- [ ] Regression test exists for any fixed bug
- [ ] E2E test covers critical user flows (login, CRUD, destructive actions)

### Documentation & Observability
- [ ] `[moduleName]_features.md` updated if user flows, API, permissions, or state changed
- [ ] `[moduleName]_theme_contract.md` lists all consumed tokens
- [ ] Error monitoring wired for critical flows (Rule 15E)
- [ ] Web vitals within budget: LCP < 2.5s, CLS < 0.1, INP < 200ms

### Performance
- [ ] Route JS bundle < 200KB (gzipped) for new routes
- [ ] Images use `next/image` with explicit dimensions
- [ ] Heavy components use `next/dynamic` (code-split)
- [ ] Search/filter inputs debounced ≥ 300ms