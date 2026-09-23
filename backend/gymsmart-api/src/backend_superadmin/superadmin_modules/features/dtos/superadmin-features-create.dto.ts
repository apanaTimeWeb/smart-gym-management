// RESPONSIBILITY: Validates creation payloads at the features HTTP boundary.
// FLOW: HTTP JSON -> SuperadminFeaturesCreateDto -> Features service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminFeaturesCreateDto {
  @IsString()
  name!: string;
  @IsString()
  description!: string;
  @IsBoolean()
  isGlobalEnabled!: boolean;
  enabledTenantIds!: Record<string, unknown> | unknown[] | null;
  notes!: Record<string, unknown> | unknown[] | null;
  history!: Record<string, unknown> | unknown[] | null;
}