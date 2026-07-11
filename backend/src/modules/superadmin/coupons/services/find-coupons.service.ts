import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';

@Injectable()
export class FindCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
