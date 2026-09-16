import { setupServer } from 'msw/node';
import { managerHandlers } from '@/app/manager/manager_mocks/ManagerMockHandlers';

export const managerMswServer = setupServer(...managerHandlers);
