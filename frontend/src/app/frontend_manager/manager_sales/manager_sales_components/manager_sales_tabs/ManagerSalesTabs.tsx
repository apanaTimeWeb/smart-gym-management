// RESPONSIBILITY: Renders ManagerSalesTabs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { SALES_TABS } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesSharedConstants';
import { useManagerSalesLogic } from '@/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesLogic';


/** @description Provides the implementation for ManagerSalesTabs.tsx functionality within its module. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerSalesTabs() {
 const { tab, setTab } = useManagerSalesLogic();

 return (
 <div className="border-b border-border flex overflow-x-auto bg-card">
 {SALES_TABS.map((t, mapIndex) => (
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-5 py-3.5 text-sm font-medium motion-safe:transition-all border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-primary bg-primary-subtle border-primary' 
 : 'border-transparent text-secondary hover:text-primary'
 } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_sales-sales-managersalestabs-button-primary-${mapIndex}`} 
 key={t} 
 onClick={() => setTab(t)}
 
 >
 {t}
 </button>
 ))}
 </div>
 );
}
