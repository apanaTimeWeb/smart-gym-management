// RESPONSIBILITY: Registers framework-level distributed realtime plumbing without importing business modules.
// FLOW: SuperadminCoreModule -> Redis realtime publisher/gateway -> authenticated Superadmin sockets.
import { Module } from '@nestjs/common';
import { SuperadminRealtimePublisherService } from '@/backend_superadmin/superadmin_core/realtime/superadmin-core-realtime-publisher.service';
import { SuperadminRealtimeGateway } from '@/backend_superadmin/superadmin_core/realtime/superadmin-core-realtime.gateway';

@Module({ providers: [SuperadminRealtimePublisherService, SuperadminRealtimeGateway], exports: [SuperadminRealtimePublisherService, SuperadminRealtimeGateway] })
export class SuperadminRealtimeModule {}
