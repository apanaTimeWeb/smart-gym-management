// RESPONSIBILITY: Validates the migration trigger request contract at the HTTP boundary.
// FLOW: HTTP JSON -> MigrationsTriggerDto -> migration trigger service.
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class MigrationsTriggerDto {
  @IsString()
  targetVersion!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  targetTenants?: string[];
}