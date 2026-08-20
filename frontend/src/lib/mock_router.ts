import { ApiResponse } from './api';

class MockDB {
  private static prefix = 'gymsmart_mock_';
  
  static getCollection(name: string, defaultData: any[] = []): any[] {
    if (typeof window === 'undefined') return defaultData;
    const val = localStorage.getItem(this.prefix + name);
    if (val) return JSON.parse(val);
    this.setCollection(name, defaultData);
    return defaultData;
  }
  
  static setCollection(name: string, data: any[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.prefix + name, JSON.stringify(data));
    }
  }

  static handleCrud(collectionName: string, method: string, path: string, body?: any, defaultData: any[] = [], listKey?: string) {
    const coll = this.getCollection(collectionName, defaultData);
    const segments = path.split('?')[0].split('/');
    const possibleId = segments[segments.length - 1];
    
    // Determine if we are querying an ID (PATCH/DELETE or GET with an ID segment)
    const isBaseEndpoint = path.split('?')[0].endsWith(collectionName) || path.split('?')[0].endsWith(collectionName.split('_').pop() || '');
    const id = (method === 'PATCH' || method === 'DELETE' || (method === 'GET' && !isBaseEndpoint)) ? possibleId : null;

    if (method === 'GET') {
      if (id) {
        const item = coll.find(x => x.id === id);
        return { success: !!item, message: item ? 'Fetched' : 'Not found', data: item || null };
      }
      // Return wrapped object if listKey provided, otherwise array
      return { success: true, message: 'Fetched list', data: listKey ? { [listKey]: coll, total: coll.length } : coll };
    }
    
    if (method === 'POST') {
      const newItem = {
        id: `${collectionName.split('_').pop()}-${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString()
      };
      coll.push(newItem);
      this.setCollection(collectionName, coll);
      return { success: true, message: 'Created successfully', data: newItem };
    }
    
    if (method === 'PATCH' || method === 'PUT') {
      const idx = coll.findIndex(x => x.id === id);
      if (idx === -1) return { success: false, message: 'Not found', data: null };
      coll[idx] = { ...coll[idx], ...body, updatedAt: new Date().toISOString() };
      this.setCollection(collectionName, coll);
      return { success: true, message: 'Updated successfully', data: coll[idx] };
    }
    
    if (method === 'DELETE') {
      const newColl = coll.filter(x => x.id !== id);
      this.setCollection(collectionName, newColl);
      return { success: true, message: 'Deleted successfully', data: { id } };
    }

    return { success: false, message: 'Method not allowed', data: null };
  }
}

export async function routeMockRequest<T>(
  path: string,
  method: string = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Handle explicit dynamic mutations (like Login)
  if (method === 'POST' && path.includes('/auth/login')) {
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body || {});
    const isSuperadmin = bodyStr.includes('demo_admin');
    
    return {
      success: true,
      message: 'Demo Login Successful',
      data: {
        accessToken: 'demo-access-token',
        refreshToken: 'demo-refresh-token',
        user: {
          id: 'demo-user-id',
          email: isSuperadmin ? 'demo_admin@gym.com' : 'admin@gymsmart.com',
          name: 'Demo Admin',
          role: isSuperadmin ? 'SUPERADMIN' : 'ADMIN',
          tenantId: 'demo-tenant-id'
        }
      }
    } as unknown as ApiResponse<T>;
  }

  // ==========================================
  // STATEFUL MOCK DB INTERCEPTIONS (Admin/Manager/Trainer)
  // ==========================================
  const generate = (count: number, generator: (i: number) => any) => Array.from({ length: count }, (_, i) => generator(i));

  if (path.includes('/store/products')) return MockDB.handleCrud('mock_products', method, path, body, generate(15, i => ({ id: `prod-${i}`, name: `Mock Product ${i}`, category: 'Supplements', price: 1500, stock: 50, status: 'IN_STOCK' })), 'products') as unknown as ApiResponse<T>;
  if (path.includes('/store/orders')) return MockDB.handleCrud('mock_orders', method, path, body, generate(5, i => ({ id: `ord-${i}`, customerName: `Customer ${i}`, totalAmount: 3000, paymentMethod: 'Card', status: 'COMPLETED', date: new Date().toISOString() })), 'orders') as unknown as ApiResponse<T>;
  if (path.includes('/plans') && !path.includes('/superadmin')) return MockDB.handleCrud('mock_admin_plans', method, path, body, generate(3, i => ({ id: `plan-${i}`, name: i === 0 ? 'Basic Plan' : i === 1 ? 'Pro Plan' : 'VIP Plan', tier: i === 0 ? 'Standard' : i === 1 ? 'Premium' : 'Elite', price1Month: 1000 * (i + 1), price3Month: 2500 * (i + 1), price6Month: 4800 * (i + 1), price12Month: 9000 * (i + 1), features: ['Access to gym', 'Locker facility', 'Cardio section'], isActive: true }))) as unknown as ApiResponse<T>;
  if (path.includes('/members') && !path.includes('/stats') && !path.includes('/superadmin')) return MockDB.handleCrud('mock_members', method, path, body, generate(15, i => ({ id: `mem-${i}`, name: `Demo Member ${i + 1}`, email: `member${i}@example.com`, phone: `987654321${i % 10}`, status: i % 3 === 0 ? 'expired' : 'active', plan: { name: 'Pro Yearly', tier: 'premium' }, joinDate: '2023-01-15', expiryDate: '2024-01-15' })), 'members') as unknown as ApiResponse<T>;
  if (path.includes('/inquiries') || path.includes('/landing/booking') || path.includes('/landing/contact')) {
    // If it's a landing page POST, we coerce the method to POST for inquiries
    const actualMethod = path.includes('/landing') ? 'POST' : method;
    return MockDB.handleCrud('mock_inquiries', actualMethod, path, body, generate(10, i => ({ id: `inq-${i}`, name: `Lead ${i + 1}`, phone: `887654321${i % 10}`, status: 'pending', source: 'Instagram', date: '2023-10-15', assignedTo: 'Trainer A' })), 'inquiries') as unknown as ApiResponse<T>;
  }
  if (path.includes('/attendance')) return MockDB.handleCrud('mock_attendance', method, path, body, generate(20, i => ({ id: `att-${i}`, memberName: `Active Member ${i}`, date: new Date().toISOString(), status: 'present', checkIn: '08:00 AM', checkOut: '09:30 AM' })), 'attendance') as unknown as ApiResponse<T>;
  if (path.includes('/hr/staff')) return MockDB.handleCrud('mock_staff', method, path, body, generate(8, i => ({ id: `staff-${i}`, name: `Trainer ${i+1}`, role: i === 0 ? 'Manager' : 'Trainer', email: `trainer${i}@gym.com`, phone: '9988776655', status: 'ACTIVE', joinedDate: '2023-01-01' })), 'staff') as unknown as ApiResponse<T>;
  if (path.includes('/hr/payrolls')) return MockDB.handleCrud('mock_payrolls', method, path, body, generate(8, i => ({ id: `pay-${i}`, staffName: `Trainer ${i+1}`, amount: 25000 + (i * 2000), status: i === 2 ? 'PENDING' : 'PAID', month: 'October 2023' })), 'payrolls') as unknown as ApiResponse<T>;
  if (path.includes('/exercises')) return MockDB.handleCrud('mock_exercises', method, path, body, generate(10, i => ({ id: `ex-${i}`, name: `Exercise ${i+1}`, targetMuscle: 'Chest', equipment: 'Dumbbell', videoUrl: '' })), 'exercises') as unknown as ApiResponse<T>;
  if (path.includes('/diet-plans')) return MockDB.handleCrud('mock_diet_plans', method, path, body, generate(4, i => ({ id: `diet-${i}`, name: `Keto Diet ${i+1}`, goal: 'Weight Loss', calories: 1500 + (i * 200) })), 'dietPlans') as unknown as ApiResponse<T>;
  if (path.includes('/workouts')) return MockDB.handleCrud('mock_workouts', method, path, body, generate(5, i => ({ id: `wo-${i}`, name: `Workout Plan ${i+1}`, difficulty: 'Medium', durationMins: 45, targetMuscle: 'Full Body' })), 'workouts') as unknown as ApiResponse<T>;
  if (path.includes('/finance') || path.includes('/payments')) return MockDB.handleCrud('mock_payments', method, path, body, generate(10, i => ({ id: `pay-${i}`, memberName: `Payer ${i}`, amount: 5000 + (i * 500), status: 'success', date: '2023-10-10', mode: 'upi', receiptNo: `REC-${1000 + i}` })), 'payments') as unknown as ApiResponse<T>;
  if (path.includes('/settings')) return MockDB.handleCrud('mock_settings', method, path, body, generate(1, i => ({ id: `setting-${i}`, gymName: 'Demo Gym Base', currency: 'INR', timezone: 'Asia/Kolkata', emailNotifications: true }))) as unknown as ApiResponse<T>;


  // SUPERADMIN Stateful Interceptions
  if (path.includes('/superadmin/tickets')) return MockDB.handleCrud('mock_tickets', method, path, body, generate(10, i => ({ id: `tkt-${i}`, tenantName: `Gym Branch ${i + 1}`, subject: `Billing Issue ${i}`, status: i % 3 === 0 ? 'RESOLVED' : 'OPEN', priority: i % 4 === 0 ? 'HIGH' : 'LOW', createdAt: '2023-10-10', lastUpdated: '2023-10-12' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/invoices')) return MockDB.handleCrud('mock_invoices', method, path, body, generate(12, i => ({ id: `inv-${i}`, tenantName: `Gym Branch ${i + 1}`, amount: 5000 + (i * 1000), currency: 'INR', status: i % 4 === 0 ? 'PENDING' : 'PAID', date: '2023-11-01', planName: 'Enterprise' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/coupons')) return MockDB.handleCrud('mock_coupons', method, path, body, generate(5, i => ({ id: `coup-${i}`, code: `WELCOME${i * 10}`, discountType: 'PERCENTAGE', discountValue: 10 + i, maxUses: 100, currentUses: 20 * i, status: 'ACTIVE', expiryDate: '2024-12-31', isDeleted: false }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/affiliates')) return MockDB.handleCrud('mock_affiliates', method, path, body, generate(6, i => ({ id: `aff-${i}`, name: `Partner ${i + 1}`, email: `partner${i}@example.com`, referralCode: `REF${i}00`, totalReferred: 5 * i, commissionEarned: 1000 * i, status: 'ACTIVE', joinedAt: '2023-05-01' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/broadcasts')) return MockDB.handleCrud('mock_broadcasts', method, path, body, generate(4, i => ({ id: `bc-${i}`, title: `System Update v${i}.0`, content: 'Important update details.', status: i === 0 ? 'DRAFT' : 'SENT', audience: 'ALL_TENANTS', scheduledDate: null, sentDate: '2023-10-01' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/system') || path.includes('/superadmin/infrastructure')) return MockDB.handleCrud('mock_infrastructure', method, path, body, generate(3, i => ({ id: `node-${i}`, name: `Production Node ${i + 1}`, cpuPercent: 30 + (i * 15), memoryPercent: 45 + (i * 10), diskPercent: 60 - (i * 5), status: 'Healthy' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/jobs')) return MockDB.handleCrud('mock_jobs', method, path, body, generate(8, (i: number) => ({ id: `job-${i}`, queueName: 'billing', jobName: 'process_invoice', status: i === 2 ? 'FAILED' : 'COMPLETED', attempts: 1, createdAt: '2023-11-05' })), 'jobs') as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/backups')) return MockDB.handleCrud('mock_backups', method, path, body, generate(5, i => ({ id: `bup-${i}`, tenantName: `Gym Branch ${i + 1}`, databaseName: `db_gym_${i}`, sizeMB: 150 + (i * 50), status: 'SUCCESS', timestamp: '2023-11-05' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/audit-logs')) return MockDB.handleCrud('mock_audit_logs', method, path, body, generate(15, i => ({ id: `log-${i}`, actorName: 'Demo Admin', actorRole: 'SUPERADMIN', action: 'UPDATE_TENANT', targetResource: `tenant-${i}`, timestamp: '2023-11-05', ipAddress: '192.168.1.1' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/settings')) return MockDB.handleCrud('mock_settings', method, path, body, generate(6, i => ({ id: `set-${i}`, key: `ALLOW_SIGNUPS_${i}`, value: 'true', description: 'Enable signups', category: 'General', dataType: 'boolean' }))) as unknown as ApiResponse<T>;
  if (path.includes('/tenants') || path.includes('/gyms') || path.includes('/superadmin/gyms')) return MockDB.handleCrud('mock_tenants', method, path, body, generate(8, i => ({ id: `tenant-${i}`, name: `Gym Branch ${i + 1}`, ownerName: 'Admin Owner', adminEmail: `admin${i}@gym.com`, phone: `998877665${i}`, status: 'ACTIVE', plan: 'Enterprise', createdAt: '2023-01-01', memberCount: 150 + (i * 20), monthlyRevenue: 50000 + (i * 5000), databaseVersion: 'v1.0' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/plans')) return MockDB.handleCrud('mock_saas_plans', method, path, body, generate(3, i => ({ id: `saas-plan-${i}`, name: i === 0 ? 'Starter' : i === 1 ? 'Pro' : 'Enterprise', priceMonthly: 1000 * (i + 1), priceAnnual: 10000 * (i + 1), maxMembers: 100 * (i + 1), maxStaff: 5 * (i + 1), features: ['CRM', 'Billing', 'Analytics'], activeTenants: 10 * (i + 1) }))) as unknown as ApiResponse<T>;
  // For features and migrations, which return compound objects in GET, we let GET bypass or handle specifically.
  if (path.includes('/superadmin/features')) return MockDB.handleCrud('mock_features', method, path, body, generate(4, i => ({ id: `flag-${i}`, name: `Beta_Feature_${i}`, description: 'A beta feature', isGlobalEnabled: true, enabledTenantIds: [] })), 'flags') as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/migrations')) {
    if (method === 'GET') {
      const migrations = MockDB.getCollection('mock_migrations', generate(3, i => ({ id: `mig-${i}`, name: `Add_Stripe_ID_${i}`, appliedAt: '2023-11-01', status: 'SUCCESS' })));
      const tenants = MockDB.getCollection('mock_tenants', generate(8, i => ({ id: `tenant-${i}`, name: `Gym Branch ${i + 1}`, ownerName: 'Admin Owner', adminEmail: `admin${i}@gym.com`, phone: `998877665${i}`, status: 'ACTIVE', plan: 'Enterprise', createdAt: '2023-01-01', memberCount: 150 + (i * 20), monthlyRevenue: 50000 + (i * 5000), databaseVersion: 'v1.0' })));
      return { success: true, message: 'Fetched migrations compound data', data: { migrations, tenants } } as unknown as ApiResponse<T>;
    }
    return MockDB.handleCrud('mock_migrations', method, path, body, [], 'migrations') as unknown as ApiResponse<T>;
  }

  // Dynamic Rich Data Generator for Demo Mode
  if (method === 'GET') {
    // Helper to generate an array
    const generate = (count: number, generator: (i: number) => any) => Array.from({ length: count }, (_, i) => generator(i));

    if (path.includes('/superadmin/dashboard')) {
      return {
        success: true, message: 'Superadmin Dashboard Mock',
        data: {
          metrics: {
            monthlyRecurringRevenue: 1250000,
            totalGyms: 45,
            activeGyms: 42,
            totalEndUsers: 15420,
            recentOnboards: generate(5, i => ({
              id: `tenant-${i}`, name: `Demo Gym ${i}`, ownerName: `Owner ${i}`, plan: i % 2 === 0 ? 'Enterprise' : 'Pro', createdAt: '2023-10-01'
            }))
          },
          revenue: [
            { month: 'Jan', mrr: 1000000 }, { month: 'Feb', mrr: 1100000 },
            { month: 'Mar', mrr: 1150000 }, { month: 'Apr', mrr: 1250000 }
          ],
          growth: []
        }
      } as unknown as ApiResponse<T>;
    }

    if (path.includes('/admin/dashboard') || path.includes('/manager/dashboard') || path.includes('/trainer/dashboard') || path.includes('/dashboard')) {
      return {
        success: true, message: 'Demo Dashboard',
        data: {
          totalMembers: 1240, 
          activeMembers: 890, 
          newMembersThisMonth: 124,
          totalRevenue: 5400000,
          monthlyRevenue: 450000, 
          pendingPayments: 24500,
          totalStaff: 15,
          activeStaff: 12,
          totalProducts: 450,
          lowStockCount: 3,
          totalInquiries: 320,
          newInquiries: 45,
          membersByStatus: { active: 890, pending: 45, expired: 305 },
          memberGrowth: [
            { month: 'Jan', count: 800 }, { month: 'Feb', count: 850 },
            { month: 'Mar', count: 950 }, { month: 'Apr', count: 1100 }
          ],
          revenueChart: [
            { month: 'Jan', revenue: 300000 }, { month: 'Feb', revenue: 350000 },
            { month: 'Mar', revenue: 320000 }, { month: 'Apr', revenue: 450000 }
          ],
          membersByPlan: [
            { plan: 'Basic', count: 400 }, { plan: 'Pro', count: 600 }, { plan: 'Elite', count: 240 }
          ],
          recentMembers: generate(5, (i: number) => ({ id: `mem-${i}`, name: `New Member ${i}`, plan: 'Pro', status: 'ACTIVE', joinDate: '2023-10-01', paidAmount: 5000 })),
          recentPayments: generate(5, (i: number) => ({ id: `pay-${i}`, invoiceNo: `INV-00${i}`, amount: 3000, method: 'CARD', paidAt: '2023-10-01', member: { name: `Member ${i}` } })),
          pendingPaymentsList: generate(3, (i: number) => ({ id: `pend-${i}`, name: `Pending ${i}`, pendingAmount: 1500, expiryDate: '2023-09-25' }))
        }
      } as unknown as ApiResponse<T>;
    }
    
    // Removed /members, /inquiries, /attendance (now handled by MockDB stateful routing)

    // Removed /finance and /superadmin/plans (handled by MockDB stateful routing)

    // Removed /plans, /store (now handled by MockDB)
    
    // Superadmin Mock Generics removed (now handled by MockDB stateful routing)

    // Removed /erp/hr, /erp/workout, /erp/library (now handled by MockDB)
    if (path.includes('/erp/sales/overview')) {
      return { success: true, message: 'Demo Sales Overview', data: {
        monthlyRevenue: generate(6, i => ({ month: `Month ${i+1}`, revenue: 300000 + (i * 15000), expenses: 100000 + (i * 5000) }))
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/erp/sales/membership-report')) {
      return { success: true, message: 'Demo Membership Report', data: {
        report: generate(5, i => ({ plan: `Plan ${i+1}`, signups: 20 * i, revenue: 50000 * i })),
        totals: { signups: 100, revenue: 250000 }
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/erp/sales/pending-payments')) {
      return { success: true, message: 'Demo Pending Payments', data: {
        members: generate(6, i => ({ id: `mem-${i}`, name: `Defaulter ${i+1}`, pendingAmount: 5000, dueDate: '2023-11-01' })),
        total: 6
      }} as unknown as ApiResponse<T>;
    }
    // End removed
    // Removed /settings (handled by MockDB stateful routing)

    // Default list fallback
    return {
      success: true, message: `Demo Mode: Action ${method} ${path} successful`,
      data: []
    } as unknown as ApiResponse<T>;
  }

  // Generic fallback if no specific mock is found for mutations (POST, PUT, DELETE)
  console.log(`[MockRouter] No mock found for ${key}, returning safe mutation fallback.`);
  
  let parsedBody: any = {};
  if (body) {
     try {
       parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
     } catch (e) {}
  }
  
  const safeData = {
    id: `mock-id-${Date.now()}`,
    ...parsedBody,
    status: parsedBody.status || 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  return {
    success: true,
    message: `Demo Mode: Action ${method} ${path} successful`,
    data: safeData as any,
  };
}
