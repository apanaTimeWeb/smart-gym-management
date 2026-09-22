// RESPONSIBILITY: Validates workout request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → WorkoutCreateWorkoutDto → service.

import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

import { WorkoutLevel } from '@/backend_trainer/modules/backend_trainer/workout/workout-enums';
export class WorkoutCreateWorkoutDto {
    @IsString() @MinLength(2) name!:string; @IsEnum(WorkoutLevel) level!:WorkoutLevel; @IsNumber() @Min(1) days!:number; @IsNumber() @Min(1) exercises!:number; @IsString() focus!:string; @IsString() duration!:string; @IsOptional() @IsString() tags?:string; @IsOptional() @IsString() goal?:string; @IsOptional() @IsDateString() startDate?:string; @IsOptional() @IsDateString() endDate?:string; @IsOptional() @IsString() instructions?:string; @IsOptional() @IsString() assignedMemberId?:string; @IsOptional() @IsArray() workoutExercises?:Record<string,unknown>[];
}
