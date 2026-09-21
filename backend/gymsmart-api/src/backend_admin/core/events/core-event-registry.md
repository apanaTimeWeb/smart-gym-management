# Core Event Registry

This registry is intentionally small. Feature modules must declare runtime event dependencies in their local
`*_dependencies.md` before emitting/consuming an event.

Registered event names:
- ADMIN.ANNOUNCEMENT.CREATED
- ADMIN.ANNOUNCEMENT.UPDATED
- ADMIN.BLACKLIST.UPDATED
- ADMIN.COUPON.UPDATED
- ADMIN.MEMBER.UPDATED
- ADMIN.STAFF.UPDATED
- ADMIN.PAYROLL.UPDATED
- ADMIN.SETTINGS.UPDATED
- ADMIN.SUBSCRIPTION.UPDATED
- ADMIN.EXPORT.CREATED
- ADMIN.HEALTH_ALERT.UPDATED
