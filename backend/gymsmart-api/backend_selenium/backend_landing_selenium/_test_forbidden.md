# Landing Selenium — Forbidden Patterns

The Landing Selenium suite is isolated under `backend_selenium/backend_landing_selenium/` and is mapped 1:1 to the Landing backend feature.

1. **Rule 112 — Never use a single brittle locator when a backup locator is required.** A UI selector change would otherwise break the test even though the user flow still works.
2. **Rule 112 — Never import another module's helper/fixture.** Shared helpers destroy the AI-zip isolation boundary and create cross-module regression risk.
3. **Rule 101 / Rule 112 — Never assert internal React state or fake success text.** Tests must observe visible browser behavior so a deliberately broken UI flow cannot still pass.
4. **Rule 33 / Rule 112 — Never hardcode passwords, bootstrap tokens, or production URLs.** Credentials must come from the execution environment and production targets must never be exercised accidentally.
5. **Rule 112 — When actual frontend evidence is unavailable, skip the test rather than invent locators or expected messages.** Fabricated assertions would produce false behavioral proof and violate the anti-hallucination requirement.
6. **Rule 43 — Never point browser flows at the development or production tenant database.** API setup must use the isolated E2E lifecycle so browser validation cannot mutate real business data.
