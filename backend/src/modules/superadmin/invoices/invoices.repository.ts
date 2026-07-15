import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaaSInvoice } from './entities/invoices.entity';

@Injectable()
export class InvoicesRepository {
  constructor(
    @InjectRepository(SaaSInvoice)
    private readonly repo: Repository<SaaSInvoice>,
  ) {}

  async create(data: Partial<SaaSInvoice>): Promise<SaaSInvoice> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<SaaSInvoice[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<SaaSInvoice | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<SaaSInvoice>): Promise<SaaSInvoice | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
