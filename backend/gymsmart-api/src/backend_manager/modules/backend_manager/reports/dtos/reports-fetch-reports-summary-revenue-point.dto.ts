// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ReportsFetchReportsSummaryRevenuePointDto { @ApiProperty() month!:string; @ApiProperty({type:Number}) revenue!:number; @ApiProperty({type:Number}) expenses!:number; @ApiProperty({type:Number}) profit!:number; }
