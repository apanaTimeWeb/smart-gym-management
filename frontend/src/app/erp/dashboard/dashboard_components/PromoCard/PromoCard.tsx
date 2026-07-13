// RESPONSIBILITY: Renders a promotional or informational card for the gym on the dashboard.
"use client";

import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';

export default function PromoCard() {
 return (
 <div className="rounded-xl p-5 text-white bg-gradient-to-br from-primary to-primary-hover shadow-md">
 <h3 className="font-semibold mb-1">{GYM_DETAILS.name}</h3>
 <p className="text-sm mb-3 text-white/80">Complete Gym Management System</p>
 <div className="text-sm font-bold">{GYM_DETAILS.phone}</div>
 </div>
 );
}
