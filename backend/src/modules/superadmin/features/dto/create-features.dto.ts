import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import {  } from '../features.interfaces';

export class CreateFeatureFlagDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isGlobalEnabled?: boolean;

  @IsArray()
  enabledTenantIds: string[];


}
