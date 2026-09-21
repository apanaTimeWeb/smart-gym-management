// RESPONSIBILITY: Defines the persistence-independent Landing contact domain object.
// FLOW: Repository mapper â†’ LandingContactDomainModel â†’ Landing service.
export interface LandingContactDomainModel {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
