// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-audit-logs.mapper.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminAuditLogsEntity } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_entities/admin-audit-logs-entity.js';
import { AdminAuditLogsMapper } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_mappers/admin-audit-logs.mapper.js';

describe('AdminAuditLogsMapper', () => {
  it('preserves identity, timestamps, and frontend payload fields', () => {
    const entity = Object.assign(new AdminAuditLogsEntity(), {
      id: '00000000-0000-0000-0000-000000000111',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T01:00:00.000Z'),
      name: 'Fixture',
      status: 'active',
      payload: { visibleField: 'value' },
    });
    const mapper = new AdminAuditLogsMapper();
    const response = mapper.toDomain(entity as any) as any;
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
