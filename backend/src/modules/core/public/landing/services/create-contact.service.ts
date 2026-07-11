import { Injectable } from '@nestjs/common';
import { LandingRepository } from '../landing.repository';
import { CreateContactDto } from '../dto/create-contact.dto';

@Injectable()
export class CreateContactService {
  constructor(private readonly repository: LandingRepository) {}

  async execute(dto: CreateContactDto) {
    const inquiry = await this.repository.createInquiry({
      ...dto,
      type: 'CONTACT',
    });
    return { success: true, data: inquiry, message: 'Contact inquiry received successfully.' };
  }
}
