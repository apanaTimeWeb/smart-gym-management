import { UpdateTenantDto } from '../dto/update-gyms.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantResponse } from '../gyms.interfaces';
import { GYMS_MESSAGES, GYMS_ERRORS } from '../gyms.constants';

@Injectable()
export class StatusGymsService {
  private readonly logger = new Logger(StatusGymsService.name);
  constructor(private readonly repository: GymsRepository) {}

  async execute(id: string, dto: UpdateTenantDto): Promise<TenantResponse> {
    this.logger.log(`Updating gym status ${id}`);
    const gym = await this.repository.findOne({ where: { id } });
    if (!gym) throw new NotFoundException(GYMS_ERRORS.NOT_FOUND);
    
    if (dto.status) gym.status = dto.status;
    await this.repository.save(gym);
    
    return { success: true, message: GYMS_MESSAGES.UPDATED, data: gym };
  }
}
