# white-labeling Dependencies

## Direct Business Feature Dependencies
None by direct import.

## Infrastructure Dependencies
Core authentication, configuration, TypeORM/PostgreSQL, Redis where applicable, and canonical HTTP/observability infrastructure.

## Runtime/Event Dependencies
Only explicitly registered events. Undeclared subscriptions are forbidden — Rule 49.

## Dependents
The Superadmin application container references this feature module only through explicit NestJS module registration.
