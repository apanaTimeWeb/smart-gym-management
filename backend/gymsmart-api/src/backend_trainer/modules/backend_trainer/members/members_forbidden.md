# members_forbidden.md

## What is NEVER allowed in this module

1. Never update a member without trainer ownership authorization. Rule 83. Consequence: IDOR-style cross-member mutation becomes possible.
2. Never return soft-deleted member notes. Rule 29. Consequence: deleted notes can reappear in the member UI.
3. Never accept arbitrary member fields from request bodies. Rule 37. Consequence: mass assignment can modify protected fields.
4. Never export unbounded member data synchronously. Rule 23. Consequence: large exports can block the request thread.
5. Never import another feature’s business service directly for attendance/progress data. Rule 49. Consequence: sibling-feature coupling expands repair context.
