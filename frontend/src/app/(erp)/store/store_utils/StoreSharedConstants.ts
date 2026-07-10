import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string(),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.coerce.number().min(0, "Stock must be positive"),
  description: z.string().optional()
});

export type ProductFormValues = z.infer<typeof ProductSchema>;

export const formatCurrency = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export const CATEGORIES = ['Supplements', 'Accessories', 'Equipment', 'Merchandise', 'Others'];
export const PAYMENT_METHODS = ['UPI', 'Cash', 'Card'];

export const EMPTY_PRODUCT_FORM = { 
 name: '', 
 category: 'Supplements', 
 price: '', 
 stock: '', 
 description: '' 
};
