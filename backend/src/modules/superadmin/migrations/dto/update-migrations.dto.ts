import { PartialType } from '@nestjs/mapped-types';
import { CreateSchemaMigrationDto } from './create-migrations.dto';

export class UpdateSchemaMigrationDto extends PartialType(CreateSchemaMigrationDto) {}
