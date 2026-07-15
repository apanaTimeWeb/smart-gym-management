import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EmailTenantDto } from '../dto/email-gyms.dto';
import { GymsRepository } from '../gyms.repository';
import { TenantResponse } from '../gyms.interfaces';
import { GYMS_MESSAGES } from '../gyms.constants';

@Injectable()
export class EmailGymsService {
  private readonly logger = new Logger(EmailGymsService.name);

  constructor(private readonly repository: GymsRepository) {}
  
  async execute(id: string, dto: EmailTenantDto): Promise<TenantResponse> {
    const gym = await this.repository.findById(id);
    if (!gym) {
      throw new NotFoundException(`Gym with ID ${id} not found`);
    }

    // MOCK EMAIL LOGIC
    this.logger.log(`[MOCK EMAIL] Sending to: ${gym.adminEmail}`);
    this.logger.log(`[MOCK EMAIL] Subject: ${dto.subject}`);
    this.logger.log(`[MOCK EMAIL] Message: ${dto.message}`);
    
    // In a real scenario, we would trigger an EventBus or EmailService here.
    
    return {
      success: true,
      message: 'Email sent successfully',
      data: null
    };
  }
}
