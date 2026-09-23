// RESPONSIBILITY: Validates creation payloads at the reports HTTP boundary.
// FLOW: HTTP JSON -> SuperadminReportsCreateDto -> Reports service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminReportsCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}