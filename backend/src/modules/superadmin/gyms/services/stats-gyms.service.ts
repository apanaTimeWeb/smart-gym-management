import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class StatsGymsService {
  constructor(private readonly repository: GymsRepository) {}
  async execute() { return { success: true, stats: {} }; }
}
