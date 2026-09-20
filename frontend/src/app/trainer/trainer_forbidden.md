# Trainer Role-Shell Forbidden Patterns

This file governs only genuine Trainer-wide shell/infrastructure concerns. Feature business rules belong to the owning feature module.

1. No relative imports for module code.
2. No barrel files.
3. No role-wide business component/store/hook/API/type/fixture bucket.
4. `trainer_components/` may contain only zero-business shell primitives, shell components, or explicitly global Trainer infrastructure.
5. Feature-specific URLs belong to each feature's `[module]_url_config.ts`; `trainer_url_config.ts` owns role-shell page navigation only.
6. Server/API data belongs to feature TanStack Query layers, not Trainer shell state.
7. Trainer feedback must sanitize user-visible exception text.
8. Destructive confirmation UI must remain keyboard accessible, focus managed, and free of raw backend details.
9. Shell components must consume global semantic theme tokens.
10. Feature-local defects must not be repaired by modifying unrelated business modules.
