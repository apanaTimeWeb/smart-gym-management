import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerMaintenanceLogic } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceLogic';

const createAsync=vi.fn().mockResolvedValue({}); const resolveAsync=vi.fn().mockResolvedValue({});
vi.mock('@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceQueries',()=>({useManagerMaintenanceTickets:vi.fn(()=>({data:[{id:'m1'}],isPending:true,isError:false,error:null,refetch:vi.fn()}))}));
vi.mock('@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceMutations',()=>({useManagerMaintenanceMutations:vi.fn(()=>({createTicket:{mutateAsync:createAsync,isPending:true},resolveTicket:{mutateAsync:resolveAsync,isPending:false}}))}));

describe('ManagerUseManagerMaintenanceLogic',()=>{it('exposes query state and completes create/resolve handlers',async()=>{const{result}=renderHook(()=>useManagerMaintenanceLogic());expect(result.current.isPending).toBe(true);await expect(result.current.createTicket({title:'x',equipment:'y',priority:'HIGH'})).resolves.toBe(true);await expect(result.current.resolveTicket('m1')).resolves.toBe(true);expect(createAsync).toHaveBeenCalled();expect(resolveAsync).toHaveBeenCalledWith('m1');});});
