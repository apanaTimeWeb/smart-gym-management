// RESPONSIBILITY: Proves session cancellation fails closed when the session is absent.
// FLOW: Unit test → SessionsCommandService → repository/audit fakes.

import { SessionsCommandService } from '@/backend_trainer/modules/backend_trainer/sessions/services/sessions-command.service';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';

describe('SessionsCommandService', () => {
  it('rejects cancellation of a missing trainer-owned session', async () => {
    const repo = { findByIdOrThrow: jest.fn().mockRejectedValue(new CoreNotFoundException('SESSIONS.SESSION', 'x')) };
    const service = new SessionsCommandService(repo as never, { record: jest.fn() } as never);
    await expect(service.cancelSession('x', { reason: 'reason' })).rejects.toThrow('DOMAIN.SESSIONS.SESSION.NOT_FOUND');
  });
});
