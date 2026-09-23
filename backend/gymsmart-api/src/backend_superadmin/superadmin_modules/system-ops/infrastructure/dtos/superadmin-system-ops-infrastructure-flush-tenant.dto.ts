// RESPONSIBILITY: Validates SuperadminInfrastructureFlushTenantDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class SuperadminInfrastructureFlushTenantDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  tenantIds!: string[];
}