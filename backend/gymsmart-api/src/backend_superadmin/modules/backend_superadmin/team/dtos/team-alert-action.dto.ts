// RESPONSIBILITY: Validates TeamAlertActionDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsOptional, IsString } from 'class-validator';

export class TeamAlertActionDto {
  @IsString()
  action!: string;
  @IsOptional()
  @IsString()
  id?: string;
}