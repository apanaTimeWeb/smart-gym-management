// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the Store module.
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string(),
  price: z.string().refine(val => val !== '' && !isNaN(Number(val)) && Number(val) >= 0, "Valid price is required"),
  stock: z.string().refine(val => val !== '' && !isNaN(Number(val)) && Number(val) >= 0, "Valid stock is required"),
  description: z.string().optional()
});

export type ProductFormValues = z.infer<typeof ProductSchema>;

export const formatCurrency = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export const CATEGORIES = ['Supplements', 'Accessories', 'Equipment', 'Merchandise', 'Others'];
export const PAYMENT_METHODS = ['UPI', 'Cash', 'Card'];

export const EMPTY_PRODUCT_FORM = { 
 name: '', 
 category: 'Supplements', 
 price: '' as unknown as number, 
 stock: '' as unknown as number, 
 description: '' 
} as unknown as ProductFormValues;

export const ERR_EMPTY_ORDER = 'Add items to order first';
