// RESPONSIBILITY: Calculates Reports date preset boundaries for URL/API query values. No JSX or network calls.
/** Returns YYYY-MM-DD bounds for a Reports date preset. */
export function getSuperadminReportsPresetRange(preset: string, now = new Date()): { from: string; to: string } {
  const year = now.getFullYear();
  const month = now.getMonth();
  const format = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  switch (preset) {
    case 'THIS_MONTH': return { from: format(new Date(year, month, 1)), to: format(new Date(year, month + 1, 0)) };
    case 'LAST_MONTH': return { from: format(new Date(year, month - 1, 1)), to: format(new Date(year, month, 0)) };
    case 'LAST_3_MONTHS': return { from: format(new Date(year, month - 3, 1)), to: format(new Date(year, month + 1, 0)) };
    case 'LAST_6_MONTHS': return { from: format(new Date(year, month - 6, 1)), to: format(new Date(year, month + 1, 0)) };
    case 'THIS_YEAR': return { from: format(new Date(year, 0, 1)), to: format(new Date(year, 11, 31)) };
    default: return { from: '', to: '' };
  }
}
