// RESPONSIBILITY: Converts local date/time inputs into the API's ISO schedule representation.

export function combineSuperadminBroadcastScheduleDateTime(date: string, time: string): string {
  return new Date(`${date}T${time}:00Z`).toISOString();
}

export function splitSuperadminBroadcastScheduleDateTime(value?: string | null): { date: string; time: string } {
  if (!value) return { date: '', time: '' };
  const parsed = new Date(value);
  return {
    date: `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`,
    time: `${String(parsed.getHours()).padStart(2, '0')}:${String(parsed.getMinutes()).padStart(2, '0')}`,
  };
}
