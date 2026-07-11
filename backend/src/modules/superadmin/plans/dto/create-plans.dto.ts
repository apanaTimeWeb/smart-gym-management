import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import {  } from '../plans.interfaces';

export class CreateSubscriptionPlanDto {
  @IsString()
  name: string;

  @IsNumber()
  priceMonthly: number;

  @IsNumber()
  priceAnnual: number;

  @IsNumber()
  maxMembers: number;

  @IsNumber()
  maxStaff: number;

  @IsArray()
  features: string[];

  @IsNumber()
  activeTenants: number;


}
