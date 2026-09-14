const fs = require('fs');
const path = require('path');

const filesToFix = [
  'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\admin\\attendance\\attendance_api\\attendance_api.ts',
  'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\admin\\hr\\hr_api\\AdminHrApi.ts',
  'c:\\Users\\satya\\Desktop\\PojectsToWork\\Smart-Gym-Management\\frontend\\src\\app\\admin\\members\\members_api\\AdminMembersApi.ts'
];

for (const file of filesToFix) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace inline setTimeout mocks with generic apiFetch calls.
  // 1. Remove mock data imports
  content = content.replace(/import\s+{.*?MOCK.*?}\s+from\s+['"].*?['"];/g, '');
  content = content.replace(/import\s+MOCK.*?from\s+['"].*?['"];/g, '');
  
  // 2. Remove let mock... = [...MOCK...];
  content = content.replace(/let\s+mock.*?=\s+\[\.\.\.MOCK.*?\];/g, '');
  
  // 3. For Attendance API (standalone functions)
  if (file.includes('attendance_api.ts')) {
      content = content.replace(/export async function fetchAttendanceRecords\(\)[\s\S]*?}/, 
        `export async function fetchAttendanceRecords(): Promise<AdminAttendanceRecord[]> {\n  return apiFetch(AdminAttendanceUrlConfig.BACKEND_API.BASE, { dataSchema: z.any() });\n}`);
      content = content.replace(/export async function fetchAttendanceSummary\(\)[\s\S]*?}/, 
        `export async function fetchAttendanceSummary(): Promise<AdminAttendanceSummary> {\n  return apiFetch(\`\${AdminAttendanceUrlConfig.BACKEND_API.BASE}/summary\`, { dataSchema: z.any() });\n}`);
      content = content.replace(/export async function fetchAttendanceTrend\(\)[\s\S]*?}/, 
        `export async function fetchAttendanceTrend(): Promise<AdminAttendanceTrendPoint[]> {\n  return apiFetch(\`\${AdminAttendanceUrlConfig.BACKEND_API.BASE}/trend\`, { dataSchema: z.any() });\n}`);
  }
  
  // 4. For HR API
  if (file.includes('AdminHrApi.ts')) {
      // Just manually rewrite the hrApi object to use apiFetch
      const hrApiRewrite = `export const hrApi = {
  getStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/staff\${query ? '?' + query : ''}\`, { dataSchema: z.any() });
  },
  getOneStaff: async (id: string) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/staff/\${id}\`, { dataSchema: z.any() }),
  createStaff: async (body: Partial<Staff>) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/staff\`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updateStaff: async (id: string, body: Partial<Staff>) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/staff/\${id}\`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  removeStaff: async (id: string) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/staff/\${id}\`, { method: 'DELETE', dataSchema: z.any() }),
  bulkDeactivateStaff: async (ids: string[]) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/staff/bulk-deactivate\`, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.any() }),
  getPayrolls: async (params?: Record<string, string>) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls\`, { dataSchema: z.any() }),
  createPayroll: async (body: Partial<Payroll>) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls\`, { method: 'POST', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayroll: async (id: string, body: Partial<Payroll>) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls/\${id}\`, { method: 'PATCH', body: JSON.stringify(body), dataSchema: z.any() }),
  updatePayrollStatus: async (id: string, status: string) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/payrolls/\${id}/status\`, { method: 'PATCH', body: JSON.stringify({ status }), dataSchema: z.any() }),
  getSummary: async (branchId?: string) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/summary\`, { dataSchema: z.any() }),
  getLedger: async (staffId: string) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/staff/\${staffId}/ledger\`, { dataSchema: z.any() }),
  giveAdvance: async (data: any) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/advances\`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  payDue: async (data: any) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/dues/pay\`, { method: 'POST', body: JSON.stringify(data), dataSchema: z.any() }),
  fetchStaffPerformance: async (period: PerformancePeriod) => apiFetch(\`\${AdminHrUrlConfig.BACKEND_API.BASE}/performance\`, { dataSchema: z.any() }),
};`;
      content = content.replace(/export const hrApi = {[\s\S]*?};/, hrApiRewrite);
      if (!content.includes('import { z }')) {
          content = `import { z } from 'zod';\n` + content;
      }
  }
  
  // 5. For Members API
  if (file.includes('AdminMembersApi.ts')) {
      const membersApiRewrite = `export const adminMembersApi = {
  fetchMembers: async (params: FetchMembersParams) => {
    const query = new URLSearchParams(params as any).toString();
    return apiFetch(\`\${ADMIN_MEMBERS_URLS.list}\${query ? '?' + query : ''}\`, { dataSchema: z.any() });
  },
  fetchSummary: async () => {
    return apiFetch(ADMIN_MEMBERS_URLS.summary, { dataSchema: z.any() });
  },
};`;
      content = content.replace(/export const adminMembersApi = {[\s\S]*?};/, membersApiRewrite);
      if (!content.includes('import { z }')) {
          content = `import { z } from 'zod';\n` + content;
      }
  }
  
  fs.writeFileSync(file, content);
}
