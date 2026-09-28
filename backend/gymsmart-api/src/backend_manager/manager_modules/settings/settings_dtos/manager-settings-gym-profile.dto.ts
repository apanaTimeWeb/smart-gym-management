// RESPONSIBILITY: Owns the Manager settings request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates Manager gym profile update fields.
// FLOW: Request payload -> strict DTO validation -> Settings update use case.
import { IsEmail, IsOptional, IsString, IsUrl, Matches } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerSettingsGymProfileDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  gymName!: string;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional()
  logoUrl?: string;

  @IsString()
  @ApiProperty()
  address!: string;

  @IsString()
  @ApiProperty()
  city!: string;

  @IsString()
  @ApiProperty()
  state!: string;

  @IsString()
  @Matches(/^\d{6}$/)
  @ApiProperty()
  pincode!: string;

  @IsString()
  @ApiProperty()
  phone!: string;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional()
  website?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  gstin?: string;
}

export { ManagerSettingsGymProfileDto as SettingsGymProfileDto };
