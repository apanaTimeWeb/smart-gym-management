import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';

@Injectable()
export class CreateCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(dto: any): Promise<any> {
    return await this.repository.create(dto);
  }
}
