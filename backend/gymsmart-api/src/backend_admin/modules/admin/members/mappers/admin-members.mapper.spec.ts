import { AdminMembersMapper } from '@/backend_admin/modules/admin/members/mappers/admin-members.mapper';
import { AdminMembersEntity } from '@/backend_admin/modules/admin/members/entities/admin-members-entity';

describe('AdminMembersMapper', () => {
  it('preserves identity, timestamps, and frontend payload fields', () => {
    const entity = Object.assign(new AdminMembersEntity(), {
      id: '00000000-0000-0000-0000-000000000111',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T01:00:00.000Z'),
      name: 'Fixture',
      status: 'active',
      payload: { visibleField: 'value' },
    });
    const mapper = new AdminMembersMapper();
    const response: any = mapper.toResponse(mapper.toDomain(entity as any));
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
