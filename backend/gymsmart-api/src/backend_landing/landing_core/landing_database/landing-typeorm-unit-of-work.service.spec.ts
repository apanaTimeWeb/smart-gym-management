// RESPONSIBILITY: Proves the UnitOfWork exposes only application work while binding the ORM manager inside infrastructure.
// FLOW: Unit test -> LandingTypeormUnitOfWorkService -> DataSource.transaction -> LandingOrmTransactionContextService.
import { LandingTypeormUnitOfWorkService } from '@/backend_landing/landing_core/landing_database/landing-typeorm-unit-of-work.service';

describe('LandingTypeormUnitOfWorkService', () => {
  it('does not pass a TypeORM manager into application callback code', async () => {
    let callbackArgumentCount = -1;
    const manager = { marker: 'typeorm-manager' };
    const transactionContext = {
      run: jest.fn(async (_manager: unknown, work: () => Promise<string>) => work()),
    };
    const dataSource = {
      transaction: jest.fn(async (work: (manager: unknown) => Promise<string>) => work(manager)),
    };
    const tenantContext = {
      resolveTenantDataSource: jest.fn().mockResolvedValue(dataSource),
    };
    const service = new LandingTypeormUnitOfWorkService(
      tenantContext as never,
      transactionContext as never,
    );

    const result = await service.runInTransaction(async (...args: never[]) => {
      callbackArgumentCount = args.length;
      return 'committed';
    });

    expect(result).toBe('committed');
    expect(callbackArgumentCount).toBe(0);
    expect(transactionContext.run).toHaveBeenCalledWith(manager, expect.any(Function));
  });
});
