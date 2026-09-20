// RESPONSIBILITY: Defines Landing-owned MSW handlers for success flows and deterministic error scenarios.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { LandingBookingApiPayloadSchema } from '@/app/landing/landing_schemas/LandingBookingSchema';
import { LandingContactSchema } from '@/app/landing/landing_schemas/LandingContactSchema';
import { landingMockState, nextLandingMockId } from '@/app/landing/landing_mocks/LandingMockFixtures';

function requestBodyValidationError(): Response {
  return HttpResponse.json(
    {
      success: false,
      message: 'Please check the submitted form fields.',
      data: null,
      errorCode: 'VALIDATION_ERROR',
    },
    { status: StatusCodes.UNPROCESSABLE_ENTITY },
  );
}

export const landingHandlers = [
  http.post('*/landing/booking', async ({ request }) => {
    const parsed = LandingBookingApiPayloadSchema.safeParse(await request.json());
    if (!parsed.success) return requestBodyValidationError();

    const record = { ...parsed.data, id: nextLandingMockId('booking') };
    landingMockState.bookings.push(record);

    return HttpResponse.json({
      success: true,
      message: 'Booking submitted successfully. Our team will contact you shortly.',
      data: null,
    });
  }),

  http.post('*/landing/contact', async ({ request }) => {
    const parsed = LandingContactSchema.safeParse(await request.json());
    if (!parsed.success) return requestBodyValidationError();

    const record = { ...parsed.data, id: nextLandingMockId('contact') };
    landingMockState.contacts.push(record);

    return HttpResponse.json({
      success: true,
      message: 'Message sent successfully. We will get back to you shortly.',
      data: null,
    });
  }),
];

export const landingErrorScenarioHandlers = [
  http.post('*/landing/booking-error', () =>
    HttpResponse.json(
      {
        success: false,
        message: 'Booking service is temporarily unavailable. Please try again.',
        data: null,
        errorCode: 'BOOKING_SERVICE_UNAVAILABLE',
      },
      { status: StatusCodes.SERVICE_UNAVAILABLE },
    ),
  ),
  http.post('*/landing/contact-error', () =>
    HttpResponse.json(
      {
        success: false,
        message: 'Messaging service is temporarily unavailable. Please try again.',
        data: null,
        errorCode: 'CONTACT_SERVICE_UNAVAILABLE',
      },
      { status: StatusCodes.SERVICE_UNAVAILABLE },
    ),
  ),
];
