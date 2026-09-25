# profile Dependencies

## Inbound Dependencies
- Frontend Admin `profile` route/page and its API client operations.
- Global core authentication, tenant context, response, validation, logging, and rate-limit infrastructure.

## Outbound Dependencies
- **Business Feature Dependencies:** None declared in v1.
- **Infrastructure:** PostgreSQL through TypeORM repositories; Redis through approved core services where needed.
- **Runtime Events:** None declared in v1.

## Isolation Rule
A direct import of another Admin feature's business service/repository is forbidden. Any future runtime event dependency must be registered centrally and added here before use.
