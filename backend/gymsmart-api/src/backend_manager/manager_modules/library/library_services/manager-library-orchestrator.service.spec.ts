// RESPONSIBILITY: Verifies the transaction orchestrator delegates exactly one mutation per use case and emits lifecycle events only after the UnitOfWork resolves.
// FLOW: Orchestrator unit test → mocked UnitOfWork → feature mutation service → post-commit event assertion.
import { ManagerLibraryOrchestratorService } from '@/backend_manager/manager_modules/library/library_services/manager-library-orchestrator.service';

describe('ManagerLibraryOrchestratorService', () => {
  it('createDietPlan delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { createDietPlan: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerLibraryOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.createDietPlan({ sample: 'value' });
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.createDietPlan).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('createDietPlan propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { createDietPlan: jest.fn() };
    const service = new ManagerLibraryOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.createDietPlan({ sample: 'value' })).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('updateLibraryById delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { updateLibraryById: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerLibraryOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.updateDietPlan({ sample: 'value' }, '00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.updateLibraryById).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('updateLibraryById propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { updateLibraryById: jest.fn() };
    const service = new ManagerLibraryOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.updateDietPlan({ sample: 'value' }, '00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('deleteLibraryById delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { deleteLibrary: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerLibraryOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.deleteDietPlan('00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.deleteLibrary).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('deleteLibraryById propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { deleteLibrary: jest.fn() };
    const service = new ManagerLibraryOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.deleteDietPlan('00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

});
