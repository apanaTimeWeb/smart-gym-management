// RESPONSIBILITY: Defines the sanitized application-layer input contract for Landing contact operations.
// FLOW: Landing DTO → LandingContactOrchestratorService → LandingContactService → LandingContactRepository.
export interface LandingCreateContactInput {
  name: string;
  email: string;
  message: string;
}
