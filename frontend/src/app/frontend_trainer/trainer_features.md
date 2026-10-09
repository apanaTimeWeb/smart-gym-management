# frontend_trainer — Role Container Feature Map (v8-fix)

## Role Boundary
The Trainer role container is `frontend_trainer/`. It owns role navigation/shell configuration and the canonical Trainer feature modules. Business behavior remains inside feature modules.

## Canonical Feature Modules
- `trainer_dashboard`
- `trainer_attendance`
- `trainer_members`
- `trainer_library`
- `trainer_progress_tracking`
- `trainer_schedule`
- `trainer_profile`
- `trainer_sessions`
- `trainer_workout`
- `trainer_earnings`
- `trainer_notifications`

## Role-Owned Navigation Configuration
`trainer_navigation/` contains Trainer-specific navigation groups and shell route title metadata. It is role-owned configuration and is intentionally outside `trainer_infrastructure/`.

## Global Trainer Infrastructure
`trainer_infrastructure/` contains zero-business role/application plumbing only; it does not own Trainer business navigation metadata.

## Canonical Routing Note
Each feature physically owns `page.tsx/loading.tsx/error.tsx/not-found.tsx`. The prior duplicate `frontend_trainer_routes/` tree is removed. The public `/trainer/...` route mapping must be supplied by the host application routing/rewrite configuration.


## v8-fix Delivery Blocker

- `trainer_earnings` CSV export remains `BLOCKED_BY_SUPPLIED_SCOPE`: the frozen Stage 1 requirements require an export endpoint, but no authoritative export endpoint contract was supplied. The implementation deliberately does not invent one.
