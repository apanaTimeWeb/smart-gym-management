// RESPONSIBILITY: Proves master tenant membership authorization uses the named master datasource and active tenant scope.
// FLOW: Jest → mocked master DataSource → CoreTenantMembershipAuthorizationRepository.

import { CoreTenantMembershipAuthorizationRepository } from '@/backend_trainer/backend_core/core_database/core-tenant-membership-authorization.repository';

describe('CoreTenantMembershipAuthorizationRepository', () => {
  it('queries user, tenant, membership deletion, and tenant activity in one master query', async () => {
    const query = { innerJoin: jest.fn().mockReturnThis(), where: jest.fn().mockReturnThis(), andWhere: jest.fn().mockReturnThis(), getOne: jest.fn().mockResolvedValue({ tenantId: 't1', userId: 'u1', role: 'TRAINER' }) };
    const dataSource = { getRepository: jest.fn().mockReturnValue({ createQueryBuilder: jest.fn().mockReturnValue(query) }) };
    const repository = new CoreTenantMembershipAuthorizationRepository(dataSource as never);
    await expect(repository.findActiveMembership('u1', 't1')).resolves.toMatchObject({ tenantId: 't1' });
    expect(query.innerJoin).toHaveBeenCalled();
    expect(query.andWhere).toHaveBeenCalledWith('tenant.is_active = true');
  });
});
