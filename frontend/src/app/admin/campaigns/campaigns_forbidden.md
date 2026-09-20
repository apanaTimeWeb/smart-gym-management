# Admin Campaigns Module — Forbidden Patterns

1. **NEVER use `setTimeout` less than 500ms for bulk "Send All" popups.** WhatsApp Web and modern browsers will block popups or fail to load if a burst of `window.open` calls are fired without adequate delay.
2. **NEVER import Manager Inquiries logic.** This module is for bulk campaigns, not single-lead follow-ups. Keep it strictly independent of the `manager/inquiries` feature module.
3. **NEVER mix SMS/Email configurations into WhatsApp utilities.** Separate the utilities per transport if multiple transports are ever supported.
4. **NEVER hardcode WhatsApp API tokens here.** The "Free mode" strategy relies entirely on `wa.me` links via `window.open`. No server-side WhatsApp Business API integration exists in this phase.
