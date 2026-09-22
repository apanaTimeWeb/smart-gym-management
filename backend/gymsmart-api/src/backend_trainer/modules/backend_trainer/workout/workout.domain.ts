// RESPONSIBILITY: Defines the workout-plan business representation independent from ORM state.
// FLOW: WorkoutEntity → mapper → WorkoutDomain.

export interface WorkoutDomain { id: string; name: string; level: string; days: number; exercises: number; focus: string; duration: string; tags: string[]; goal: string | null; startDate: string | null; endDate: string | null; instructions: string | null; assignedMemberId: string | null; workoutExercises: Record<string, unknown>[]; isActive: boolean; }