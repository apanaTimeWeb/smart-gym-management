import { PartialType } from '@nestjs/mapped-types';
import { CreateReleaseNoteDto } from './create-system.dto';

export class UpdateReleaseNoteDto extends PartialType(CreateReleaseNoteDto) {}
