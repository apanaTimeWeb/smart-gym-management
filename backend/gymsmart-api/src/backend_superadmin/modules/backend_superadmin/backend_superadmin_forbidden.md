# Backend Superadmin Forbidden Changes

- Do not move feature business logic into the role container; violating Rules 0A-0C expands the repair boundary.
- Do not create `common/` or `shared/` business logic under the role container; violating Rule 8C creates cross-feature blast radius.
- Do not create direct sibling feature imports; violating Rule 49 breaks the declared dependency graph.
- Do not register duplicate HTTP controllers for the same method/path; violating the endpoint ownership boundary creates ambiguous routing.
- Do not bypass the global response/validation/idempotency infrastructure; violating Rules 28, 31 and 37 breaks canonical API behavior.
