// RESPONSIBILITY: Registers framework-level distributed realtime plumbing without importing business modules.
// FLOW: SuperadminCoreModule -> Redis realtime publisher/gateway -> authenticated Superadmin sockets.
import { Module } from '@nestjs/common';
import { SuperadminCoreRealtimePublisherService } from '@/backend_superadmin/superadmin_core/superadmin_core_realtime/superadmin-core-realtime-publisher.service';
import { SuperadminCoreRealtimeGateway } from '@/backend_superadmin/superadmin_core/superadmin_core_realtime/superadmin-core-realtime.gateway';

/**
 * Primary Intent: Defines SuperadminCoreRealtimeModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({ providers: [SuperadminCoreRealtimePublisherService, SuperadminCoreRealtimeGateway], exports: [SuperadminCoreRealtimePublisherService, SuperadminCoreRealtimeGateway] })
export class SuperadminCoreRealtimeModule {}
