// RESPONSIBILITY: Defines explicit Trainer progress read contracts consumed by controllers and Swagger.
// FLOW: Repository query → ProgressTrackingQueryService → typed response.

export interface ProgressTrackingMemberSummary { id:string; name:string; status:string; plan:string|null; }
export interface ProgressTrackingSummary { latestWeightKg:number|null; latestBmi:number|null; latestBodyFatPercent:number|null; latestMuscleMassKg:number|null; entryCount:number; }
