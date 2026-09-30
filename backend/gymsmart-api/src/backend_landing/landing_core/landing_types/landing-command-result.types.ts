// RESPONSIBILITY: Defines the transport-neutral application outcome returned by Landing command orchestrators.
// FLOW: Controller -> orchestrator -> LandingCommandResult -> global response interceptor -> canonical HTTP envelope.

/**
 * Intent: Keep application services independent from the canonical HTTP response envelope.
 * Edge Cases: Command mutations may return null data; error envelopes are built only by HTTP infrastructure.
 * Side Effects: None.
 * AI Notes: Do not add HTTP status, success discriminants, headers, or Nest HttpException shapes here.
 */
export interface LandingCommandResult<T> {
  message: string;
  data: T;
}
