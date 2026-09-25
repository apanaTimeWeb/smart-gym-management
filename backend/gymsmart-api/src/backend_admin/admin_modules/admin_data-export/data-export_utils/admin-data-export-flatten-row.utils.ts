// RESPONSIBILITY: Flattens a tenant export row into scalar and relationship display fields without business persistence logic.
// FLOW: EntityMetadata + loaded row -> scalar fields -> relation IDs/names -> flattened export row.
import type { EntityMetadata } from 'typeorm';

/**
 * @description Converts one ORM export row into a flat export record while preserving relationship IDs and preferred labels.
 * @param metadata TypeORM metadata for the selected entity.
 * @param row Loaded entity row with eagerly fetched relations.
 * @returns Flattened export record suitable for CSV serialization.
 * @throws Never throws for missing optional relations; those fields are simply omitted.
 * @remarks Relation labels prefer name, title, label, code, then email.
 */
export function flattenAdminDataExportRow(metadata: EntityMetadata, row: object): Record<string, unknown> {
  const record = row as Record<string, unknown>;
  const relationNames = new Set(metadata.relations.map((relation) => relation.propertyName));
  const flat = Object.fromEntries(Object.entries(record).filter(([key]) => !relationNames.has(key)));
  metadata.relations.forEach((relation) => {
    const related = record[relation.propertyName];
    if (!related || typeof related !== 'object') return;
    const relatedRecord = related as Record<string, unknown>;
    const relationId = relatedRecord.id;
    if (relationId !== undefined && relationId !== null) flat[`${relation.propertyName}Id`] = relationId;
    const label = ['name', 'title', 'label', 'code', 'email']
      .map((field) => relatedRecord[field])
      .find((value): value is string => typeof value === 'string' && value.trim().length > 0);
    if (label !== undefined) flat[`${relation.propertyName}Name`] = label;
  });
  return flat;
}
