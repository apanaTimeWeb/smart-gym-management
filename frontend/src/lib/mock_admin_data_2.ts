import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';

export const ADMIN_MOCK_ATTENDANCE_SUMMARY: AdminAttendanceSummary = {
  todayTotal: 148,
  todayPresent: 131,
  todayLate: 17,
  weeklyAverage: 134,
  peakHour: '7:00 AM – 9:00 AM',
  trendVsLastWeek: 8,
  uniqueMembersThisMonth: 412,
};

export const ADMIN_MOCK_ATTENDANCE_TREND: AdminAttendanceTrendPoint[] = [
  { date: 'Mon', count: 122 },
  { date: 'Tue', count: 138 },
  { date: 'Wed', count: 145 },
  { date: 'Thu', count: 131 },
  { date: 'Fri', count: 148 },
  { date: 'Sat', count: 162 },
  { date: 'Sun', count: 89 },
];

export const ADMIN_MOCK_ATTENDANCE_RECORDS: AdminAttendanceRecord[] = [
  { id: 'a1',  memberId: 'm1',  memberName: 'Rahul Sharma',   memberPhone: '9876543210', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '06:45 AM', checkOutTime: '08:10 AM', date: '2025-01-17', status: 'present', planName: 'Gold Plan'    },
  { id: 'a2',  memberId: 'm2',  memberName: 'Priya Patel',    memberPhone: '9123456789', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '07:02 AM', checkOutTime: '08:30 AM', date: '2025-01-17', status: 'present', planName: 'Silver Plan'  },
  { id: 'a3',  memberId: 'm4',  memberName: 'Sneha Joshi',    memberPhone: '9871234560', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '09:18 AM', checkOutTime: '10:45 AM', date: '2025-01-17', status: 'late',    planName: 'Gold Plan'    },
  { id: 'a4',  memberId: 'm6',  memberName: 'Divya Singh',    memberPhone: '9654321098', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '06:55 AM', checkOutTime: '08:20 AM', date: '2025-01-17', status: 'present', planName: 'Silver Plan'  },
  { id: 'a5',  memberId: 'm9',  memberName: 'Vikram Nair',    memberPhone: '9321098765', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '07:30 AM', checkOutTime: null,       date: '2025-01-17', status: 'present', planName: 'Annual Pro'   },
  { id: 'a6',  memberId: 'm10', memberName: 'Pooja Iyer',     memberPhone: '9210987654', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '08:45 AM', checkOutTime: '10:00 AM', date: '2025-01-17', status: 'late',    planName: 'Silver Plan'  },
  { id: 'a7',  memberId: 'm11', memberName: 'Suresh Kumar',   memberPhone: '9109876543', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '06:50 AM', checkOutTime: '08:15 AM', date: '2025-01-17', status: 'present', planName: 'Gold Plan'    },
  { id: 'a8',  memberId: 'm3',  memberName: 'Amit Verma',     memberPhone: '9988776655', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '',         checkOutTime: null,       date: '2025-01-17', status: 'absent',  planName: 'Basic Plan'   },
  { id: 'a9',  memberId: 'm5',  memberName: 'Karan Mehta',    memberPhone: '9765432109', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '07:10 AM', checkOutTime: '08:40 AM', date: '2025-01-17', status: 'present', planName: 'Annual Pro'   },
  { id: 'a10', memberId: 'm7',  memberName: 'Rohan Gupta',    memberPhone: '9543210987', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '09:30 AM', checkOutTime: '11:00 AM', date: '2025-01-17', status: 'late',    planName: 'Gold Plan'    },
  { id: 'a11', memberId: 'm8',  memberName: 'Ananya Reddy',   memberPhone: '9432109876', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '07:00 AM', checkOutTime: '08:30 AM', date: '2025-01-17', status: 'present', planName: 'Basic Plan'   },
  { id: 'a12', memberId: 'm12', memberName: 'Meera Pillai',   memberPhone: '9098765432', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '',         checkOutTime: null,       date: '2025-01-17', status: 'absent',  planName: 'Basic Plan'   },
];

