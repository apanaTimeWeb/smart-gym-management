import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';

@Injectable()
export class DeleteAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
