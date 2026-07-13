import { Injectable } from '@nestjs/common';
import { LandingRepository } from '../landing.repository';
import { CreateContactDto } from '../dto/create-contact.dto';
import { LandingResponse, ILandingInquiry } from '../landing.interfaces';
import { LANDING_MESSAGES } from '../landing.constants';

@Injectable()
export class CreateContactService {
  constructor(private readonly repository: LandingRepository) {}

  async execute(dto: CreateContactDto): Promise<LandingResponse<ILandingInquiry>> {
    const inquiry = await this.repository.createInquiry({
      ...dto,
      type: 'CONTACT',
    });
    return { success: true, data: inquiry, message: LANDING_MESSAGES.CONTACT_SUCCESS };
  }
}
