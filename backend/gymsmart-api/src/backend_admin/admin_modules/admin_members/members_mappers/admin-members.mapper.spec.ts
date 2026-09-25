// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-members.mapper.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminMembersEntity } from '@/backend_admin/admin_modules/admin_members/members_entities/admin-members-entity'
import { AdminMembersMapper } from '@/backend_admin/admin_modules/admin_members/members_mappers/admin-members.mapper'

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
    const response: Record<string, unknown> = mapper.toDomain(entity) as any;
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
