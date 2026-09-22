// RESPONSIBILITY: Strict JSON value types used by feature domain payloads.
// FLOW: DTO data → domain use case → repository JSONB column → response mapper.
export type CoreJsonPrimitive=string|number|boolean|null;
export type CoreJsonValue=CoreJsonPrimitive|CoreJsonValue[]|{[key:string]:CoreJsonValue};
export type CoreJsonObject={[key:string]:CoreJsonValue};
