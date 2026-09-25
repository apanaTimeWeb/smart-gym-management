// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-hr.mapper.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminCoreEncryptionService } from '@/backend_admin/admin_core/admin_core_security/admin-core-encryption.service.js';

import { AdminHrEntity } from '@/backend_admin/admin_modules/admin_hr/hr_entities/admin-hr-entity.js';
import { AdminHrMapper } from '@/backend_admin/admin_modules/admin_hr/hr_mappers/admin-hr.mapper.js';

describe('AdminHrMapper', () => {
  it('preserves identity, timestamps, and frontend payload fields', () => {
    const entity = Object.assign(new AdminHrEntity(), {
      id: '00000000-0000-0000-0000-000000000111',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T01:00:00.000Z'),
      name: 'Fixture',
      status: 'active',
      payload: { visibleField: 'value' },
    });
    const mockEncryption = { encrypt: (v: string) => v, decrypt: (v: string) => v, isEncrypted: (_: string) => false } as AdminCoreEncryptionService;
    const mapper = new AdminHrMapper(mockEncryption);
    const response: Record<string, unknown> = mapper.toDomain(entity) as any;
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
