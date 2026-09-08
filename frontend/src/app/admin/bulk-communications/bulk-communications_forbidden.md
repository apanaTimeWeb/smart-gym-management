# Forbidden Patterns — `admin/bulk-communications`

## 1. No Send Without Confirmation
**FORBIDDEN:** Calling `POST /admin/bulk-communications/send` on a single button click.
**ALLOWED:** Show recipient count and use `useConfirm()` with message showing the number of recipients.

## 2. No Hardcoded Templates
**FORBIDDEN:** Template text defined as constants in components.
**ALLOWED:** Fetch templates from `GET /admin/bulk-communications/templates`.

## 3. No WhatsApp Color Override
**FORBIDDEN:** Mapping `#25D366` to a theme token — it must remain the official brand color.
**ALLOWED:** Use `bg-[#25D366]` directly for WhatsApp action buttons per Design §69.

## 4. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
