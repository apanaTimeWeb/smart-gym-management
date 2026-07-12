import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Broadcast } from './entities/broadcasts.entity';

@Injectable()
export class BroadcastsRepository {
  constructor(
    @InjectRepository(Broadcast)
    private readonly repo: Repository<Broadcast>,
  ) {}

  async create(data: Partial<Broadcast>): Promise<Broadcast> {
    if (data.scheduledDate === '' as any) data.scheduledDate = null as any;
    if (data.sentDate === '' as any) data.sentDate = null as any;
    
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<Broadcast[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<Broadcast | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<Broadcast>): Promise<Broadcast | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true } as any);
  }
}
