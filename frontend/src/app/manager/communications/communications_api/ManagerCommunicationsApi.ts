// RESPONSIBILITY: Mock API client for the Manager Communications module.
import type { CommCampaign, CommKPIData, CommRecipient, CommFormValues, CommSegment } from '@/app/manager/communications/communications_types/communications_types';
import { MOCK_CAMPAIGNS, MOCK_COMM_KPI } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';

let mockCampaigns = [...MOCK_CAMPAIGNS];

/** Simulates fetching members for a given segment from the backend. */
const MOCK_SEGMENT_MEMBERS: Record<CommSegment, CommRecipient[]> = {
  all_active: [
    { memberId: 'M001', name: 'Arjun Sharma',   phone: '9876543210', email: 'arjun@email.com',   status: 'ACTIVE',  expiryDate: '2025-08-01', pendingAmount: 0 },
    { memberId: 'M002', name: 'Priya Mehta',    phone: '9876543211', email: 'priya@email.com',   status: 'ACTIVE',  expiryDate: '2025-09-15', pendingAmount: 0 },
    { memberId: 'M003', name: 'Rahul Verma',    phone: '9876543212', email: 'rahul@email.com',   status: 'ACTIVE',  expiryDate: '2025-07-20', pendingAmount: 0 },
    { memberId: 'M004', name: 'Sneha Patil',    phone: '9876543213', email: 'sneha@email.com',   status: 'ACTIVE',  expiryDate: '2025-10-01', pendingAmount: 0 },
    { memberId: 'M005', name: 'Karan Joshi',    phone: '9876543214', email: 'karan@email.com',   status: 'ACTIVE',  expiryDate: '2025-08-30', pendingAmount: 0 },
  ],
  expiring_7_days: [
    { memberId: 'M006', name: 'Amit Kumar',     phone: '9876543215', email: 'amit@email.com',    status: 'ACTIVE',  expiryDate: '2025-06-18', pendingAmount: 0 },
    { memberId: 'M007', name: 'Neha Singh',     phone: '9876543216', email: 'neha@email.com',    status: 'ACTIVE',  expiryDate: '2025-06-19', pendingAmount: 0 },
    { memberId: 'M008', name: 'Vikram Rao',     phone: '9876543217', email: 'vikram@email.com',  status: 'ACTIVE',  expiryDate: '2025-06-20', pendingAmount: 0 },
  ],
  expiring_30_days: [
    { memberId: 'M009', name: 'Pooja Nair',     phone: '9876543218', email: 'pooja@email.com',   status: 'ACTIVE',  expiryDate: '2025-07-10', pendingAmount: 0 },
    { memberId: 'M010', name: 'Suresh Iyer',    phone: '9876543219', email: 'suresh@email.com',  status: 'ACTIVE',  expiryDate: '2025-07-05', pendingAmount: 0 },
    { memberId: 'M011', name: 'Divya Reddy',    phone: '9876543220', email: 'divya@email.com',   status: 'ACTIVE',  expiryDate: '2025-07-12', pendingAmount: 0 },
    { memberId: 'M012', name: 'Manish Gupta',   phone: '9876543221', email: 'manish@email.com',  status: 'ACTIVE',  expiryDate: '2025-07-08', pendingAmount: 0 },
  ],
  expired: [
    { memberId: 'M013', name: 'Ravi Shankar',   phone: '9876543222', email: 'ravi@email.com',    status: 'EXPIRED', expiryDate: '2025-05-30', pendingAmount: 0 },
    { memberId: 'M014', name: 'Anita Desai',    phone: '9876543223', email: 'anita@email.com',   status: 'EXPIRED', expiryDate: '2025-05-15', pendingAmount: 0 },
    { memberId: 'M015', name: 'Sanjay Patel',   phone: '9876543224', email: 'sanjay@email.com',  status: 'EXPIRED', expiryDate: '2025-06-01', pendingAmount: 0 },
  ],
  pending_payment: [
    { memberId: 'M016', name: 'Kavita Jain',    phone: '9876543225', email: 'kavita@email.com',  status: 'PENDING', expiryDate: '2025-07-01', pendingAmount: 1500 },
    { memberId: 'M017', name: 'Deepak Mishra',  phone: '9876543226', email: 'deepak@email.com',  status: 'PENDING', expiryDate: '2025-06-25', pendingAmount: 2000 },
    { memberId: 'M018', name: 'Sunita Yadav',   phone: '9876543227', email: 'sunita@email.com',  status: 'PENDING', expiryDate: '2025-07-15', pendingAmount: 800 },
  ],
  custom: [],
};

export const ManagerCommunicationsApi = {
  fetchCampaigns: async (): Promise<CommCampaign[]> => {
    await new Promise(r => setTimeout(r, 300));
    return mockCampaigns;
  },

  fetchKPIs: async (): Promise<CommKPIData> => {
    await new Promise(r => setTimeout(r, 200));
    return MOCK_COMM_KPI;
  },

  fetchSegmentRecipients: async (segment: CommSegment): Promise<CommRecipient[]> => {
    await new Promise(r => setTimeout(r, 400));
    return MOCK_SEGMENT_MEMBERS[segment] ?? [];
  },

  sendCampaign: async (payload: CommFormValues & { recipientCount: number; segmentLabel: string }): Promise<CommCampaign> => {
    await new Promise(r => setTimeout(r, 600));
    const campaign: CommCampaign = {
      id: `c${Date.now()}`,
      title: payload.title,
      channel: payload.channel,
      segment: payload.segment,
      segmentLabel: payload.segmentLabel,
      message: payload.message,
      subject: payload.subject,
      recipientCount: payload.recipientCount,
      sentCount: payload.recipientCount,
      status: 'sent',
      sentAt: new Date().toISOString(),
      sentBy: 'Manager',
    };
    mockCampaigns = [campaign, ...mockCampaigns];
    return campaign;
  },
};
