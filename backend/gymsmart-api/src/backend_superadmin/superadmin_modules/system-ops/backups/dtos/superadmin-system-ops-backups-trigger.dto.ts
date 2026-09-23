// RESPONSIBILITY: Validates SuperadminBackupsTriggerDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsOptional, IsString } from 'class-validator';

export class SuperadminBackupsTriggerDto {
  @IsOptional()
  @IsString()
  tenantId?: string;
}