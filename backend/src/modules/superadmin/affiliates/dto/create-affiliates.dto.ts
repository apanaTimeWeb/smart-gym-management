import {
  IsString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AffiliateStatus } from '../entities/affiliates.entity';

export class CreateAffiliateDto {
  @ApiProperty({ description: 'Full name of the affiliate partner', example: 'Fitness Gurus LLC' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Contact email of the affiliate', example: 'partners@fitnessgurus.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Unique referral tracking code', example: 'FG2026' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  referralCode: string;

  @ApiPropertyOptional({ description: 'Total gyms referred (usually starts at 0)', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalReferred?: number;

  @ApiPropertyOptional({ description: 'Total commission earned in USD', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  commissionEarned?: number;

  @ApiPropertyOptional({ enum: AffiliateStatus, default: AffiliateStatus.ACTIVE })
  @IsOptional()
  @IsEnum(AffiliateStatus)
  status?: AffiliateStatus;

  @ApiPropertyOptional({ description: 'Date they joined the affiliate program (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  joinedAt?: string;
}
