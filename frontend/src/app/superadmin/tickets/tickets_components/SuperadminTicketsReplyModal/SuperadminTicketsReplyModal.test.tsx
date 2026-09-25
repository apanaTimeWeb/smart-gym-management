import { resetSuperadminTicketsMockState } from '@/app/superadmin/tickets/tickets_mocks/handlers/SuperadminTicketsMockHandlers';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SuperadminTicketsReplyModal from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal';
import { useSuperadminTicketReply } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTicketReply';
import toast from 'react-hot-toast';

vi.mock('@/app/superadmin/tickets/tickets_utils/useSuperadminTicketReply', () => ({ useSuperadminTicketReply: vi.fn() }));
vi.mock('@/hooks/useUnsavedChangesGuard', () => ({ useUnsavedChangesGuard: vi.fn() }));
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

const mockedUseReply = vi.mocked(useSuperadminTicketReply);
const mockedToast = vi.mocked(toast);

beforeEach(() => {
  resetSuperadminTicketsMockState();
});

describe('SuperadminTicketsReplyModal', () => {
  beforeEach(() => vi.clearAllMocks());

  it('submits the reply through the feature mutation and closes only after success', async () => {
    const sendReply = vi.fn().mockResolvedValue({ success: true, message: 'Reply sent', data: { id: 'TKT-001' } });
    mockedUseReply.mockReturnValue({ sendReply, isSending: false, error: null });
    const onClose = vi.fn();
    render(<SuperadminTicketsReplyModal isOpen onClose={onClose} ticketId="TKT-001" />);

    fireEvent.change(screen.getByLabelText('Your Message'), { target: { value: 'We have deployed the requested fix.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Reply' }));

    await waitFor(() => expect(sendReply).toHaveBeenCalledWith({ ticketId: 'TKT-001', values: { replyText: 'We have deployed the requested fix.' } }));
    expect(mockedToast.success).toHaveBeenCalledWith('Reply sent', { id: 'superadmin-ticket-reply-TKT-001' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the modal open and reports the failure when the send operation rejects', async () => {
    const sendReply = vi.fn().mockRejectedValue(new Error('Ticket reply failed'));
    mockedUseReply.mockReturnValue({ sendReply, isSending: false, error: null });
    const onClose = vi.fn();
    render(<SuperadminTicketsReplyModal isOpen onClose={onClose} ticketId="TKT-001" />);

    fireEvent.change(screen.getByLabelText('Your Message'), { target: { value: 'Retry this response.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Reply' }));

    await waitFor(() => expect(mockedToast.error).toHaveBeenCalledWith('Ticket reply failed', { id: 'superadmin-ticket-reply-error-TKT-001' }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
