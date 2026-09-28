// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerHrPayrollStaffResponseDto { @ApiProperty() name!: string; @ApiProperty() role!: string; }
export { ManagerHrPayrollStaffResponseDto as HrPayrollStaffResponseDto };
