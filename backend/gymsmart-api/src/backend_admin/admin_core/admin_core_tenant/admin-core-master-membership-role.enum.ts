// RESPONSIBILITY: Declares finite tenant-membership roles stored in the master database.
// FLOW: Database enum -> membership entity -> trusted tenant authorization.
export enum AdminCoreMasterMembershipRole { ADMIN='ADMIN', SUPERADMIN='SUPERADMIN', MANAGER='MANAGER', STAFF='STAFF' }
