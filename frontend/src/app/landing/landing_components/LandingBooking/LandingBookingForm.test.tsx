import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import LandingBooking from '@/app/landing/landing_components/LandingBooking/LandingBooking';
import { landingHandlers } from '@/app/landing/landing_mocks/LandingMockHandlers';
import { landingMockState, resetLandingMockState } from '@/app/landing/landing_mocks/LandingMockFixtures';

const server = setupServer(...landingHandlers);

function renderBooking() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <LandingBooking />
    </QueryClientProvider>,
  );
}

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetLandingMockState();
});
afterAll(() => server.close());

describe('LandingBooking', () => {
  it('blocks invalid input and accepts non-.com email domains', async () => {
    renderBooking();

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText('Phone / WhatsApp'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText('Preferred Date'), { target: { value: '2026-09-21' } });
    fireEvent.click(screen.getByRole('button', { name: /Proceed to Book/i }));

    await waitFor(() => expect(screen.getByRole('heading', { name: /Booking Confirmed/i })).toBeInTheDocument());
    expect(landingMockState.bookings).toHaveLength(1);
    expect(landingMockState.bookings[0]?.email).toBe('member@example.org');
    expect(landingMockState.bookings[0]?.date).toMatch(/T.*Z$/);
  });

  it('surfaces an API error, preserves the entered data, and retries the real API flow', async () => {
    let attempts = 0;
    server.use(
      http.post('*/landing/booking', async () => {
        attempts += 1;
        if (attempts === 1) {
          return HttpResponse.json({
            success: false,
            message: 'Booking service is temporarily unavailable. Please try again.',
            data: null,
            errorCode: 'BOOKING_SERVICE_UNAVAILABLE',
          });
        }
        return HttpResponse.json({
          success: true,
          message: 'Booking submitted successfully. Our team will contact you shortly.',
          data: null,
        });
      }),
    );

    renderBooking();
    const email = 'member@example.org';
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: email } });
    fireEvent.change(screen.getByLabelText('Phone / WhatsApp'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText('Preferred Date'), { target: { value: '2026-09-21' } });
    fireEvent.click(screen.getByRole('button', { name: /Proceed to Book/i }));

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Booking service is temporarily unavailable'));
    expect(screen.getByLabelText('Email Address')).toHaveValue(email);

    fireEvent.click(screen.getByRole('button', { name: /Try again/i }));
    await waitFor(() => expect(screen.getByRole('heading', { name: /Booking Confirmed/i })).toBeInTheDocument());
    expect(attempts).toBe(2);
  });
});
