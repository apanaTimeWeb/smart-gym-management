import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import enMessages from '@/app/frontend_public/landing/_locales/en.json';
import PublicLandingBooking from '@/app/frontend_public/landing/landing_components/PublicLandingBooking/PublicLandingBooking';
import { landingHandlers } from '@/app/frontend_public/landing/landing_mocks/PublicLandingMockHandlers';
import { landingMockState, resetPublicLandingMockState } from '@/app/frontend_public/landing/landing_mocks/PublicLandingMockFixtures';

const server = setupServer(...landingHandlers);
function renderBooking() {
  const queryClient = new QueryClient();
  return render(<NextIntlClientProvider locale="en" messages={enMessages}><QueryClientProvider client={queryClient}><PublicLandingBooking /></QueryClientProvider></NextIntlClientProvider>);
}
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); resetPublicLandingMockState(); });
afterAll(() => server.close());

describe('PublicLandingBooking', () => {
  it('blocks invalid input and accepts non-.com email domains', async () => {
    renderBooking();
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText('Phone / WhatsApp'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText('Preferred Date'), { target: { value: '2026-09-21' } });
    fireEvent.click(screen.getByTestId('landing-booking-submit'));
    await waitFor(() => expect(screen.getByTestId('landing-booking-success-state')).toBeInTheDocument());
    expect(landingMockState.bookings).toHaveLength(1);
    expect(landingMockState.bookings[0]?.email).toBe('member@example.org');
    expect(landingMockState.bookings[0]?.date).toMatch(/T.*Z$/);
  });

  it('surfaces an API error, preserves input, retries with the same user intent, and reaches success', async () => {
    let attempts = 0;
    const seenKeys: string[] = [];
    server.use(http.post('*/api/landing/bookings', async ({ request }) => {
      attempts += 1;
      const key = request.headers.get('Idempotency-Key');
      if (key) seenKeys.push(key);
      if (attempts === 1) return HttpResponse.json({ success: false, message: 'Booking service is temporarily unavailable. Please try again.', data: null, errorCode: 'BOOKING_SERVICE_UNAVAILABLE' });
      return HttpResponse.json({ success: true, message: 'Booking submitted successfully. Our team will contact you shortly.', data: null });
    }));
    renderBooking();
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText('Phone / WhatsApp'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText('Preferred Date'), { target: { value: '2026-09-21' } });
    fireEvent.click(screen.getByTestId('landing-booking-submit'));
    await waitFor(() => expect(screen.getByTestId('landing-booking-api-error')).toHaveTextContent('Booking service is temporarily unavailable'));
    expect(screen.getByLabelText('Email Address')).toHaveValue('member@example.org');
    fireEvent.click(screen.getByTestId('landing-booking-retry'));
    await waitFor(() => expect(screen.getByTestId('landing-booking-success-state')).toBeInTheDocument());
    expect(attempts).toBe(2);
    expect(seenKeys[0]).toBe(seenKeys[1]);
  });
});
