# dashboard_forbidden.md

## What is NEVER allowed in this module

1. Never aggregate dashboard data without trainer ownership filters. Rule 83. Consequence: KPIs can leak another Trainer’s members or sessions.
2. Never reconstruct missing frontend dashboard fields in the frontend. Rule 67. Consequence: backend/frontend contract drift is hidden.
3. Never query soft-deleted members/sessions into dashboard aggregates. Rule 29. Consequence: KPIs become historically incorrect.
4. Never use unrestricted dynamic sort/filter SQL. Rule 35. Consequence: query injection risk and unstable performance.
5. Never turn dashboard aggregation into a command mutation. CQRS Lite. Consequence: read/write boundaries become coupled.
