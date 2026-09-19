# Forbidden Patterns — `trainer/earnings`

1. Trainer Earnings is read-only: do not add payout-release, settlement, or other Manager-only financial mutations.
2. TanStack Query owns earnings server state; module Zustand state is UI-only.
3. Never hardcode earnings URLs outside `earnings_url_config.ts`.
4. Search/date/page state must be part of the server query contract; do not simulate server filtering only in the rendered table.
5. Export actions must use the module URL contract and must not log sensitive financial identifiers.
6. Keep demo earnings data inside `earnings_fixtures/` / `earnings_mocks/`.
7. Use centralized currency/number formatting.
8. Use semantic theme tokens and accessible table/control states.
9. Never expose raw backend exception details through the UI.
10. Do not change unrelated Trainer business modules to repair Earnings.
