import { PartialType } from '@nestjs/swagger';
import { CreateAffiliateDto } from './create-affiliates.dto';

export class UpdateAffiliateDto extends PartialType(CreateAffiliateDto) {}
