// RESPONSIBILITY: Validates partial updates at the features HTTP boundary.
// FLOW: HTTP JSON -> FeaturesUpdateDto -> Features service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class FeaturesUpdateDto {
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  description!: string;
  @IsOptional()
  @IsBoolean()
  isGlobalEnabled!: boolean;
  @IsOptional()
  enabledTenantIds!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  notes!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  history!: Record<string, unknown> | unknown[] | null;
}
