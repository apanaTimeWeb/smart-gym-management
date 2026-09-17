import type { Member, MemberStats } from '@/app/manager/members/members_types/ManagerMembersTypes';

export const MOCK_MEMBER_STATS: MemberStats = {
  total: 1200,
  active: 1050,
  expired: 100,
  pending: 50,
};

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Aarav Patel',
    email: 'aarav.p@example.com',
    phone: '+919876543210',
    status: 'ACTIVE',
    joinDate: '2023-01-15T10:00:00Z',
    planId: 'p1',
    branch: 'Main Branch',
    billingCycle: 'Annual',
    createdAt: '2023-01-15T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 1500, price3Month: 4000, price6Month: 7500, price12Month: 15000 },
    expiryDate: '2024-01-15T10:00:00Z',
    paidAmount: 15000,
    pendingAmount: 0,
    gender: 'Male',
  },
  {
    id: 'm2',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    phone: '+919876543211',
    status: 'PENDING',
    joinDate: '2023-05-10T10:00:00Z',
    planId: 'p2',
    branch: 'Main Branch',
    billingCycle: 'Quarterly',
    createdAt: '2023-05-10T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 2000, price3Month: 5000, price6Month: 9000, price12Month: 16000 },
    expiryDate: '2023-08-10T10:00:00Z',
    paidAmount: 2000,
    pendingAmount: 3000,
    gender: 'Female',
  },
  {
    id: 'm3',
    name: 'Vikram Singh',
    email: 'vikram.s@example.com',
    phone: '+919876543212',
    status: 'EXPIRED',
    joinDate: '2022-11-01T10:00:00Z',
    planId: 'p3',
    branch: 'Main Branch',
    billingCycle: 'Monthly',
    createdAt: '2022-11-01T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 2000, price3Month: 5500, price6Month: 10000, price12Month: 18000 },
    expiryDate: '2022-12-01T10:00:00Z',
    paidAmount: 2000,
    pendingAmount: 0,
    gender: 'Male',
  }
,
  {
    id: 'm4', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+919876543213', status: 'ACTIVE', joinDate: '2023-06-18T10:00:00Z', planId: 'p1', branch: 'Main Branch', billingCycle: 'Annual', createdAt: '2023-06-18T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 1500, price3Month: 4000, price6Month: 7500, price12Month: 15000 }, expiryDate: '2024-06-18T10:00:00Z', paidAmount: 15000, pendingAmount: 0, gender: 'Female'
  },
  {
    id: 'm5', name: 'Rohit Mehta', email: 'rohit.m@example.com', phone: '+919876543214', status: 'ACTIVE', joinDate: '2023-07-22T10:00:00Z', planId: 'p2', branch: 'Main Branch', billingCycle: 'Quarterly', createdAt: '2023-07-22T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 2000, price3Month: 5000, price6Month: 9000, price12Month: 16000 }, expiryDate: '2024-07-22T10:00:00Z', paidAmount: 5000, pendingAmount: 0, gender: 'Male'
  },
  {
    id: 'm6', name: 'Kavya Singh', email: 'kavya.s@example.com', phone: '+919876543215', status: 'PENDING', joinDate: '2023-08-14T10:00:00Z', planId: 'p3', branch: 'Main Branch', billingCycle: 'Monthly', createdAt: '2023-08-14T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 2000, price3Month: 5500, price6Month: 10000, price12Month: 18000 }, expiryDate: '2023-09-14T10:00:00Z', paidAmount: 1000, pendingAmount: 1000, gender: 'Female'
  },
  {
    id: 'm7', name: 'Arjun Rao', email: 'arjun.r@example.com', phone: '+919876543216', status: 'ACTIVE', joinDate: '2023-09-04T10:00:00Z', planId: 'p1', branch: 'Main Branch', billingCycle: 'Annual', createdAt: '2023-09-04T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 1500, price3Month: 4000, price6Month: 7500, price12Month: 15000 }, expiryDate: '2024-09-04T10:00:00Z', paidAmount: 12000, pendingAmount: 3000, gender: 'Male'
  },
  {
    id: 'm8', name: 'Simran Kaur', email: 'simran.k@example.com', phone: '+919876543217', status: 'SUSPENDED', joinDate: '2022-12-12T10:00:00Z', planId: 'p2', branch: 'Main Branch', billingCycle: 'Quarterly', createdAt: '2022-12-12T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 2000, price3Month: 5000, price6Month: 9000, price12Month: 16000 }, expiryDate: '2024-02-12T10:00:00Z', paidAmount: 5000, pendingAmount: 0, gender: 'Female'
  },
  {
    id: 'm9', name: 'Manish Kumar', email: 'manish.k@example.com', phone: '+919876543218', status: 'ACTIVE', joinDate: '2024-01-08T10:00:00Z', planId: 'p3', branch: 'Main Branch', billingCycle: 'Monthly', createdAt: '2024-01-08T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 2000, price3Month: 5500, price6Month: 10000, price12Month: 18000 }, expiryDate: '2024-06-08T10:00:00Z', paidAmount: 2000, pendingAmount: 0, gender: 'Male'
  },
  {
    id: 'm10', name: 'Pooja Verma', email: 'pooja.v@example.com', phone: '+919876543219', status: 'PENDING', joinDate: '2024-02-19T10:00:00Z', planId: 'p2', branch: 'Main Branch', billingCycle: 'Quarterly', createdAt: '2024-02-19T10:00:00Z',
    plan: { id: 'p2', name: 'Quarterly Starter', price1Month: 2000, price3Month: 5000, price6Month: 9000, price12Month: 16000 }, expiryDate: '2024-05-19T10:00:00Z', paidAmount: 2500, pendingAmount: 2500, gender: 'Female'
  },
  {
    id: 'm11', name: 'Yash Tiwari', email: 'yash.t@example.com', phone: '+919876543220', status: 'EXPIRED', joinDate: '2022-10-21T10:00:00Z', planId: 'p1', branch: 'Main Branch', billingCycle: 'Annual', createdAt: '2022-10-21T10:00:00Z',
    plan: { id: 'p1', name: 'Annual Pro', price1Month: 1500, price3Month: 4000, price6Month: 7500, price12Month: 15000 }, expiryDate: '2023-10-21T10:00:00Z', paidAmount: 15000, pendingAmount: 0, gender: 'Male'
  },
  {
    id: 'm12', name: 'Isha Malhotra', email: 'isha.m@example.com', phone: '+919876543221', status: 'ACTIVE', joinDate: '2024-03-11T10:00:00Z', planId: 'p3', branch: 'Main Branch', billingCycle: 'Monthly', createdAt: '2024-03-11T10:00:00Z',
    plan: { id: 'p3', name: 'Monthly Basic', price1Month: 2000, price3Month: 5500, price6Month: 10000, price12Month: 18000 }, expiryDate: '2024-06-11T10:00:00Z', paidAmount: 2000, pendingAmount: 0, gender: 'Female'
  }

];
