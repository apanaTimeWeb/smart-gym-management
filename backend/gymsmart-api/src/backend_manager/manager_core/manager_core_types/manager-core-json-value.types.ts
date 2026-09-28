// RESPONSIBILITY: Strict JSON value types used by feature domain payloads.
// FLOW: DTO data → domain use case → repository JSONB column → response mapper.
export type ManagerCoreJsonPrimitive=string|number|boolean|null|undefined;
export type ManagerCoreJsonValue=ManagerCoreJsonPrimitive|ManagerCoreJsonValue[]|{[key:string]:ManagerCoreJsonValue};
export type ManagerCoreJsonObject={[key:string]:ManagerCoreJsonValue};
