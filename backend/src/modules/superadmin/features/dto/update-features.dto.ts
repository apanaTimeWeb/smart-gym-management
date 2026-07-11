import { PartialType } from '@nestjs/swagger';
import { CreateFeatureDto } from './create-features.dto';

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {}
