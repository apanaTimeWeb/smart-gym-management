import { WorkoutService } from "./workout.service";
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    findAllWorkouts(query: any): Promise<{
        success: boolean;
        data: import("./entities/workout.entity").Workout[];
    }>;
    createWorkout(dto: any): Promise<{
        success: boolean;
        data: import("./entities/workout.entity").Workout[];
    }>;
    updateWorkout(id: string, dto: any): Promise<{
        success: boolean;
        data: import("./entities/workout.entity").Workout | null;
    }>;
    removeWorkout(id: string): Promise<{
        success: boolean;
        data: import("./entities/workout.entity").Workout | null;
    }>;
    findAllDietPlans(query: any): Promise<{
        success: boolean;
        data: import("./entities/diet-plan.entity").DietPlan[];
    }>;
    createDietPlan(dto: any): Promise<{
        success: boolean;
        data: import("./entities/diet-plan.entity").DietPlan[];
    }>;
    updateDietPlan(id: string, dto: any): Promise<{
        success: boolean;
        data: import("./entities/diet-plan.entity").DietPlan | null;
    }>;
    removeDietPlan(id: string): Promise<{
        success: boolean;
        data: import("./entities/diet-plan.entity").DietPlan | null;
    }>;
}
