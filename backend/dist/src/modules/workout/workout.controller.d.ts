import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    findAllWorkouts(query: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            description: string | null;
            imageUrl: string | null;
            duration: string | null;
            sets: number | null;
            muscleGroup: string[];
            reps: string | null;
            difficulty: string;
            videoUrl: string | null;
        }[];
    }>;
    createWorkout(dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            description: string | null;
            imageUrl: string | null;
            duration: string | null;
            sets: number | null;
            muscleGroup: string[];
            reps: string | null;
            difficulty: string;
            videoUrl: string | null;
        };
    }>;
    updateWorkout(id: string, dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            description: string | null;
            imageUrl: string | null;
            duration: string | null;
            sets: number | null;
            muscleGroup: string[];
            reps: string | null;
            difficulty: string;
            videoUrl: string | null;
        };
    }>;
    removeWorkout(id: string): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            description: string | null;
            imageUrl: string | null;
            duration: string | null;
            sets: number | null;
            muscleGroup: string[];
            reps: string | null;
            difficulty: string;
            videoUrl: string | null;
        };
    }>;
    findAllDietPlans(query: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            goal: string;
            calories: number | null;
            protein: number | null;
            carbs: number | null;
            fats: number | null;
            meals: string[];
        }[];
    }>;
    createDietPlan(dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            goal: string;
            calories: number | null;
            protein: number | null;
            carbs: number | null;
            fats: number | null;
            meals: string[];
        };
    }>;
    updateDietPlan(id: string, dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            goal: string;
            calories: number | null;
            protein: number | null;
            carbs: number | null;
            fats: number | null;
            meals: string[];
        };
    }>;
    removeDietPlan(id: string): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            goal: string;
            calories: number | null;
            protein: number | null;
            carbs: number | null;
            fats: number | null;
            meals: string[];
        };
    }>;
}
