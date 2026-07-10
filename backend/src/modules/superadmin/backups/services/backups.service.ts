import { DUMMY_BACKUPS } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateBackupDto } from '../dto/create-backups.dto';
import { UpdateBackupDto } from '../dto/update-backups.dto';

@Injectable()
export class BackupsService {
  create(createDto: CreateBackupDto) {
    return { success: true, message: 'This action adds a new backups' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: DUMMY_BACKUPS };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} backups` };
  }

  update(id: string, updateDto: UpdateBackupDto) {
    return { success: true, message: `This action updates a #${id} backups` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} backups` };
  }
}
