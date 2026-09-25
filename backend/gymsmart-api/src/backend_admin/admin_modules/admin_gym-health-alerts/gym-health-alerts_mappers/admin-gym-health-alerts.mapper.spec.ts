// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-gym-health-alerts.mapper.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminGymHealthAlertsEntity } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_entities/admin-gym-health-alerts-entity'
import { AdminGymHealthAlertsMapper } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_mappers/admin-gym-health-alerts.mapper'

describe('AdminGymHealthAlertsMapper', () => {
  it('preserves identity, timestamps, and frontend payload fields', () => {
    const entity = Object.assign(new AdminGymHealthAlertsEntity(), {
      id: '00000000-0000-0000-0000-000000000111',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T01:00:00.000Z'),
      name: 'Fixture',
      status: 'active',
      payload: { visibleField: 'value' },
    });
    const mapper = new AdminGymHealthAlertsMapper();
    const response = mapper.toDomain(entity) as any;
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
