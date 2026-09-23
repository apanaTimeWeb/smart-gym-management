// RESPONSIBILITY: Validates SuperadminAffiliatesStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { AffiliatesStatus } from '@/backend_superadmin/superadmin_modules/affiliates/dtos/superadmin-affiliates-update.dto';

export class SuperadminAffiliatesStatusDto {
  @IsEnum(AffiliatesStatus)
  status!: AffiliatesStatus;
}