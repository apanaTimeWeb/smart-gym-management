# Admin Campaigns Module — Feature Map

## 1. Feature Purpose
The Admin Campaigns module provides the Gym Owner (Admin) with a macro-level CRM pipeline to run bulk WhatsApp campaigns across all gym members. Unlike Manager Inquiries (which handles single leads), this module is for bulk communication such as festival offers, mass fee reminders, and policy updates.

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
| `AdminCampaignsMain` | Main orchestrator coordinating audience, template, composer, and queue panels | Implemented |
| `AdminCampaignsAudiencePicker` | Select the target audience returned by the module API | Implemented |
| `AdminCampaignsTemplatePicker` | Select a module-owned message template | Implemented |
| `AdminCampaignsComposer` | Edit message body and insert the `{name}` variable | Implemented |
| `AdminCampaignsQueuePanel` | Shows selected recipients and provides "Send All" staggered execution | Implemented |

## 4. Key Workflows
- **Send All**: Uses a client-side 500ms delay loop to safely pop open WhatsApp Web tabs for all selected recipients.
- **Auto-Personalization**: The `AdminCampaignsWhatsAppUtils` parses `{name}` and replaces it with the recipient's name before generating the `wa.me` URL.

## 5. Data and State Contract
- Audiences, templates, and recipients are server state owned by TanStack Query.
- Queue state is local module UI state because it represents the current client-side send workflow.
- API responses are validated with module-owned Zod schemas before UI consumption.
- MSW handlers provide module-owned demo records and recipient responses.
- The documented queue is rendered inline on the page; the previously duplicated undocumented bulk modal was removed.

## 6. Error and Recovery Behavior
- Audience and template failures expose a retry action.
- Recipient loading errors expose a retry action in the same section.
- An empty queue remains actionable only after a valid audience, message, and recipient set are available.
