import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PublicLandingUrlConfig } from '@/app/frontend_public/landing/landing_url_config';
import { createPublicLandingBooking, sendPublicLandingContactMessage } from '@/app/frontend_public/landing/landing_api/PublicLandingApi';

const { apiFetchMock } = vi.hoisted(() => ({ apiFetchMock: vi.fn() }));
vi.mock('@/lib/api', () => ({ apiFetch: apiFetchMock }));

beforeEach(() => apiFetchMock.mockReset());

describe('PublicLanding API client', () => {
  it('serializes booking dates to UTC and sends the supplied idempotency key', async () => {
    apiFetchMock.mockResolvedValue({ success: true, message: 'ok', data: null });
    await createPublicLandingBooking({ name: 'Member One', email: 'member@example.org', phone: '9876543210', date: '2026-09-21', type: 'trial' }, 'intent-booking-1');
    expect(apiFetchMock).toHaveBeenCalledWith(PublicLandingUrlConfig.BACKEND_API.BOOKING, expect.objectContaining({ method: 'POST', headers: { 'Idempotency-Key': 'intent-booking-1' } }));
    const [, options] = apiFetchMock.mock.calls[0];
    expect(JSON.parse(options.body).date).toMatch(/T.*Z$/);
  });

  it('uses the contact endpoint and idempotency key without exposing the backend transport', async () => {
    apiFetchMock.mockResolvedValue({ success: true, message: 'ok', data: null });
    await sendPublicLandingContactMessage({ name: 'Member One', email: 'member@example.org', message: 'hello' }, 'intent-contact-1');
    expect(apiFetchMock).toHaveBeenCalledWith(PublicLandingUrlConfig.BACKEND_API.CONTACT, expect.objectContaining({ method: 'POST', headers: { 'Idempotency-Key': 'intent-contact-1' } }));
  });

  it('normalizes malformed responses into a safe machine-readable error', async () => {
    apiFetchMock.mockResolvedValue({ nope: true });
    await expect(sendPublicLandingContactMessage({ name: 'Member One', email: 'member@example.org', message: 'hello' }, 'intent-contact-2')).rejects.toMatchObject({ errorCode: 'LANDING_INVALID_RESPONSE', isBackendMessage: false });
  });
});
