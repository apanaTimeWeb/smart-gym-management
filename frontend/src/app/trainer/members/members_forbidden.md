# Forbidden Patterns — `trainer/members`

1. Do not place Members business behavior in role-wide shared business folders.
2. TanStack Query owns member server data; Zustand owns UI-only shared state.
3. Never hardcode Members URLs outside `members_url_config.ts`.
4. Member messaging UI belongs to the Members feature; do not move member-aware messaging into generic Trainer shared folders.
5. Add Note must complete the mutation flow and update the visible member state through the query cache/mock state.
6. Keep demo member records and mutation responses in `members_mocks/fixtures/` / `members_mocks/`.
7. Use Zod at the API boundary and named module types for domain unions.
8. Use semantic theme tokens and accessible modal/form behavior.
9. Do not introduce cross-feature business imports to avoid duplication.
10. Do not modify unrelated sibling modules to repair Members.
