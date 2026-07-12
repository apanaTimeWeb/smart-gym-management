import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { InquiryStatus } from '../utils/inquiries.enums';

export class CreateInquiryDto {
  @ApiProperty({ description: 'Inquirer name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Phone number', example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    description: 'Email address',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Interest (e.g. Weight Loss, Muscle Gain)',
    example: 'Weight Loss',
  })
  @IsString()
  interest: string;

  @ApiProperty({ description: 'Lead source', example: 'Website' })
  @IsString()
  source: string;

  @ApiPropertyOptional({
    description: 'Inquiry status',
    enum: InquiryStatus,
    default: InquiryStatus.NEW,
  })
  @IsEnum(InquiryStatus)
  @IsOptional()
  status?: InquiryStatus = InquiryStatus.NEW;

  @ApiPropertyOptional({
    description: 'Notes',
    example: 'Interested in annual plan',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
