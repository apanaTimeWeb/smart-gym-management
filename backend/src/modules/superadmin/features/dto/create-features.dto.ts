import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import {  } from '../features.interfaces';

export class CreateFeatureFlagDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isGlobalEnabled?: boolean;

  @IsArray()
  @IsOptional()
  enabledTenantIds?: string[];


}
