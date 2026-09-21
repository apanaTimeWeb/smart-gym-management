// RESPONSIBILITY: Validates creation payloads at the reports HTTP boundary.
// FLOW: HTTP JSON -> ReportsCreateDto -> Reports service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class ReportsCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}
