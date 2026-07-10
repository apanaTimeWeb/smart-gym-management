import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationsService } from './services/migrations.service';
import { MigrationsController } from './controllers/migrations.controller';
import { SchemaMigration } from './entities/migrations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchemaMigration])],
  controllers: [MigrationsController],
  providers: [MigrationsService],
  exports: [MigrationsService],
})
export class MigrationsModule {}
