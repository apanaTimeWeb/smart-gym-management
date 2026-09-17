import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      tailwindcss: tailwind,
      boundaries: boundaries,
    },
    settings: {
      "boundaries/elements": [
        { type: "admin", pattern: "src/app/admin/*" },
        { type: "trainer", pattern: "src/app/trainer/*" },
        { type: "member", pattern: "src/app/member/*" },
        { type: "superadmin", pattern: "src/app/superadmin/*" },
        { type: "manager_attendance", pattern: "src/app/manager/attendance/*" },
        { type: "manager_communications", pattern: "src/app/manager/communications/*" },
        { type: "manager_dashboard", pattern: "src/app/manager/dashboard/*" },
        { type: "manager_expenses", pattern: "src/app/manager/expenses/*" },
        { type: "manager_finance", pattern: "src/app/manager/finance/*" },
        { type: "manager_hr", pattern: "src/app/manager/hr/*" },
        { type: "manager_inquiries", pattern: "src/app/manager/inquiries/*" },
        { type: "manager_library", pattern: "src/app/manager/library/*" },
        { type: "manager_members", pattern: "src/app/manager/members/*" },
        { type: "manager_notifications", pattern: "src/app/manager/notifications/*" },
        { type: "manager_plans", pattern: "src/app/manager/plans/*" },
        { type: "manager_profile", pattern: "src/app/manager/profile/*" },
        { type: "manager_pt", pattern: "src/app/manager/pt/*" },
        { type: "manager_referrals", pattern: "src/app/manager/referrals/*" },
        { type: "manager_reports", pattern: "src/app/manager/reports/*" },
        { type: "manager_sales", pattern: "src/app/manager/sales/*" },
        { type: "manager_schedule", pattern: "src/app/manager/schedule/*" },
        { type: "manager_settings", pattern: "src/app/manager/settings/*" },
        { type: "manager_store", pattern: "src/app/manager/store/*" },
        { type: "manager_workout", pattern: "src/app/manager/workout/*" },
        { type: "manager_shared", pattern: "src/app/manager/manager_*/*" }
      ]
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "tailwindcss/no-arbitrary-value": "error",

      // Enforce type-only imports — required by verbatimModuleSyntax (P1-31)
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" }
      ],

      // Ban @ts-ignore and @ts-nocheck — must use @ts-expect-error with a comment (P1-31)
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description",
          "ts-nocheck": true,
          "ts-check": false,
          "minimumDescriptionLength": 10
        }
      ],

      // Warn on non-null assertions (!) — prefer explicit null guards (P1-31)
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Disallow raw .toFixed() in JSX — use formatters from @/lib/formatters (Rule 42, P1-31)
      "no-restricted-syntax": [
        "error",
        {
          "selector": "JSXExpressionContainer > CallExpression > MemberExpression[property.name='toFixed']",
          "message": "Do not use .toFixed() directly in JSX. Use formatCurrency(), formatNumber(), or formatDecimal() from '@/lib/formatters' instead."
        }
      ],

      "boundaries/dependencies": [
        2,
        {
          default: "disallow",
          policies: [
            { from: { element: { type: "admin" } }, allow: [{ to: { element: { type: "admin" } } }] },
            { from: { element: { type: "trainer" } }, allow: [{ to: { element: { type: "trainer" } } }] },
            { from: { element: { type: "member" } }, allow: [{ to: { element: { type: "member" } } }] },
            { from: { element: { type: "superadmin" } }, allow: [{ to: { element: { type: "superadmin" } } }] },
            { from: { element: { type: "manager_attendance" } }, allow: [{ to: { element: { type: "manager_attendance" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_communications" } }, allow: [{ to: { element: { type: "manager_communications" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_dashboard" } }, allow: [{ to: { element: { type: "manager_dashboard" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_expenses" } }, allow: [{ to: { element: { type: "manager_expenses" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_finance" } }, allow: [{ to: { element: { type: "manager_finance" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_hr" } }, allow: [{ to: { element: { type: "manager_hr" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_inquiries" } }, allow: [{ to: { element: { type: "manager_inquiries" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_library" } }, allow: [{ to: { element: { type: "manager_library" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_members" } }, allow: [{ to: { element: { type: "manager_members" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_notifications" } }, allow: [{ to: { element: { type: "manager_notifications" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_plans" } }, allow: [{ to: { element: { type: "manager_plans" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_profile" } }, allow: [{ to: { element: { type: "manager_profile" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_pt" } }, allow: [{ to: { element: { type: "manager_pt" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_referrals" } }, allow: [{ to: { element: { type: "manager_referrals" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_reports" } }, allow: [{ to: { element: { type: "manager_reports" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_sales" } }, allow: [{ to: { element: { type: "manager_sales" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_schedule" } }, allow: [{ to: { element: { type: "manager_schedule" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_settings" } }, allow: [{ to: { element: { type: "manager_settings" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_store" } }, allow: [{ to: { element: { type: "manager_store" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_workout" } }, allow: [{ to: { element: { type: "manager_workout" } } }, { to: { element: { type: "manager_shared" } } }] },
            { from: { element: { type: "manager_shared" } }, allow: [{ to: { element: { type: "manager_shared" } } }] }
          ]
        }
      ]
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
