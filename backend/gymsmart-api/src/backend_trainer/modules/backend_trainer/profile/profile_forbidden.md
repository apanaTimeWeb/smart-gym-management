# profile_forbidden.md

## What is NEVER allowed in this module

1. Never update profile fields outside the authenticated Trainer identity. Rule 83. Consequence: one Trainer could mutate another user’s profile.
2. Never log passwords, tokens, or raw sensitive profile payloads. Rule 14/61. Consequence: credential/PII exposure.
3. Never bypass the strict DTO whitelist on profile mutation. Rule 37. Consequence: mass assignment becomes possible.
4. Never store emergency contact or other sensitive profile fields unencrypted when the architecture requires encryption. Rule 61/62. Consequence: sensitive data is exposed at rest.
5. Never change the frozen profile response by manually deleting fields in the service. Rule 114. Consequence: role-based serialization becomes inconsistent.
