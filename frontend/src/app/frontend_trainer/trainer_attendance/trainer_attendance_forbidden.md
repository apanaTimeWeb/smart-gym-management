# Forbidden Patterns — Trainer Attendance

1. Do not place Attendance API/server data in React Context or Zustand. TanStack Query owns server state.
2. Do not put feature business constants or records in role-wide folders. Keep static config in `trainer_attendance_utils/` and demo data in `trainer_attendance_mocks/trainer_attendance_fixtures/`.
3. Do not hardcode Attendance URLs outside `trainer_attendance_url_config.ts`.
4. Do not use native `alert()`/`window.confirm()` for destructive actions.
5. Do not expose raw backend/exception details.
6. Self check-in/out mock mutations must update feature-owned mock state so a subsequent read reflects the result.
