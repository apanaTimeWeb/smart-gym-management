import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';

@Injectable()
export class CreateCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
