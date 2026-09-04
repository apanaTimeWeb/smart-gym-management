# Admin Inquiries Module — Forbidden Patterns
1. Never call fetch() directly — use adminInquiriesApi
2. Never import from manager/inquiries
3. Never use console.log — use logger
4. Never hardcode source labels — use ADMIN_INQUIRY_SOURCES
