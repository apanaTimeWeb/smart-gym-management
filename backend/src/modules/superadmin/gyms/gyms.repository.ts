import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Tenant } from './entities/gyms.entity';

@Injectable()
export class GymsRepository {
  constructor(
    @InjectRepository(Tenant)
    private readonly repo: Repository<Tenant>,
  ) {}

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(options?: FindManyOptions<Tenant>): Promise<Tenant[]> {
    return await this.repo.find({ ...options, where: { ...(options?.where as object), isDeleted: false } });
  }

  async count(options?: FindManyOptions<Tenant>): Promise<number> {
    return this.repo.count({ ...options, where: { ...(options?.where as object), isDeleted: false } });
  }

  async findById(id: string): Promise<Tenant | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async findOne(options: FindManyOptions<Tenant>): Promise<Tenant | null> {
    return this.repo.findOne({ ...options, where: { ...(options?.where as object), isDeleted: false } });
  }

  async save(gym: Partial<Tenant>): Promise<Tenant> {
    return this.repo.save(gym);
  }

  async update(id: string, data: Partial<Tenant>): Promise<Tenant | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    const entity = await this.findById(id);
    if (entity) {
      const timestamp = new Date().getTime();
      await this.repo.update(id, {
        isDeleted: true,
        adminEmail: `deleted_${timestamp}_${entity.adminEmail}`,
        name: `deleted_${timestamp}_${entity.name}`,
      });
    }
  }
}
