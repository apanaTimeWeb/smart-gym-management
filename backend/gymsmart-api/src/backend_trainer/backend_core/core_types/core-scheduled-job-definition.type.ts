// RESPONSIBILITY: Defines isolated shared type contracts for a single backend concern.
// FLOW: Typed producer/consumer boundary → compile-time contract only; no runtime business behavior.

export interface CoreScheduledJobDefinition {name:string;module:string;file:string;schedule:string;description:string;touchedEntities:string[];failureBehavior:string;idempotent:boolean;requiresHumanReview?:boolean;} export const CORE_SCHEDULED_JOBS:readonly CoreScheduledJobDefinition[]=[];
