// RESPONSIBILITY: Proves circuit opening, failure accumulation, and reset behavior for external provider protection.
// FLOW: Adapter operation → circuit state → provider call → success/failure transition.
import { ManagerCoreCircuitBreakerService } from '@/backend_manager/manager_core/manager_core_infrastructure/manager-core-circuit-breaker.service';

describe('ManagerCoreCircuitBreakerService', () => {
  it('opens after five consecutive failures', async () => {
    const service = new ManagerCoreCircuitBreakerService();
    for (let i = 0; i < 5; i += 1) await expect(service.execute('provider', async () => { throw new Error('down'); })).rejects.toThrow('down');
    await expect(service.execute('provider', async () => 'ok')).rejects.toThrow('Circuit is open');
  });

  it('resets failure state after a successful operation', async () => {
    const service = new ManagerCoreCircuitBreakerService();
    for (let i = 0; i < 4; i += 1) await expect(service.execute('provider', async () => { throw new Error('down'); })).rejects.toThrow('down');
    await expect(service.execute('provider', async () => 'ok')).resolves.toBe('ok');
    await expect(service.execute('provider', async () => 'ok')).resolves.toBe('ok');
  });
});
