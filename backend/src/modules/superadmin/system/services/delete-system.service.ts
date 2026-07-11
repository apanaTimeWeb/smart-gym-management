import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';

@Injectable()
export class DeleteSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
