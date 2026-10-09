# trainer_infrastructure — Forbidden Patterns

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not import from any sibling business features or other role folders (e.g., no cross-imports from `/admin`, `/superadmin`, `/manager`, `/trainer`).


## Host package approval boundary
- Do not replace or reclassify `socket.io-client` without an authoritative host package registry and explicit human approval. The supplied frontend bundle does not contain that approval evidence.
