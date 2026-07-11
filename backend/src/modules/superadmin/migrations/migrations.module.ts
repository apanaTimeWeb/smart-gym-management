import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemaMigration } from './entities/migrations.entity';
import { CreateMigrationsController } from './controllers/create-migrations.controller';
import { FindMigrationsController } from './controllers/find-migrations.controller';
import { UpdateMigrationsController } from './controllers/update-migrations.controller';
import { DeleteMigrationsController } from './controllers/delete-migrations.controller';
import { CreateMigrationsService } from './services/create-migrations.service';
import { FindMigrationsService } from './services/find-migrations.service';
import { UpdateMigrationsService } from './services/update-migrations.service';
import { DeleteMigrationsService } from './services/delete-migrations.service';
import { MigrationsRepository } from './migrations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchemaMigration])],
  controllers: [CreateMigrationsController, FindMigrationsController, UpdateMigrationsController, DeleteMigrationsController],
  providers: [CreateMigrationsService, FindMigrationsService, UpdateMigrationsService, DeleteMigrationsService, MigrationsRepository],
  exports: [CreateMigrationsService, FindMigrationsService, UpdateMigrationsService, DeleteMigrationsService],
})
export class MigrationsModule {}
