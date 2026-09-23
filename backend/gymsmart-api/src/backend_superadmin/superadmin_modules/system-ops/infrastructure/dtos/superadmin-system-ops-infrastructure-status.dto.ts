// RESPONSIBILITY: Validates SuperadminInfrastructureStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { InfrastructureStatus } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/dtos/superadmin-system-ops-infrastructure-update.dto';

export class SuperadminInfrastructureStatusDto {
  @IsEnum(InfrastructureStatus)
  status!: InfrastructureStatus;
}