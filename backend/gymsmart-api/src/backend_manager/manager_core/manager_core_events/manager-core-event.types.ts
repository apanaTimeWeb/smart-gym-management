// RESPONSIBILITY: Defines canonical type contracts for backend runtime events.
// FLOW: Event registry constants -> event-name type -> event publisher/subscriber signatures.
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';

export type ManagerCoreEventName = (typeof ManagerCoreEventRegistry)[keyof typeof ManagerCoreEventRegistry];
