// RESPONSIBILITY: Validates WhiteLabelingStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { WhiteLabelingStatus } from '@/backend_superadmin/modules/backend_superadmin/white-labeling/dtos/white-labeling-update.dto';

export class WhiteLabelingStatusDto {
  @IsEnum(WhiteLabelingStatus)
  status!: WhiteLabelingStatus;
}