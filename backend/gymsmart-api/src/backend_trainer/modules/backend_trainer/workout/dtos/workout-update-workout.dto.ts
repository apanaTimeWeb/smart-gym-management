// RESPONSIBILITY: Validates workout request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → WorkoutUpdateWorkoutDto → service.

import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { WorkoutLevel } from '@/backend_trainer/modules/backend_trainer/workout/workout-enums';
export class WorkoutUpdateWorkoutDto {
    @IsOptional() @IsString() name?:string; @IsOptional() @IsEnum(WorkoutLevel) level?:WorkoutLevel; @IsOptional() @IsNumber() @Min(1) days?:number; @IsOptional() @IsNumber() @Min(1) exercises?:number; @IsOptional() @IsString() focus?:string; @IsOptional() @IsString() duration?:string; @IsOptional() @IsString() tags?:string; @IsOptional() @IsString() goal?:string; @IsOptional() @IsDateString() startDate?:string; @IsOptional() @IsDateString() endDate?:string; @IsOptional() @IsString() instructions?:string; @IsOptional() @IsString() assignedMemberId?:string; @IsOptional() @IsArray() workoutExercises?:Record<string,unknown>[];
}
