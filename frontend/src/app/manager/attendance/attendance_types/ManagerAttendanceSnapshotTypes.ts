export interface MemberSnapshot {
  id: string;
  name: string;
  phone: string;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'FROZEN' | 'SUSPENDED' | 'BANNED';
  planName?: string;
  joinDate?: string;
}

export interface StaffSnapshot {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
}
