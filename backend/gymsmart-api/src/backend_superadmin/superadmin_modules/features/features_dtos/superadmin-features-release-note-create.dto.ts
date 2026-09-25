// RESPONSIBILITY: Validates feature release-note creation input.
// FLOW: HTTP -> DTO -> release-note service -> repository.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString, Length } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminFeaturesReleaseNoteCreateDto as the class-level contract for superadmin-features-release-note-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesReleaseNoteCreateDto {@ApiProperty()

  @IsString() @Length(1, 100) version!: string;@ApiProperty()

  @IsString() @Length(1, 200) title!: string;@ApiProperty()

  @IsString() @Length(1, 10000) content!: string;@ApiPropertyOptional()

  @IsOptional() @Type(() => Date) @IsDate() date?: Date;@ApiPropertyOptional()

  @IsOptional() @IsBoolean() isPublished?: boolean;
}
