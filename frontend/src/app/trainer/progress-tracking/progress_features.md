# Progress Tracking — Features

## Overview
Standalone module for tracking member body measurements and fitness metrics over time.

## Features
- **Add Entry**: Record weight, height, body fat %, muscle mass, waist/chest/hip measurements, and notes.
- **Auto BMI**: BMI is calculated automatically from weight and height on save.
- **Line Chart**: Visual trend chart for weight, BMI, body fat %, or muscle mass — switchable via metric tabs.
- **Entry Table**: Full history table with edit and delete per row.
- **Edit Entry**: Pre-filled modal to update any existing entry.
- **Delete Entry**: Confirm-dialog-protected deletion (useConfirm — no alert()).
- **Empty State**: Friendly prompt when no entries exist yet.

## Data Flow
```
page.tsx (Server Component)
  └── TrainerProgressMain (Client)
        ├── useTrainerProgressLogic (state + mock data)
        ├── TrainerProgressChart (SVG line chart)
        ├── TrainerProgressTable (history table)
        └── TrainerProgressModal (add / edit form)
```

## Mock Data
Seed data lives in `progress_utils/TrainerProgressSharedConstants.ts → MOCK_PROGRESS_ENTRIES`.
Replace with `fetchProgressEntries(memberId)` from `progress_api/TrainerProgressApi.ts` when backend is ready.
