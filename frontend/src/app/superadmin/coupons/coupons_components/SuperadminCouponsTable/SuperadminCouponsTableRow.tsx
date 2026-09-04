'use client';
// RESPONSIBILITY: Renders a single row in the Coupons data table. Handles row-level action buttons with stopPropagation. Purely presentational.
import { Edit2, Trash2, RefreshCw, ToggleLeft, ToggleRight, MessageCircle } from 'lucide-react';
import SuperadminCouponsStatusBadge from '@/app/superadmin/coupons/coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import type { Coupon, CouponStatus } from '@/app/superadmin/coupons/coupons_types/coupons_types';

interface CouponsTableRowProps {
  coupon: Coupon;
  onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}

export default function SuperadminCouponsTableRow({ coupon, onToggleStatus, onEdit, onDelete, onRestore }: CouponsTableRowProps) {
  const cpn = coupon;

  const handleShareWhatsApp = (e: React.MouseEvent, cpn: Coupon) => {
    e.stopPropagation();
    
    const dateStr = new Date(cpn.expiryDate).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    
    const discountStr = cpn.discountType === 'PERCENTAGE' 
      ? `${cpn.discountValue}% OFF` 
      : `Rs ${cpn.discountValue} OFF`;

    const waText = WhatsAppFormatter.formatReceipt({
      title: 'Smart Gym 360',
      subtitle: 'Exclusive Gym Partner Coupon',
      sections: [
        {
          items: {
            'Coupon Code': cpn.code,
            'Discount': discountStr,
          }
        },
        {
          title: 'Coupon Details',
          items: {
            'Valid Until': dateStr,
            'Remaining': `${cpn.maxUses - cpn.currentUses} uses`,
          }
        }
      ],
      footer: 'Apply this code at checkout!'
    });

    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <tr 
      className={`hover:bg-primary/5 transition-all duration-200 ease-in-out group cursor-pointer ${cpn.isDeleted ? 'opacity-50 grayscale' : ''}`}
      onClick={() => { if (!cpn.isDeleted) onEdit(cpn); }}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground tracking-wide">
        {cpn.code}
        {cpn.isDeleted && <span className="ml-2 text-xs bg-danger-bg/20 text-danger px-2 py-0.5 rounded-full">DELETED</span>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
        {cpn.discountType === 'PERCENTAGE'
          ? <span className="font-semibold text-success">{cpn.discountValue}% OFF</span>
          : <span className="font-semibold text-success">Rs {cpn.discountValue} OFF</span>
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">{cpn.currentUses} / {cpn.maxUses}</td>
      <td className="px-6 py-4 whitespace-nowrap"><SuperadminCouponsStatusBadge status={coupon.status} /></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">{new Date(cpn.expiryDate).toLocaleDateString()}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end gap-2">
        {cpn.isDeleted ? (
          <button
            title="Restore Coupon"
            aria-label="Restore Coupon"
            onClick={(e) => { e.stopPropagation(); onRestore(cpn.id); }}
            className="text-secondary hover:text-success transition-colors p-1.5 bg-input hover:bg-success/10 rounded-md border border-border"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        ) : (
          <>
            <button
              title="Share Coupon"
              aria-label="Share Coupon"
              onClick={(e) => handleShareWhatsApp(e, cpn)}
              className="text-secondary hover:text-[#25D366] transition-colors p-1.5 bg-input hover:bg-[#25D366]/10 rounded-md border border-border"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              title={cpn.status === 'ACTIVE' ? 'Deactivate Coupon' : 'Activate Coupon'}
              aria-label={cpn.status === 'ACTIVE' ? 'Deactivate Coupon' : 'Activate Coupon'}
              onClick={(e) => { e.stopPropagation(); onToggleStatus(cpn.id, cpn.status); }}
              disabled={cpn.status === 'EXPIRED' || cpn.status === 'DEPLETED'}
              className={`p-1.5 rounded-md border border-border transition-all duration-200 ease-in-out ${
                cpn.status === 'EXPIRED' || cpn.status === 'DEPLETED'
                  ? 'opacity-30 cursor-not-allowed bg-input'
                  : cpn.status === 'ACTIVE'
                    ? 'text-success hover:text-white bg-success/10 hover:bg-success'
                    : 'text-secondary hover:text-white bg-input hover:bg-secondary'
              }`}
            >
              {cpn.status === 'ACTIVE' ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            </button>
            <button
              title="Edit Coupon"
              aria-label="Edit Coupon"
              onClick={(e) => { e.stopPropagation(); onEdit(cpn); }}
              className="text-secondary hover:text-primary transition-colors p-1.5 bg-input hover:bg-primary/10 rounded-md border border-border"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              title="Delete Coupon"
              aria-label="Delete Coupon"
              onClick={(e) => { 
                e.stopPropagation(); 
                if (window.confirm(`Are you sure you want to delete coupon "${cpn.code}"? This action cannot be undone.`)) {
                  onDelete(cpn.id); 
                }
              }}
              className="text-secondary hover:text-danger transition-colors p-1.5 bg-input hover:bg-danger-bg/10 rounded-md border border-border"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
