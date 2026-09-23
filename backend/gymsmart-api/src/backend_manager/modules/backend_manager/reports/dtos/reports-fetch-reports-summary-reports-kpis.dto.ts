// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ReportsFetchReportsSummaryReportsKpisDto { @ApiProperty({type:Number}) totalRevenue!:number; @ApiProperty({type:Number}) totalMembers!:number; @ApiProperty({type:Number}) avgAttendanceRate!:number; @ApiProperty({type:Number}) totalExpenses!:number; @ApiProperty({type:Number}) netProfit!:number; @ApiProperty({type:Number}) newMembersThisMonth!:number; @ApiProperty({type:Number}) churnRate!:number; @ApiProperty({type:Number}) activeMembers!:number; }
