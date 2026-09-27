// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerProfileUpdateProfileResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiProperty() role!: string; @ApiProperty() branchName!: string; @ApiProperty() joinedAt!: string; @ApiProperty() avatarInitial!: string; }
export { ManagerProfileUpdateProfileResponseDto as ProfileUpdateProfileResponseDto };
