// RESPONSIBILITY: Builds stable Plans route query strings while resetting pagination when a filter changes.
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { AdminPlansUrlUpdate } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';

/**
 * buildAdminPlansQueryString provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function buildAdminPlansQueryString(searchParams: ReadonlyURLSearchParams, update: AdminPlansUrlUpdate): string {
  const params = new URLSearchParams(searchParams.toString());
  if ("search" in update) {
    update.search ? params.set("search", update.search) : params.delete("search");
    params.set("page", "1");
  }
  if ("tier" in update) {
    update.tier && update.tier !== "All" ? params.set("tier", update.tier) : params.delete("tier");
    params.set("page", "1");
  }
  if (update.page !== undefined) params.set("page", String(update.page));
  return `?${params.toString()}`;
}
