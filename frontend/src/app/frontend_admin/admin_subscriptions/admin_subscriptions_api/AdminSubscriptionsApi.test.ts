import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_api/AdminSubscriptionsApi';
import { apiFetch } from '@/lib/api';

vi.mock('@/lib/api', () => ({
  apiFetch: vi.fn(),
}));

describe('AdminSubscriptionsApi mutation request contracts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(apiFetch).mockResolvedValue({ success: true, message: 'ok', data: null });
  });

  it('sends set-default-payment-method as the documented object payload with the intent key', async () => {
    await AdminSubscriptionsApi.setDefaultPaymentMethod('pm-002', 'intent-123');

    expect(apiFetch).toHaveBeenCalledWith(
      '/admin/subscriptions/setDefaultPaymentMethod',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ id: 'pm-002' }),
        headers: { 'Idempotency-Key': 'intent-123' },
      }),
    );
  });

  it('sends upgrade-plan with the documented planId payload and intent key', async () => {
    await AdminSubscriptionsApi.upgradePlan('plan-pro', 'intent-456');

    expect(apiFetch).toHaveBeenCalledWith(
      '/admin/subscriptions/upgradePlan',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ planId: 'plan-pro' }),
        headers: { 'Idempotency-Key': 'intent-456' },
      }),
    );
  });
});
