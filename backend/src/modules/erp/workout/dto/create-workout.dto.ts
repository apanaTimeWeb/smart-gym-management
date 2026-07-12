import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateWorkoutDto {
  @ApiProperty({ description: 'Workout name', example: 'Full Body Blaster' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Difficulty level', example: 'Beginner' })
  @IsString()
  level: string;

  @ApiProperty({ description: 'Number of days per week', example: 3 })
  @IsNumber()
  days: number;

  @ApiProperty({ description: 'Number of exercises', example: 8 })
  @IsNumber()
  exercises: number;

  @ApiProperty({ description: 'Focus area', example: 'Strength' })
  @IsString()
  focus: string;

  @ApiProperty({ description: 'Duration', example: '45 mins' })
  @IsString()
  duration: string;

  @ApiProperty({ description: 'Tags', example: ['Full Body', 'Dumbbells'] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ description: 'Is active', default: true, required: false })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}
