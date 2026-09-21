// RESPONSIBILITY: Proves the shared repository boundary excludes soft-deleted records by default.
// FLOW: Unit test → CoreBaseRepository.findById → TypeORM repository mock.
import { Repository } from 'typeorm';

import { CoreBaseEntity } from '@/backend_landing/core/database/base.entity';
import { CoreBaseRepository } from '@/backend_landing/core/database/base.repository';

import type { TransactionContext } from '@/backend_landing/core/database/transaction-context';

class ExampleEntity extends CoreBaseEntity {
  id = 'example-1';
}

class ExampleRepository extends CoreBaseRepository<ExampleEntity> {
  constructor() {
    super(ExampleEntity);
  }

  find(context: TransactionContext, id: string): Promise<ExampleEntity | null> {
    return this.findById(context, id);
  }
}

describe('CoreBaseRepository', () => {
  it('adds deletedAt IS NULL to standard UUID lookups', async () => {
    const findOne = jest.fn().mockResolvedValue(null);
    const repository = { findOne } as unknown as Repository<ExampleEntity>;
    const manager = { getRepository: jest.fn().mockReturnValue(repository) };
    const context = { manager } as unknown as TransactionContext;

    await new ExampleRepository().find(context, 'example-1');

    expect(findOne).toHaveBeenCalledWith({
      where: expect.objectContaining({ id: 'example-1', deletedAt: expect.anything() }),
    });
  });
});
