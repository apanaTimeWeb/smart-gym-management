// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerReportsFetchReportsSummaryRevenuePointDto { @ApiProperty() month!:string; @ApiProperty({type:Number}) revenue!:number; @ApiProperty({type:Number}) expenses!:number; @ApiProperty({type:Number}) profit!:number; @ApiProperty({ description: 'ISO 4217 currency code paired with revenue, expenses, and profit.' }) currency!: string; }

export { ManagerReportsFetchReportsSummaryRevenuePointDto as ReportsFetchReportsSummaryRevenuePointDto };
