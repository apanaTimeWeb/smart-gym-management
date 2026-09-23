// RESPONSIBILITY: Validates JobsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { JobsStatus } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/dtos/jobs-update.dto';

export class JobsStatusDto {
  @IsEnum(JobsStatus)
  status!: JobsStatus;
}