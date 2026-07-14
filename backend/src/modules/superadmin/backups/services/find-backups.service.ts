import { Injectable , NotFoundException} from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';
import { BackupResponse } from '../backups.interfaces';
import { BACKUPS_MESSAGES, BACKUPS_ERRORS } from '../backups.constants';

@Injectable()
export class FindBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute(): Promise<BackupResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: BACKUPS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<BackupResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new NotFoundException(BACKUPS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: BACKUPS_MESSAGES.FETCHED,
      data
    };
  }
}