export const ADMIN_MOCK_MEMBERS = [
  { id: 'm1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', branchId: 'b1', branchName: 'Downtown Core', planName: 'Gold Plan', status: 'active' as const, joinDate: '2024-01-15', expiryDate: '2025-01-15', pendingAmount: 0, gender: 'Male' as const },
  { id: 'm2', name: 'Priya Patel', email: 'priya@example.com', phone: '9123456789', branchId: 'b2', branchName: 'Uptown Plaza', planName: 'Silver Plan', status: 'active' as const, joinDate: '2024-03-10', expiryDate: '2025-03-10', pendingAmount: 0, gender: 'Female' as const },
  { id: 'm3', name: 'Amit Verma', email: 'amit@example.com', phone: '9988776655', branchId: 'b1', branchName: 'Downtown Core', planName: 'Basic Plan', status: 'expired' as const, joinDate: '2023-06-01', expiryDate: '2024-06-01', pendingAmount: 2500, gender: 'Male' as const },
  { id: 'm4', name: 'Sneha Joshi', email: 'sneha@example.com', phone: '9871234560', branchId: 'b3', branchName: 'Westside Mall', planName: 'Gold Plan', status: 'active' as const, joinDate: '2024-05-20', expiryDate: '2025-05-20', pendingAmount: 0, gender: 'Female' as const },
  { id: 'm5', name: 'Karan Mehta', email: 'karan@example.com', phone: '9765432109', branchId: 'b2', branchName: 'Uptown Plaza', planName: 'Annual Pro', status: 'pending' as const, joinDate: '2024-11-01', expiryDate: '2025-11-01', pendingAmount: 5000, gender: 'Male' as const },
  { id: 'm6', name: 'Divya Singh', email: 'divya@example.com', phone: '9654321098', branchId: 'b3', branchName: 'Westside Mall', planName: 'Silver Plan', status: 'active' as const, joinDate: '2024-02-14', expiryDate: '2025-02-14', pendingAmount: 0, gender: 'Female' as const },
  { id: 'm7', name: 'Rohan Gupta', email: 'rohan@example.com', phone: '9543210987', branchId: 'b1', branchName: 'Downtown Core', planName: 'Gold Plan', status: 'frozen' as const, joinDate: '2024-04-01', expiryDate: '2025-04-01', pendingAmount: 1200, gender: 'Male' as const },
  { id: 'm8', name: 'Ananya Reddy', email: 'ananya@example.com', phone: '9432109876', branchId: 'b2', branchName: 'Uptown Plaza', planName: 'Basic Plan', status: 'expired' as const, joinDate: '2023-09-15', expiryDate: '2024-09-15', pendingAmount: 800, gender: 'Female' as const },
  { id: 'm9', name: 'Vikram Nair', email: 'vikram@example.com', phone: '9321098765', branchId: 'b3', branchName: 'Westside Mall', planName: 'Annual Pro', status: 'active' as const, joinDate: '2024-07-01', expiryDate: '2025-07-01', pendingAmount: 0, gender: 'Male' as const },
  { id: 'm10', name: 'Pooja Iyer', email: 'pooja@example.com', phone: '9210987654', branchId: 'b1', branchName: 'Downtown Core', planName: 'Silver Plan', status: 'active' as const, joinDate: '2024-08-20', expiryDate: '2025-01-20', pendingAmount: 0, gender: 'Female' as const },
  { id: 'm11', name: 'Suresh Kumar', email: 'suresh@example.com', phone: '9109876543', branchId: 'b2', branchName: 'Uptown Plaza', planName: 'Gold Plan', status: 'active' as const, joinDate: '2024-06-10', expiryDate: '2025-01-18', pendingAmount: 0, gender: 'Male' as const },
  { id: 'm12', name: 'Meera Pillai', email: 'meera@example.com', phone: '9098765432', branchId: 'b3', branchName: 'Westside Mall', planName: 'Basic Plan', status: 'pending' as const, joinDate: '2024-12-01', expiryDate: '2025-12-01', pendingAmount: 3000, gender: 'Female' as const },
];

export const ADMIN_MOCK_MEMBERS_SUMMARY = {
  totalMembers: 1370,
  activeMembers: 980,
  expiredMembers: 245,
  pendingMembers: 145,
  expiringThisWeek: 23,
  expiringThisMonth: 87,
  totalOutstanding: 284500,
  newThisMonth: 42,
};
