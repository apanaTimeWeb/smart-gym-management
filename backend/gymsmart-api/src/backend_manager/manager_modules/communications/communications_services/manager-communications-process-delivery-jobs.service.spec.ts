// RESPONSIBILITY: Proves observable behavior of the co-located Manager backend service.
// FLOW: Arrange isolated dependencies → execute target method → assert returned value and downstream boundary calls.
import { ManagerCommunicationsProcessDeliveryJobsService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-process-delivery-jobs.service';

describe('ManagerCommunicationsProcessDeliveryJobsService', () => {
  it('updateOne performs its declared downstream behavior', async () => {
    const expected = { marker: 'expected' };
    const context = { tenantId: 'tenant-1', branchId: 'branch-1', actorId: 'actor-1' };
    const jobsDependency: any = {};
    jobsDependency.claimNextJob = jest.fn().mockResolvedValue(expected);
    const adapterDependency: any = {};
    const configDependency: any = {};
    const auditDependency: any = {};
    const uowDependency: any = {};
    const service = new ManagerCommunicationsProcessDeliveryJobsService(jobsDependency, adapterDependency, configDependency, auditDependency, uowDependency);
    const result = await service.updateOne();
    expect(typeof result).toBe('boolean');
    expect(jobsDependency.claimNextJob).toHaveBeenCalled();
  });

  it('updateOne propagates downstream failure instead of returning a false success', async () => {
    const failure = new Error('downstream failure');
    const jobsDependency: any = {};
    jobsDependency.claimNextJob = jest.fn().mockRejectedValue(failure);
    const adapterDependency: any = {};
    const configDependency: any = {};
    const auditDependency: any = {};
    const uowDependency: any = {};
    const service = new ManagerCommunicationsProcessDeliveryJobsService(jobsDependency, adapterDependency, configDependency, auditDependency, uowDependency);
    await expect(service.updateOne()).rejects.toBe(failure);
    expect(jobsDependency.claimNextJob).toHaveBeenCalled();
  });
});
