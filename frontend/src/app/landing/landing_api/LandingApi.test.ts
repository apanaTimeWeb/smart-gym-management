import { beforeEach, describe, expect, it, vi } from 'vitest';

const { apiFetchMock } = vi.hoisted(() => ({ apiFetchMock: vi.fn() }));
vi.mock('@/lib/api', () => ({ apiFetch: apiFetchMock }));

import { createLandingBooking, sendLandingContactMessage } from '@/app/landing/landing_api/landing_api';

describe('Landing API boundary', () => {
  beforeEach(() => apiFetchMock.mockReset());
  it('serializes booking date to UTC and preserves the API envelope message', async () => {
    apiFetchMock.mockResolvedValueOnce({ success: true, message: 'Created', data: null });

    const response = await createLandingBooking({
      name: 'Member One',
      email: 'member@example.org',
      phone: '9876543210',
      date: '2026-09-21',
      type: 'trial',
    });

    expect(response.message).toBe('Created');
    expect(apiFetchMock).toHaveBeenCalledWith('/landing/booking', expect.objectContaining({ method: 'POST' }));
    const request = JSON.parse(apiFetchMock.mock.calls[0]?.[1]?.body as string) as { date: string };
    expect(request.date).toMatch(/T.*Z$/);
  });

  it('turns an unsuccessful API envelope into a typed error with the backend message', async () => {
    apiFetchMock.mockResolvedValueOnce({
      success: false,
      message: 'Booking is unavailable.',
      data: null,
      errorCode: 'UNAVAILABLE',
    });

    await expect(createLandingBooking({
      name: 'Member One',
      email: 'member@example.org',
      phone: '9876543210',
      date: '2026-09-21',
      type: 'trial',
    })).rejects.toThrow('Booking is unavailable.');
  });

  it('validates contact payloads before making the request', async () => {
    await expect(sendLandingContactMessage({ name: '', email: 'bad', message: '' })).rejects.toThrow();
    expect(apiFetchMock).not.toHaveBeenCalled();
  });
});
