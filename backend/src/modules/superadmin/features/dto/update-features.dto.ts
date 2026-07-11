import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureFlagDto } from './create-features.dto';

export class UpdateFeatureFlagDto extends PartialType(CreateFeatureFlagDto) {}
