// RESPONSIBILITY: Maps PostgreSQL bigint monetary values to strict TypeScript numbers at the boundary.
// FLOW: PostgreSQL bigint → CoreBigintTransformer → domain/API number.

export const CoreBigintTransformer = {
  to(value: number | null): number | null {
    return value;
  },
  from(value: string | null): number | null {
    return value === null ? null : Number(value);
  },
};
