// RESPONSIBILITY: Defines the sanitized application-layer input contract for Landing contact operations.
// FLOW: Landing DTO â†’ LandingContactOrchestratorService â†’ LandingContactService â†’ LandingContactRepository.
export interface LandingCreateContactInput {
  name: string;
  email: string;
  message: string;
}
