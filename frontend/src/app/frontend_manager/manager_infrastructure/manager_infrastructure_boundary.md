# Manager Infrastructure Boundary

This folder contains only zero-business or application-wide infrastructure required by the Manager role snapshot.

Allowed responsibilities: environment/config projection, pagination defaults, debounce utility, HTTP status constants, toast service, unsaved-navigation guard infrastructure, permission gate infrastructure, test/runtime bootstrap policy, and global shell-adjacent infrastructure.

Forbidden: feature-specific business components, server data, feature API clients, feature fixtures, feature validation rules, feature business formatters, and feature-specific workflow logic.

Feature business behavior must remain inside its owning feature module.
