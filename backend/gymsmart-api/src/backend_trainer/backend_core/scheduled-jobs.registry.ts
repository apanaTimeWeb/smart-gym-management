// RESPONSIBILITY: Registers distributed background jobs for core infrastructure.
// FLOW: Core scheduler bootstrap → registry → queue/job runner.

import type { CoreScheduledJobDefinition } from '@/backend_trainer/backend_core/core_types/core-scheduled-job-definition.type';

// RESPONSIBILITY: Registers scheduled/background work so distributed execution can be audited and reviewed.
// FLOW: Bootstrap/worker discovery → scheduled job registry → distributed scheduler.

