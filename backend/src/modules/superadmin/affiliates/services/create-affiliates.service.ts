import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';

@Injectable()
export class CreateAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
