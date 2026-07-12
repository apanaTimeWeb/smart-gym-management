import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingInquiry } from './entities/landing-inquiry.entity';

@Injectable()
export class LandingRepository {
  constructor(
    @InjectRepository(LandingInquiry)
    private readonly repo: Repository<LandingInquiry>,
  ) {}

  async createInquiry(data: Partial<LandingInquiry>): Promise<LandingInquiry> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }
}
