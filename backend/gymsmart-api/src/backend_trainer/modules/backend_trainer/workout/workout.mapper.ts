// RESPONSIBILITY: Maps workout ORM state to the exact Trainer frontend workout response contract.
// FLOW: WorkoutEntity → WorkoutMapper → response DTO data.

import type { WorkoutEntity } from '@/backend_trainer/modules/backend_trainer/workout/workout.entity';
import type { WorkoutDomain } from '@/backend_trainer/modules/backend_trainer/workout/workout.domain';

export function WorkoutMapper(entity:WorkoutEntity):WorkoutDomain{
  return { id:entity.id,name:entity.name,level:entity.level,days:entity.days,exercises:entity.exercisesCount,focus:entity.focus,duration:entity.duration,tags:entity.tags,goal:entity.goal,startDate:entity.startDate,endDate:entity.endDate,instructions:entity.instructions,assignedMemberId:entity.assignedMemberId,isActive:entity.isActive,workoutExercises:entity.workoutExercises };
}
