import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';

@Injectable()
export class UpdateCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(id: string, dto: UpdateCouponsDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
