import { beforeEach, describe, expect, it, vi } from 'vitest';

const disconnect = vi.fn();
const socket = { disconnect };
const io = vi.fn(() => socket);

vi.mock('socket.io-client', () => ({ io }));

describe('TrainerInfrastructureSocketClient', () => {
  beforeEach(() => {
    vi.resetModules();
    io.mockClear();
    disconnect.mockClear();
  });

  it('keeps a shared socket connected until the last subscriber releases it', async () => {
    const { getTrainerInfrastructureSocket, retainTrainerInfrastructureSocket, releaseTrainerInfrastructureSocket } = await import('@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_realtime/TrainerInfrastructureSocketClient');
    getTrainerInfrastructureSocket('/socket.io/trainer');
    retainTrainerInfrastructureSocket('/socket.io/trainer');
    retainTrainerInfrastructureSocket('/socket.io/trainer');
    releaseTrainerInfrastructureSocket('/socket.io/trainer');
    expect(disconnect).not.toHaveBeenCalled();
    releaseTrainerInfrastructureSocket('/socket.io/trainer');
    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
