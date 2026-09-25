// RESPONSIBILITY: Declares finite master Admin role values required by authentication and authorization.
// FLOW: Database enum -> AdminCoreMasterAdminEntity -> Auth/RBAC.
export enum AdminCoreMasterAdminRole { ADMIN='ADMIN', SUPERADMIN='SUPERADMIN', MANAGER='MANAGER' }
