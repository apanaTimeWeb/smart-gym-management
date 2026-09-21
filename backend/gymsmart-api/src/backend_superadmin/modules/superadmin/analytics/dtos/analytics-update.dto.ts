// RESPONSIBILITY: Validates partial updates at the analytics HTTP boundary.
// FLOW: HTTP JSON -> AnalyticsUpdateDto -> Analytics service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class AnalyticsUpdateDto {
  @IsOptional()
  @IsString()
  kind!: string;
  @IsOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}
