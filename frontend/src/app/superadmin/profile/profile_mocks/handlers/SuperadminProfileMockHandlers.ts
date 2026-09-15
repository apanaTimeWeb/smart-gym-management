import { http, HttpResponse, delay } from 'msw';

const BASE_URL = '*/superadmin/profile';

let mockProfile = {
  id: 'sa_123',
  firstName: 'Satya',
  lastName: 'Nadella',
  email: 'satya@apnatime.com',
  phone: '+91 9876543210',
  role: 'SUPERADMIN',
  timezone: 'Asia/Kolkata',
  language: 'en',
  twoFactorEnabled: false,
  lastLoginAt: new Date().toISOString(),
};

export const superadminProfileHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: mockProfile });
  }),
  http.patch(BASE_URL, async ({ request }) => {
    await delay(500);
    const body = await request.json() as unknown;
    mockProfile = { ...mockProfile, ...body };
    return HttpResponse.json({ success: true, message: 'Profile updated', data: mockProfile });
  }),
  http.patch(`${BASE_URL}/password`, async () => {
    await delay(600);
    return HttpResponse.json({ success: true, message: 'Password updated successfully' });
  }),
  http.patch(`${BASE_URL}/2fa`, async ({ request }) => {
    await delay(500);
    const body = await request.json() as unknown;
    mockProfile.twoFactorEnabled = body.enabled;
    return HttpResponse.json({ success: true, message: '2FA toggled', data: mockProfile });
  }),
];
