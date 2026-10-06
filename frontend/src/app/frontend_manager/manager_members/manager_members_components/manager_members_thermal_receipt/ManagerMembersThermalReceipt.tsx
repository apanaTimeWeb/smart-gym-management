// RESPONSIBILITY: Renders ManagerMembersThermalReceipt's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useManagerMounted } from '@/app/frontend_manager/manager_infrastructure/useManagerMounted';
import { useTranslations, useLocale } from 'next-intl';
import { createPortal } from 'react-dom';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import styles from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_thermal_receipt/ManagerMembersThermalReceipt.module.css';
import { ManagerMembersFormatCurrency } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';
import type { ManagerMembersThermalReceiptProps } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersThermalReceiptTypes';

// DATA FLOW: feature print state → receipt component props → print portal → browser print stylesheet.




/** @description Renders the ManagerMembersThermalReceipt component for its owning Manager frontend boundary. @dependencies Data flow: feature print state → receipt component props → print portal → browser print stylesheet. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersThermalReceipt(props: ManagerMembersThermalReceiptProps) {
  const t = useTranslations('MANAGER_MEMBERS');
  const locale = useLocale();

 const { data } = props;

 const mounted = useManagerMounted();

 if (!data || !mounted) return null;

 const receiptContent = (
 <div id="thermal-receipt" className={`hidden print:block p-4 mx-auto bg-page text-primary font-mono leading-tight break-words ${styles.receipt}`}>
 <div className={`text-center border-border pb-2 mb-2 ${styles.dividerBottom}`}>
 <h2 className="font-bold text-lg uppercase tracking-wider">{data.gymName}</h2>
 <p className="text-xs">{t("COPY_PH")}{data.gymPhone}</p>
 <p className="font-bold mt-1 text-sm">{t("COPY_PAYMENT_RECEIPT")}</p>
 </div>
 
 <div className="mb-3 space-y-0.5 text-xs">
 <p><span className="font-bold">{t("COPY_RECEIPT_NO")}</span> {data.receiptNo}</p>
 <p><span className="font-bold">{t("COPY_DATE")}</span> {data.date}</p>
 <p><span className="font-bold">{t("COPY_MEMBER_2")}</span> {data.customerName}</p>
 </div>
 
 <table className="w-full mb-2 text-xs">
 <thead className={`border-border ${styles.dividerTopBottom}`}>
 <tr>
 <th className="text-left font-bold py-1.5">{t("COPY_DESCRIPTION")}</th>
 <th className="text-right font-bold py-1.5">{t("COPY_AMOUNT_2")}</th>
 </tr>
 </thead>
 <tbody className={`border-border ${styles.dividerBottomOnly}`}>
 {data.items.map((item, i) => (
 <tr key={`${item.name}-${item.price}-${item.amount}-${item.qty ?? 1}`}>
 <td className="py-1.5 pr-1">
 {item.name}
 {item.qty && item.qty > 1 && (
 <span className={`block text-primary mt-0.5 ${styles.smallText}`}>
 {item.qty}{t("COPY_X_2")}{ManagerMembersFormatCurrency(item.price, ManagerEnvConfig.currencyCode, locale)}
 </span>
 )}
 </td>
 <td className="text-right py-1.5 align-top">{ManagerMembersFormatCurrency(item.amount, ManagerEnvConfig.currencyCode, locale)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 
 <div className="flex justify-between font-bold text-base mb-2">
 <span>{t("COPY_TOTAL")}</span>
 <span>{ManagerMembersFormatCurrency(data.total, ManagerEnvConfig.currencyCode, locale)}</span>
 </div>
 
 <div className="mb-4 text-xs">
 <p><span className="font-bold">{t("COPY_PAID_VIA")}</span> {data.paymentMethod}</p>
 </div>
 
 <div className={`text-center border-border pt-2 mt-3 ${styles.dividerTop}`}>
 <p className="font-bold uppercase mb-0.5 text-sm">{t("COPY_THANK_YOU")}</p>
 <p className={styles.smallText}>{t("COPY_NO_REFUND_NO_EXCHANGE")}</p>
 <p className={`mt-0.5 ${styles.smallText}`}>{t("COPY_GENERATED_GYMSMART_MANAGER")}</p>
 </div>
 </div>
 );

 return createPortal(receiptContent, document.body);
}
