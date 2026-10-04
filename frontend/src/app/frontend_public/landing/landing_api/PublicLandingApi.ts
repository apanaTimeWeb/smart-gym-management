// RESPONSIBILITY: Owns PublicLanding HTTP request construction, runtime response validation, and safe transport-error normalization.
import { apiFetch } from '@/lib/api';
import { LANDING_API_ERROR_CODES } from '@/app/frontend_public/landing/landing_constants/PublicLandingApiErrorConstants';
import { PublicLandingUrlConfig } from '@/app/frontend_public/landing/landing_url_config';
import { PublicLandingBookingApiPayloadSchema, PublicLandingBookingSchema } from '@/app/frontend_public/landing/landing_schemas/PublicLandingBookingSchema';
import { PublicLandingContactApiPayloadSchema, PublicLandingContactSchema } from '@/app/frontend_public/landing/landing_schemas/PublicLandingContactSchema';
import { PublicLandingNullApiResponseSchema } from '@/app/frontend_public/landing/landing_schemas/PublicLandingApiResponseSchema';
import { serializePublicLandingDateToUtc } from '@/app/frontend_public/landing/landing_utils/PublicLandingDateUtils';
import { PublicLandingApiRequestError } from '@/app/frontend_public/landing/landing_types/PublicLandingTypes';
import type { PublicLandingApiResponse, PublicLandingBookingApiPayload, PublicLandingBookingFormValues, PublicLandingContactApiPayload, PublicLandingContactFormValues } from '@/app/frontend_public/landing/landing_types/PublicLandingTypes';

function parsePublicLandingApiResponse(value: unknown): PublicLandingApiResponse<null> {
  const parsed = PublicLandingNullApiResponseSchema.safeParse(value);
  if (!parsed.success) {
    throw new PublicLandingApiRequestError('', {
      errorCode: LANDING_API_ERROR_CODES.INVALID_RESPONSE,
      isBackendMessage: false,
    });
  }
  return parsed.data as PublicLandingApiResponse<null>;
}

function resolvePublicLandingFailure(response: PublicLandingApiResponse<null>): PublicLandingApiResponse<null> {
  if (!response.success) {
    throw new PublicLandingApiRequestError(response.message, {
      errorCode: response.errorCode,
      validationErrors: response.validationErrors,
      statusCode: response.statusCode,
      isBackendMessage: true,
    });
  }
  return response;
}

/** Creates a booking with Zod validation, UTC serialization, canonical API-envelope validation, and the supplied idempotency key. */
export async function createPublicLandingBooking(values: PublicLandingBookingFormValues, idempotencyKey: string): Promise<PublicLandingApiResponse<null>> {
  const validated = PublicLandingBookingSchema.parse(values);
  const payload: PublicLandingBookingApiPayload = PublicLandingBookingApiPayloadSchema.parse({
    ...validated,
    date: serializePublicLandingDateToUtc(validated.date),
  });

  try {
    const response = await apiFetch<unknown>(PublicLandingUrlConfig.BACKEND_API.BOOKING, {
      method: 'POST',
      auth: false,
      body: JSON.stringify(payload),
      headers: { 'Idempotency-Key': idempotencyKey },
    });
    return resolvePublicLandingFailure(parsePublicLandingApiResponse(response));
  } catch (error: unknown) {
    if (error instanceof PublicLandingApiRequestError) throw error;
    throw new PublicLandingApiRequestError('', { errorCode: LANDING_API_ERROR_CODES.BOOKING_REQUEST_FAILED });
  }
}

/** Sends a contact message with Zod validation, canonical API-envelope validation, and the supplied idempotency key. */
export async function sendPublicLandingContactMessage(values: PublicLandingContactFormValues, idempotencyKey: string): Promise<PublicLandingApiResponse<null>> {
  const payload: PublicLandingContactApiPayload = PublicLandingContactApiPayloadSchema.parse(PublicLandingContactSchema.parse(values));

  try {
    const response = await apiFetch<unknown>(PublicLandingUrlConfig.BACKEND_API.CONTACT, {
      method: 'POST',
      auth: false,
      body: JSON.stringify(payload),
      headers: { 'Idempotency-Key': idempotencyKey },
    });
    return resolvePublicLandingFailure(parsePublicLandingApiResponse(response));
  } catch (error: unknown) {
    if (error instanceof PublicLandingApiRequestError) throw error;
    throw new PublicLandingApiRequestError('', { errorCode: LANDING_API_ERROR_CODES.CONTACT_REQUEST_FAILED });
  }
}
