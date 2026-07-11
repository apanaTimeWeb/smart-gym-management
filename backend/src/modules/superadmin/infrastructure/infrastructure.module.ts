import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureService } from './services/infrastructure.service';
import { InfrastructureController } from './controllers/infrastructure.controller';
import { InfrastructureNode } from './entities/infrastructure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfrastructureNode])],
  controllers: [InfrastructureController],
  providers: [InfrastructureService],
  exports: [InfrastructureService],
})
export class InfrastructureModule {}
