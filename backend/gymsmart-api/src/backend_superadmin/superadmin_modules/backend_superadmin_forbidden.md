# Backend Superadmin Forbidden Changes

## What is NEVER allowed in this scope

1. **Never move feature business logic into the role container.**
   Consequence: The AI repair boundary expands from a feature to the whole role and unrelated modules become vulnerable to collateral changes.
   Rule: 0A-0C

2. **Never create global business helpers under `common/`, `shared/`, or `_shared/`.**
   Consequence: A bug fix in one feature can silently alter another feature through shared business behavior.
   Rule: 8C / 49

3. **Never add a direct sibling-feature business import.**
   Consequence: Feature isolation is bypassed and a local repair can create an undeclared runtime dependency.
   Rule: 0C / 49

4. **Never register duplicate method/path controllers.**
   Consequence: Ambiguous ownership makes route resolution non-deterministic and breaks endpoint parity.
   Rule: 25 / 48

5. **Never bypass canonical response, validation, or mutation infrastructure.**
   Consequence: Frontend contracts, validation error mapping, or duplicate-request protection can diverge from the frozen contract.
   Rule: 28 / 31 / 37 / 98

