import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationsService } from './services/migrations.service';
import { MigrationsController } from './controllers/migrations.controller';
import { Migration } from './entities/migrations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Migration])],
  controllers: [MigrationsController],
  providers: [MigrationsService],
})
export class MigrationsModule {}
