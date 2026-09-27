// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerHrStaffEmergencyContactResponseDto {
  @ApiProperty() name!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() relation!: string;
}
export class ManagerHrStaffDocumentResponseDto {
  @ApiProperty() type!: string;
  @ApiProperty() url!: string;
  @ApiProperty() uploadedAt!: string;
}
export class ManagerHrStaffItemResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() role!: string;
  @ApiProperty({ type: Number }) salary!: number;
  @ApiProperty() branch!: string;
  @ApiProperty() gender!: string;
  @ApiPropertyOptional() address?: string;
  @ApiPropertyOptional() aadhaar?: string;
  @ApiPropertyOptional() upiId?: string;
  @ApiPropertyOptional({ type: Number }) advanceSalary?: number;
  @ApiProperty() joinDate!: string;
  @ApiProperty({ type: Boolean }) isActive!: boolean;
  @ApiPropertyOptional({ enum: ['Monthly','Daily'] }) salaryType?: string;
  @ApiPropertyOptional({ enum: ['Monthly','Bi-Weekly','Weekly'] }) paymentCycle?: string;
  @ApiPropertyOptional({ type: Number }) currentDue?: number;
  @ApiPropertyOptional() bankAccountNumber?: string;
  @ApiPropertyOptional() ifscCode?: string;
  @ApiPropertyOptional() panNumber?: string;
  @ApiPropertyOptional() department?: string;
  @ApiPropertyOptional({ type: ManagerHrStaffEmergencyContactResponseDto }) emergencyContact?: ManagerHrStaffEmergencyContactResponseDto;
  @ApiPropertyOptional({ type: [ManagerHrStaffDocumentResponseDto] }) documents?: ManagerHrStaffDocumentResponseDto[];
}
export { ManagerHrStaffItemResponseDto as HrStaffItemResponseDto };
