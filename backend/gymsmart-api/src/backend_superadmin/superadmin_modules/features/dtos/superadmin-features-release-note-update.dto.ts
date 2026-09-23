// RESPONSIBILITY: Validates partial feature release-note updates.
// FLOW: HTTP -> DTO -> release-note service -> repository.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString, Length } from 'class-validator';
export class SuperadminFeaturesReleaseNoteUpdateDto {
  @IsOptional() @IsString() @Length(1, 100) version?: string;
  @IsOptional() @IsString() @Length(1, 200) title?: string;
  @IsOptional() @IsString() @Length(1, 10000) content?: string;
  @IsOptional() @Type(() => Date) @IsDate() date?: Date;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}