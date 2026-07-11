import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class StatusGymsService {
  constructor(private readonly repository: GymsRepository) {}
  async execute(id: string, dto: any) { return { success: true, data: {} }; }
}
