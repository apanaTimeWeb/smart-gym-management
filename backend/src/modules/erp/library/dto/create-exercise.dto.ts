import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ description: 'Exercise name', example: 'Push Day' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description',
    example: 'Chest, shoulders, triceps',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Category', example: 'Strength' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Difficulty level', example: 'Intermediate' })
  @IsString()
  difficulty: string;

  @ApiProperty({ description: 'Muscle groups', example: ['Chest', 'Triceps'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  muscleGroup?: string[];

  @ApiProperty({ description: 'Sets', example: 3 })
  @IsNumber()
  @IsOptional()
  sets?: number;

  @ApiProperty({ description: 'Reps', example: '10-12' })
  @IsString()
  @IsOptional()
  reps?: string;

  @ApiProperty({ description: 'Duration', example: '15 mins' })
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty({ description: 'Video URL', example: 'https://youtube.com/...' })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({ description: 'Image / thumbnail URL', example: 'https://cdn.example.com/exercises/pushup.webp', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Is active', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
