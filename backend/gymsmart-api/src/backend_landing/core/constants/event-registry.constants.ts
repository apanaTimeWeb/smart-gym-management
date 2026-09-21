// RESPONSIBILITY: Registers runtime event names so cross-feature event contracts are explicit and searchable.
// FLOW: Business mutation â†’ Event registry constant â†’ EventBus publisher/consumer.
export const EVENT_REGISTRY = {
  LANDING_BOOKING_CREATED: 'LANDING.BOOKING.CREATED',
  LANDING_CONTACT_CREATED: 'LANDING.CONTACT.CREATED',
} as const;

export type RegisteredEventName = typeof EVENT_REGISTRY[keyof typeof EVENT_REGISTRY];
