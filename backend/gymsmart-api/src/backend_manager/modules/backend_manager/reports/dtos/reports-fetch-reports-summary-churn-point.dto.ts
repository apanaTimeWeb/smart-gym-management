// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ReportsFetchReportsSummaryChurnPointDto { @ApiProperty() month!:string; @ApiProperty({type:Number}) newMembers!:number; @ApiProperty({type:Number}) churned!:number; @ApiProperty({type:Number}) active!:number; }
