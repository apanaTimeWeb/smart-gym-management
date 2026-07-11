import { PartialType } from '@nestjs/swagger';
import { CreateSettingDto } from './create-settings.dto';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}
