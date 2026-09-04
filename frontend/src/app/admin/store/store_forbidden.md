# Admin Store Module — Forbidden Patterns
1. Never call fetch() directly — use adminStoreApi
2. Never import from manager/store
3. Never format currency inline — use formatCurrency from @/lib/formatters
4. Never use console.log — use logger
