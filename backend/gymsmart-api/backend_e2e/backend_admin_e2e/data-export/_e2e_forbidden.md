# Forbidden patterns

- No shared helper imports across feature test folders — Rule 121/WET isolation.
- No direct database mutation — API tests are black-box.
- No hardcoded production URLs — `E2E_BASE_URL` is required.
- No hardcoded HTTP status integers — use `http.HTTPStatus`.
- No raw bearer tokens or tenant identifiers in source.
