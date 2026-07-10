import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './services/features.service';
import { FeaturesController } from './controllers/features.controller';
import { FeatureFlag } from './entities/feature-flag.entity';
import { ReleaseNote } from './entities/release-note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureFlag, ReleaseNote])],
  controllers: [FeaturesController],
  providers: [FeaturesService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
