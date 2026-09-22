# progress-tracking_forbidden.md

## What is NEVER allowed in this module

1. Never access a progress entry without checking member ownership for the authenticated Trainer. Rule 83. Consequence: IDOR can expose or mutate another Trainer’s member data.
2. Never hard-delete progress entries. Rule 29. Consequence: historical fitness records become unrecoverable.
3. Never recalculate BMI with zero/negative height or weight. Domain validation. Consequence: invalid derived metrics can be persisted.
4. Never return generic `unknown` response records when the frontend contract can be typed. Rules 12/82/82A. Consequence: Swagger cannot prove the response shape.
5. Never mutate a progress entry without idempotency protection. Rule 112. Consequence: retries can create duplicate or inconsistent state.
