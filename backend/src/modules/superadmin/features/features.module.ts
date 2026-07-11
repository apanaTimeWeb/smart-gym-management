import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlag } from './entities/feature-flag.entity';
import { ReleaseNote } from './entities/release-note.entity';
import { CreateFeaturesController } from './controllers/create-features.controller';
import { FindFeaturesController } from './controllers/find-features.controller';
import { UpdateFeaturesController } from './controllers/update-features.controller';
import { DeleteFeaturesController } from './controllers/delete-features.controller';
import { CreateFeaturesService } from './services/create-features.service';
import { FindFeaturesService } from './services/find-features.service';
import { UpdateFeaturesService } from './services/update-features.service';
import { DeleteFeaturesService } from './services/delete-features.service';
import { FeaturesRepository } from './features.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureFlag, ReleaseNote])],
  controllers: [CreateFeaturesController, FindFeaturesController, UpdateFeaturesController, DeleteFeaturesController],
  providers: [CreateFeaturesService, FindFeaturesService, UpdateFeaturesService, DeleteFeaturesService, FeaturesRepository],
  exports: [CreateFeaturesService, FindFeaturesService, UpdateFeaturesService, DeleteFeaturesService],
})
export class FeaturesModule {}
