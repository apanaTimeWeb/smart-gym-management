import { http, HttpResponse, delay } from 'msw';
const BASE_URL = '*/superadmin/system-health';

const mockSlaRecords = [
  { id: 't1', name: 'Flex Fitness Central', targetSla: 99.9, actualUptime: 99.95, downtimeMinutes: 20, downtimeIncidents: 1, status: 'MET' },
  { id: 't2', name: 'Iron Temple Barbell Club', targetSla: 99.9, actualUptime: 99.5, downtimeMinutes: 216, downtimeIncidents: 3, status: 'BREACHED' },
  { id: 't3', name: 'Downtown Fit', targetSla: 99.9, actualUptime: 99.91, downtimeMinutes: 38, downtimeIncidents: 2, status: 'WARNING' },
];

export const superadminSystemHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';

    let filtered = [...mockSlaRecords];
    if (search) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(search));
    }

    return HttpResponse.json({ success: true, message: 'Success', data: filtered, meta: { total: filtered.length } });
  }),
  http.get(`${BASE_URL}/health`, async () => {
    await delay(200);
    return HttpResponse.json({ success: true, message: 'Success', data: { status: 'healthy' } });
  }),
];
