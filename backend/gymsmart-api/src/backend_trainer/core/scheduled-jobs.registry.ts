// RESPONSIBILITY: Registers scheduled/background work so distributed execution can be audited and reviewed.
// FLOW: Bootstrap/worker discovery → scheduled job registry → distributed scheduler.

export interface CoreScheduledJobDefinition {name:string;module:string;file:string;schedule:string;description:string;touchedEntities:string[];failureBehavior:string;idempotent:boolean;requiresHumanReview?:boolean;} export const CORE_SCHEDULED_JOBS:readonly CoreScheduledJobDefinition[]=[];