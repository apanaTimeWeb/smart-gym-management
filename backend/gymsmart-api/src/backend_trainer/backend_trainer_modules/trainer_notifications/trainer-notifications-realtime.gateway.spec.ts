// RESPONSIBILITY: Proves the realtime gateway rejects unauthenticated sockets and authorizes Trainer tenant membership.
// FLOW: Jest unit test → handshake validation → JWT/master membership checks → room join or disconnect.
import { TrainerNotificationsRealtimeGateway } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-realtime.gateway';
import type { JwtService } from '@nestjs/jwt';
import type { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import type { CoreTenantMembershipAuthorizationRepository } from '@/backend_trainer/backend_core/core_database/core-tenant-membership-authorization.repository';
import type { Socket } from 'socket.io';

test('rejects a socket without a token', async () => {
  const jwt = { verifyAsync: jest.fn() };
  const config = { getCorsOrigins: jest.fn().mockReturnValue(['https://app.example.com']) };
  const memberships = { findActiveMembership: jest.fn() };
  const gateway = new TrainerNotificationsRealtimeGateway(jwt as unknown as JwtService, config as unknown as CoreConfigService, memberships as unknown as CoreTenantMembershipAuthorizationRepository);
  const socket = { handshake: { headers: { origin: 'https://app.example.com' }, auth: {} }, disconnect: jest.fn() } as unknown as Socket;
  await gateway.handleConnection(socket);
  expect(socket.disconnect).toHaveBeenCalledWith(true);
  expect(jwt.verifyAsync).not.toHaveBeenCalled();
});
