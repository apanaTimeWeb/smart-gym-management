// RESPONSIBILITY: Authenticates Trainer realtime clients and emits persisted notification events to tenant/user rooms.
// FLOW: Socket handshake → JWT + tenant membership verification → private room → notification.received event.
import { ConnectedSocket, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createAdapter } from '@socket.io/redis-adapter';
import type { Server, Socket } from 'socket.io';
import { CoreRealtimeAuthorizationException } from '@/backend_trainer/backend_core/core_errors/core-realtime-authorization.exception';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { CoreTenantMembershipAuthorizationRepository } from '@/backend_trainer/backend_core/core_database/core-tenant-membership-authorization.repository';
import { CoreRedisService } from '@/backend_trainer/backend_core/core_redis/core-redis.service';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';
import type { TrainerNotificationsRealtimeEvent, TrainerNotificationsRealtimePayload } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_types/trainer-notifications-realtime-payload.type';

export interface NotificationsSocketAuth { userId: string; tenantId: string; role: CoreRole; }


/**
 * Intent: Defines the TrainerNotificationsRealtimeGateway boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
@WebSocketGateway({ path: '/ws', cors: { origin: true, credentials: true } })
export class TrainerNotificationsRealtimeGateway implements OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() private server!: Server;
  constructor(private readonly jwt: JwtService, private readonly config: CoreConfigService, private readonly memberships: CoreTenantMembershipAuthorizationRepository, private readonly redis: CoreRedisService) {}

  /** Attaches the Redis adapter so notification rooms work across horizontally scaled API instances. */
  afterInit(server: Server): void {
    const pubClient = this.redis.publisher as unknown as Parameters<typeof createAdapter>[0];
    const subClient = this.redis.subscriber as unknown as Parameters<typeof createAdapter>[1];
    server.adapter(createAdapter(pubClient, subClient));
  }

  /** Rejects untrusted origins, invalid tokens, wrong roles, and unauthorized tenant membership before room join. */
  async handleConnection(socket: Socket): Promise<void> {
    const origin = socket.handshake.headers.origin ?? '';
    if (!this.config.getCorsOrigins().includes(origin)) { socket.disconnect(true); return; }
    const rawToken = socket.handshake.auth?.token ?? socket.handshake.headers.authorization ?? this.readAccessTokenCookie(socket.handshake.headers.cookie);
    const token = typeof rawToken === 'string' && rawToken.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;
    if (typeof token !== 'string' || !token) { socket.disconnect(true); return; }
    try {
      const payload = await this.jwt.verifyAsync<{ userId: string; role: CoreRole; tenantId?: string }>(token);
      if (payload.role !== CoreRole.TRAINER) throw new CoreRealtimeAuthorizationException();
      const requestedTenantId = payload.tenantId ?? (typeof socket.handshake.auth?.tenantId === 'string' ? socket.handshake.auth.tenantId : undefined);
      const membership = requestedTenantId
        ? await this.memberships.findActiveMembership(payload.userId, requestedTenantId)
        : await this.memberships.findSingleActiveMembership(payload.userId);
      if (!membership || membership.role !== CoreRole.TRAINER) throw new CoreRealtimeAuthorizationException();
      const auth: NotificationsSocketAuth = { userId: payload.userId, tenantId: membership.tenantId, role: membership.role };
      socket.data.auth = auth;
      await socket.join(this.room(auth.tenantId, auth.userId));
    } catch {
      socket.disconnect(true);
    }
  }

  handleDisconnect(socket: Socket): void { socket.removeAllListeners(); }

  /** Emits a persisted notification only to the authenticated Trainer owner in the trusted tenant. */
  emitPersistedNotification(auth: NotificationsSocketAuth, payload: TrainerNotificationsRealtimePayload): void {
    const event: TrainerNotificationsRealtimeEvent = { success: true, message: 'CORE.RESPONSE.SUCCESS', data: payload };
    this.server.to(this.room(auth.tenantId, auth.userId)).emit('notification.received', event);
  }

  @SubscribeMessage('notifications.ping')
  /** Provides a minimal transport health acknowledgement without exposing tenant data. */
  ping(@ConnectedSocket() _socket: Socket): { ok: true } { return { ok: true }; }

  private room(tenantId: string, userId: string): string { return `trainer-notifications:${tenantId}:${userId}`; }
  private readAccessTokenCookie(cookieHeader: string | undefined): string | undefined {
    const token = cookieHeader?.split(';').map((part) => part.trim()).find((part) => part.startsWith('access_token='))?.slice('access_token='.length);
    return token ? decodeURIComponent(token) : undefined;
  }
}
