import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import {  } from '../settings.interfaces';

export class CreateGlobalSettingDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsString()
  group: string;


}
