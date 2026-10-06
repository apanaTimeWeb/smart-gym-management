// RESPONSIBILITY: Defines PublicLanding-owned MSW handlers for exact API paths, mutable success state, idempotent retries, and deterministic errors.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { PublicLandingBookingApiPayloadSchema } from '@/app/frontend_public/landing/landing_schemas/PublicLandingBookingSchema';
import { PublicLandingContactApiPayloadSchema } from '@/app/frontend_public/landing/landing_schemas/PublicLandingContactSchema';
import { hasPublicLandingMutationKey, landingMockState, nextPublicLandingMockId, rememberPublicLandingMutationKey } from '@/app/frontend_public/landing/landing_mocks/PublicLandingMockFixtures';

function requestBodyValidationError(): Response {
  return HttpResponse.json({ success: false, message: 'Please check the submitted form fields.', data: null, errorCode: 'VALIDATION_ERROR' }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
}
function missingIdempotencyKeyError(): Response {
  return HttpResponse.json({ success: false, message: 'A request idempotency key is required.', data: null, errorCode: 'IDEMPOTENCY_KEY_REQUIRED' }, { status: StatusCodes.BAD_REQUEST });
}

export const landingHandlers = [
  http.post('*/landing/bookings', async ({ request }) => {
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (!idempotencyKey) return missingIdempotencyKeyError();
    const parsed = PublicLandingBookingApiPayloadSchema.safeParse(await request.json());
    if (!parsed.success) return requestBodyValidationError();
    if (!hasPublicLandingMutationKey(idempotencyKey)) {
      landingMockState.bookings.push({ ...parsed.data, id: nextPublicLandingMockId('booking') });
      rememberPublicLandingMutationKey(idempotencyKey);
    }
    return HttpResponse.json({ success: true, message: 'Booking submitted successfully. Our team will contact you shortly.', data: null });
  }),
  http.post('*/landing/contact', async ({ request }) => {
    const idempotencyKey = request.headers.get('Idempotency-Key');
    if (!idempotencyKey) return missingIdempotencyKeyError();
    const parsed = PublicLandingContactApiPayloadSchema.safeParse(await request.json());
    if (!parsed.success) return requestBodyValidationError();
    if (!hasPublicLandingMutationKey(idempotencyKey)) {
      landingMockState.contacts.push({ ...parsed.data, id: nextPublicLandingMockId('contact') });
      rememberPublicLandingMutationKey(idempotencyKey);
    }
    return HttpResponse.json({ success: true, message: 'Message sent successfully. We will get back to you shortly.', data: null });
  }),
];

export const landingErrorScenarioHandlers = [
  http.post('*/landing/bookings-error', () => HttpResponse.json({ success: false, message: 'Booking service is temporarily unavailable. Please try again.', data: null, errorCode: 'BOOKING_SERVICE_UNAVAILABLE' }, { status: StatusCodes.SERVICE_UNAVAILABLE })),
  http.post('*/landing/contact-error', () => HttpResponse.json({ success: false, message: 'Messaging service is temporarily unavailable. Please try again.', data: null, errorCode: 'CONTACT_SERVICE_UNAVAILABLE' }, { status: StatusCodes.SERVICE_UNAVAILABLE })),
];
