// RESPONSIBILITY: Owns complete route-specific MSW fixture data for the Superadmin Gym 360 workspace.
import type { SuperadminGymDetailV1Data } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailV1Types';
export const SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES: Record<string, SuperadminGymDetailV1Data> = {
    t1: {
        gymId: 't1',
        gymName: 'Iron Paradise',
        tabs: ['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support'],
        health: { score: 82, loginTrend: -14, memberTrend: 8, paymentFailures: 1, openTickets: 2 },
        usage: [
            { label: 'Members', used: 1280, limit: 2000, percent: 64 },
            { label: 'Storage', used: 76, limit: 100, percent: 76 },
            { label: 'WhatsApp messages', used: 8200, limit: 10000, percent: 82 },
            { label: 'Staff accounts', used: 14, limit: 20, percent: 70 },
        ],
        billing: { monthlyIncome: 89000, nextPayment: '2026-10-01T09:30:00Z', failedPayments: 1, discount: '10%' },
        support: { openTickets: 2, averageResponseHours: 3.6, satisfaction: 94 },
        activity: [
            { date: '2026-09-17T09:15:00Z', event: 'Owner signed in' },
            { date: '2026-09-16T13:25:00Z', event: '20 members added' },
            { date: '2026-09-15T07:40:00Z', event: 'Payment retry failed' },
        ],
        subscription: { plan: 'Professional', started: '2026-02-01T00:00:00Z', renewal: '2026-10-01T00:00:00Z', monthlyIncome: 89000 },
    },
    t2: {
        gymId: 't2',
        gymName: 'Fit Life Studio',
        tabs: ['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support'],
        health: { score: 68, loginTrend: -6, memberTrend: 3, paymentFailures: 0, openTickets: 1 },
        usage: [
            { label: 'Members', used: 420, limit: 800, percent: 53 },
            { label: 'Storage', used: 34, limit: 100, percent: 34 },
            { label: 'WhatsApp messages', used: 3100, limit: 10000, percent: 31 },
            { label: 'Staff accounts', used: 6, limit: 10, percent: 60 },
        ],
        billing: { monthlyIncome: 39000, nextPayment: '2026-10-05T09:30:00Z', failedPayments: 0, discount: '0%' },
        support: { openTickets: 1, averageResponseHours: 5.2, satisfaction: 88 },
        activity: [
            { date: '2026-09-17T08:30:00Z', event: 'Manager signed in' },
            { date: '2026-09-14T12:40:00Z', event: 'New membership created' },
            { date: '2026-09-11T10:05:00Z', event: 'WhatsApp campaign sent' },
        ],
        subscription: { plan: 'Starter', started: '2026-08-15T00:00:00Z', renewal: '2026-10-05T00:00:00Z', monthlyIncome: 39000 },
    },
    t3: {
        gymId: 't3',
        gymName: 'Power Gym',
        tabs: ['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support'],
        health: { score: 41, loginTrend: -31, memberTrend: -18, paymentFailures: 3, openTickets: 5 },
        usage: [
            { label: 'Members', used: 490, limit: 500, percent: 98 },
            { label: 'Storage', used: 96, limit: 100, percent: 96 },
            { label: 'WhatsApp messages', used: 9700, limit: 10000, percent: 97 },
            { label: 'Staff accounts', used: 19, limit: 20, percent: 95 },
        ],
        billing: { monthlyIncome: 145000, nextPayment: '2026-09-25T09:30:00Z', failedPayments: 3, discount: '15%' },
        support: { openTickets: 5, averageResponseHours: 8.4, satisfaction: 71 },
        activity: [
            { date: '2026-09-17T06:10:00Z', event: 'Payment retry failed' },
            { date: '2026-09-16T15:25:00Z', event: 'Member count dropped' },
            { date: '2026-09-13T07:20:00Z', event: 'Support ticket escalated' },
        ],
        subscription: { plan: 'Enterprise', started: '2022-01-10T00:00:00Z', renewal: '2026-09-25T00:00:00Z', monthlyIncome: 145000 },
    },
};
