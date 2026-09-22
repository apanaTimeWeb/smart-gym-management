// RESPONSIBILITY: Registers the isolated earnings feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → EarningsModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { EarningsQueryController } from '@/backend_trainer/modules/backend_trainer/earnings/controllers/earnings-query.controller'; import { EarningsCommandController } from '@/backend_trainer/modules/backend_trainer/earnings/controllers/earnings-command.controller'; import { EarningsQueryService } from '@/backend_trainer/modules/backend_trainer/earnings/services/earnings-query.service'; import { EarningsExportService } from '@/backend_trainer/modules/backend_trainer/earnings/services/earnings-export.service'; import { EarningsRepository } from '@/backend_trainer/modules/backend_trainer/earnings/repositories/earnings-repository';
@Module({controllers:[EarningsQueryController,EarningsCommandController],providers:[EarningsQueryService,EarningsExportService,EarningsRepository]}) export class EarningsModule {}
