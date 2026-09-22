import { BRANCH_PAYMENT_METHOD_STYLES } from '@/app/admin/branches/branches_utils/AdminBranchesSharedConstants';
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';

import type { DetailView } from '@/app/admin/branches/branches_types/AdminBranchesUiTypes';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';
import AdminBranchesDetailEmpty from '@/app/admin/branches/branches_components/AdminBranchesDetailEmpty/AdminBranchesDetailEmpty';

// RESPONSIBILITY: Renders the selected branch's feature-owned detail content for the requested detail view.
export default function AdminBranchesDetailContent({ branch, view }: { branch: Branch; view: DetailView }) {
  if (view === 'revenue') {
    const items = branch.revenueItems ?? [];
    return items.length ? (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
            <div>
              <p className="text-sm font-medium text-primary">{item.label}</p>
              <p className="text-xs text-secondary">{item.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs ${BRANCH_PAYMENT_METHOD_STYLES[item.method] ?? 'bg-input text-secondary'}`}>{item.method}</span>
              <span className="font-bold text-success">{formatCurrency(item.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    ) : <AdminBranchesDetailEmpty label="No revenue records found." />;
  }

  if (view === 'expenses') {
    const items = branch.expenseItems ?? [];
    return items.length ? (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
            <div>
              <p className="text-sm font-medium text-primary">{item.label}</p>
              <p className="text-xs text-secondary">{item.category} · {item.date}</p>
            </div>
            <span className="font-bold text-danger">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
    ) : <AdminBranchesDetailEmpty label="No expense records found." />;
  }

  if (view === 'staff') {
    const items = branch.staffList ?? [];
    return items.length ? (
      <div className="space-y-3">
        {items.map((member) => (
          <div key={member.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
            <div>
              <p className="text-sm font-medium text-primary">{member.name}</p>
              <p className="text-xs text-secondary">{member.role} · {member.shift}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${member.status === 'active' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>{member.status}</span>
          </div>
        ))}
      </div>
    ) : <AdminBranchesDetailEmpty label="No staff records found." />;
  }

  const students = branch.studentList ?? [];
  return students.length ? (
    <div className="space-y-3">
      {students.map((student) => (
        <div key={student.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
          <div>
            <p className="text-sm font-medium text-primary">{student.name}</p>
            <p className="text-xs text-secondary">{student.plan} · Joined {student.joinDate}</p>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-xs ${student.status === 'active' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>{student.status}</span>
        </div>
      ))}
    </div>
  ) : <AdminBranchesDetailEmpty label="No student records found." />;
}
