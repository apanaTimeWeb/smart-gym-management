import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import type {    } from '../system.interfaces';

export class CreateReleaseNoteDto {
  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;


}
