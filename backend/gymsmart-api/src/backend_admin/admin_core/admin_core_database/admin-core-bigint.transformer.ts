// RESPONSIBILITY: Maps PostgreSQL bigint monetary values to strict TypeScript numbers at the boundary.
// FLOW: PostgreSQL bigint â†’ AdminCoreBigintTransformer â†’ domain/API number.

export const AdminCoreBigintTransformer = {
  to(value: number | null): number | null {
    return value;
  },
  from(value: string | null): number | null {
    return value === null ? null : Number(value);
  },
};
