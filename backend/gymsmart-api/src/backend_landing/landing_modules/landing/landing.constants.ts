// RESPONSIBILITY: Owns Landing business error messages, limits, scopes, and canonical API semantics.
// FLOW: Landing DTO/service â†’ module constants â†’ response/validation behavior.
export const LANDING_ERRORS = {
  BOOKING_SERVICE_UNAVAILABLE: 'Booking service is temporarily unavailable. Please try again.',
  CONTACT_SERVICE_UNAVAILABLE: 'Messaging service is temporarily unavailable. Please try again.',
  BOOKING_CREATED: 'Booking submitted successfully. Our team will contact you shortly.',
  CONTACT_CREATED: 'Message sent successfully. We will get back to you shortly.',
  IDEMPOTENCY_CONFLICT: 'Idempotency-Key was reused with a different request.',
  IDEMPOTENCY_IN_PROGRESS: 'The same request is already being processed.',
  AUDIT_BOOKING_CREATED: 'LANDING_BOOKING_CREATED',
  AUDIT_CONTACT_CREATED: 'LANDING_CONTACT_CREATED',
} as const;

export const LANDING_ENDPOINT_SCOPES = {
  BOOKING: 'landing.booking.create',
  CONTACT: 'landing.contact.create',
} as const;

export const LANDING_LIMITS = {
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 320,
  PHONE_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 5000,
} as const;
