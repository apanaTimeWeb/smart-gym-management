// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class DashboardFetchDashboardStatsResponseDto {
  @ApiProperty() totalMembers!:number; @ApiProperty() activeMembers!:number; @ApiProperty() newMembersThisMonth!:number;
  @ApiProperty() totalRevenue!:number; @ApiProperty() monthlyRevenue!:number; @ApiProperty() pendingPayments!:number;
  @ApiProperty() totalStaff!:number; @ApiProperty() activeStaff!:number; @ApiProperty() totalProducts!:number; @ApiProperty() lowStockCount!:number;
  @ApiProperty() totalInquiries!:number; @ApiProperty() newInquiries!:number; @ApiProperty() todayAttendance!:number;
  @ApiProperty({ type:Object }) trainerAttendance!: { present:number; total:number };
  @ApiProperty({ type:[Object] }) memberGrowth!:Array<{month:string;count:number}>;
  @ApiProperty({ type:[Object] }) revenueChart!:Array<{month:string;revenue:number}>;
  @ApiProperty({ type:[Object] }) membersByPlan!:Array<{plan:string;count:number}>;
  @ApiProperty({ type:Object }) membersByStatus!: { active:number; pending:number; expired:number };
  @ApiProperty({ type:[Object] }) recentMembers!:Array<{id:string;name:string;plan:string;status:string;joinDate:string;paidAmount:number}>;
  @ApiProperty({ type:[Object] }) recentPayments!:Array<{id:string;invoiceNumber:string;amount:number;method:string;paidAt:string;member:{name:string}}>;
  @ApiProperty({ type:[Object] }) pendingPaymentsList!:Array<{id:string;name:string;pendingAmount:number;expiryDate:string}>;
  @ApiProperty({ type:[Object] }) expiringMemberships!:Array<{id:string;name:string;pendingAmount:number;expiryDate:string}>;
  @ApiProperty() churnRate!:number; @ApiProperty() revenueGrowthPercent!:number; @ApiProperty() todayCollection!:number;
  @ApiProperty() frozenMembershipsCount!:number; @ApiProperty() totalPTRevenue!:number;
}
