// RESPONSIBILITY: Defines one payment snapshot returned by Manager member APIs.
// FLOW: Payment persistence/ledger data -> typed payment snapshot -> member response.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerMembersPaymentStatus } from '@/backend_manager/manager_modules/members/manager-members.constants';
export class ManagerMembersPaymentSnapshotResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() amount!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
  @ApiProperty() paidAt!: string;
  @ApiProperty() method!: string;
  @ApiProperty({ enum: ManagerMembersPaymentStatus }) status!: ManagerMembersPaymentStatus;
  @ApiProperty() invoiceNumber!: string;
}

export { ManagerMembersPaymentSnapshotResponseDto as MembersPaymentSnapshotResponseDto };
