// RESPONSIBILITY: Authenticates WebSocket connections and delivers distributed realtime events to user-scoped rooms.
// FLOW: Socket handshake -> JWT verification -> user room -> Redis realtime subscription -> socket event.
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

interface AccessClaims { sub: string; tenantId?: string; role?: string; }

@Injectable()
@WebSocketGateway({ namespace: '/events', transports: ['websocket'], cors: { origin: false } })
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit, OnModuleDestroy {
  @WebSocketServer() private server!: Server;
  private readonly subscriber: ReturnType<RedisService['getClient']>;

  constructor(private readonly jwt: JwtService, private readonly config: ConfigService, private readonly redis: RedisService, private readonly logger: PinoLogger) {
    this.subscriber = this.redis.getClient().duplicate();
  }

  /** Starts the distributed Redis subscription used by every gateway instance. */
  async onModuleInit(): Promise<void> {
    await this.subscriber.subscribe('superadmin:realtime');
    this.subscriber.on('message', (_channel, raw) => this.deliver(raw));
  }

  /** Closes the per-gateway Redis subscriber during graceful shutdown. */
  async onModuleDestroy(): Promise<void> { await this.subscriber.quit(); }

  /** Authenticates the socket before allowing it to join any user room. */
  handleConnection(client: Socket): void {
    try {
      const token = this.readToken(client);
      const claims = this.jwt.verify<AccessClaims>(token, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret') });
      if (!claims.sub) throw new Error('missing-subject');
      client.data.userId = claims.sub;
      client.data.tenantId = claims.tenantId ?? null;
      void client.join(`user:${claims.sub}`);
      if (claims.tenantId) void client.join(`tenant:${claims.tenantId}`);
    } catch (error) {
      this.logger.warn({ err: error, context: RealtimeGateway.name }, 'WebSocket authentication rejected');
      client.disconnect(true);
    }
  }

  /** Records the explicit socket disconnect boundary. */
  handleDisconnect(_client: Socket): void {}

  /** Reads a bearer token from the Socket.IO auth payload or authorization header. */
  private readToken(client: Socket): string {
    const authToken = typeof client.handshake.auth?.token === 'string' ? client.handshake.auth.token : '';
    if (authToken) return authToken.replace(/^Bearer\s+/i, '');
    const authorization = client.handshake.headers.authorization;
    if (authorization?.startsWith('Bearer ')) return authorization.slice(7);
    throw new Error('missing-token');
  }

  /** Delivers a Redis event only to the authenticated user room recorded by the publisher. */
  private deliver(raw: string): void {
    const event = JSON.parse(raw) as { userId?: string; event?: string; payload?: unknown };
    if (!event.userId || !event.event) return;
    this.server.to(`user:${event.userId}`).emit(event.event, event.payload);
  }
}
