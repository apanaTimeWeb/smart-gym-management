// RESPONSIBILITY: Validates feature release-note creation input.
// FLOW: HTTP -> DTO -> release-note service -> repository.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString, Length } from 'class-validator';
export class FeaturesReleaseNoteCreateDto {
  @IsString() @Length(1, 100) version!: string;
  @IsString() @Length(1, 200) title!: string;
  @IsString() @Length(1, 10000) content!: string;
  @IsOptional() @Type(() => Date) @IsDate() date?: Date;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}
