// RESPONSIBILITY: Validates creation payloads at the team HTTP boundary.
// FLOW: HTTP JSON -> TeamCreateDto -> Team service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class TeamCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}
