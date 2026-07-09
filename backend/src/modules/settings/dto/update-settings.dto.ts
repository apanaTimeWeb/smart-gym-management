import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @ApiPropertyOptional({ description: 'Gym Name', example: 'GymSmart Fitness' })
  @IsString()
  @IsOptional()
  gymName?: string;

  @ApiPropertyOptional({ description: 'Owner Name', example: 'Admin' })
  @IsString()
  @IsOptional()
  ownerName?: string;

  @ApiPropertyOptional({ description: 'Phone Number', example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Email address',
    example: 'admin@gymsmart.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'City', example: 'New York' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'GST Number', example: 'GSTIN123456789' })
  @IsString()
  @IsOptional()
  gstNumber?: string;
}
