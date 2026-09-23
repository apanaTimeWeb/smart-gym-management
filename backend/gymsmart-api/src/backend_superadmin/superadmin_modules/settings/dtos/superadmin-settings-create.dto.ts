// RESPONSIBILITY: Validates creation payloads at the settings HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSettingsCreateDto -> Settings service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminSettingsCreateDto {
  @IsString()
  key!: string;
  @IsString()
  value!: string;
  @IsString()
  description!: string;
  @IsString()
  category!: string;
  @IsString()
  dataType!: string;
}