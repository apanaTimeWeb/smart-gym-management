import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import LandingContact from '@/app/landing/landing_components/LandingContact/LandingContact';
import { landingHandlers } from '@/app/landing/landing_mocks/LandingMockHandlers';
import { resetLandingMockState } from '@/app/landing/landing_mocks/LandingMockFixtures';

const server = setupServer(...landingHandlers);

function renderContact() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <LandingContact />
    </QueryClientProvider>,
  );
}

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetLandingMockState();
});
afterAll(() => server.close());

describe('LandingContact', () => {
  it('submits a valid message and displays the backend response message', async () => {
    renderContact();
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'I would like to know more about memberships.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Message Sent!' })).toBeInTheDocument());
    expect(screen.getByText(/Message sent successfully/)).toBeInTheDocument();
  });

  it('preserves input and recovers after a failed request', async () => {
    let attempts = 0;
    server.use(
      http.post('*/landing/contact', async () => {
        attempts += 1;
        if (attempts === 1) {
          return HttpResponse.json({
            success: false,
            message: 'Messaging service is temporarily unavailable. Please try again.',
            data: null,
            errorCode: 'CONTACT_SERVICE_UNAVAILABLE',
          });
        }
        return HttpResponse.json({
          success: true,
          message: 'Message sent successfully. We will get back to you shortly.',
          data: null,
        });
      }),
    );

    renderContact();
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Member One' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'member@example.org' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Need a callback.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Messaging service is temporarily unavailable'));
    expect(screen.getByLabelText('Message')).toHaveValue('Need a callback.');

    fireEvent.click(screen.getByRole('button', { name: /Try again/i }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Message Sent!' })).toBeInTheDocument());
    expect(attempts).toBe(2);
  });
});
