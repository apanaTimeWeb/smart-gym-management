import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfrastructureNode } from './entities/infrastructure.entity';

@Injectable()
export class InfrastructureRepository {
  constructor(
    @InjectRepository(InfrastructureNode)
    private readonly repo: Repository<InfrastructureNode>,
  ) {}

  async findAll(): Promise<InfrastructureNode[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<InfrastructureNode | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<InfrastructureNode>): Promise<InfrastructureNode> {
    const node = this.repo.create(data);
    return this.repo.save(node);
  }

  async update(id: string, data: Partial<InfrastructureNode>): Promise<InfrastructureNode | null> {
    await this.repo.update(id, data as any);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
