import { PartialType } from '@nestjs/mapped-types';
import { CreateBackupRecordDto } from './create-backups.dto';

export class UpdateBackupRecordDto extends PartialType(CreateBackupRecordDto) {}
