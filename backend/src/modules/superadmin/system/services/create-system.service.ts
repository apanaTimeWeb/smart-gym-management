import { CreateReleaseNoteDto } from '../dto/create-system.dto';
import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';

@Injectable()
export class CreateSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute(dto: CreateReleaseNoteDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
