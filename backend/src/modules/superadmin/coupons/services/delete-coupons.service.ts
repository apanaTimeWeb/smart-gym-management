import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';

@Injectable()
export class DeleteCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
