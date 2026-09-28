// RESPONSIBILITY: Verifies the transaction orchestrator delegates exactly one mutation per use case and emits lifecycle events only after the UnitOfWork resolves.
// FLOW: Orchestrator unit test → mocked UnitOfWork → feature mutation service → post-commit event assertion.
import { ManagerGrievanceOrchestratorService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-orchestrator.service';

describe('ManagerGrievanceOrchestratorService', () => {
  it('createGrievance delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { createGrievance: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerGrievanceOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.createGrievance({ sample: 'value' });
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.createGrievance).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('createGrievance propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { createGrievance: jest.fn() };
    const service = new ManagerGrievanceOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.createGrievance({ sample: 'value' })).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('updateGrievance delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { updateGrievance: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerGrievanceOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.updateGrievance({ sample: 'value' }, '00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.updateGrievance).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('updateGrievance propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { updateGrievance: jest.fn() };
    const service = new ManagerGrievanceOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.updateGrievance({ sample: 'value' }, '00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('deleteGrievance delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { deleteGrievance: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerGrievanceOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.deleteGrievance('00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.deleteGrievance).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('deleteGrievance propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { deleteGrievance: jest.fn() };
    const service = new ManagerGrievanceOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.deleteGrievance('00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

});
