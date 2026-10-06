# Admin Frontend — Role Feature Index (v17_fix)

The Admin frontend contains one canonical role container, `frontend_admin/`, with 23 business modules and one role-shell infrastructure module.

| Role module | Type | Route |
|---|---|---|
| `admin_announcements` | BUSINESS FEATURE | `/admin/announcements` |
| `admin_attendance` | BUSINESS FEATURE | `/admin/attendance` |
| `admin_audit_logs` | BUSINESS FEATURE | `/admin/audit_logs` |
| `admin_blacklist` | BUSINESS FEATURE | `/admin/blacklist` |
| `admin_branches` | BUSINESS FEATURE | `/admin/branches` |
| `admin_campaigns` | BUSINESS FEATURE | `/admin/campaigns` |
| `admin_coupons` | BUSINESS FEATURE | `/admin/coupons` |
| `admin_dashboard` | BUSINESS FEATURE | `/admin/dashboard` |
| `admin_data_export` | BUSINESS FEATURE | `/admin/data-export` |
| `admin_finance` | BUSINESS FEATURE | `/admin/finance` |
| `admin_gym_health_alerts` | BUSINESS FEATURE | `/admin/gym-health-alerts` |
| `admin_hr` | BUSINESS FEATURE | `/admin/hr` |
| `admin_layout` | ROLE SHELL / INFRASTRUCTURE | *(shell infrastructure — no business route)* |
| `admin_members` | BUSINESS FEATURE | `/admin/members` |
| `admin_notifications` | BUSINESS FEATURE | `/admin/notifications` |
| `admin_payouts` | BUSINESS FEATURE | `/admin/payouts` |
| `admin_permissions` | BUSINESS FEATURE | `/admin/permissions` |
| `admin_plans` | BUSINESS FEATURE | `/admin/plans` |
| `admin_profile` | BUSINESS FEATURE | `/admin/profile` |
| `admin_reports` | BUSINESS FEATURE | `/admin/reports` |
| `admin_sales` | BUSINESS FEATURE | `/admin/sales` |
| `admin_settings` | BUSINESS FEATURE | `/admin/settings` |
| `admin_subscriptions` | BUSINESS FEATURE | `/admin/subscriptions` |
| `admin_usage` | BUSINESS FEATURE | `/admin/usage` |

See `MODULE_MAP.md` for the full module ownership map and `SOURCE_RULE_LEDGER.md` for source-rule coverage.


### Scope-Blocked Integration Note
`admin_data_export` is indexed as a business feature, but its authoritative API contract is not supplied in this role snapshot. Its mock handler is therefore intentionally not registered by `AdminMswBootstrap`; repair work must not invent endpoints or fixtures until the authoritative contract is supplied.
