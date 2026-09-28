// RESPONSIBILITY: Defines isolated shared type contracts for a single backend concern.
// FLOW: Typed producer/consumer boundary → compile-time contract only; no runtime business behavior.

export interface WorkoutExerciseListQuery { page:number;limit:number;search?:string;sortBy:string;sortDirection:string; }
