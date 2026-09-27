# Manager Core Redis Application Binding

Manager Core deliberately does not import another role container to obtain Redis. The host application must bind `CORE_REDIS_PORT` to its canonical Redis infrastructure adapter. This is required by Rule 0E and the no-cross-role implementation dependency rule.

Required port methods: `set`, `get`, `del`, `incr`, `expire`. No feature module may inject or import a provider-specific Redis client.
