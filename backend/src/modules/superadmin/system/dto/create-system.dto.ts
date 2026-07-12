import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import {  } from '../system.interfaces';

export class CreateReleaseNoteDto {
  @IsString()
  version: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;


}
