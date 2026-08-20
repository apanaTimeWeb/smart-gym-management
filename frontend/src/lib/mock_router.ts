import { ApiResponse } from './api';

export async function routeMockRequest<T>(
  path: string,
  method: string = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  let mockData: Record<string, any> = {};

  try {
    // Determine which module to load mock data from based on the path
    if (path.includes('/auth')) {
      mockData = (await import('@/app/auth/auth_mock_data.json')).default;
    } else if (path.includes('/admin')) {
      mockData = (await import('@/app/admin/admin_mock_data.json')).default;
    } else if (path.includes('/manager')) {
      mockData = {};
    } else if (path.includes('/trainer')) {
      mockData = (await import('@/app/trainer/trainer_mock_data.json')).default;
    } else if (path.includes('/superadmin')) {
      mockData = (await import('@/app/superadmin/superadmin_mock_data.json')).default;
    }
  } catch (error) {
    console.warn(`[MockRouter] Could not load mock data for path: ${path}`);
  }

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

  // Construct the lookup key, e.g., "GET /auth/login"
  const key = `${method.toUpperCase()} ${path}`;
  const response = mockData[key];

  if (response) {
    console.log(`[MockRouter] Serving mock data for ${key}`);
    return response as ApiResponse<T>;
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
    
    if (path.includes('/members')) {
      return {
        success: true, message: 'Demo Members',
        data: {
          members: generate(15, i => ({
            id: `mem-${i}`, name: `Demo Member ${i + 1}`, email: `member${i}@example.com`,
            phone: `987654321${i % 10}`, status: i % 3 === 0 ? 'expired' : 'active',
            plan: { name: 'Pro Yearly', tier: 'premium' }, joinDate: '2023-01-15', expiryDate: '2024-01-15'
          })),
          total: 15, page: 1, limit: 15
        }
      } as unknown as ApiResponse<T>;
    }

    if (path.includes('/inquiries')) {
      return {
        success: true, message: 'Demo Inquiries',
        data: {
          inquiries: generate(10, i => ({
            id: `inq-${i}`, name: `Lead ${i + 1}`, phone: `887654321${i % 10}`,
            status: 'pending', source: 'Instagram', date: '2023-10-15', assignedTo: 'Trainer A'
          })),
          total: 10, page: 1, limit: 10
        }
      } as unknown as ApiResponse<T>;
    }

    if (path.includes('/attendance')) {
      return {
        success: true, message: 'Demo Attendance',
        data: {
          attendance: generate(20, i => ({
            id: `att-${i}`, memberName: `Active Member ${i}`, date: new Date().toISOString(),
            status: 'present', checkIn: '08:00 AM', checkOut: '09:30 AM'
          })),
          total: 20
        }
      } as unknown as ApiResponse<T>;
    }

    if (path.includes('/finance') || path.includes('/payments')) {
      return {
        success: true, message: 'Demo Finance',
        data: {
          payments: generate(10, i => ({
            id: `pay-${i}`, memberName: `Payer ${i}`, amount: 5000 + (i * 500),
            status: 'success', date: '2023-10-10', mode: 'upi', receiptNo: `REC-${1000 + i}`
          })),
          total: 10
        }
      } as unknown as ApiResponse<T>;
    }

    if (path.includes('/superadmin/plans')) {
      return { success: true, message: 'Demo SaaS Plans', data: generate(3, i => ({
        id: `saas-plan-${i}`, name: i === 0 ? 'Starter' : i === 1 ? 'Pro' : 'Enterprise',
        priceMonthly: 1000 * (i + 1), priceAnnual: 10000 * (i + 1), maxMembers: 100 * (i + 1),
        maxStaff: 5 * (i + 1), features: ['CRM', 'Billing', 'Analytics'], activeTenants: 10 * (i + 1)
      }))} as unknown as ApiResponse<T>;
    }

    if (path.includes('/plans') || path.includes('/store')) {
       return {
         success: true, message: 'Demo Plans/Store',
         data: generate(5, i => ({
           id: `plan-${i}`, name: `ERP Plan ${i + 1}`, price: 1000 * (i + 1), duration: `${i+1} Months`, status: 'active'
         }))
       } as unknown as ApiResponse<T>;
    }
    
    // Superadmin Mock Generics
    if (path.includes('/superadmin/tickets')) {
      return { success: true, message: 'Demo Tickets', data: generate(10, i => ({
        id: `tkt-${i}`, tenantName: `Gym Branch ${i + 1}`, subject: `Billing Issue ${i}`,
        status: i % 3 === 0 ? 'RESOLVED' : 'OPEN', priority: i % 4 === 0 ? 'HIGH' : 'LOW',
        createdAt: '2023-10-10', lastUpdated: '2023-10-12'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/invoices')) {
      return { success: true, message: 'Demo Invoices', data: generate(12, i => ({
        id: `inv-${i}`, tenantName: `Gym Branch ${i + 1}`, amount: 5000 + (i * 1000), currency: 'INR',
        status: i % 4 === 0 ? 'PENDING' : 'PAID', date: '2023-11-01', planName: 'Enterprise'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/coupons')) {
      return { success: true, message: 'Demo Coupons', data: generate(5, i => ({
        id: `coup-${i}`, code: `WELCOME${i * 10}`, discountType: 'PERCENTAGE', discountValue: 10 + i,
        maxUses: 100, currentUses: 20 * i, status: 'ACTIVE', expiryDate: '2024-12-31', isDeleted: false
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/affiliates')) {
      return { success: true, message: 'Demo Affiliates', data: generate(6, i => ({
        id: `aff-${i}`, name: `Partner ${i + 1}`, email: `partner${i}@example.com`, referralCode: `REF${i}00`,
        totalReferred: 5 * i, commissionEarned: 1000 * i, status: 'ACTIVE', joinedAt: '2023-05-01'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/broadcasts')) {
      return { success: true, message: 'Demo Broadcasts', data: generate(4, i => ({
        id: `bc-${i}`, title: `System Update v${i}.0`, content: 'Important update details.',
        status: i === 0 ? 'DRAFT' : 'SENT', audience: 'ALL_TENANTS', scheduledDate: null, sentDate: '2023-10-01'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/system') || path.includes('/superadmin/infrastructure')) {
      return { success: true, message: 'Demo Infrastructure', data: generate(3, i => ({
        id: `node-${i}`, name: `Production Node ${i + 1}`, cpuPercent: 30 + (i * 15),
        memoryPercent: 45 + (i * 10), diskPercent: 60 - (i * 5), status: 'Healthy'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/jobs')) {
      return { success: true, message: 'Demo Jobs', data: {
        jobs: generate(8, (i: number) => ({
          id: `job-${i}`, queueName: 'billing', jobName: 'process_invoice', status: i === 2 ? 'FAILED' : 'COMPLETED',
          attempts: 1, createdAt: '2023-11-05'
        })),
        metrics: { activeJobs: 3, completed24h: 120, failed24h: 2, delayed: 0 }
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/backups')) {
      return { success: true, message: 'Demo Backups', data: generate(5, i => ({
        id: `bup-${i}`, tenantName: `Gym Branch ${i + 1}`, databaseName: `db_gym_${i}`, sizeMB: 150 + (i * 50),
        status: 'SUCCESS', timestamp: '2023-11-05'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/migrations')) {
      return { success: true, message: 'Demo Migrations', data: {
        migrations: generate(3, i => ({ id: `mig-${i}`, name: `Add_Stripe_ID_${i}`, appliedAt: '2023-11-01', status: 'SUCCESS' })),
        tenants: generate(4, i => ({ id: `tenant-${i}`, name: `Gym Branch ${i}`, status: 'ACTIVE', databaseVersion: 'v1.5' }))
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/audit-logs')) {
      return { success: true, message: 'Demo Audit Logs', data: generate(15, i => ({
        id: `log-${i}`, actorName: 'Demo Admin', actorRole: 'SUPERADMIN', action: 'UPDATE_TENANT',
        targetResource: `tenant-${i}`, timestamp: '2023-11-05', ipAddress: '192.168.1.1'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/features')) {
      return { success: true, message: 'Demo Features', data: {
        flags: generate(4, i => ({ id: `flag-${i}`, name: `Beta_Feature_${i}`, description: 'A beta feature', isGlobalEnabled: true, enabledTenantIds: [] })),
        notes: generate(3, i => ({ id: `note-${i}`, version: `1.0.${i}`, title: 'Update Note', content: 'Fixed bugs.', date: '2023-10-01', isPublished: true }))
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/superadmin/settings')) {
      return { success: true, message: 'Demo Settings', data: generate(6, i => ({
        id: `set-${i}`, key: `ALLOW_SIGNUPS_${i}`, value: 'true', description: 'Enable signups', category: 'General', dataType: 'boolean'
      }))} as unknown as ApiResponse<T>;
    }
    if (path.includes('/tenants') || path.includes('/gyms')) {
       return {
         success: true, message: 'Demo Tenants',
         data: generate(8, i => ({
           id: `tenant-${i}`, name: `Gym Branch ${i + 1}`, ownerName: 'Admin Owner', adminEmail: `admin${i}@gym.com`,
           phone: `998877665${i}`, status: 'ACTIVE', plan: 'Enterprise', createdAt: '2023-01-01',
           memberCount: 150 + (i * 20), monthlyRevenue: 50000 + (i * 5000), databaseVersion: 'v1.0'
         }))
       } as unknown as ApiResponse<T>;
    }

    if (path.includes('/erp/hr/staff')) {
      return { success: true, message: 'Demo Staff', data: {
        staff: generate(8, i => ({ id: `staff-${i}`, name: `Trainer ${i+1}`, role: i === 0 ? 'Manager' : 'Trainer', email: `trainer${i}@gym.com`, phone: '9988776655', status: 'ACTIVE', joinedDate: '2023-01-01' })),
        total: 8
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/erp/hr/payrolls')) {
      return { success: true, message: 'Demo Payrolls', data: {
        payrolls: generate(8, i => ({ id: `pay-${i}`, staffName: `Trainer ${i+1}`, amount: 25000 + (i * 2000), status: i === 2 ? 'PENDING' : 'PAID', month: 'October 2023' })),
        total: 8
      }} as unknown as ApiResponse<T>;
    }
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
    if (path.includes('/erp/workout/workouts')) {
      return { success: true, message: 'Demo Workouts', data: {
        workouts: generate(5, i => ({ id: `wo-${i}`, name: `Workout Plan ${i+1}`, difficulty: 'Medium', durationMins: 45, targetMuscle: 'Full Body' })),
        total: 5
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/erp/workout/exercises') || path.includes('/erp/library/exercises')) {
      return { success: true, message: 'Demo Exercises', data: {
        exercises: generate(10, i => ({ id: `ex-${i}`, name: `Exercise ${i+1}`, targetMuscle: 'Chest', equipment: 'Dumbbell', videoUrl: '' })),
        total: 10
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/erp/workout/diet-plans') || path.includes('/erp/library/diet-plans')) {
      return { success: true, message: 'Demo Diet Plans', data: {
        dietPlans: generate(4, i => ({ id: `diet-${i}`, name: `Keto Diet ${i+1}`, goal: 'Weight Loss', calories: 1500 + (i * 200) })),
        total: 4
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/erp/settings')) {
      return { success: true, message: 'Demo Settings', data: {
        gymName: 'Demo Gym Base', currency: 'INR', timezone: 'Asia/Kolkata', emailNotifications: true
      }} as unknown as ApiResponse<T>;
    }

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
