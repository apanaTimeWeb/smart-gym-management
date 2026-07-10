import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './services/features.service';
import { FeaturesController } from './controllers/features.controller';
import { Feature } from './entities/features.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
