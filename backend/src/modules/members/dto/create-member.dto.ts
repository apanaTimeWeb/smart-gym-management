import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, BillingCycle } from '@/common/enums/database.enums';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  branch: string;

  @ApiProperty()
  @IsNumber()
  planId: number;

  @ApiProperty({ enum: BillingCycle })
  @IsEnum(BillingCycle)
  billingCycle: BillingCycle;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  joinDate?: string;
}
