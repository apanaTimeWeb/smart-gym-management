import { PartialType } from '@nestjs/swagger';
import { CreateBackupDto } from './create-backups.dto';

export class UpdateBackupDto extends PartialType(CreateBackupDto) {}
