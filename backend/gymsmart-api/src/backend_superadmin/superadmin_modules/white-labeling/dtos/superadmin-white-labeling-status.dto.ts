// RESPONSIBILITY: Validates SuperadminWhiteLabelingStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { WhiteLabelingStatus } from '@/backend_superadmin/superadmin_modules/white-labeling/dtos/superadmin-white-labeling-update.dto';

export class SuperadminWhiteLabelingStatusDto {
  @IsEnum(WhiteLabelingStatus)
  status!: WhiteLabelingStatus;
}