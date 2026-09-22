// RESPONSIBILITY: Runtime role enum shared by controller RBAC and master user persistence.
// FLOW: JWT role → CoreRole enum → @CoreRolesDecorator metadata → CoreRolesGuard.
export enum CoreRole {
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}
