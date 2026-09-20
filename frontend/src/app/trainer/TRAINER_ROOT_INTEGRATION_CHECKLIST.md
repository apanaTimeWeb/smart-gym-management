# Trainer Root Integration Checklist

This archive is intentionally limited to the Trainer role package. The parent application must perform the following verification before declaring the complete application compliant.

## Required parent-application verification

- Confirm `nextjs-toploader` is installed and every authenticated Next.js route transition triggers the top progress bar using the global `--primary` token.
- Run TypeScript with the documented strict settings: `strict`, `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`, and `verbatimModuleSyntax`.
- Run ESLint and confirm documented restrictions for explicit `any`, console calls, TypeScript suppression comments, import boundaries, arbitrary theme colors, magic values, and barrel files.
- Run Vitest for all Trainer module tests and verify interaction tests exercise observable user outcomes rather than callback-only assertions.
- Run Playwright/browser verification for each Trainer route at desktop, tablet, and mobile widths; specifically repeat create/edit/delete/filter/navigation/retry flows where applicable.
- Verify the application root maps the documented semantic design tokens in `globals.css`/Tailwind and that Trainer modules consume those tokens without legacy/raw theme classes.
- Verify the global MSW bootstrap registers every feature-owned Trainer handler set.

## Archive-level verification already completed

- All Trainer `.ts/.tsx` files pass TypeScript syntax transpilation in isolation.
- All `@/app/trainer/...` imports resolve within the supplied Trainer package.
- No relative imports or barrel `index.ts`/`index.tsx` files remain in the supplied package.
- No `as any`, `@ts-ignore`, `@ts-nocheck`, console calls, native alert/confirm calls, raw hex/RGB colors, legacy global color utilities, legacy shadow utilities, or arbitrary color bracket utilities remain in Trainer source.
- Each feature owns one local `*_url_config.ts`.
- Context-named feature folders and the role-level business message modal/date filter were removed.
