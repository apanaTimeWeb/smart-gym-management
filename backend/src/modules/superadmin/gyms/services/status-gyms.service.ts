import { UpdateTenantDto } from '../dto/update-gyms.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class StatusGymsService {
  private readonly logger = new Logger(StatusGymsService.name);
  constructor(private readonly repository: GymsRepository) {}

  async execute(id: string, dto: UpdateTenantDto) {
    this.logger.log(`Updating gym status ${id}`);
    const gym = await this.repository.findOne({ where: { id } });
    if (!gym) throw new NotFoundException('Gym not found');
    
    gym.status = dto.status;
    await this.repository.save(gym);
    
    return { success: true, data: gym };
  }
}
