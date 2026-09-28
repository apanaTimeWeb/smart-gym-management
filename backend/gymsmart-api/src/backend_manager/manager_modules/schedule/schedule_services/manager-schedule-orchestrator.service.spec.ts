// RESPONSIBILITY: Verifies the transaction orchestrator delegates exactly one mutation per use case and emits lifecycle events only after the UnitOfWork resolves.
// FLOW: Orchestrator unit test → mocked UnitOfWork → feature mutation service → post-commit event assertion.
import { ManagerScheduleOrchestratorService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-orchestrator.service';

describe('ManagerScheduleOrchestratorService', () => {
  it('createShift delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { createShift: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerScheduleOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.createShift({ sample: 'value' });
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.createShift).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('createShift propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { createShift: jest.fn() };
    const service = new ManagerScheduleOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.createShift({ sample: 'value' })).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('updateShift delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { updateShift: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerScheduleOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.updateShift({ sample: 'value' }, '00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.updateShift).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('updateShift propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { updateShift: jest.fn() };
    const service = new ManagerScheduleOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.updateShift({ sample: 'value' }, '00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('deleteShift delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { deleteShift: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerScheduleOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.deleteShift('00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.deleteShift).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('deleteShift propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { deleteShift: jest.fn() };
    const service = new ManagerScheduleOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.deleteShift('00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

});
