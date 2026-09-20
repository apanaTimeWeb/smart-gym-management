// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_INVOICES_RECOVERY_CENTER_MOCK_FIXTURE = {
    'summary': {
        'failed': 9,
        'inRecovery': 6,
        'recoveredIncome': 124000,
        'unrecoveredIncome': 38000
    },
    'recovery': [
        {
            'gym': 'Prime Motion',
            'invoice': 'INV-2048',
            'amount': 51000,
            'attempts': 2,
            'nextRetry': '2026-09-19T09:00:00Z',
            'daysLate': 3,
            'reason': 'Bank declined'
        },
        {
            'gym': 'Urban Strength',
            'invoice': 'INV-2052',
            'amount': 76000,
            'attempts': 3,
            'nextRetry': '2026-09-18T09:00:00Z',
            'daysLate': 6,
            'reason': 'Insufficient balance'
        },
        {
            'gym': 'FitLab South',
            'invoice': 'INV-2057',
            'amount': 18000,
            'attempts': 1,
            'nextRetry': '2026-09-20T09:00:00Z',
            'daysLate': 1,
            'reason': 'Card expired'
        }
    ],
    'reconciliation': [
        {
            'type': 'Refund',
            'gym': 'Pulse Arena',
            'amount': 12000,
            'status': 'PENDING REVIEW'
        },
        {
            'type': 'Credit note',
            'gym': 'Urban Strength',
            'amount': 8000,
            'status': 'APPROVED'
        },
        {
            'type': 'Write-off',
            'gym': 'Old Town Gym',
            'amount': 5000,
            'status': 'PENDING REVIEW'
        }
    ],
    'policy': {
        'firstRetry': 'Day 0',
        'secondRetry': 'Day 2',
        'finalRetry': 'Day 5',
        'gracePeriod': '7 days',
        'autoSuspend': 'Day 10'
    }
} as const;
