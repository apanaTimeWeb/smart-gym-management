# Forbidden Patterns — `trainer/notifications`

1. Do not place Notifications business behavior in role-wide shared business folders.
2. TanStack Query owns notification server state. Context/Zustand must not become the server-data owner.
3. Keep notification API routes in `notifications_url_config.ts`.
4. Keep notification demo data and mutable mock behavior in `notifications_mocks/fixtures/` and `notifications_mocks/`.
5. Trainer UI must not expose Manager-only delete/clear controls.
6. Mark-read and mark-all-read interactions must update visible mock state.
7. Use semantic theme tokens and accessible action controls.
8. Do not expose raw backend error details.
9. Do not make the role-wide header invent static business notification records; it may navigate to the Notifications feature.
10. Do not modify unrelated business modules to repair Notifications.
