// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ReportsFetchReportsSummaryAttendancePointDto { @ApiProperty() date!:string; @ApiProperty({type:Number}) present!:number; @ApiProperty({type:Number}) absent!:number; @ApiProperty({type:Number}) rate!:number; }
