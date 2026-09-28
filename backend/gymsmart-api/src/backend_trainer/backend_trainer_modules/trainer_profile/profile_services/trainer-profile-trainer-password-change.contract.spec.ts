// RESPONSIBILITY: Proves the password mutation returns a null success payload as required by the frontend contract.
// FLOW: Jest unit test → password service → mocked master credential/update/audit → null response.
jest.mock('@/backend_trainer/backend_core/core_context/core-request-context', () => ({ CoreRequestContext: { get: () => ({ userId: 'trainer-1', tenantId: 'tenant-1', role: 'TRAINER' }) } }));
import bcrypt from 'bcrypt';
import { TrainerProfileTrainerPasswordChangeService } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_services/trainer-profile-trainer-password-change.service';
import type { TrainerProfileTrainerProfileRepository } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_repositories/trainer-profile-trainer-profile.repository';
import type { CoreMasterUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-master-unit-of-work.service';
import type { CoreAuthAuditRepository } from '@/backend_trainer/backend_core/core_database/core-auth-audit.repository';
import type { TrainerProfileChangePasswordDto } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_dtos/trainer-profile-change-password.dto';
import type { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';

jest.mock('bcrypt', () => ({ compare: jest.fn().mockResolvedValue(true), hash: jest.fn().mockResolvedValue('hashed') }));

test('password change returns null after successful mutation', async () => {
  const repo = { findMasterCredentialByUserId: jest.fn().mockResolvedValue({ passwordHash: 'old' }), updateMasterPasswordHash: jest.fn() };
  const masterUow = { execute: jest.fn(async <T>(fn: (context: CoreTransactionContext) => Promise<T>): Promise<T> => fn({} as CoreTransactionContext)) };
  const authAudit = { createPasswordChangeAudit: jest.fn() };
  const service = new TrainerProfileTrainerPasswordChangeService(repo as unknown as TrainerProfileTrainerProfileRepository, masterUow as unknown as CoreMasterUnitOfWorkService, authAudit as unknown as CoreAuthAuditRepository);
  const result = await service.change({ currentPassword: 'old', newPassword: 'new', confirmPassword: 'new' } as TrainerProfileChangePasswordDto);
  expect(result).toBeNull();
  expect((bcrypt.hash as jest.Mock)).toHaveBeenCalled();
});
