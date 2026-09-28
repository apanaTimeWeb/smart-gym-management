// RESPONSIBILITY: Declares machine-readable backend module dependency boundaries for lint/CI enforcement.
// FLOW: CI boundary checker -> namespace rules -> fail closed on forbidden cross-feature imports.
export const MANAGER_CORE_MODULE_BOUNDARY_RULES = {
  namespacePrefix: 'backend_manager',
  forbiddenBusinessImportRoots: ['manager_modules/'],
  allowedCrossFeatureTargets: ['core/'],
} as const;
