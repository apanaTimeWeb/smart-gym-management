// RESPONSIBILITY: Validates Superadmin API-key generation payloads including explicit permission scopes.
// FLOW: HTTP JSON -> IntegrationsGenerateKeyDto -> key service -> repository.
import { ArrayMinSize, IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { IntegrationKeyScope } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.constants';

export class IntegrationsGenerateKeyDto {
  @IsString()
  label!: string;

  @IsUUID()
  tenantId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(IntegrationKeyScope, { each: true })
  scopes!: IntegrationKeyScope[];
}