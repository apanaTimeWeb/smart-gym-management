// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ReportsFetchReportsSummaryExpenseBreakdownDto { @ApiProperty() category!:string; @ApiProperty({type:Number}) amount!:number; @ApiProperty({type:Number}) percentage!:number; }
