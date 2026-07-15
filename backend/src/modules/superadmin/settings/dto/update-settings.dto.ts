import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalSettingDto } from './create-settings.dto';

export class UpdateGlobalSettingDto extends PartialType(CreateGlobalSettingDto) {}
