// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-announcements.mapper.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminAnnouncementsEntity } from '@/backend_admin/admin_modules/admin_announcements/announcements_entities/admin-announcements-entity'
import { AdminAnnouncementsMapper } from '@/backend_admin/admin_modules/admin_announcements/announcements_mappers/admin-announcements.mapper'

describe('AdminAnnouncementsMapper', () => {
  it('preserves identity, timestamps, and frontend payload fields', () => {
    const entity = Object.assign(new AdminAnnouncementsEntity(), {
      id: '00000000-0000-0000-0000-000000000111',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T01:00:00.000Z'),
      name: 'Fixture',
      status: 'active',
      payload: { visibleField: 'value' },
    });
    const mapper = new AdminAnnouncementsMapper();
    const response = mapper.toDomain(entity) as any;
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
