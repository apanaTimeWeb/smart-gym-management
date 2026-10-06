// DATA FLOW: API/server state → ManagerStoreSchema → owning feature UI; UI events/mutations → ManagerStoreSchema → module API → TanStack Query cache/UI.
import { z } from 'zod';

/**
 * @description Provides the ManagerStoreSchema implementation for the store module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
  unit: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  costPrice: z.number().optional(),
  reorderThreshold: z.number().optional() });

export const orderItemSchema = z.object({
  productId: z.string(),
  qty: z.number(),
  name: z.string(),
  price: z.number(),
  unit: z.string().optional() });

export const orderItemResponseSchema = z.object({
  id: z.string(),
  qty: z.number(),
  price: z.number(),
  product: z.object({
    name: z.string(),
    unit: z.string().optional() }) });

export const orderSchema = z.object({
  id: z.string(),
  total: z.number(),
  method: z.string(),
  status: z.string(),
  notes: z.string().optional(),
  createdAt: z.string(),
  customerId: z.string().optional(),
  gstAmount: z.number().optional(),
  returnStatus: z.enum(['NONE', 'PARTIAL', 'FULL']),
  items: z.array(orderItemResponseSchema).optional() });

export const storeSummarySchema = z.object({
  totalProducts: z.number(),
  totalOrders: z.number(),
  totalRevenue: z.number(),
  lowStockProducts: z.array(productSchema) });
