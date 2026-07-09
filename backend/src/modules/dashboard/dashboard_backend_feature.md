# Dashboard Module

## Overview
The Dashboard module aggregates cross-module data to display high-level KPIs, charts, and recent activity for administrators. 

## Caching & Performance
Because the dashboard aggregates data from `Member`, `Payment`, `Staff`, `Product`, and `Inquiry` tables using expensive queries, the data is heavily cached using `@nestjs/cache-manager`.
The services rely on `dashboard.repository.ts` which encapsulates all raw TypeORM logic.

## Folder Structure
- `controllers/`: Handles HTTP requests.
  - `dashboard-kpi.controller.ts`: Fetches key performance indicators.
  - `dashboard-charts.controller.ts`: Fetches chart plotting data.
  - `dashboard-recent.controller.ts`: Fetches recent transactions.
- `services/`: Business logic. Heavily rely on caching layers.
- `dashboard.repository.ts`: Encapsulates all DB query logic.
- `dashboard.interfaces.ts`: Defines `IDashboardKpi`, `IDashboardCharts`, `IDashboardRecent`.
- `dashboard.constants.ts`: Cache TTls and Keys.
- `dashboard.exceptions.ts`: Custom exceptions.
