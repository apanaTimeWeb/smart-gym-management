"use client";

import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';

export default function PromoCard() {
 return (
 <div className="rounded-xl p-5 text-white dashboard-module" style={{ background: 'linear-gradient(135deg, var(--dashboard-promo-gradient-start), var(--dashboard-promo-gradient-end))' }}>
 <h3 className="font-semibold mb-1">{GYM_DETAILS.name}</h3>
 <p className="text-sm mb-3" style={{ color: 'var(--dashboard-promo-text-highlight)' }}>Complete Gym Management System</p>
 <div className="text-sm font-bold">{GYM_DETAILS.phone}</div>
 </div>
 );
}
