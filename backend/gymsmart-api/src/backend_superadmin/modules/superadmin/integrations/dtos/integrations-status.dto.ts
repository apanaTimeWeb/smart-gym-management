// RESPONSIBILITY: Validates IntegrationsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { IntegrationsStatus } from '@/backend_superadmin/modules/superadmin/integrations/dtos/integrations-update.dto';

export class IntegrationsStatusDto {
  @IsEnum(IntegrationsStatus)
  status!: IntegrationsStatus;
}