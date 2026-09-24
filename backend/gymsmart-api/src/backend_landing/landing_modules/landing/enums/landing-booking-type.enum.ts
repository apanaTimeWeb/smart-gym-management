// RESPONSIBILITY: Defines the finite booking values frozen by the supplied Landing frontend contract.
// FLOW: Frontend payload â†’ DTO enum validation â†’ Domain/Entity enum.
export enum LandingBookingType {
  TRIAL = 'trial',
  MEMBERSHIP = 'membership',
  CLASS = 'class',
}
