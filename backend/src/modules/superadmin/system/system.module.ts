import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemService } from './services/system.service';
import { SystemController } from './controllers/system.controller';
import { SystemHealthSnapshot } from './entities/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemHealthSnapshot])],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [SystemService],
})
export class SystemModule {}
