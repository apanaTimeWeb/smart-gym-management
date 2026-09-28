// RESPONSIBILITY: Defines isolated shared type contracts for a single backend concern.
// FLOW: Typed producer/consumer boundary → compile-time contract only; no runtime business behavior.

export interface WorkoutListQuery { page:number;limit:number;search?:string;category?:string;sortBy:string;sortDirection:string; }
