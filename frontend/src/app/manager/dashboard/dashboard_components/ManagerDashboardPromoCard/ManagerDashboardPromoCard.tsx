'use client';
// RESPONSIBILITY: Renders a promotional or informational card for the gym on the dashboard.
import { GYM_DETAILS } from '@/app/manager/manager_infrastructure/ManagerGymIdentity';

export default function ManagerDashboardPromoCard() {
 return (
 <div className="rounded-xl p-5 text-on-primary bg-primary shadow-card">
 <h3 className="font-semibold mb-1">{GYM_DETAILS.name}</h3>
 <p className="text-sm mb-3 text-on-primary/80">Complete Gym Management System</p>
 <div className="text-sm font-bold">{GYM_DETAILS.phone}</div>
 </div>
 );
}
