// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerHrCreateStaffResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiProperty() role!: string;
  @ApiProperty({type:Number}) salary!: number; @ApiProperty() branch!: string; @ApiProperty() gender!: string;
  @ApiPropertyOptional() address?: string; @ApiPropertyOptional() aadhaar?: string; @ApiPropertyOptional() upiId?: string; @ApiPropertyOptional({type:Number}) advanceSalary?: number;
  @ApiProperty() joinDate!: string; @ApiProperty({type:Boolean}) isActive!: boolean; @ApiPropertyOptional() salaryType?: string; @ApiPropertyOptional() paymentCycle?: string; @ApiPropertyOptional({type:Number}) currentDue?: number;
  @ApiPropertyOptional() bankAccountNumber?: string; @ApiPropertyOptional() ifscCode?: string; @ApiPropertyOptional() panNumber?: string; @ApiPropertyOptional() department?: string;
  @ApiPropertyOptional({type:Object}) emergencyContact?: {name:string;phone:string;relation:string}; @ApiPropertyOptional({type:[Object]}) documents?: Array<{type:string;url:string;uploadedAt:string}>;
}
export { ManagerHrCreateStaffResponseDto as HrCreateStaffResponseDto };
