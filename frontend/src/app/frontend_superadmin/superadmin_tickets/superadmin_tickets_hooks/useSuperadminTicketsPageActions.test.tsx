import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminTicketsPageActions } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsPageActions';



const assignTicket = vi.fn();
const closeTicket = vi.fn();
vi.mock('@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsTicketMutations', () => ({
  useSuperadminTicketsTicketMutations: () => ({
    assignTicket,
    closeTicket,
    isAssigning: false,
  }),
}));

describe('useSuperadminTicketsPageActions', () => {
  it('rejects blank assignees and forwards trimmed valid assignments', async () => {
    const { result } = renderHook(() => useSuperadminTicketsPageActions());
    await expect(result.current.handleConfirmAssign('ticket-1', '   ')).resolves.toBe(false);
    expect(assignTicket).not.toHaveBeenCalled();

    await expect(result.current.handleConfirmAssign('ticket-1', '  Priya  ')).resolves.toBe(true);
    expect(assignTicket).toHaveBeenCalledWith({ ticketId: 'ticket-1', input: { assignee: 'Priya' } });
  });
});
