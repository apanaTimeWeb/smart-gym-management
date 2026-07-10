# Sales Module

## Overview
The Sales module is responsible for aggregating and serving analytical data across memberships and payments. It provides four distinct reports:
1. **Overview Data:** Monthly revenue and new membership trends.
2. **Membership Report:** Aggregates receivables, received amounts, and remaining balances per plan type.
3. **Pending Payments:** Paginated list of members with an active pending balance.
4. **All Memberships:** Paginated list of all members across the system with their status and days left.

## Data Structure
This module operates exclusively as an aggregation layer and does not own any exclusive database tables.
It joins data from the following entities:
- `Member` (from `src/modules/members`)
- `Payment` (from `src/modules/finance`)
- `Plan` (from `src/modules/plans`)

## Endpoints
- `GET /sales/overview` - Returns monthly revenue chart data
- `GET /sales/membership-report` - Returns plan-level revenue aggregations
- `GET /sales/pending-payments` - Returns paginated list of members with pending payments
- `GET /sales/all-memberships` - Returns paginated list of all members

## Key Features
- **Read-Only Aggregations:** This module only implements `GET` queries and does not mutate any data.
- **Cross-Module Integration:** Safely queries other module's tables via TypeORM relations.
- **Pagination & Search:** Integrates standard pagination and search filtering for lists.
