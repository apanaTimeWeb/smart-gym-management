import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalAuditLogDto } from './create-audit-logs.dto';

export class UpdateGlobalAuditLogDto extends PartialType(CreateGlobalAuditLogDto) {}
