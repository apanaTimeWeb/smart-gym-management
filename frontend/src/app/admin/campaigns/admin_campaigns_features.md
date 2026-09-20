# Admin Campaigns Module — Feature Map

## 1. Feature Purpose
The Admin Campaigns module provides the Gym Owner (Admin) with a macro-level CRM pipeline to run bulk WhatsApp, SMS, or Email campaigns across all gym members. Unlike Manager Inquiries (which handles single leads), this module is for bulk communication such as festival offers, mass fee reminders, and policy updates.

## 2. Directory Structure
```
campaigns/
├── campaigns_api/         # API contracts and URL config
├── campaigns_components/  # UI components
├── campaigns_mocks/       # MSW handlers and fixtures
├── campaigns_types/       # Type definitions
└── campaigns_utils/       # Helper functions for variables and WhatsApp URLs
```

## 3. UI Inventory

| Component | Responsibility | Status |
| --- | --- | --- |
| `AdminCampaignsMain` | Main orchestrator orchestrating audience, template, composer, and queue panels | New |
| `AdminCampaignsAudiencePicker` | Filter audience (e.g., Pending Fees) | New |
| `AdminCampaignsTemplatePicker` | Select predefined templates (Fee Reminder, Overdue, etc) | New |
| `AdminCampaignsComposer` | Edit template body and insert variables like {name} | New |
| `AdminCampaignsQueuePanel` | Shows selected recipients and provides "Send All" staggered execution | New |

## 4. Key Workflows
- **Send All**: Uses a client-side 500ms delay loop to safely pop open WhatsApp Web tabs for all selected recipients.
- **Auto-Personalization**: The `AdminCampaignsWhatsAppUtils` parses `{name}` and replaces it with the recipient's name before generating the `wa.me` URL.
