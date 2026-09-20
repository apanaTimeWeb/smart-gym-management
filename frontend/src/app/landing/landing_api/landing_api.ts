// RESPONSIBILITY: Owns Landing module HTTP calls, request serialization, and Zod API-boundary response validation.
import { apiFetch } from '@/lib/api';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';
import { LandingBookingApiPayloadSchema, LandingBookingSchema } from '@/app/landing/landing_schemas/LandingBookingSchema';
import { LandingContactApiPayloadSchema, LandingContactSchema } from '@/app/landing/landing_schemas/LandingContactSchema';
import { LandingNullApiResponseSchema } from '@/app/landing/landing_schemas/LandingApiResponseSchema';
import { serializeLandingDateToUtc } from '@/app/landing/landing_utils/LandingDateUtils';
import type {
  LandingApiResponse,
  LandingBookingApiPayload,
  LandingBookingFormValues,
  LandingContactApiPayload,
  LandingContactFormValues,
} from '@/app/landing/landing_types/landing_types';
import { LandingApiRequestError } from '@/app/landing/landing_types/landing_types';

function parseLandingApiResponse(value: unknown): LandingApiResponse<null> {
  const parsed = LandingNullApiResponseSchema.safeParse(value);
  if (!parsed.success) {
    throw new LandingApiRequestError('The server returned an invalid response.');
  }
  return parsed.data;
}

function throwIfUnsuccessful(response: LandingApiResponse<null>): LandingApiResponse<null> {
  if (!response.success) {
    throw new LandingApiRequestError(response.message, {
      errorCode: response.errorCode,
      validationErrors: response.validationErrors,
    });
  }
  return response;
}

/** Creates a booking after validating the UI payload and serializing its selected date at the API boundary. */
export async function createLandingBooking(values: LandingBookingFormValues): Promise<LandingApiResponse<null>> {
  const validated = LandingBookingSchema.parse(values);
  const payload: LandingBookingApiPayload = LandingBookingApiPayloadSchema.parse({
    ...validated,
    date: serializeLandingDateToUtc(validated.date),
  });

  try {
    const response = await apiFetch<unknown>(LandingUrlConfig.BACKEND_API.BOOKING, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return throwIfUnsuccessful(parseLandingApiResponse(response));
  } catch (error: unknown) {
    if (error instanceof LandingApiRequestError) throw error;
    if (error instanceof Error && error.message) throw new LandingApiRequestError(error.message);
    throw new LandingApiRequestError('We could not submit your booking. Please try again.');
  }
}

/** Sends a contact message after validating the form payload at the module API boundary. */
export async function sendLandingContactMessage(values: LandingContactFormValues): Promise<LandingApiResponse<null>> {
  const payload: LandingContactApiPayload = LandingContactApiPayloadSchema.parse(LandingContactSchema.parse(values));

  try {
    const response = await apiFetch<unknown>(LandingUrlConfig.BACKEND_API.CONTACT, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return throwIfUnsuccessful(parseLandingApiResponse(response));
  } catch (error: unknown) {
    if (error instanceof LandingApiRequestError) throw error;
    if (error instanceof Error && error.message) throw new LandingApiRequestError(error.message);
    throw new LandingApiRequestError('We could not send your message. Please try again.');
  }
}
