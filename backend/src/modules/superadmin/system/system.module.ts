import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemHealthSnapshot } from './entities/system.entity';
import { CreateSystemController } from './controllers/create-system.controller';
import { FindSystemController } from './controllers/find-system.controller';
import { UpdateSystemController } from './controllers/update-system.controller';
import { DeleteSystemController } from './controllers/delete-system.controller';
import { CreateSystemService } from './services/create-system.service';
import { FindSystemService } from './services/find-system.service';
import { UpdateSystemService } from './services/update-system.service';
import { DeleteSystemService } from './services/delete-system.service';
import { SystemRepository } from './system.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SystemHealthSnapshot])],
  controllers: [CreateSystemController, FindSystemController, UpdateSystemController, DeleteSystemController],
  providers: [CreateSystemService, FindSystemService, UpdateSystemService, DeleteSystemService, SystemRepository],
  exports: [CreateSystemService, FindSystemService, UpdateSystemService, DeleteSystemService],
})
export class SystemModule {}
