# Forbidden Patterns — `trainer/workout`

1. Do not place Workout business behavior in role-wide shared business folders.
2. Do not store Workout API/server responses in React Context or Zustand; TanStack Query owns server state. Zustand may hold UI-only state only.
3. Do not hardcode Workout URLs outside `workout_url_config.ts`.
4. Do not use relative imports or barrel files.
5. Do not place fake workout/exercise records in production UI components; use `workout_fixtures/` and `workout_mocks/`.
6. Search, category, pagination, create, update, and delete behavior must cross the query/API/MSW boundary and change visible mock state where applicable.
7. Do not expose raw backend errors or stack details in user-facing UI.
8. Use global semantic design tokens instead of raw colors/arbitrary color utilities.
9. Destructive actions require the approved confirmation flow.
10. Do not modify unrelated sibling Trainer features to repair Workout.
