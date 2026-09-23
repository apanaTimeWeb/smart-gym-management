// RESPONSIBILITY: Registers framework-level distributed realtime plumbing without importing business modules.
// FLOW: CoreModule -> Redis realtime publisher/gateway -> authenticated Superadmin sockets.
import { Module } from '@nestjs/common';
import { RealtimePublisherService } from '@/backend_superadmin/core/realtime/realtime-publisher.service';
import { RealtimeGateway } from '@/backend_superadmin/core/realtime/realtime.gateway';

@Module({ providers: [RealtimePublisherService, RealtimeGateway], exports: [RealtimePublisherService, RealtimeGateway] })
export class RealtimeModule {}
