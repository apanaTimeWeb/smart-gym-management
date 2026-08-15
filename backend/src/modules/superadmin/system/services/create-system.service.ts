import { CreateReleaseNoteDto } from '../dto/create-system.dto';
import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';
import { SystemResponse } from '../system.interfaces';
import { SYSTEM_MESSAGES } from '../system.constants';

@Injectable()
export class CreateSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute(dto: CreateReleaseNoteDto): Promise<SystemResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: SYSTEM_MESSAGES.CREATED,
      data
    };
  }
}
