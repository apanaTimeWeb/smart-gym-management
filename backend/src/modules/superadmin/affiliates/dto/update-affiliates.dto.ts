import { PartialType } from '@nestjs/mapped-types';
import { CreateAffiliateDto } from './create-affiliates.dto';

export class UpdateAffiliateDto extends PartialType(CreateAffiliateDto) {}
