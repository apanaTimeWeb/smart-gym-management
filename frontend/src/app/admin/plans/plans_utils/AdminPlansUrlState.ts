import type { ReadonlyURLSearchParams } from "next/navigation";

// RESPONSIBILITY: Builds stable Plans route query strings while resetting pagination when a filter changes.
export type AdminPlansUrlUpdate = { search?: string | null; tier?: string | null; page?: number };

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
