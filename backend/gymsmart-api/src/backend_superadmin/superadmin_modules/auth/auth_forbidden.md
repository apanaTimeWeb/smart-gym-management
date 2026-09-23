# Auth Forbidden Changes

- Do not bypass authentication guards; violating security boundary rules can expose protected APIs.
- Do not trust raw tenant identifiers; violating Rule 39 can break tenant isolation.
- Do not log access tokens or request bodies; violating Rule 14 can expose credentials or PII.
- Do not import sibling business modules directly; violating Rules 0B/0C expands the AI repair boundary.
- Do not move business logic into this infrastructure module; violating Rules 1 and 8 increases coupling.
