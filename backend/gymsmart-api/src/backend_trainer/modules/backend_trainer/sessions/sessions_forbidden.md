# sessions_forbidden.md

## What is NEVER allowed in this module

1. Never drop the frontend `date=YYYY-MM-DD` query contract. Rule 67. Consequence: the selected-day UI can return the wrong sessions or fail validation.
2. Never cancel a session by hard deletion. Rule 29. Consequence: historical scheduling/audit state is lost.
3. Never update a session without trainer/resource ownership checks. Rule 83. Consequence: IDOR-style mutation becomes possible.
4. Never perform session state transitions without idempotency. Rule 112. Consequence: repeated client requests can duplicate transitions.
5. Never document DELETE as canonical when the frozen frontend uses POST `/cancel`. Rules 19/67. Consequence: AI repairs can modify the wrong route.
