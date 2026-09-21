// RESPONSIBILITY: Validates creation payloads at the analytics HTTP boundary.
// FLOW: HTTP JSON -> AnalyticsCreateDto -> Analytics service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class AnalyticsCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}
