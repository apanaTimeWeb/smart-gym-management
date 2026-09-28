// RESPONSIBILITY: Defines isolated shared type contracts for a single backend concern.
// FLOW: Typed producer/consumer boundary → compile-time contract only; no runtime business behavior.

export interface SessionsListQuery { page:number; limit:number; date?:string; startDate?:string; endDate?:string; status?:string; sortBy:string; sortDirection:string; }
