// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerPlansPlanItemResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() tier!: string; @ApiProperty({type:Number}) price1Month!: number; @ApiProperty({type:Number}) price3Month!: number; @ApiProperty({type:Number}) price6Month!: number; @ApiProperty({type:Number}) price12Month!: number; @ApiProperty({type:[String]}) features!: string[]; @ApiProperty({type:Boolean}) isActive!: boolean; }
export { ManagerPlansPlanItemResponseDto as PlansPlanItemResponseDto };
