// RESPONSIBILITY: Provides repository-only access helpers for UUID entities and consistent soft-delete filtering.
// FLOW: Service → concrete repository → CoreBaseRepository helper → TypeORM repository.
import { IsNull, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import type { CoreBaseEntity } from '@/core/database/base.entity';

export abstract class CoreBaseRepository<TEntity extends CoreBaseEntity> {
  protected constructor(protected readonly repository: Repository<TEntity>) {}

  /** @description Finds one non-deleted entity by UUID. @param id - Entity UUID. @returns Entity or null. */
  async findById(id: string): Promise<TEntity | null> {
    return this.repository.findOne({ where: { id, deletedAt: IsNull() } as never });
  }

  /** @description Finds one non-deleted entity or fails immediately. @param id - Entity UUID. @returns Non-deleted entity. @throws NotFoundException when the entity does not exist. */
  async findByIdOrThrow(id: string): Promise<TEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException(`Resource ${id} was not found.`);
    return entity;
  }
}
