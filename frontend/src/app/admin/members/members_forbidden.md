# Admin Members Module — Forbidden Patterns

## NEVER do these things in this module
1. Do NOT call fetch() directly — always use adminMembersApi from members_api/
2. Do NOT hardcode any API URL — use AdminMembersUrlConfig
3. Do NOT import from manager/members — this module is fully isolated
4. Do NOT add formatCurrency locally — use formatCurrency from @/lib/formatters
5. Do NOT show toast directly — use the global toast from react-hot-toast
6. Do NOT perform delete without the AdminConfirmModal double-confirmation
7. Do NOT use console.log — use logger from @/lib/logger
8. Do NOT store sensitive data (Aadhaar, phone) in localStorage
