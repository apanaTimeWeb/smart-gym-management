# Health Forbidden Changes

## What is NEVER allowed in this scope

1. **Never expose the deep dependency probe as a public readiness endpoint.**
   Consequence: Detailed dependency information can leak infrastructure state to untrusted callers.
   Rule: 68

2. **Never trust a client-supplied tenant identifier without authorization.**
   Consequence: A forged tenant context can route protected health or dependency checks to another tenant.
   Rule: 39

3. **Never log tokens, request bodies, or raw PII from health probes.**
   Consequence: Centralized logs would become a secondary credential or privacy exposure channel.
   Rule: 14 / 35

4. **Never import Superadmin business modules into core health infrastructure.**
   Consequence: A feature repair would acquire a cross-domain core dependency and violate isolation.
   Rule: 0B / 0C

5. **Never embed business rules in a liveness probe.**
   Consequence: A transient business dependency failure could make a live process appear dead and cause unnecessary container replacement.
   Rule: 68 / 25

