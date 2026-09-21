// RESPONSIBILITY: Defines the finite booking values frozen by the supplied Landing frontend contract.
// FLOW: Frontend payload → DTO enum validation → Domain/Entity enum.
export enum LandingBookingType {
  TRIAL = 'trial',
  MEMBERSHIP = 'membership',
  CLASS = 'class',
}
