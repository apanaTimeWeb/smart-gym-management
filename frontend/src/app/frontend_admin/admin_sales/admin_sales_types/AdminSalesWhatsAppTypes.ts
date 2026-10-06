// RESPONSIBILITY: Defines the receipt payload contract consumed by the Admin Sales WhatsApp formatter.
export interface AdminSalesWhatsAppReceiptData {
  title: string;
  subtitle: string;
  date: string;
  customerInfo: Record<string, string>;
  sections: Array<{
    title: string;
    items: Record<string, string>;
  }>;
  footer: string;
}

