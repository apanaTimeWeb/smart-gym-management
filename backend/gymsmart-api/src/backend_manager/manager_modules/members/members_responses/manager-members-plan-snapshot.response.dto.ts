// RESPONSIBILITY: Defines the plan snapshot returned inside Manager member responses.
// FLOW: Persisted plan snapshot -> explicit API fields -> member response contract.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerMembersPlanSnapshotResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() tier!: string;
  @ApiProperty() price1Month!: number;
  @ApiProperty() price3Month!: number;
  @ApiProperty() price6Month!: number;
  @ApiProperty() price12Month!: number;
  @ApiProperty({ required: false }) priceCustom?: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerMembersPlanSnapshotResponseDto as MembersPlanSnapshotResponseDto };
