// RESPONSIBILITY: Updates a Trainer library diet plan through an isolated repository boundary.
// FLOW: LibraryCommandController → LibraryDietPlanUpdateService → LibraryDietPlanRepository → mapper.

import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { LibraryDietPlanRepository } from '@/backend_trainer/modules/backend_trainer/library/repositories/library-diet-plan.repository';
import { LibraryDietPlanMapper } from '@/backend_trainer/modules/backend_trainer/library/library-diet-plan.mapper';
import { LibraryUpdateDietPlanDto } from '@/backend_trainer/modules/backend_trainer/library/dtos/library-update-diet-plan.dto';

@Injectable()
export class LibraryDietPlanUpdateService {
  constructor(private readonly repo: LibraryDietPlanRepository, private readonly audit: CoreAuditService) {}

  /** Updates only validated library fields and records the state change. */
  async update(id: string, dto: LibraryUpdateDietPlanDto): Promise<ReturnType<typeof LibraryDietPlanMapper>> {
    const before = await this.repo.findById(id);
    if (!before) throw new CoreNotFoundException('LIBRARY.DIET_PLAN', id);
    const row = await this.repo.updateDietPlanById(id, {
      name: dto.name, goal: dto.goal, calories: dto.calories, protein: dto.protein, carbs: dto.carbs,
      fats: dto.fats, description: dto.description?.trim(), meals: dto.meals, isActive: dto.isActive,
    });
    await this.audit.record('DIET_PLAN_UPDATED', 'DIET_PLAN', id, { name: before.name, goal: before.goal }, { name: row.name, goal: row.goal });
    return LibraryDietPlanMapper(row);
  }
}
