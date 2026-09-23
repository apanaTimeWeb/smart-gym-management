// RESPONSIBILITY: Validates SuperadminIntegrationsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { IntegrationsStatus } from '@/backend_superadmin/superadmin_modules/integrations/dtos/superadmin-integrations-update.dto';

export class SuperadminIntegrationsStatusDto {
  @IsEnum(IntegrationsStatus)
  status!: IntegrationsStatus;
}