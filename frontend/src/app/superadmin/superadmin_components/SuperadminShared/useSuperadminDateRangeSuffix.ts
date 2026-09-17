// RESPONSIBILITY: Derive the human-readable date-range suffix shown by shared Superadmin surfaces from URL state.
// DATA FLOW: Superadmin UI → useSuperadminDateRangeSuffix → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminDateRangeSuffix consumers.
import { useSearchParams } from 'next/navigation';
export function useSuperadminDateRangeSuffix(upperCase: boolean = true): string {
    const searchParams = useSearchParams();
    const range = searchParams.get('range') || 'this_month';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    let suffix = '';
    if (range === 'custom' && startDate && endDate) {
        suffix = `from ${startDate} to ${endDate}`;
    }
    else {
        const options: Record<string, string> = {
            'this_month': 'this month',
            'last_month': 'last month',
            'last_3_months': 'last 3 months',
            'last_6_months': 'last 6 months',
            'this_year': 'this year',
            'monthly': 'all time (monthly)',
            'yearly': 'all time (yearly)'
        };
        suffix = options[range] || '';
    }
    if (!suffix)
        return '';
    return upperCase ? ` ${suffix.toUpperCase()}` : ` ${suffix}`;
}
