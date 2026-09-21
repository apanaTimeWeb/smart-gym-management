import { AdminHrMapper } from '@/backend_admin/modules/admin/hr/mappers/admin-hr.mapper';
import { AdminHrEntity } from '@/backend_admin/modules/admin/hr/entities/admin-hr-entity';

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
    const mockEncryption = { encrypt: (v: string) => v, decrypt: (v: string) => v, isEncrypted: (_: string) => false } as any;
    const mapper = new AdminHrMapper(mockEncryption);
    const response: any = mapper.toResponse(mapper.toDomain(entity as any));
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
