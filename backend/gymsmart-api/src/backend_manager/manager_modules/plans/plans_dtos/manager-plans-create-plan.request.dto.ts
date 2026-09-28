// RESPONSIBILITY: Owns the Manager plans request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsArray, IsBoolean, IsInt, IsNumber, IsString, Matches, Min} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerPlansCreatePlanRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  name!: string;

  @IsString()
  @ApiProperty()
  tier!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  price1Month!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  price3Month!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  price6Month!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  price12Month!: number;

  @IsArray()
  @ApiProperty()
  features!: string[];

  @IsBoolean()
  @ApiProperty()
  isActive!: boolean;

}

export { ManagerPlansCreatePlanRequestDto as PlansCreatePlanRequestDto };
