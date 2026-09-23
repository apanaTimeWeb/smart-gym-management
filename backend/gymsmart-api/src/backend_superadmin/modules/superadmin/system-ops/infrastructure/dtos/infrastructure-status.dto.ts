// RESPONSIBILITY: Validates InfrastructureStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { InfrastructureStatus } from '@/backend_superadmin/modules/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-update.dto';

export class InfrastructureStatusDto {
  @IsEnum(InfrastructureStatus)
  status!: InfrastructureStatus;
}