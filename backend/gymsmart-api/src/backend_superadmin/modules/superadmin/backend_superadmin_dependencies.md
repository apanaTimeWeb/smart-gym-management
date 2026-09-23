# backend_superadmin Role/Domain Dependencies

## Depends On
- `core` framework infrastructure.
- `modules/auth` and `modules/health` infrastructure modules.
- Isolated feature modules under `modules/backend_superadmin/`.

## Consumers
- Application root importing `BackendSuperadminModule`.

## Guardrail
This container is not the default AI repair boundary. Business changes belong in the owning feature folder.
