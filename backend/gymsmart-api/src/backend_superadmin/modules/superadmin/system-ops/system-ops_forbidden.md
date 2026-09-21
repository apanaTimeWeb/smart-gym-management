# system-ops Forbidden Operations

- Do not import sibling feature business code directly.
- Do not bypass this feature's repository boundary for database access.
- Do not return raw ORM entities from controllers.
- Do not use hard DELETE operations.
- Do not log credentials, request bodies, or raw PII.
- Do not add unregistered events or unsanctioned external dependencies.
- Do not replace the frontend contract with a smaller DTO.
