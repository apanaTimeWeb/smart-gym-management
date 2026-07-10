import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemService } from './services/system.service';
import { SystemController } from './controllers/system.controller';
import { System } from './entities/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([System])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
