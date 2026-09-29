// RESPONSIBILITY: Proves the shared repository boundary excludes soft-deleted records by default.
// FLOW: Unit test -> LandingBaseRepository.findById -> active transaction manager -> TypeORM repository mock.
import { Repository } from 'typeorm';

import { LandingBaseEntity } from '@/backend_landing/landing_core/landing_database/landing-base.entity';
import { LandingBaseRepository } from '@/backend_landing/landing_core/landing_database/landing-base.repository';
import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';

/**
 * Intent: Defines the ExampleEntity class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
class ExampleEntity extends LandingBaseEntity {
  id = 'example-1';
}

/**
 * Intent: Defines the ExampleRepository class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
class ExampleRepository extends LandingBaseRepository<ExampleEntity> {
  
  /**
   * Intent: Preserve the single responsibility of landing-base.repository.spec.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(context: LandingOrmTransactionContextService) {
    super(ExampleEntity, context);
  }

  /**
   * @description Test-fixture wrapper used to exercise the base repository nullable lookup contract.
   * @param id - Example entity UUID.
   * @returns Nullable entity result from the shared repository.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-base.repository.spec.find at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
find(id: string): Promise<ExampleEntity | null> {
    return this.findById(id);
  }
}

describe('LandingBaseRepository', () => {
  it('adds deletedAt IS NULL to standard UUID lookups', async () => {
    const findOne = jest.fn().mockResolvedValue(null);
    const repository = { findOne } as unknown as Repository<ExampleEntity>;
    const manager = { getRepository: jest.fn().mockReturnValue(repository) };
    const transactionContext = {
      getManager: jest.fn().mockReturnValue(manager),
    } as unknown as LandingOrmTransactionContextService;

    await new ExampleRepository(transactionContext).find('example-1');

    expect(findOne).toHaveBeenCalledWith({
      where: expect.objectContaining({ id: 'example-1', deletedAt: expect.anything() }),
    });
  });
});
