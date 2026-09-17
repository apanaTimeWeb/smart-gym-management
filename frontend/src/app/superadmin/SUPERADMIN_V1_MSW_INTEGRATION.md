# Superadmin V1 — MSW Integration

The Superadmin module owns its feature handlers and fixtures. The only host-project step is registering the aggregate handler export in the application's existing MSW bootstrap.

## Browser bootstrap
Add the module's aggregate handlers to the existing browser worker registration:

```ts
import { superadminMockHandlers } from '@/app/superadmin/superadmin_mocks/SuperadminMockHandlers';

worker.use(...superadminMockHandlers);
```

Do not move feature fixtures into a global mock folder and do not duplicate individual Superadmin handlers in the global bootstrap.

## Test bootstrap
Register the same `superadminMockHandlers` array with the existing MSW test server setup.

## Production
MSW must remain disabled in the production path. The feature API clients and response contracts remain unchanged when the real backend is enabled.
