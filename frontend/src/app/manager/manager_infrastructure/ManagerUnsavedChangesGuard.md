# Manager Unsaved Changes Guard — Architecture Note

The Manager dirty-form guard uses the shared `useConfirm()` dialog for in-app navigation and modal closure. It also registers the browser `beforeunload` event for full-page/tab exits, because client-side navigation does not trigger `beforeunload`.

The guard is not a business workflow and does not own API state. It receives a boolean dirty state from a feature-owned form hook and returns confirmation-aware close/navigation helpers.

Destructive and financial actions MUST continue to use the shared `useConfirm()` confirmation UI, with feature-owned mutation logic and idempotency handling where required.
