// RESPONSIBILITY: Renders ManagerStoreKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { useManagerStoreLogic } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreLogic';
import { ManagerStoreFormatCurrency } from '@/app/frontend_manager/manager_store/manager_store_utils/ManagerStoreFormatters';


/** @description Renders the ManagerStoreKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerStoreKPIs() {
  const t = useTranslations('MANAGER_STORE');
  const locale = useLocale();

 const { summary } = useManagerStoreLogic();
 const dateSuffix = useDateRangeSuffix();

 const kpis = [
 { label: t("TEXT_KPI_TOTAL_PRODUCTS") + dateSuffix, value: summary?.totalProducts || 0, icon: Package, color: 'text-info', bg: 'bg-info-bg' },
 { label: t("TEXT_KPI_TOTAL_ORDERS") + dateSuffix, value: summary?.totalOrders || 0, icon: ShoppingCart, color: 'text-success', bg: 'bg-success-bg' },
 { label: t("TEXT_KPI_STORE_REVENUE") + dateSuffix, value: ManagerStoreFormatCurrency(summary?.totalRevenue || 0, ManagerEnvConfig.currencyCode, locale), icon: TrendingUp, color: 'text-warning', bg: 'bg-warning-bg' },
 { label: t("TEXT_KPI_LOW_STOCK") + dateSuffix, value: summary?.lowStockProducts?.length || 0, icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger-bg' },
 ];

 return (
 <div className="space-y-5">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {kpis.map((s) => (
 <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
 <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
 <s.icon size={18} className={s.color} />
 </div>
 <div>
 <p className="text-xs text-secondary font-medium">{s.label}</p>
 <p className="text-xl font-bold text-primary">{s.value}</p>
 </div>
 </div>
 ))}
 </div>

 {(summary?.lowStockProducts?.length ?? 0) > 0 && (
 <div data-testid="manager_store-manager-store-kpis-status" className="bg-danger-bg border border-border rounded-xl p-4 flex items-center gap-3">
 <AlertTriangle size={18} strokeWidth={2} className="text-danger flex-shrink-0"/>
 <p className="text-sm text-danger font-medium">{t("COPY_LOW_STOCK_ALERT")}{summary!.lowStockProducts.map(p => p.name).join(', ')}
 </p>
 </div>
 )}
 </div>
 );
}
