import { ApiResponse } from './api';

class MockDB {
  private static prefix = 'gymsmart_mock_';
  
  static getCollection(name: string, defaultData: Record<string, unknown>[] = []): Record<string, unknown>[] {
    if (typeof window === 'undefined') return defaultData;
    const val = localStorage.getItem(this.prefix + name);
    if (val) return JSON.parse(val);
    this.setCollection(name, defaultData);
    return defaultData;
  }
  
  static setCollection(name: string, data: Record<string, unknown>[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.prefix + name, JSON.stringify(data));
    }
  }

  static handleCrud(collectionName: string, method: string, path: string, body?: unknown, defaultData: Record<string, unknown>[] = [], listKey?: string) {
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
      let idStr = `${collectionName.split('_').pop()}-${Date.now()}`;
      
      // Custom ID format for members
      if (collectionName === 'mock_members') {
        const today = new Date();
        const dateStr = String(today.getDate()).padStart(2, '0') + String(today.getMonth() + 1).padStart(2, '0') + today.getFullYear();
        const nextNo = String(coll.length + 1).padStart(3, '0');
        idStr = `GS-${dateStr}-${nextNo}`;
      }

      const newItem = {
        id: idStr,
        ...(body as Record<string, unknown>),
        createdAt: new Date().toISOString()
      };
      coll.push(newItem);
      this.setCollection(collectionName, coll);
      return { success: true, message: 'Created successfully', data: newItem };
    }
    
    if (method === 'PATCH' || method === 'PUT') {
      const idx = coll.findIndex(x => x.id === id);
      if (idx === -1) return { success: false, message: 'Not found', data: null };
      coll[idx] = { ...coll[idx], ...(body as Record<string, unknown>), updatedAt: new Date().toISOString() };
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
  body?: unknown
): Promise<ApiResponse<T>> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Handle explicit dynamic mutations (like Login)
  if (method === 'POST' && path.includes('/auth/login')) {
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body || {});
    let role = 'ADMIN';
    let email = 'admin@gymsmart.com';
    let name = 'Demo Admin';
    if (bodyStr.includes('demo_admin')) { role = 'SUPERADMIN'; email = 'demo_admin@gym.com'; name = 'Super Admin'; }
    else if (bodyStr.includes('manager@')) { role = 'MANAGER'; email = 'manager@gymsmart.com'; name = 'Demo Manager'; }
    else if (bodyStr.includes('trainer@')) { role = 'TRAINER'; email = 'trainer@gymsmart.com'; name = 'Demo Trainer'; }
    
    return {
      success: true,
      message: 'Demo Login Successful',
      data: {
        accessToken: 'demo-access-token',
        refreshToken: 'demo-refresh-token',
        user: {
          id: 'demo-user-id',
          email,
          name,
          role,
          tenantId: 'demo-tenant-id'
        }
      }
    } as unknown as ApiResponse<T>;
  }

  // ==========================================
  // STATEFUL MOCK DB INTERCEPTIONS (Admin/Manager/Trainer)
  // ==========================================
  let parsedBody: any = body;
  if (typeof body === 'string') {
    try { parsedBody = JSON.parse(body); } catch (e) {}
  }

  const generate = (count: number, generator: (i: number) => Record<string, unknown>) => Array.from({ length: count }, (_, i) => generator(i));

  if (path.includes('/store/products')) {
    const existing = MockDB.getCollection('mock_products', []);
    if (existing.length > 0 && existing.some((r: any) => r.name?.includes('Mock Product'))) {
      MockDB.setCollection('mock_products', []);
    }
    const defaultProducts = [
      { id: 'prod-1', name: 'Optimum Nutrition Gold Standard Whey', category: 'Supplements', price: 6500, stock: 15, description: '100% Whey Protein Isolate', isActive: true, unit: '2.27 KG' },
      { id: 'prod-2', name: 'MuscleBlaze Biozyme Performance Whey', category: 'Supplements', price: 2399, stock: 20, description: 'Enhanced absorption whey', isActive: true, unit: '1 KG' },
      { id: 'prod-3', name: 'Cellucor C4 Original Pre-Workout', category: 'Supplements', price: 1800, stock: 45, description: 'Explosive energy pre-workout', isActive: true, unit: '195g' },
      { id: 'prod-4', name: 'ON Micronized Creatine Monohydrate', category: 'Supplements', price: 1200, stock: 35, description: 'Pure unflavored creatine', isActive: true, unit: '300g' },
      { id: 'prod-5', name: 'Scivation Xtend BCAA', category: 'Supplements', price: 2100, stock: 25, description: 'Intra-workout recovery drink', isActive: true, unit: '420g' },
      { id: 'prod-6', name: 'Monster Energy Drink Zero Ultra', category: 'Supplements', price: 150, stock: 50, description: 'Sugar-free energy drink', isActive: true, unit: '500 ML' },
      { id: 'prod-7', name: 'Under Armour Tech 2.0 T-Shirt', category: 'Merchandise', price: 1499, stock: 12, description: 'Breathable dry-fit training tee', isActive: true, unit: 'Large' },
      { id: 'prod-8', name: 'BlenderBottle Classic Shaker', category: 'Accessories', price: 699, stock: 30, description: 'Spill-proof shaker bottle', isActive: true, unit: '800 ML' },
      { id: 'prod-9', name: 'Nivia Python Gym Gloves', category: 'Accessories', price: 450, stock: 18, description: 'Weightlifting gloves with wrist support', isActive: true, unit: 'Medium' },
      { id: 'prod-10', name: 'Rogue Heavy Duty Lifting Belt', category: 'Accessories', price: 3500, stock: 8, description: 'Leather powerlifting belt', isActive: true, unit: '1 Piece' }
    ];
    return MockDB.handleCrud('mock_products', method, path, parsedBody, defaultProducts, 'products') as unknown as ApiResponse<T>;
  }

  if (path.includes('/store/summary')) {
    const products = MockDB.getCollection('mock_products', []);
    const orders = MockDB.getCollection('mock_orders', []);
    const revenue = orders.reduce((acc: number, o: any) => acc + (Number(o.total) || 0), 0);
    return { success: true, message: 'Summary', data: { totalProducts: products.length, totalOrders: orders.length, totalRevenue: revenue, lowStockProducts: products.filter((p: any) => Number(p.stock) <= 10) } } as unknown as ApiResponse<T>;
  }

  if (path.includes('/store/orders')) {
    const existing = MockDB.getCollection('mock_orders', []);
    if (existing.length > 0 && existing.some((r: any) => !r.items)) {
       MockDB.setCollection('mock_orders', []);
    }
    if (method === 'POST') {
       const products = MockDB.getCollection('mock_products', []);
       const items = (parsedBody.items || []) as any[];
       items.forEach(item => {
         const prodIdx = products.findIndex(p => String(p.id) === String(item.productId));
         if (prodIdx > -1) {
           products[prodIdx].stock = Math.max(0, Number(products[prodIdx].stock) - Number(item.qty));
         }
       });
       MockDB.setCollection('mock_products', products);
    }
    const defaultOrders = [
      { id: 'ord-1', customerName: 'Demo Customer', total: 1200, method: 'UPI', status: 'COMPLETED', createdAt: new Date().toISOString(), items: [{ productId: 'prod-2', qty: 1, price: 1200, product: { name: 'Creatine Monohydrate', unit: '300g' } }] }
    ];
    return MockDB.handleCrud('mock_orders', method, path, parsedBody, defaultOrders, 'orders') as unknown as ApiResponse<T>;
  }
  if (path.includes('/plans') && !path.includes('/superadmin')) return MockDB.handleCrud('mock_admin_plans', method, path, parsedBody, generate(3, i => ({ id: `plan-${i}`, name: i === 0 ? 'Basic Plan' : i === 1 ? 'Pro Plan' : 'VIP Plan', tier: i === 0 ? 'Standard' : i === 1 ? 'Premium' : 'Elite', price1Month: 1000 * (i + 1), price3Month: 2500 * (i + 1), price6Month: 4800 * (i + 1), price12Month: 9000 * (i + 1), features: ['Access to gym', 'Locker facility', 'Cardio section'], isActive: true }))) as unknown as ApiResponse<T>;
  if (path.includes('/members/stats')) return { success: true, message: 'Stats', data: { total: 150, active: 110, pending: 25, expired: 15 } } as unknown as ApiResponse<T>;
  if (path.includes('/members') && !path.includes('/stats') && !path.includes('/superadmin')) {
    const existing = MockDB.getCollection('mock_members', []);
    if (existing.length > 0 && existing.some((r: any) => r.name?.includes('Demo Member'))) {
      const filtered = existing.filter((r: any) => !r.name?.includes('Demo Member'));
      MockDB.setCollection('mock_members', filtered);
    }
    return MockDB.handleCrud('mock_members', method, path, parsedBody, [], 'members') as unknown as ApiResponse<T>;
  }
  if (path.includes('/inquiries') || path.includes('/landing/booking') || path.includes('/landing/contact')) {
    // If it's a landing page POST, we coerce the method to POST for inquiries
    const actualMethod = path.includes('/landing') ? 'POST' : method;
    return MockDB.handleCrud('mock_inquiries', actualMethod, path, parsedBody, generate(10, i => ({ 
      id: `inq-${i}`, 
      name: `Lead ${i + 1}`, 
      phone: `887654321${i % 10}`, 
      status: i % 2 === 0 ? 'NEW' : 'FOLLOW_UP', 
      source: 'Instagram', 
      interest: 'Basic Membership',
      date: '2023-10-15', 
      assignedTo: 'Trainer A',
      createdAt: new Date().toISOString()
    })), 'inquiries') as unknown as ApiResponse<T>;
  }
  if (path.includes('/attendance/history')) {
    const url = new URL(`http://localhost${path}`);
    const userId = url.searchParams.get('userId') || 'mock-user';
    const type = url.searchParams.get('type') || 'STAFF';
    const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7); // YYYY-MM
    
    // Fetch actual real data from mock db instead of generating random history
    const allAttendance = MockDB.getCollection('mock_admin_attendance', []);
    const history = allAttendance.filter(r => {
      const rUserId = type === 'STAFF' ? r.staffId : r.memberId;
      const matchesUser = String(rUserId) === String(userId);
      const matchesMonth = typeof r.date === 'string' && r.date.startsWith(month);
      return matchesUser && matchesMonth;
    });
    
    return { success: true, message: 'History fetched', data: history } as unknown as ApiResponse<T>;
  }
  if (path.includes('/attendance/today-stats')) {
    const records = MockDB.getCollection('mock_admin_attendance', generate(20, i => { const d = new Date(); d.setHours(8, 0, 0, 0); const d2 = new Date(); d2.setHours(9, 30, 0, 0); return { id: `att-${i}`, type: i % 4 === 0 ? 'STAFF' : 'MEMBER', member: { name: `Active Member ${i}` }, staff: { name: `Trainer ${i}` }, date: new Date().toISOString(), checkIn: d.toISOString(), checkOut: d2.toISOString() }; }));
    const todayStr = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => (r.date as string)?.startsWith(todayStr));
    const memberCheckIns = todayRecords.filter(r => r.type === 'MEMBER').length;
    const staffCheckIns = todayRecords.filter(r => r.type === 'STAFF').length;
    return { success: true, message: 'Stats', data: { totalCheckIns: todayRecords.length, memberCheckIns, staffCheckIns } } as unknown as ApiResponse<T>;
  }
  if (path.includes('/attendance')) {
    const existing = MockDB.getCollection('mock_admin_attendance', []);
    if (existing.length > 0 && existing.some((r: any) => r.member?.name?.includes('Active Member') || r.staff?.name?.includes('Trainer '))) {
      const filtered = existing.filter((r: any) => !r.member?.name?.includes('Active Member') && !r.staff?.name?.includes('Trainer '));
      MockDB.setCollection('mock_admin_attendance', filtered);
    }
    // Return empty by default so it starts blank until manually checked in
    return MockDB.handleCrud('mock_admin_attendance', method, path, parsedBody, [], 'attendance') as unknown as ApiResponse<T>;
  }
  if (path.includes('/hr/summary')) {
    const staffList = MockDB.getCollection('mock_admin_staff', []);
    const reqMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const currentPayrolls = MockDB.getCollection('mock_admin_payrolls', []).filter((p: any) => p.month === reqMonth);
    
    const activeStaff = staffList.filter((s: any) => s.isActive).length;
    const paidCount = currentPayrolls.filter((p: any) => p.status === 'PAID').length;
    const pendingCount = currentPayrolls.filter((p: any) => p.status === 'PENDING').length;
    const totalPayrollThisMonth = currentPayrolls.reduce((sum: number, p: any) => sum + (Number(p.amount) || 0), 0);
    
    return { success: true, message: 'Summary', data: { totalStaff: staffList.length, activeStaff, totalPayrollThisMonth, paidCount, pendingCount } } as unknown as ApiResponse<T>;
  }
  
  if (path.includes('/hr/staff')) {
    const existingStaff = MockDB.getCollection('mock_admin_staff', []);
    if (existingStaff.length > 0 && existingStaff.some((r: any) => r.name?.includes('Trainer '))) {
      const filtered = existingStaff.filter((r: any) => !r.name?.includes('Trainer '));
      MockDB.setCollection('mock_admin_staff', filtered);
    }
    return MockDB.handleCrud('mock_admin_staff', method, path, parsedBody, [], 'staff') as unknown as ApiResponse<T>;
  }
  
  if (path.includes('/hr/payrolls')) {
    const existingPayrolls = MockDB.getCollection('mock_admin_payrolls', []);
    if (existingPayrolls.length > 0 && existingPayrolls.some((r: any) => r.staff?.name?.includes('Trainer '))) {
      const filtered = existingPayrolls.filter((r: any) => !r.staff?.name?.includes('Trainer '));
      MockDB.setCollection('mock_admin_payrolls', filtered);
    }
    
    if (method === 'GET') {
      const qsMonthMatch = path.match(/month=([^&]+)/);
      const reqMonth = qsMonthMatch ? decodeURIComponent(qsMonthMatch[1]) : new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
      
      const staffList = MockDB.getCollection('mock_admin_staff', []);
      const attendanceList = MockDB.getCollection('mock_admin_attendance', []);
      const currentPayrolls = MockDB.getCollection('mock_admin_payrolls', []);
      
      const today = new Date();
      const reqDate = reqMonth.includes('-') ? new Date(`${reqMonth}-01`) : new Date(reqMonth);
      const daysInMonth = !isNaN(reqDate.getTime()) ? new Date(reqDate.getFullYear(), reqDate.getMonth() + 1, 0).getDate() : 30;
      
      const isCurrentMonth = reqMonth === today.toLocaleString('en-US', { month: 'long', year: 'numeric' }) || reqMonth === today.toISOString().slice(0, 7);
      const daysElapsed = isCurrentMonth ? today.getDate() : daysInMonth;
      
      staffList.filter((s: any) => s.isActive).forEach((s: any) => {
        const staffAtt = attendanceList.filter((a: any) => String(a.staffId) === String(s.id));
        const presentCount = staffAtt.filter((a: any) => a.status === 'PRESENT').length;
        const leaveCount = staffAtt.filter((a: any) => a.status === 'LEAVE').length;
        const totalAccounted = presentCount + leaveCount;
        
        let absences = daysElapsed - totalAccounted;
        if (absences < 0) absences = 0; // fallback if someone checked in on weekends multiple times
        
        const baseSalary = Number(s.salary) || 0;
        const perDay = baseSalary / daysInMonth;
        const deduction = absences * perDay;
        const finalAmount = Math.max(0, Math.round(baseSalary - deduction));
        
        const existingRecordIdx = currentPayrolls.findIndex((p: any) => String(p.staffId) === String(s.id) && p.month === reqMonth);
        if (existingRecordIdx >= 0) {
          if (currentPayrolls[existingRecordIdx].status === 'PENDING') {
            currentPayrolls[existingRecordIdx].amount = finalAmount;
            currentPayrolls[existingRecordIdx].staff = { name: s.name, role: s.role };
          }
        } else {
          currentPayrolls.push({
            id: `pay-${Date.now()}-${s.id}`,
            staffId: s.id,
            staff: { name: s.name, role: s.role },
            month: reqMonth,
            amount: finalAmount,
            status: 'PENDING'
          });
        }
      });
      
      MockDB.setCollection('mock_admin_payrolls', currentPayrolls);
      const filtered = currentPayrolls.filter((p: any) => p.month === reqMonth);
      return { success: true, message: 'Fetched payrolls', data: { payrolls: filtered, total: filtered.length } } as unknown as ApiResponse<T>;
    }
    
    return MockDB.handleCrud('mock_admin_payrolls', method, path, parsedBody, [], 'payrolls') as unknown as ApiResponse<T>;
  }
  if (path.includes('/exercises')) return MockDB.handleCrud('mock_admin_exercises', method, path, parsedBody, generate(10, i => ({ id: `ex-${i}`, name: `Exercise ${i+1}`, category: 'Strength', muscleGroup: ['Chest', 'Triceps'], difficulty: 'Beginner', isActive: true, videoUrl: '' })), 'exercises') as unknown as ApiResponse<T>;
  
  const existingDiets = MockDB.getCollection('mock_admin_diet_plans', []);
  if (existingDiets.length > 0 && typeof (existingDiets[0] as any).meals?.[0] === 'string') {
    MockDB.setCollection('mock_admin_diet_plans', []); // Force purge old format
  }
  
  if (path.includes('/diet-plans')) return MockDB.handleCrud('mock_admin_diet_plans', method, path, parsedBody, generate(4, i => ({ 
    id: `diet-${i}`, 
    name: `Pro Diet ${i+1}`, 
    goal: 'Weight Loss', 
    totalCalories: 1500 + (i * 200),
    protein: 120 + i * 10,
    carbs: 150 + i * 20,
    fats: 50 + i * 5,
    meals: [
      { time: '08:00 AM', name: 'Breakfast', calories: 400, foods: ['Oats', 'Eggs', 'Banana'] },
      { time: '01:00 PM', name: 'Lunch', calories: 600, foods: ['Chicken Breast', 'Rice', 'Broccoli'] },
      { time: '07:00 PM', name: 'Dinner', calories: 500, foods: ['Salmon', 'Sweet Potato', 'Asparagus'] }
    ], 
    isActive: true 
  })), 'dietPlans') as unknown as ApiResponse<T>;
  
  const existingWorkouts = MockDB.getCollection('mock_workouts', []);
  if (existingWorkouts.length > 0 && typeof (existingWorkouts[0] as any).days === 'number') {
    MockDB.setCollection('mock_workouts', []); // Force purge old format
  }
  if (path.includes('/workouts')) return MockDB.handleCrud('mock_workouts', method, path, parsedBody, generate(5, i => ({ 
    id: `wo-${i}`, 
    name: `Hypertrophy Plan ${i+1}`, 
    level: i % 2 === 0 ? 'Intermediate' : 'Beginner',
    focus: 'Hypertrophy',
    days: 4,
    exercises: 15 + i * 2,
    duration: '60 min',
    tags: ['Muscle', 'Strength']
  })), 'workouts') as unknown as ApiResponse<T>;
  if (path.includes('/admin/finance/summary')) return { success: true, message: 'Summary', data: { totalRevenue: 1500000, monthlyRevenue: 250000, pendingAmount: 45000, totalPayments: 345, revenueByMethod: { UPI: 120000, Cash: 50000, Card: 80000, NetBanking: 0 }, monthlyData: generate(6, i => ({ month: `M${i+1}`, revenue: 200000 + (i * 10000) })) } } as unknown as ApiResponse<T>;
  if (path.includes('/finance/payments')) return MockDB.handleCrud('mock_admin_payments', method, path, parsedBody, generate(10, i => ({ id: `pay-${i}`, memberId: `mem-${i}`, member: { name: `Payer ${i}`, email: `payer${i}@example.com`, phone: '9988776655', plan: { name: 'Pro Plan' } }, amount: 5000 + (i * 500), status: 'success', paidAt: new Date().toISOString(), method: 'UPI', invoiceNo: `INV-${1000 + i}` })), 'payments') as unknown as ApiResponse<T>;
  if (path.includes('/admin/settings')) {
    if (method === 'GET') {
      const settings = MockDB.getCollection('mock_admin_settings', [{ gymName: 'Demo Gym Base', ownerName: 'Admin Owner', phone: '9988776655', email: 'admin@gym.com', city: 'Mumbai', gstNumber: '27AAAAA1234A1Z5' }]);
      return { success: true, message: 'Fetched Settings', data: settings[0] } as unknown as ApiResponse<T>;
    } else {
      let parsed = typeof body === 'string' ? JSON.parse(body) : (body as Record<string, unknown>);
      MockDB.setCollection('mock_admin_settings', [parsed]);
      return { success: true, message: 'Settings Saved', data: parsed } as unknown as ApiResponse<T>;
    }
  }
  if (path.includes('/settings')) return MockDB.handleCrud('mock_settings', method, path, parsedBody, generate(1, i => ({ id: `setting-${i}`, gymName: 'Demo Gym Base', currency: 'INR', timezone: 'Asia/Kolkata', emailNotifications: true }))) as unknown as ApiResponse<T>;

  if (path.includes('/store/summary')) {
    const products = MockDB.getCollection('mock_store_products', []);
    const orders = MockDB.getCollection('mock_orders_v2', []);
    return { success: true, message: 'Store Summary', data: { totalProducts: products.length, totalOrders: orders.length, totalRevenue: orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0), lowStockProducts: products.filter((p: any) => p.stock <= 5) } } as unknown as ApiResponse<T>;
  }


  // SUPERADMIN Stateful Interceptions
  if (path.includes('/superadmin/tickets')) return MockDB.handleCrud('mock_tickets', method, path, parsedBody, generate(10, i => ({ id: `tkt-${i}`, tenantName: `Gym Branch ${i + 1}`, subject: `Billing Issue ${i}`, status: i % 3 === 0 ? 'RESOLVED' : 'OPEN', priority: i % 4 === 0 ? 'HIGH' : 'LOW', createdAt: '2023-10-10', lastUpdated: '2023-10-12' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/invoices')) return MockDB.handleCrud('mock_invoices', method, path, parsedBody, generate(12, i => ({ id: `inv-${i}`, tenantName: `Gym Branch ${i + 1}`, amount: 5000 + (i * 1000), currency: 'INR', status: i % 4 === 0 ? 'PENDING' : 'PAID', date: '2023-11-01', planName: 'Enterprise' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/coupons')) return MockDB.handleCrud('mock_coupons', method, path, parsedBody, generate(5, i => ({ id: `coup-${i}`, code: `WELCOME${i * 10}`, discountType: 'PERCENTAGE', discountValue: 10 + i, maxUses: 100, currentUses: 20 * i, status: 'ACTIVE', expiryDate: '2024-12-31', isDeleted: false }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/affiliates')) return MockDB.handleCrud('mock_affiliates', method, path, parsedBody, generate(6, i => ({ id: `aff-${i}`, name: `Partner ${i + 1}`, email: `partner${i}@example.com`, referralCode: `REF${i}00`, totalReferred: 5 * i, commissionEarned: 1000 * i, status: 'ACTIVE', joinedAt: '2023-05-01' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/broadcasts')) return MockDB.handleCrud('mock_broadcasts', method, path, parsedBody, generate(4, i => ({ id: `bc-${i}`, title: `System Update v${i}.0`, content: 'Important update details.', status: i === 0 ? 'DRAFT' : 'SENT', audience: 'ALL_TENANTS', scheduledDate: null, sentDate: '2023-10-01' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/system') || path.includes('/superadmin/infrastructure')) return MockDB.handleCrud('mock_infrastructure', method, path, parsedBody, generate(3, i => ({ id: `node-${i}`, name: `Production Node ${i + 1}`, cpuPercent: 30 + (i * 15), memoryPercent: 45 + (i * 10), diskPercent: 60 - (i * 5), status: 'Healthy' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/jobs')) return MockDB.handleCrud('mock_jobs', method, path, parsedBody, generate(12, (i: number) => {
    const statuses = ['COMPLETED', 'ACTIVE', 'FAILED', 'DELAYED'];
    const status = statuses[i % statuses.length];
    const isFailed = status === 'FAILED';
    const isCompleted = status === 'COMPLETED';
    const queues = ['billing', 'email', 'webhook', 'database'];
    const queueName = queues[i % queues.length];
    const jobNames: Record<string, string[]> = {
      'billing': ['process_invoice', 'renew_subscription', 'charge_card'],
      'email': ['send_welcome', 'send_receipt', 'send_newsletter'],
      'webhook': ['trigger_zapier', 'sync_crm'],
      'database': ['backup', 'cleanup_logs']
    };
    const jobName = jobNames[queueName][i % jobNames[queueName].length];
    
    return { 
      id: `job-${1000 + i}`, 
      queueName, 
      jobName, 
      status, 
      attempts: isFailed ? 3 : 1, 
      createdAt: '2023-11-05T08:00:00Z',
      finishedAt: (isCompleted || isFailed) ? '2023-11-05T08:05:00Z' : undefined,
      durationMs: (isCompleted || isFailed) ? (1500 + i * 200) : undefined,
      error: isFailed ? 'ConnectionTimeoutError: Failed to reach external API endpoint after 30000ms.' : undefined,
      payload: {
        tenantId: `tenant-${i}`,
        action: jobName,
        metadata: { retryCount: i, source: 'cron' }
      }
    };
  }), 'jobs') as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/backups')) return MockDB.handleCrud('mock_backups', method, path, parsedBody, generate(5, i => ({ id: `bup-${i}`, tenantName: `Gym Branch ${i + 1}`, databaseName: `db_gym_${i}`, sizeMB: 150 + (i * 50), status: 'SUCCESS', timestamp: '2023-11-05' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/audit-logs')) return MockDB.handleCrud('mock_audit_logs', method, path, parsedBody, generate(15, i => ({ id: `log-${i}`, actorName: 'Demo Admin', actorRole: 'SUPERADMIN', action: 'UPDATE_TENANT', targetResource: `tenant-${i}`, timestamp: '2023-11-05', ipAddress: '192.168.1.1' }))) as unknown as ApiResponse<T>;
  if (path.includes('/admin/audit')) return MockDB.handleCrud('mock_admin_audit', method, path, parsedBody, generate(12, i => ({ id: `audit-${i}`, actorId: `admin-${i}`, actorRole: 'ADMIN', action: i % 2 === 0 ? 'CREATE' : 'UPDATE', entityType: i % 3 === 0 ? 'MEMBER' : 'PAYMENT', entityId: `entity-${i}`, oldValue: null, newValue: { foo: 'bar' }, ipAddress: '127.0.0.1', timestamp: new Date().toISOString() })), 'logs') as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/settings')) return MockDB.handleCrud('mock_settings', method, path, parsedBody, generate(6, i => ({ id: `set-${i}`, key: `ALLOW_SIGNUPS_${i}`, value: 'true', description: 'Enable signups', category: 'General', dataType: 'boolean' }))) as unknown as ApiResponse<T>;
  if (path.includes('/tenants') || path.includes('/gyms') || path.includes('/superadmin/gyms')) return MockDB.handleCrud('mock_tenants', method, path, parsedBody, generate(8, i => ({ id: `tenant-${i}`, name: `Gym Branch ${i + 1}`, ownerName: 'Admin Owner', adminEmail: `admin${i}@gym.com`, phone: `998877665${i}`, status: 'ACTIVE', plan: 'Enterprise', createdAt: '2023-01-01', memberCount: 150 + (i * 20), monthlyRevenue: 50000 + (i * 5000), databaseVersion: 'v1.0' }))) as unknown as ApiResponse<T>;
  if (path.includes('/superadmin/plans')) return MockDB.handleCrud('mock_saas_plans', method, path, parsedBody, generate(3, i => ({ id: `saas-plan-${i}`, name: i === 0 ? 'Starter' : i === 1 ? 'Pro' : 'Enterprise', priceMonthly: 1000 * (i + 1), priceAnnual: 10000 * (i + 1), maxMembers: 100 * (i + 1), maxStaff: 5 * (i + 1), features: ['CRM', 'Billing', 'Analytics'], activeTenants: 10 * (i + 1) }))) as unknown as ApiResponse<T>;
  // For features and migrations, which return compound objects in GET, we let GET bypass or handle specifically.
  if (path.includes('/superadmin/features')) {
    if (method === 'GET') {
      const flags = MockDB.getCollection('mock_flags', generate(4, i => ({ id: `flag-${i}`, name: `Beta_Feature_${i}`, description: 'A beta feature', isGlobalEnabled: true, enabledTenantIds: [] })));
      const notes = MockDB.getCollection('mock_notes', generate(3, i => ({ id: `note-${i}`, version: `v1.${i}`, title: `Update ${i}`, content: 'Feature update.', isPublished: true, date: '2023-11-01' })));
      return { success: true, message: 'Fetched features compound data', data: { flags, notes } } as unknown as ApiResponse<T>;
    }
    if (path.includes('/notes')) return MockDB.handleCrud('mock_notes', method, path, parsedBody, []) as unknown as ApiResponse<T>;
    return MockDB.handleCrud('mock_flags', method, path, parsedBody, []) as unknown as ApiResponse<T>;
  }
  if (path.includes('/superadmin/migrations')) {
    if (method === 'GET') {
      const migrations = MockDB.getCollection('mock_migrations', generate(3, i => ({ id: `mig-${i}`, name: `Add_Stripe_ID_${i}`, appliedAt: '2023-11-01', status: 'SUCCESS' })));
      const tenants = MockDB.getCollection('mock_tenants', generate(8, i => ({ id: `tenant-${i}`, name: `Gym Branch ${i + 1}`, ownerName: 'Admin Owner', adminEmail: `admin${i}@gym.com`, phone: `998877665${i}`, status: 'ACTIVE', plan: 'Enterprise', createdAt: '2023-01-01', memberCount: 150 + (i * 20), monthlyRevenue: 50000 + (i * 5000), databaseVersion: 'v1.0' })));
      return { success: true, message: 'Fetched migrations compound data', data: { migrations, tenants } } as unknown as ApiResponse<T>;
    }
    return MockDB.handleCrud('mock_migrations', method, path, parsedBody, [], 'migrations') as unknown as ApiResponse<T>;
  }

  // Dynamic Rich Data Generator for Demo Mode
  if (method === 'GET') {
    // Helper to generate an array
    const generate = (count: number, generator: (i: number) => Record<string, unknown>) => Array.from({ length: count }, (_, i) => generator(i));

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
    if (path.includes('/sales/overview')) {
      return { success: true, message: 'Demo Sales Overview', data: {
        monthlyRevenue: generate(6, i => ({ month: `Month ${i+1}`, revenue: 300000 + (i * 15000), expenses: 100000 + (i * 5000), newMembers: 20 + i * 5 }))
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/sales/membership-report')) {
      return { success: true, message: 'Demo Membership Report', data: {
        report: generate(5, i => ({ plan: `Plan ${i+1}`, receivable: 50000 * (i+1), received: 40000 * (i+1), remaining: 10000 * (i+1), refund: 0 })),
        totals: { totalReceivable: 750000, totalReceived: 600000, remaining: 150000, refunds: 0 }
      }} as unknown as ApiResponse<T>;
    }
    if (path.includes('/sales/pending-payments')) {
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
  // Removed console.log per Rule 46
  // parsedBody is already defined and parsed at the top of the function
  
  const safeData = {
    id: `mock-id-${Date.now()}`,
    ...parsedBody,
    status: parsedBody.status || 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  return {
    success: true,
    message: `Demo Mode: Action ${method} ${path} successful`,
    data: safeData as unknown as T,
  };
}
