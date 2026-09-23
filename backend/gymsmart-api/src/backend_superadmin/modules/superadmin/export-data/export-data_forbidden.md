# export-data Forbidden Changes

- Do not perform archive generation synchronously in the controller; violating Rule 23 causes request timeouts under load.
- Do not remove `@RequireIdempotencyKey()`; violating Rule 31 permits duplicate export side effects on retries.
- Do not trust arbitrary `tenantIds` without authorization; violating Rule 39 can expose another tenant's data.
- Do not bypass the `BackgroundJobEntity` persistence boundary; violating the repository rule couples HTTP code to ORM details.
- Do not introduce a direct sibling-feature import; violating Rules 0B/0C creates cross-feature repair blast radius.
- Do not replace the canonical response envelope with a raw object; violating Rule 28 breaks the frontend contract.
- Do not hardcode a second queue name; violating centralized runtime vocabulary creates producer/consumer drift.
