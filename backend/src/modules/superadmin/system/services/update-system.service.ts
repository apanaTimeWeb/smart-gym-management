import { UpdateReleaseNoteDto } from '../dto/update-system.dto';
import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';
import { SystemResponse } from '../system.interfaces';
import { SYSTEM_MESSAGES } from '../system.constants';

@Injectable()
export class UpdateSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute(id: string, dto: UpdateReleaseNoteDto): Promise<SystemResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: SYSTEM_MESSAGES.UPDATED,
      data
    };
  }
}
