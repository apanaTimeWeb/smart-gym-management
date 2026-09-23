// RESPONSIBILITY: Validates Superadmin API-key generation payloads including explicit permission scopes.
// FLOW: HTTP JSON -> SuperadminIntegrationsGenerateKeyDto -> key service -> repository.
import { ArrayMinSize, IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { IntegrationKeyScope } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';

export class SuperadminIntegrationsGenerateKeyDto {
  @IsString()
  label!: string;

  @IsUUID()
  tenantId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(IntegrationKeyScope, { each: true })
  scopes!: IntegrationKeyScope[];
}