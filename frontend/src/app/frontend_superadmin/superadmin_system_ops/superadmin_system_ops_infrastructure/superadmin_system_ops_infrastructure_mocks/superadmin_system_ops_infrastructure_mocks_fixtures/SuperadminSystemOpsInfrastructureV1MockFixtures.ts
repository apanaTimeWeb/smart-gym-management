// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE = {
    'summary': {
        'requestsPerMinute': 1840,
        'errorsPercent': 0.7,
        'p50': 120,
        'p95': 410,
        'p99': 860
    },
    'endpoints': [
        {
            'name': 'Tenant list',
            'p50': 105,
            'p95': 320,
            'p99': 610,
            'errors': 0.3
        },
        {
            'name': 'Invoices',
            'p50': 128,
            'p95': 390,
            'p99': 810,
            'errors': 0.8
        },
        {
            'name': 'Reports',
            'p50': 180,
            'p95': 520,
            'p99': 980,
            'errors': 1.4
        },
        {
            'name': 'Messaging',
            'p50': 95,
            'p95': 260,
            'p99': 540,
            'errors': 0.4
        }
    ],
    'incidents': [
        {
            'title': 'Invoice API slowdown',
            'impact': '4.2% slower',
            'started': '2026-09-17T08:20:00Z',
            'status': 'RESOLVED'
        },
        {
            'title': 'Webhook retries elevated',
            'impact': '2.1% failed deliveries',
            'started': '2026-09-16T17:40:00Z',
            'status': 'MONITORING'
        }
    ]
} as const;
