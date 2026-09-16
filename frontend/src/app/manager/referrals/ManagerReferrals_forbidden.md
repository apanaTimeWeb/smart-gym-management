# Rule 2: Absolute Isolation (The "No Cross-Pollination" Rule)

This file enforces that the `manager/referrals` module is strictly isolated.

**Forbidden Imports:**
- 🚫 `import ... from '@/app/admin/*'`
- 🚫 `import ... from '@/app/trainer/*'`
- 🚫 `import ... from '@/app/superadmin/*'`

The manager app must be 100% self-contained. If you need a utility or type from another role, you MUST duplicate it or move it to a truly global `@/lib` or `@/components` shared directory (only if explicitly allowed by architecture).
