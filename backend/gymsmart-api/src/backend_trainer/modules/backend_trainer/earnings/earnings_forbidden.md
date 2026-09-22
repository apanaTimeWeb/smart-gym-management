# earnings_forbidden.md

## What is NEVER allowed in this module

1. Never expose earnings rows without trainer scope and active-row filtering. Rule 29. Consequence: deleted or foreign payout history can leak.
2. Never return a monetary amount without its ISO-4217 currency companion. Rule 118. Consequence: consumers cannot safely interpret money.
3. Never format minor-unit money into currency symbols in the backend. Rule 118. Consequence: precision and locale semantics are lost.
4. Never make large earnings exports synchronous. Rule 23 and export architecture. Consequence: long requests can exhaust HTTP workers.
5. Never expose raw ORM entities from the earnings service. Rules 82/82A. Consequence: persistence details become part of the API contract.
