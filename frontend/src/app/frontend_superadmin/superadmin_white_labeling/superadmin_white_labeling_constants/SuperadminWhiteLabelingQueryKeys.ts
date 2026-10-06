/**
 * @description Central query-key registry for White Labeling.
 * @dependencies None.
 * @edge-case Domain-list keys remain stable for precise mutation invalidation.
 */
export const SUPERADMIN_WHITE_LABELING_QUERY_KEYS = {
  all: ["superadmin_white_labeling"] as const,
  domains: (params: unknown) => ["superadmin_white_labeling", "domains", params] as const,
} as const;
