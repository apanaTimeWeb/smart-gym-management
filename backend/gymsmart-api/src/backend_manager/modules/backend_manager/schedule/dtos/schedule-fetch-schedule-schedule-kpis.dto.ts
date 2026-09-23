// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleFetchScheduleScheduleKpisDto {
  @ApiProperty({type:Number}) totalTrainers!: number;
  @ApiProperty({type:Number}) trainersOnDutyToday!: number;
  @ApiProperty({type:Number}) trainersOnLeaveToday!: number;
  @ApiProperty({type:Number}) totalShiftsThisWeek!: number;
  @ApiProperty({type:Number}) totalClassesThisWeek!: number;
  @ApiProperty({type:Number}) avgOccupancyRate!: number;
  @ApiProperty({type:Number}) totalEnrolledMembers!: number;
}
