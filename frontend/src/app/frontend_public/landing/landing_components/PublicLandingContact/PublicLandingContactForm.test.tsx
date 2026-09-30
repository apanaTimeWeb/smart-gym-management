import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import enMessages from '@/app/frontend_public/landing/_locales/en.json';
import PublicLandingContact from '@/app/frontend_public/landing/landing_components/PublicLandingContact/PublicLandingContact';
import { landingHandlers } from '@/app/frontend_public/landing/landing_mocks/PublicLandingMockHandlers';
import { landingMockState, resetPublicLandingMockState } from '@/app/frontend_public/landing/landing_mocks/PublicLandingMockFixtures';

const server = setupServer(...landingHandlers);
function renderContact() {
  const queryClient = new QueryClient();
  return render(<NextIntlClientProvider locale="en" messages={enMessages}><QueryClientProvider client={queryClient}><PublicLandingContact /></QueryClientProvider></NextIntlClientProvider>);
}
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); resetPublicLandingMockState(); });
afterAll(() => server.close());

describe('PublicLandingContact', () => {
  it('submits a valid message and displays the backend response message', async () => {
    renderContact();
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'I would like to know more about memberships.' } });
    fireEvent.click(screen.getByTestId('landing-contact-submit'));
    await waitFor(() => expect(screen.getByTestId('landing-contact-success-state')).toBeInTheDocument());
    expect(screen.getByText(/Message sent successfully/)).toBeInTheDocument();
    expect(landingMockState.contacts).toHaveLength(1);
  });

  it('preserves input and recovers after a failed request using the same idempotency key', async () => {
    let attempts = 0;
    const seenKeys: string[] = [];
    server.use(http.post('*/api/landing/contact', async ({ request }) => {
      attempts += 1;
      const key = request.headers.get('Idempotency-Key');
      if (key) seenKeys.push(key);
      if (attempts === 1) return HttpResponse.json({ success: false, message: 'Messaging service is temporarily unavailable. Please try again.', data: null, errorCode: 'CONTACT_SERVICE_UNAVAILABLE' });
      return HttpResponse.json({ success: true, message: 'Message sent successfully. We will get back to you shortly.', data: null });
    }));
    renderContact();
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Need a callback.' } });
    fireEvent.click(screen.getByTestId('landing-contact-submit'));
    await waitFor(() => expect(screen.getByTestId('landing-contact-api-error')).toHaveTextContent('Messaging service is temporarily unavailable'));
    expect(screen.getByLabelText('Message')).toHaveValue('Need a callback.');
    fireEvent.click(screen.getByTestId('landing-contact-retry'));
    await waitFor(() => expect(screen.getByTestId('landing-contact-success-state')).toBeInTheDocument());
    expect(attempts).toBe(2);
    expect(seenKeys[0]).toBe(seenKeys[1]);
  });
});
