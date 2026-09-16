# Manager Unsaved Changes Guard — Architecture Note

The Manager dirty-form guard uses `window.confirm()` for in-app navigation interception because the Next.js App Router navigation decision must be made synchronously at the browser history/click interception point. This is an explicit Rule 79 implementation exception; it is not used for destructive or financial confirmation flows.

Destructive and financial actions MUST continue to use the global `useConfirm()` design-system confirmation modal. The guard text is the Rule 79 required warning and the guard is deactivated after successful submission or explicit discard.
