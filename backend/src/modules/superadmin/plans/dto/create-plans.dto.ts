import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import {  } from '../plans.interfaces';

export class CreateSubscriptionPlanDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  priceMonthly?: number;

  @IsNumber()
  @IsOptional()
  priceAnnual?: number;

  @IsNumber()
  @IsOptional()
  maxMembers?: number;

  @IsNumber()
  @IsOptional()
  maxStaff?: number;

  @IsArray()
  @IsOptional()
  features?: string[];

  @IsNumber()
  @IsOptional()
  activeTenants?: number;


}
