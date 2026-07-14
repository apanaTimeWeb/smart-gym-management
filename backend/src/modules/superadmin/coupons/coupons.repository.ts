import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupons.entity';

@Injectable()
export class CouponsRepository {
  constructor(
    @InjectRepository(Coupon)
    private readonly repo: Repository<Coupon>,
  ) {}

  async create(data: Partial<Coupon>): Promise<Coupon> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<Coupon[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<Coupon | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async findByCode(code: string): Promise<Coupon | null> {
    return await this.repo.findOne({ where: { code, isDeleted: false } });
  }

  async update(id: string, data: Partial<Coupon>): Promise<Coupon | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
