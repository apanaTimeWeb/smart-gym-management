import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './services/jobs.service';
import { JobsController } from './controllers/jobs.controller';
import { BackgroundJob } from './entities/jobs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BackgroundJob])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
