// RESPONSIBILITY: Validates optional filters used by the report list endpoints.
// FLOW: HTTP query -> DTO validation -> report data service.
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class ReportsDataQueryDto {
  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;

  @IsOptional()
  @IsString()
  plan?: string;

  @IsOptional()
  @IsString()
  region?: string;
}