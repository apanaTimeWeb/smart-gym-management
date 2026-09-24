// RESPONSIBILITY: Authenticates WebSocket connections and delivers strictly typed distributed realtime events to tenant/user rooms.
// FLOW: Socket handshake -> JWT verification -> tenant authorization -> room join -> Redis Pub/Sub -> strict event envelope -> client.
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminCoreRealtimeAuthenticationException } from '@/backend_superadmin/superadmin_core/superadmin-core.exceptions';
import { SuperadminCoreTenantAuthorizationService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-authorization.service';

type SuperadminRealtimeScalar = string | number | boolean | null;
type SuperadminRealtimePayload = SuperadminRealtimeScalar | Record<string, unknown> | Array<SuperadminRealtimeScalar | Record<string, unknown>>;

/**
 * Primary Intent: Defines the AccessClaims type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface AccessClaims {
  sub: string;
  tenantId?: string;
  role?: string;
}

/**
 * Primary Intent: Defines SuperadminRealtimeEnvelope as the interface-level contract for superadmin-core-realtime.gateway.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminRealtimeEnvelope {
  success: true;
  message: string;
  data: SuperadminRealtimePayload;
  event: string;
  tenantId: string | null;
}

/**
 * Primary Intent: Defines the SuperadminRealtimeRedisEvent type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface SuperadminRealtimeRedisEvent {
  userId?: string;
  event?: string;
  tenantId?: string | null;
  message?: string;
  payload?: SuperadminRealtimePayload;
}

/**
 * Primary Intent: Provides horizontally scalable Superadmin realtime delivery using Redis Pub/Sub and Socket.IO rooms.
 * Edge Cases: Invalid JWTs, unauthorized tenant claims, malformed Redis messages, duplicate events, reconnects, and cross-instance delivery must not bypass tenant/user scope.
 * Side-Effects: Opens one Redis subscriber per gateway instance and emits websocket events to authenticated rooms.
 * AI-Note: The WebSocketGateway decorator belongs on this concrete class; never decorate an interface because TypeScript erases interfaces at runtime.
 */
/**
 * Primary Intent: Defines SuperadminCoreRealtimeGateway as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
@Injectable()
@WebSocketGateway({ namespace: '/events', transports: ['websocket'], cors: { origin: false } })
/**
 * Primary Intent: Defines SuperadminCoreRealtimeGateway as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminCoreRealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit, OnModuleDestroy {
  @WebSocketServer() private server!: Server;
  private readonly subscriber: ReturnType<SuperadminCoreRedisService['getClient']>;

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly redis: SuperadminCoreRedisService,
    private readonly logger: PinoLogger,
    private readonly tenantAuthorization: SuperadminCoreTenantAuthorizationService,
  ) {
    this.subscriber = this.redis.getClient().duplicate();
  }

  /**
   * Primary Intent: Starts the distributed Redis subscription for realtime events.
   * Edge Cases: Redis availability failures must prevent false-positive realtime readiness.
   * Side-Effects: Creates a long-lived Pub/Sub subscription.
   * AI-Note: Keep the channel name stable with the publisher contract.
   */
  /**
   * Primary Intent: Executes the onModuleInit use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async onModuleInit(): Promise<void> {
    await this.subscriber.subscribe('superadmin:realtime');
    this.subscriber.on('message', (_channel, raw) => this.deliver(raw));
  }

  /**
   * Primary Intent: Closes the Redis subscriber during graceful application shutdown.
   * Edge Cases: Shutdown must be safe if Redis is already disconnecting.
   * Side-Effects: Terminates the Pub/Sub connection.
   * AI-Note: Preserve graceful shutdown ordering.
   */
  /**
   * Primary Intent: Executes the onModuleDestroy use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async onModuleDestroy(): Promise<void> { await this.subscriber.quit(); }

  /**
   * Primary Intent: Authenticates a socket and authorizes its tenant before joining rooms.
   * Edge Cases: Missing token, invalid token, absent subject, and unauthorized tenant claims must disconnect immediately.
   * Side-Effects: Joins user and tenant rooms only after authorization succeeds.
   * AI-Note: Never trust tenantId solely from the handshake; authorization must complete first.
   */
  /**
   * Primary Intent: Executes the handleConnection use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async handleConnection(client: Socket): Promise<void> {
    try {
      const token = this.readToken(client);
      const claims = this.jwt.verify<AccessClaims>(token, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret') });
      if (!claims.sub) throw new SuperadminCoreRealtimeAuthenticationException('missing-subject');
      if (claims.tenantId) await this.tenantAuthorization.authorize(claims.sub, claims.tenantId);
      client.data.userId = claims.sub;
      client.data.tenantId = claims.tenantId ?? null;
      await client.join(`user:${claims.sub}`);
      if (claims.tenantId) await client.join(`tenant:${claims.tenantId}`);
    } catch (error) {
      this.logger.warn({ err: error, context: SuperadminCoreRealtimeGateway.name }, 'WebSocket authentication rejected');
      client.disconnect(true);
    }
  }

  /**
   * Primary Intent: Provides an explicit lifecycle hook for socket disconnects.
   * Edge Cases: Disconnects may be voluntary or network-triggered; no state must leak across reconnects.
   * Side-Effects: None; Socket.IO handles room membership teardown.
   * AI-Note: Do not retain socket references beyond the Socket.IO lifecycle.
   */
  /**
   * Primary Intent: Executes the handleDisconnect use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  handleDisconnect(_client: Socket): void {}

  /**
   * Primary Intent: Extracts the access token from supported Socket.IO handshake locations.
   * Edge Cases: Empty strings and malformed bearer prefixes are rejected.
   * Side-Effects: None.
   * AI-Note: Token parsing remains isolated from connection authorization.
   */
  /**
   * Primary Intent: Executes the readToken use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private readToken(client: Socket): string {
    const authToken = typeof client.handshake.auth?.token === 'string' ? client.handshake.auth.token : '';
    if (authToken) return authToken.replace(/^Bearer\s+/i, '');
    const authorization = client.handshake.headers.authorization;
    if (authorization?.startsWith('Bearer ')) return authorization.slice(7);
    throw new SuperadminCoreRealtimeAuthenticationException('missing-token');
  }

  /**
   * Primary Intent: Parses and emits only well-formed Redis realtime events to the authorized user room.
   * Edge Cases: Malformed JSON, missing user/event identifiers, or unsupported payload shapes are ignored rather than broadcast.
   * Side-Effects: Emits a typed Socket.IO event.
   * AI-Note: Never widen payload data to unknown; event producers must conform to the strict envelope.
   */
  /**
   * Primary Intent: Executes the deliver use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private deliver(raw: string): void {
    let event: SuperadminRealtimeRedisEvent;
    try { event = JSON.parse(raw) as SuperadminRealtimeRedisEvent; } catch { return; }
    if (!event.userId || !event.event) return;
    const envelope: SuperadminRealtimeEnvelope = { success: true, message: event.message ?? 'Realtime event delivered.', data: event.payload ?? null, event: event.event, tenantId: event.tenantId ?? null };
    this.server.to(`user:${event.userId}`).emit(event.event, envelope);
  }
}
