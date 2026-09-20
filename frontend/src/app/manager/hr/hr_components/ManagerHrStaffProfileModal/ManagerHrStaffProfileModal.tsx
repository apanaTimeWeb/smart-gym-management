'use client';
import ManagerTooltip from '@/app/manager/manager_components/ManagerFeedback/ManagerTooltip';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders a read-only profile modal for a staff member.
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { X, Edit2, Phone, Mail, Calendar, MapPin, IndianRupee, Hash } from 'lucide-react';
import { formatCurrencyFromMinorUnits , formatDate} from '@/lib/formatters';

export default function ManagerHrStaffProfileModal() {
  const { viewProfileData, setViewProfileData, openEdit } = useManagerHrLogic();

  if (!viewProfileData) return null;
  const s = viewProfileData;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm">
      <div className="rounded-2xl shadow-dialog w-full max-w-lg overflow-hidden bg-overlay border-2 border-primary/20">
        <div className="relative h-24 bg-primary">
          <button 
            type="button" 
            onClick={() => setViewProfileData(null)} 
            className="absolute top-4 right-4 p-2 rounded-full bg-overlay-backdrop hover:bg-overlay-backdrop motion-safe:transition-colors text-on-primary"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-10 mb-6">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center font-bold text-4xl bg-overlay border-4 border-card text-primary shadow-card shadow-card">
              {(s.name || '?').charAt(0).toUpperCase()}
            </div>
            <button 
              onClick={() => { setViewProfileData(null); openEdit(s); }}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-on-primary font-semibold rounded-xl motion-safe:transition-colors mb-2"
            >
              <Edit2 size={18} /> Edit Profile
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-primary">{s.name}</h3>
            <p className="text-sm font-medium text-on-primary mt-1 px-3 py-1 bg-primary/10 inline-block rounded-md">{s.role}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Phone</p>
                <p className="text-sm font-semibold text-primary">{s.phone || 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Email</p>
                <ManagerTooltip content={s.email || 'N/A'}><p className="text-sm font-semibold text-primary truncate max-w-40">{s.email || 'N/A'}</p></ManagerTooltip>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Join Date</p>
                <p className="text-sm font-semibold text-primary">{s.joinDate ? formatDate(s.joinDate) : 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IndianRupee className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Monthly Salary</p>
                <p className="text-sm font-bold text-success">{formatCurrencyFromMinorUnits(s.salary || 0, ManagerEnvConfig.currencyCode)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IndianRupee className="w-5 h-5 text-danger mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Advance Balance</p>
                <p className="text-sm font-bold text-danger">{formatCurrencyFromMinorUnits(s.advanceSalary || 0, ManagerEnvConfig.currencyCode)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IndianRupee className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Current Due</p>
                <p className="text-sm font-bold text-warning">{formatCurrencyFromMinorUnits(s.currentDue || 0, ManagerEnvConfig.currencyCode)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Hash className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Aadhaar No.</p>
                <p className="text-sm font-semibold text-primary">{s.aadhaar || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-xs text-secondary mt-0.5 border border-secondary rounded-sm">UPI</span>
              <div>
                <p className="text-xs text-secondary mb-0.5">UPI ID</p>
                <p className="text-sm font-semibold text-primary">{s.upiId || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-xs text-secondary mb-0.5">Address</p>
                <p className="text-sm font-semibold text-primary whitespace-pre-line">{s.address || 'N/A'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
             <div>
               <p className="text-xs text-secondary mb-1">Status</p>
               <div className="flex items-center gap-2">
                 <div className={`w-2.5 h-2.5 rounded-full ${s.isActive ? 'bg-success' : 'bg-danger'}`}></div>
                 <span className={`text-sm font-bold ${s.isActive ? 'text-on-success' : 'text-on-danger'}`}>{s.isActive ? 'Active Staff' : 'Suspended'}</span>
               </div>
             </div>
             <div>
               <p className="text-xs text-secondary mb-1">Gender</p>
               <p className="text-sm font-semibold text-primary capitalize">{s.gender?.toLowerCase() || 'N/A'}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
