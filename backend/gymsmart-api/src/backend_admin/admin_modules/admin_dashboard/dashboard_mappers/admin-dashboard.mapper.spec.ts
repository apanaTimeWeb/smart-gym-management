// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-dashboard.mapper.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminDashboardEntity } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_entities/admin-dashboard-entity'
import { AdminDashboardMapper } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_mappers/admin-dashboard.mapper'

describe('AdminDashboardMapper', () => {
  it('preserves identity, timestamps, and frontend payload fields', () => {
    const entity = Object.assign(new AdminDashboardEntity(), {
      id: '00000000-0000-0000-0000-000000000111',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T01:00:00.000Z'),
      name: 'Fixture',
      status: 'active',
      payload: { visibleField: 'value' },
    });
    const mapper = new AdminDashboardMapper();
    const response = mapper.toDomain(entity) as any;
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
