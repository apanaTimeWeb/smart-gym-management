# Store Dependencies

- Business Feature Dependencies: None declared inside the supplied Manager scope.
- Infrastructure: Core configuration, trusted tenant authorization, tenant DataSource resolver, Redis idempotency, UnitOfWork, response/error infrastructure, audit logging.
- Runtime events published by this feature: MANAGER.STORE.CREATED, MANAGER.STORE.UPDATED, MANAGER.STORE.DELETED.
- Runtime event consumers supplied in this role scope: None.
- Direct sibling business imports: forbidden by the feature-boundary contract.
- Outside-scope/global dependencies: master-database tenant authorization and deployment-level infrastructure are required but not fully verifiable from this role archive.
