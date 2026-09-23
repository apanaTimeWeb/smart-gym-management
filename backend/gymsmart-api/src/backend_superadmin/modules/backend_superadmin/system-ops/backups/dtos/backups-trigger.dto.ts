// RESPONSIBILITY: Validates BackupsTriggerDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsOptional, IsString } from 'class-validator';

export class BackupsTriggerDto {
  @IsOptional()
  @IsString()
  tenantId?: string;
}