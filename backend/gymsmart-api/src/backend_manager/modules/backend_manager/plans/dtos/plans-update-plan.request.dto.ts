// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class PlansUpdatePlanRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  tier!: string;

  @IsNumber()
  @Type(() => Number)
  price1Month!: number;

  @IsNumber()
  @Type(() => Number)
  price3Month!: number;

  @IsNumber()
  @Type(() => Number)
  price6Month!: number;

  @IsNumber()
  @Type(() => Number)
  price12Month!: number;

  @IsArray()
  features!: string[];

  @IsBoolean()
  isActive!: boolean;

}
