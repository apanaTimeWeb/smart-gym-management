// RESPONSIBILITY: Defines canonical type contracts for backend runtime events.
// FLOW: Event registry constants -> event-name type -> event publisher/subscriber signatures.
import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';

export type CoreEventName = (typeof CoreEventRegistry)[keyof typeof CoreEventRegistry];
