import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/gyms.entity';

@Injectable()
export class GymsRepository {
  async count(options?: any): Promise<number> {
    const opts = options || {};
    opts.where = { ...opts.where, isDeleted: false };
    return this.repo.count(opts);
  }
  
  async findOne(options: any): Promise<any> {
    const opts = options || {};
    opts.where = { ...opts.where, isDeleted: false };
    return this.repo.findOne(opts);
  }
  
  async save(gym: any): Promise<any> {
    return this.repo.save(gym);
  }

  constructor(
    @InjectRepository(Tenant)
    private readonly repo: Repository<Tenant>,
  ) {}

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<Tenant[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<Tenant | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
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
        name: `deleted_${timestamp}_${entity.name}`
      } as any);
    }
  }
}
