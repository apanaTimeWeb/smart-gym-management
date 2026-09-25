import { resetSuperadminBroadcastsMockState } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SuperadminBroadcastQueueModal from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastQueueModal';
import { useSuperadminBroadcastDelivery } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastDelivery';
import { MOCK_SUPERADMIN_BROADCASTS } from '@/app/superadmin/broadcasts/broadcasts_mocks/fixtures/SuperadminBroadcastsMockFixtures';

vi.mock('@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastDelivery', () => ({ useSuperadminBroadcastDelivery: vi.fn() }));
const mockedUseDelivery = vi.mocked(useSuperadminBroadcastDelivery);

const recipients = [
  { id: 'gym-1', name: 'Iron Peak Fitness', phone: '9876543210' },
  { id: 'gym-2', name: 'FitZone Studio', phone: '9876543211' },
];

beforeEach(() => {
  resetSuperadminBroadcastsMockState();
});

describe('SuperadminBroadcastQueueModal', () => {
  beforeEach(() => vi.clearAllMocks());

  it('delivers each recipient through the feature mutation and reaches completion', async () => {
    const deliverRecipient = vi
      .fn()
      .mockResolvedValueOnce({ success: true, message: 'First delivered', data: { broadcast: MOCK_SUPERADMIN_BROADCASTS[0]!, recipientId: 'gym-1', deliveryStatus: 'DELIVERED', deliveredAt: '2026-09-18T10:00:00Z' } })
      .mockResolvedValue({ success: true, message: 'Broadcast delivery complete', data: { broadcast: MOCK_SUPERADMIN_BROADCASTS[0]!, recipientId: 'gym-2', deliveryStatus: 'DELIVERED', deliveredAt: '2026-09-18T10:01:00Z' } });
    mockedUseDelivery.mockReturnValue({ deliverRecipient, isDelivering: false, deliveryError: null });
    const onComplete = vi.fn();
    render(<SuperadminBroadcastQueueModal isOpen onClose={vi.fn()} recipients={recipients} broadcastId="b1" broadcastTitle="Monthly update" onComplete={onComplete} />);

    await waitFor(() => expect(deliverRecipient).toHaveBeenCalledWith(expect.objectContaining({ broadcastId: 'b1', recipientId: 'gym-1' })));
    await waitFor(() => expect(deliverRecipient).toHaveBeenCalledWith(expect.objectContaining({ broadcastId: 'b1', recipientId: 'gym-2' })));
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith('Broadcast delivery complete'));
    expect(deliverRecipient).toHaveBeenCalledTimes(2);
  });

  it('exposes retry for a failed recipient instead of silently succeeding', async () => {
    const deliverRecipient = vi
      .fn()
      .mockRejectedValueOnce(new Error('Recipient delivery failed'))
      .mockResolvedValue({ success: true, message: 'Retry delivered', data: { broadcast: MOCK_SUPERADMIN_BROADCASTS[0]!, recipientId: 'gym-1', deliveryStatus: 'DELIVERED', deliveredAt: '2026-09-18T10:02:00Z' } });
    mockedUseDelivery.mockReturnValue({ deliverRecipient, isDelivering: false, deliveryError: null });
    const onComplete = vi.fn();
    render(<SuperadminBroadcastQueueModal isOpen onClose={vi.fn()} recipients={[recipients[0]!]} broadcastId="b1" broadcastTitle="Monthly update" onComplete={onComplete} />);

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Recipient delivery failed'));
    fireEvent.click(screen.getByRole('button', { name: 'Retry delivery to Iron Peak Fitness' }));
    await waitFor(() => expect(deliverRecipient).toHaveBeenCalledTimes(2));
    expect(onComplete).toHaveBeenCalledWith('Retry delivered');
  });
});
