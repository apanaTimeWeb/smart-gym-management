// RESPONSIBILITY: Verifies the transaction orchestrator delegates exactly one mutation per use case and emits lifecycle events only after the UnitOfWork resolves.
// FLOW: Orchestrator unit test → mocked UnitOfWork → feature mutation service → post-commit event assertion.
import { ManagerProfileOrchestratorService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-orchestrator.service';

describe('ManagerProfileOrchestratorService', () => {
  it('createProfile delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { createProfile: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerProfileOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.createProfile({ sample: 'value' });
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.createProfile).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('createProfile propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { createProfile: jest.fn() };
    const service = new ManagerProfileOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.createProfile({ sample: 'value' })).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('updateProfile delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { updateProfile: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerProfileOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.updateProfile({ sample: 'value' }, '00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.updateProfile).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('updateProfile propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { updateProfile: jest.fn() };
    const service = new ManagerProfileOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.updateProfile({ sample: 'value' }, '00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('deleteProfile delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { deleteProfile: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerProfileOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.deleteProfile('00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.deleteProfile).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('deleteProfile propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { deleteProfile: jest.fn() };
    const service = new ManagerProfileOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.deleteProfile('00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

});
