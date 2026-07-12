import { UpdateReleaseNoteDto } from '../dto/update-system.dto';
import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';

@Injectable()
export class UpdateSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute(id: string, dto: UpdateReleaseNoteDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
