// RESPONSIBILITY: Verifies the transaction orchestrator delegates exactly one mutation per use case and emits lifecycle events only after the UnitOfWork resolves.
// FLOW: Orchestrator unit test → mocked UnitOfWork → feature mutation service → post-commit event assertion.
import { ManagerAttendanceOrchestratorService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-orchestrator.service';

describe('ManagerAttendanceOrchestratorService', () => {
  it('markAttendance delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { markAttendance: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerAttendanceOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.markAttendance({ sample: 'value' });
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.markAttendance).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('markAttendance propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { markAttendance: jest.fn() };
    const service = new ManagerAttendanceOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.markAttendance({ sample: 'value' })).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('updateAttendanceRecord delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { updateAttendanceRecord: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerAttendanceOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.updateAttendanceRecord({ sample: 'value' }, '00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.updateAttendanceRecord).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('updateAttendanceRecord propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { updateAttendanceRecord: jest.fn() };
    const service = new ManagerAttendanceOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.updateAttendanceRecord({ sample: 'value' }, '00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

  it('deleteAttendanceRecord delegates only its declared mutation and preserves the post-commit boundary', async () => {
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const uow = { run: jest.fn(async (callback: (value: typeof context) => Promise<void>) => callback(context)) };
    const events = { emit: jest.fn() };
    const mutation = { deleteAttendanceRecord: jest.fn().mockResolvedValue({ id: '00000000-0000-4000-8000-000000000001' }) };
    const service = new ManagerAttendanceOrchestratorService(uow as never, events as never, mutation as never);
    const result = await service.deleteAttendanceRecord('00000000-0000-4000-8000-000000000001');
    expect(uow.run).toHaveBeenCalledTimes(1);
    expect(mutation.deleteAttendanceRecord).toHaveBeenCalledTimes(1);
    expect(events.emit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  it('deleteAttendanceRecord propagates UnitOfWork failure', async () => {
    const failure = new Error('transaction failure');
    const uow = { run: jest.fn().mockRejectedValue(failure) };
    const events = { emit: jest.fn() };
    const mutation = { deleteAttendanceRecord: jest.fn() };
    const service = new ManagerAttendanceOrchestratorService(uow as never, events as never, mutation as never);
    await expect(service.deleteAttendanceRecord('00000000-0000-4000-8000-000000000001')).rejects.toBe(failure);
    expect(events.emit).not.toHaveBeenCalled();
  });

});
