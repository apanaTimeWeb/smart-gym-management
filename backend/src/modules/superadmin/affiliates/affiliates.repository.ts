import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Affiliate } from './entities/affiliates.entity';

@Injectable()
export class AffiliatesRepository {
  constructor(
    @InjectRepository(Affiliate)
    private readonly repo: Repository<Affiliate>,
  ) {}

  async create(data: Partial<Affiliate>): Promise<Affiliate> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<Affiliate[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<Affiliate | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async findByReferralCode(referralCode: string): Promise<Affiliate | null> {
    return await this.repo.findOne({ where: { referralCode, isDeleted: false } });
  }

  async update(id: string, data: Partial<Affiliate>): Promise<Affiliate | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
