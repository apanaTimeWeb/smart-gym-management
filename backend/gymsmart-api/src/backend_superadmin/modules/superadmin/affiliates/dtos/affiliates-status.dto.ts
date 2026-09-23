// RESPONSIBILITY: Validates AffiliatesStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { AffiliatesStatus } from '@/backend_superadmin/modules/superadmin/affiliates/dtos/affiliates-update.dto';

export class AffiliatesStatusDto {
  @IsEnum(AffiliatesStatus)
  status!: AffiliatesStatus;
}