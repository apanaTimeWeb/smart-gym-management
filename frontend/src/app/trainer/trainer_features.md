# Trainer Role Container — Feature Map

## Role Container Responsibility
The Trainer role container provides application-wide Trainer shell/navigation and isolates business features into independent modules. It does not own feature-specific business state.

## Feature Modules
`dashboard/`, `attendance/`, `earnings/`, `library/`, `members/`, `notifications/`, `profile/`, `progress-tracking/`, `schedule/`, `sessions/`, and `workout/` are independent business modules.

## Trainer-Wide Infrastructure
- `Trainer_url_config.ts` — role-shell page navigation only.
- `trainer_components/TrainerLayout/` — authenticated shell presentation.
- `trainer_components/TrainerFeedback/` — Trainer-wide zero-business confirmation/feedback infrastructure.
- `trainer_components/TrainerShared/` — zero-business shared primitives only.
- `trainer_utils/` — genuinely Trainer-wide infrastructure utilities, not sibling-feature business logic.

## Architecture Boundary
A feature bug should normally be repaired using only that feature directory. Cross-feature business imports are forbidden. Stable framework/application infrastructure may remain outside the feature when the feature documentation explicitly identifies it as unavoidable.

## URL Boundary
Feature API/page contracts are owned by each feature's `*_url_config.ts`. `Trainer_url_config.ts` must not become a role-wide API URL registry.
