// RESPONSIBILITY: Validates partial updates at the team HTTP boundary.
// FLOW: HTTP JSON -> TeamUpdateDto -> Team service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class TeamUpdateDto {
  @IsOptional()
  @IsString()
  kind!: string;
  @IsOptional()
  payload!: Record<string, unknown> | unknown[] | null;
}
