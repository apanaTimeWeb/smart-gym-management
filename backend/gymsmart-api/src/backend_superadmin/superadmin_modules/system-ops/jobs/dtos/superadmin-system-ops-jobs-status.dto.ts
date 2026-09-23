// RESPONSIBILITY: Validates SuperadminJobsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { JobsStatus } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/dtos/superadmin-system-ops-jobs-update.dto';

export class SuperadminJobsStatusDto {
  @IsEnum(JobsStatus)
  status!: JobsStatus;
}