// RESPONSIBILITY: Validates creation payloads at the team HTTP boundary.
// FLOW: HTTP JSON -> SuperadminTeamCreateDto -> Team service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminTeamCreateDto {
  @IsString()
  kind!: string;
  payload!: Record<string, unknown> | unknown[] | null;
}