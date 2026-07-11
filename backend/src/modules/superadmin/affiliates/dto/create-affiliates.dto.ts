import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { AffiliateStatus } from '../affiliates.interfaces';

export class CreateAffiliateDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  referralCode?: string;

  @IsNumber()
  totalReferred: number;

  @IsNumber()
  commissionEarned: number;

  @IsString()
  @IsOptional()
  status?: AffiliateStatus;

  }
