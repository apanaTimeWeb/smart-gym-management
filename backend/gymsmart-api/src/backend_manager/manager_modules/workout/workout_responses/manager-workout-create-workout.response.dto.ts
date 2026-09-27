// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ManagerWorkoutCreateWorkoutResponseDto { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() level!: string; @ApiProperty({oneOf:[{type:'number'},{type:'array',items:{type:'object'}}]}) days!: number|object[]; @ApiProperty({type:Number}) exercises!: number; @ApiProperty() focus!: string; @ApiProperty() duration!: string; @ApiProperty({type:[String]}) tags!: string[]; @ApiPropertyOptional({type:Boolean}) isActive?: boolean; }
export { ManagerWorkoutCreateWorkoutResponseDto as WorkoutCreateWorkoutResponseDto };
