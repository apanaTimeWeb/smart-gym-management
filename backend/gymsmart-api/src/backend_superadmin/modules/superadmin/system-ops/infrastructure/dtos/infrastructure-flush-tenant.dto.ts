// RESPONSIBILITY: Validates InfrastructureFlushTenantDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class InfrastructureFlushTenantDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  tenantIds!: string[];
}