import { PartialType } from '@nestjs/swagger';
import { CreateReleaseNoteDto } from './create-release-note.dto';

export class UpdateReleaseNoteDto extends PartialType(CreateReleaseNoteDto) {}
