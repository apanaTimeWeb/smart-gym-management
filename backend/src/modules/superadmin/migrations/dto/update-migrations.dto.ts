import { PartialType } from '@nestjs/swagger';
import { CreateMigrationDto } from './create-migrations.dto';

export class UpdateMigrationDto extends PartialType(CreateMigrationDto) {}
