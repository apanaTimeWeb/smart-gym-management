// RESPONSIBILITY: Central rate-limit tier definitions.
// FLOW: Route classification → named tier selection → limiter configuration; no controller literals.
export const CoreRateLimitConfig=Object.freeze({PUBLIC_AUTH_PER_MINUTE:5,AUTHENTICATED_READ_PER_MINUTE:100,EXPORT_PER_MINUTE:2,DEFAULT_PER_MINUTE:60});
