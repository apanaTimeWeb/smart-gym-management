// RESPONSIBILITY: Proves session cancellation returns the frozen null success payload and preserves transactional collaborators.
// FLOW: Jest unit test → TrainerSessionsCommandService.cancelSession → mocked repository/UoW/audit → null contract.
jest.mock('@/backend_trainer/backend_core/core_context/core-request-context', () => ({ CoreRequestContext: { get: () => ({ userId: 'trainer-1', tenantId: 'tenant-1', role: 'TRAINER' }) } }));
import { TrainerSessionsCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-command.service';
import type { TrainerSessionsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_repositories/trainer-sessions-repository';
import type { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import type { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import type { TrainerSessionsCancelSessionDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-cancel-session.dto';
import type { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';

test('cancelSession returns null after successful cancellation', async () => {
  const repo = {
    findByIdOrThrow: jest.fn().mockResolvedValue({ id: 's1', status: 'UPCOMING' }),
    cancelSession: jest.fn().mockResolvedValue({ id: 's1', status: 'CANCELLED' }),
  };
  const audit = { record: jest.fn().mockResolvedValue(undefined) };
  const uow = { execute: jest.fn(async <T>(fn: (context: CoreTransactionContext) => Promise<T>): Promise<T> => fn({} as CoreTransactionContext)) };
  const service = new TrainerSessionsCommandService(repo as unknown as TrainerSessionsRepository, audit as unknown as CoreAuditService, uow as unknown as CoreUnitOfWorkService);
  expect((await service.cancelSession('s1', { reason: 'Trainer cancelled session' } as TrainerSessionsCancelSessionDto))).toBeNull();
  expect(repo.cancelSession).toHaveBeenCalled();
  expect(audit.record).toHaveBeenCalled();
});
