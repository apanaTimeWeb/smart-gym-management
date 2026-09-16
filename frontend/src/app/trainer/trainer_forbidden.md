# Trainer — Forbidden Patterns

- Cross-feature Trainer business imports.
- Feature-specific mock data outside the owning feature.
- Hardcoded business fallback records in components/hooks/stores/Context.
- Hardcoded internal routes outside `Trainer_url_config.ts`.
- API calls directly inside presentation-only components.
- API data stored as the primary source in Zustand/Context.
- `any`, `@ts-ignore`, `@ts-nocheck`, or barrel `index.ts` re-exports.
- Raw backend/technical error details shown to users.
- Arbitrary Tailwind visual values without a documented exception.
- Unguarded non-essential animations/transitions.
- Destructive or financial mutations without documented confirmation.

- Do not render ad-hoc inline toast JSX inside feature components.
- Do not import `react-hot-toast` directly outside `trainer_components/TrainerFeedback/useTrainerFeedback.ts` or its host.
