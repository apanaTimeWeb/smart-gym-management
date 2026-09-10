import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

export type DatePreset = 'THIS_MONTH' | 'LAST_MONTH' | 'LAST_3_MONTHS' | 'LAST_6_MONTHS' | 'THIS_YEAR' | 'CUSTOM';

interface SuperadminReportsDatePresetDropdownProps {
  value: DatePreset;
  onChange: (preset: DatePreset, dateFrom: string, dateTo: string) => void;
}

export function SuperadminReportsDatePresetDropdown({ value, onChange }: SuperadminReportsDatePresetDropdownProps) {
  const handlePresetChange = (preset: string) => {
    const today = new Date();
    let from = '';
    let to = '';

    switch (preset) {
      case 'THIS_MONTH':
        from = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'LAST_MONTH':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0] || '';
        break;
      case 'LAST_3_MONTHS':
        from = new Date(today.getFullYear(), today.getMonth() - 3, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'LAST_6_MONTHS':
        from = new Date(today.getFullYear(), today.getMonth() - 6, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'THIS_YEAR':
        from = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0] || '';
        break;
      default:
        // 'CUSTOM' - do not auto-set dates
        break;
    }
    
    onChange(preset as DatePreset, from, to);
  };

  const OPTIONS = [
    { value: 'THIS_MONTH', label: 'This Month' },
    { value: 'LAST_MONTH', label: 'Last Month' },
    { value: 'LAST_3_MONTHS', label: 'Last 3 Months' },
    { value: 'LAST_6_MONTHS', label: 'Last 6 Months' },
    { value: 'THIS_YEAR', label: 'This Year' },
    { value: 'CUSTOM', label: 'Custom Range' },
  ];

  return (
    <div className="w-48 bg-input border border-border rounded-lg shadow-sm">
      <SearchableDropdown
        options={OPTIONS}
        value={value}
        onChange={(val) => handlePresetChange(String(val))}
        className="bg-transparent border-transparent"
      />
    </div>
  );
}
