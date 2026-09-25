// RESPONSIBILITY: Validates member export format at the HTTP query boundary.
// FLOW: HTTP query → MembersExportQueryDto → export service.

import { IsIn 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';

export class MembersExportQueryDto {
  @IsIn(['csv']) format: 'csv' = 'csv';

  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

