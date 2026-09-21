import { AdminDataExportMapper } from '@/backend_admin/modules/admin/data-export/mappers/admin-data_export.mapper';
import { AdminDataExportEntity } from '@/backend_admin/modules/admin/data-export/entities/admin-data_export-entity';

describe('AdminDataExportMapper', () => {
  it('preserves identity, timestamps, and frontend payload fields', () => {
    const entity = Object.assign(new AdminDataExportEntity(), {
      id: '00000000-0000-0000-0000-000000000111',
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T01:00:00.000Z'),
      name: 'Fixture',
      status: 'active',
      payload: { visibleField: 'value' },
    });
    const mapper = new AdminDataExportMapper();
    const response = mapper.toResponse(mapper.toDomain(entity));
    expect(response).toMatchObject({ id: entity.id, visibleField: 'value' });
    expect(response.createdAt).toBe('2026-09-21T00:00:00.000Z');
    expect(response.updatedAt).toBe('2026-09-21T01:00:00.000Z');
  });
});
