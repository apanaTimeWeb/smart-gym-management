import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { DietPlan } from './entities/diet-plan.entity';
export declare class WorkoutService {
    private readonly workoutRepository;
    private readonly dietPlanRepository;
    constructor(workoutRepository: Repository<Workout>, dietPlanRepository: Repository<DietPlan>);
    findAllWorkouts(query: any): Promise<{
        success: boolean;
        data: Workout[];
    }>;
    createWorkout(dto: any): Promise<{
        success: boolean;
        data: Workout[];
    }>;
    updateWorkout(id: number, dto: any): Promise<{
        success: boolean;
        data: Workout | null;
    }>;
    removeWorkout(id: number): Promise<{
        success: boolean;
        data: Workout | null;
    }>;
    findAllDietPlans(query: any): Promise<{
        success: boolean;
        data: DietPlan[];
    }>;
    createDietPlan(dto: any): Promise<{
        success: boolean;
        data: DietPlan[];
    }>;
    updateDietPlan(id: number, dto: any): Promise<{
        success: boolean;
        data: DietPlan | null;
    }>;
    removeDietPlan(id: number): Promise<{
        success: boolean;
        data: DietPlan | null;
    }>;
}
