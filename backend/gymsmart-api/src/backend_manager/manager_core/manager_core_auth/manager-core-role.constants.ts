// RESPONSIBILITY: Runtime role enum shared by controller RBAC and master user persistence.
// FLOW: JWT role → ManagerCoreRole enum → @CoreRolesDecorator metadata → ManagerCoreRolesGuard.
export enum ManagerCoreRole {
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}
