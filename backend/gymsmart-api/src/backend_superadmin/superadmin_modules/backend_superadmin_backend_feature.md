# Backend Superadmin Role Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules feature. It exposes 245 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `affiliates/affiliates_dtos/superadmin-affiliates-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates/affiliates_dtos/superadmin-affiliates-pay.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates/affiliates_dtos/superadmin-affiliates-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates/affiliates_dtos/superadmin-affiliates-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates/affiliates_dtos/superadmin-affiliates-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates/affiliates_responses/superadmin-affiliates-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates/affiliates_services/superadmin-affiliates-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates/affiliates_services/superadmin-affiliates-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates/affiliates_services/superadmin-affiliates-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates/affiliates_services/superadmin-affiliates-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates/affiliates_services/superadmin-affiliates-payout.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates/affiliates_services/superadmin-affiliates-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates/affiliates_services/superadmin-affiliates-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates/affiliates_types/superadmin-affiliates.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `affiliates/affiliates_types/superadmin-affiliates.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `affiliates/superadmin-affiliates-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `affiliates/superadmin-affiliates-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `affiliates/superadmin-affiliates.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `affiliates/superadmin-affiliates.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `affiliates/superadmin-affiliates.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `affiliates/superadmin-affiliates.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `affiliates/superadmin-affiliates.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `affiliates/superadmin-affiliates.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `affiliates/superadmin-affiliates.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `analytics/analytics_dtos/superadmin-analytics-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `analytics/analytics_dtos/superadmin-analytics-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `analytics/analytics_dtos/superadmin-analytics-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `analytics/analytics_responses/superadmin-analytics-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `analytics/analytics_services/superadmin-analytics-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `analytics/analytics_services/superadmin-analytics-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `analytics/analytics_services/superadmin-analytics-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `analytics/analytics_services/superadmin-analytics-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `analytics/analytics_services/superadmin-analytics-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `analytics/analytics_services/superadmin-analytics-retention-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `analytics/analytics_services/superadmin-analytics-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `analytics/analytics_types/superadmin-analytics.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `analytics/analytics_types/superadmin-analytics.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `analytics/superadmin-analytics-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `analytics/superadmin-analytics-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `analytics/superadmin-analytics-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `analytics/superadmin-analytics-retention-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `analytics/superadmin-analytics.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `analytics/superadmin-analytics.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `analytics/superadmin-analytics.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `analytics/superadmin-analytics.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `analytics/superadmin-analytics.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `analytics/superadmin-analytics.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `analytics/superadmin-analytics.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `auth/auth_dtos/superadmin-auth-ghost-cookie-user.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `auth/auth_dtos/superadmin-auth-ghost-cookie.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `auth/auth_dtos/superadmin-auth-login.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `auth/auth_dtos/superadmin-auth-refresh.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `auth/superadmin-auth.controller.spec.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `auth/superadmin-auth.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `auth/superadmin-auth.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `auth/superadmin-auth.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `auth/superadmin-auth.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_dtos/superadmin-broadcasts-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `broadcasts/broadcasts_dtos/superadmin-broadcasts-delivery.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `broadcasts/broadcasts_dtos/superadmin-broadcasts-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `broadcasts/broadcasts_dtos/superadmin-broadcasts-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `broadcasts/broadcasts_dtos/superadmin-broadcasts-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `broadcasts/broadcasts_responses/superadmin-broadcasts-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-audience-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-delivery.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_services/superadmin-broadcasts-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `broadcasts/broadcasts_types/superadmin-broadcasts.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `broadcasts/broadcasts_types/superadmin-broadcasts.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `broadcasts/superadmin-broadcasts-audience-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `broadcasts/superadmin-broadcasts-audience-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `broadcasts/superadmin-broadcasts-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `broadcasts/superadmin-broadcasts-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `broadcasts/superadmin-broadcasts-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `broadcasts/superadmin-broadcasts-contract.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `broadcasts/superadmin-broadcasts-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `broadcasts/superadmin-broadcasts.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `broadcasts/superadmin-broadcasts.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `broadcasts/superadmin-broadcasts.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `broadcasts/superadmin-broadcasts.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `broadcasts/superadmin-broadcasts.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `broadcasts/superadmin-broadcasts.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `broadcasts/superadmin-broadcasts.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `compliance/compliance_dtos/superadmin-compliance-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `compliance/compliance_dtos/superadmin-compliance-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `compliance/compliance_dtos/superadmin-compliance-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `compliance/compliance_responses/superadmin-compliance-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `compliance/compliance_services/superadmin-compliance-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `compliance/compliance_services/superadmin-compliance-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `compliance/compliance_services/superadmin-compliance-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `compliance/compliance_services/superadmin-compliance-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `compliance/compliance_services/superadmin-compliance-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `compliance/compliance_services/superadmin-compliance-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `compliance/compliance_types/superadmin-compliance.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `compliance/compliance_types/superadmin-compliance.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `compliance/superadmin-compliance-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `compliance/superadmin-compliance-document.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `compliance/superadmin-compliance-overview-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `compliance/superadmin-compliance-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `compliance/superadmin-compliance-response-data.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `compliance/superadmin-compliance.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `compliance/superadmin-compliance.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `compliance/superadmin-compliance.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `compliance/superadmin-compliance.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `compliance/superadmin-compliance.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `compliance/superadmin-compliance.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `compliance/superadmin-compliance.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `dashboard/dashboard_dtos/superadmin-dashboard-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_dtos/superadmin-dashboard-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_dtos/superadmin-dashboard-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_responses/superadmin-dashboard-growth-chart-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_responses/superadmin-dashboard-kpis-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_responses/superadmin-dashboard-recent-onboards-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_responses/superadmin-dashboard-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_responses/superadmin-dashboard-revenue-by-geography-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_responses/superadmin-dashboard-revenue-by-tier-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_responses/superadmin-dashboard-revenue-chart-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/dashboard_services/superadmin-dashboard-business-overview.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-growth-chart.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-kpis.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-recent-onboards.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-revenue-by-geography.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-revenue-by-tier.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-revenue-chart.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_services/superadmin-dashboard-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `dashboard/dashboard_types/superadmin-dashboard.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `dashboard/dashboard_types/superadmin-dashboard.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `dashboard/superadmin-dashboard-business-overview-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/superadmin-dashboard-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `dashboard/superadmin-dashboard-overview-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `dashboard/superadmin-dashboard-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `dashboard/superadmin-dashboard-response-data.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `dashboard/superadmin-dashboard.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `dashboard/superadmin-dashboard.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `dashboard/superadmin-dashboard.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `dashboard/superadmin-dashboard.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `dashboard/superadmin-dashboard.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `dashboard/superadmin-dashboard.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `dashboard/superadmin-dashboard.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `export-data/export-data_adapters/superadmin-export-data-email.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `export-data/export-data_adapters/superadmin-export-data-storage.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `export-data/export-data_adapters/superadmin-export-data-whatsapp.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `export-data/export-data_dtos/superadmin-export-data-request.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `export-data/export-data_repositories/superadmin-export-data-archive.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `export-data/export-data_repositories/superadmin-export-data-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `export-data/export-data_responses/superadmin-export-data-accepted-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `export-data/export-data_responses/superadmin-export-data-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `export-data/export-data_services/superadmin-export-data-archive.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data/export-data_services/superadmin-export-data-delivery.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data/export-data_services/superadmin-export-data-retention.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data/export-data_services/superadmin-export-data.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data/export-data_workers/superadmin-export-data-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `export-data/superadmin-export-data-job.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `export-data/superadmin-export-data-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `export-data/superadmin-export-data-request.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `export-data/superadmin-export-data.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `export-data/superadmin-export-data.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `export-data/superadmin-export-data.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `export-data/superadmin-export-data.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `export-data/superadmin-export-data.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `features/features_dtos/superadmin-features-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/features_dtos/superadmin-features-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/features_dtos/superadmin-features-release-note-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/features_dtos/superadmin-features-release-note-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/features_dtos/superadmin-features-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/features_responses/superadmin-features-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/features_services/superadmin-features-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-release-note.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-rollout-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-toggle.service.spec.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `features/features_services/superadmin-features-toggle.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_services/superadmin-features-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features/features_types/superadmin-features.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `features/features_types/superadmin-features.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `features/superadmin-features-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `features/superadmin-features-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `features/superadmin-features-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `features/superadmin-features-feature-flag.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/superadmin-features-history-entry.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/superadmin-features-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `features/superadmin-features-release-note-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `features/superadmin-features-release-note.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/superadmin-features-release-note.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `features/superadmin-features-release-note.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `features/superadmin-features-response-data.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/superadmin-features-rollout-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `features/superadmin-features-rollout-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features/superadmin-features.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `features/superadmin-features.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `features/superadmin-features.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `features/superadmin-features.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `features/superadmin-features.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `features/superadmin-features.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `features/superadmin-features.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `global-audit/global-audit_dtos/superadmin-global-audit-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `global-audit/global-audit_dtos/superadmin-global-audit-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `global-audit/global-audit_dtos/superadmin-global-audit-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `global-audit/global-audit_responses/superadmin-global-audit-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `global-audit/global-audit_services/superadmin-global-audit-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `global-audit/global-audit_services/superadmin-global-audit-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `global-audit/global-audit_services/superadmin-global-audit-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `global-audit/global-audit_services/superadmin-global-audit-investigation.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `global-audit/global-audit_services/superadmin-global-audit-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `global-audit/global-audit_services/superadmin-global-audit-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `global-audit/global-audit_types/superadmin-global-audit.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `global-audit/global-audit_types/superadmin-global-audit.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `global-audit/superadmin-global-audit-audit-logs-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `global-audit/superadmin-global-audit-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `global-audit/superadmin-global-audit-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `global-audit/superadmin-global-audit-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `global-audit/superadmin-global-audit-investigation-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `global-audit/superadmin-global-audit-investigation-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `global-audit/superadmin-global-audit-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `global-audit/superadmin-global-audit.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `global-audit/superadmin-global-audit.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `global-audit/superadmin-global-audit.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `global-audit/superadmin-global-audit.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `global-audit/superadmin-global-audit.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `global-audit/superadmin-global-audit.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `global-audit/superadmin-global-audit.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `gyms/gyms_dtos/superadmin-gyms-business-controls-bulk-action.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_dtos/superadmin-gyms-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_dtos/superadmin-gyms-owner-email.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_dtos/superadmin-gyms-provision.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_dtos/superadmin-gyms-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_dtos/superadmin-gyms-stats.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_dtos/superadmin-gyms-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_dtos/superadmin-gyms-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_repositories/superadmin-gyms-export-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `gyms/gyms_responses/superadmin-gyms-export-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_responses/superadmin-gyms-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/gyms_services/superadmin-gyms-bulk-action.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-business-controls.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-detail-business-overview.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-export-download-token.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-lookup.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-operational.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-provision.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_services/superadmin-gyms-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/gyms_types/superadmin-gyms.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `gyms/gyms_types/superadmin-gyms.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `gyms/gyms_workers/superadmin-gyms-export-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `gyms/superadmin-gyms-administration-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `gyms/superadmin-gyms-administration-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `gyms/superadmin-gyms-api.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `gyms/superadmin-gyms-business-controls-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/superadmin-gyms-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `gyms/superadmin-gyms-detail-business-overview-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `gyms/superadmin-gyms-detail-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `gyms/superadmin-gyms-detail-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `gyms/superadmin-gyms-export-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `gyms/superadmin-gyms-lookup.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `gyms/superadmin-gyms-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `gyms/superadmin-gyms.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `gyms/superadmin-gyms.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `gyms/superadmin-gyms.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `gyms/superadmin-gyms.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `gyms/superadmin-gyms.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `gyms/superadmin-gyms.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `gyms/superadmin-gyms.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `integrations/integrations_dtos/superadmin-integrations-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `integrations/integrations_dtos/superadmin-integrations-generate-key.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `integrations/integrations_dtos/superadmin-integrations-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `integrations/integrations_dtos/superadmin-integrations-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `integrations/integrations_dtos/superadmin-integrations-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `integrations/integrations_responses/superadmin-integrations-response-data.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `integrations/integrations_responses/superadmin-integrations-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `integrations/integrations_services/superadmin-integrations-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_services/superadmin-integrations-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_services/superadmin-integrations-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_services/superadmin-integrations-generate-key.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_services/superadmin-integrations-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_services/superadmin-integrations-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_services/superadmin-integrations-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_services/superadmin-integrations-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `integrations/integrations_types/superadmin-integrations.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `integrations/integrations_types/superadmin-integrations.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `integrations/superadmin-integrations-advanced-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `integrations/superadmin-integrations-advanced-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `integrations/superadmin-integrations-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `integrations/superadmin-integrations-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `integrations/superadmin-integrations-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `integrations/superadmin-integrations-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `integrations/superadmin-integrations.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `integrations/superadmin-integrations.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `integrations/superadmin-integrations.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `integrations/superadmin-integrations.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `integrations/superadmin-integrations.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `integrations/superadmin-integrations.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `integrations/superadmin-integrations.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `messaging/messaging_dtos/superadmin-messaging-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_dtos/superadmin-messaging-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_dtos/superadmin-messaging-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_dtos/superadmin-messaging-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_dtos/superadmin-messaging-whatsapp-campaign-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_responses/superadmin-messaging-notification-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_responses/superadmin-messaging-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_responses/superadmin-messaging-whatsapp-campaign-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/messaging_services/superadmin-messaging-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-export-completion.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-notification.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-template-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-whatsapp-bulk-center.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_services/superadmin-messaging-whatsapp-campaign.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `messaging/messaging_types/superadmin-messaging.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `messaging/messaging_types/superadmin-messaging.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `messaging/superadmin-messaging-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `messaging/superadmin-messaging-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `messaging/superadmin-messaging-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `messaging/superadmin-messaging-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `messaging/superadmin-messaging-notification.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `messaging/superadmin-messaging-notification.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `messaging/superadmin-messaging-notification.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `messaging/superadmin-messaging-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `messaging/superadmin-messaging-template-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/superadmin-messaging-whatsapp-bulk-center-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `messaging/superadmin-messaging-whatsapp-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `messaging/superadmin-messaging.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `messaging/superadmin-messaging.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `messaging/superadmin-messaging.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `messaging/superadmin-messaging.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `messaging/superadmin-messaging.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `messaging/superadmin-messaging.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `messaging/superadmin-messaging.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `profile/profile_dtos/superadmin-profile-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `profile/profile_dtos/superadmin-profile-password-change.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `profile/profile_dtos/superadmin-profile-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `profile/profile_dtos/superadmin-profile-two-factor.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `profile/profile_dtos/superadmin-profile-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `profile/profile_responses/superadmin-profile-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `profile/profile_services/superadmin-profile-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_services/superadmin-profile-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_services/superadmin-profile-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_services/superadmin-profile-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_services/superadmin-profile-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_services/superadmin-profile-password.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_services/superadmin-profile-two-factor.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_services/superadmin-profile-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `profile/profile_types/superadmin-profile.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `profile/profile_types/superadmin-profile.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `profile/superadmin-profile-advanced-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `profile/superadmin-profile-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `profile/superadmin-profile-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `profile/superadmin-profile-security-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `profile/superadmin-profile.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `profile/superadmin-profile.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `profile/superadmin-profile.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `profile/superadmin-profile.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `profile/superadmin-profile.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `profile/superadmin-profile.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `profile/superadmin-profile.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `reports/reports_dtos/superadmin-reports-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `reports/reports_dtos/superadmin-reports-data-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `reports/reports_dtos/superadmin-reports-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `reports/reports_dtos/superadmin-reports-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `reports/reports_responses/superadmin-reports-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `reports/reports_services/superadmin-reports-comparison.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_services/superadmin-reports-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_services/superadmin-reports-data.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_services/superadmin-reports-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_services/superadmin-reports-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_services/superadmin-reports-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_services/superadmin-reports-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_services/superadmin-reports-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `reports/reports_types/superadmin-reports.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `reports/reports_types/superadmin-reports.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `reports/superadmin-reports-analytics-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `reports/superadmin-reports-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `reports/superadmin-reports-comparison-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `reports/superadmin-reports-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `reports/superadmin-reports.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `reports/superadmin-reports.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `reports/superadmin-reports.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `reports/superadmin-reports.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `reports/superadmin-reports.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `reports/superadmin-reports.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `reports/superadmin-reports.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `saas-billing/coupons/coupons_dtos/superadmin-saas-billing-coupons-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/coupons/coupons_dtos/superadmin-saas-billing-coupons-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/coupons/coupons_dtos/superadmin-saas-billing-coupons-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/coupons/coupons_dtos/superadmin-saas-billing-coupons-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/coupons/coupons_responses/superadmin-saas-billing-coupons-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-redemptions.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-restore.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/coupons/coupons_types/superadmin-saas-billing-coupons.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/coupons/coupons_types/superadmin-saas-billing-coupons.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/coupons/superadmin-saas-billing-coupons-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/coupons/superadmin-saas-billing-coupons-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/coupons/superadmin-saas-billing-coupons-redemptions-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/coupons/superadmin-saas-billing-coupons-restore-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/coupons/superadmin-saas-billing-coupons.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/coupons/superadmin-saas-billing-coupons.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `saas-billing/coupons/superadmin-saas-billing-coupons.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `saas-billing/coupons/superadmin-saas-billing-coupons.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `saas-billing/coupons/superadmin-saas-billing-coupons.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `saas-billing/coupons/superadmin-saas-billing-coupons.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `saas-billing/coupons/superadmin-saas-billing-coupons.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `saas-billing/invoices/invoices_adapters/superadmin-saas-billing-invoices-email.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-export-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-manual-payment.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `saas-billing/invoices/invoices_responses/superadmin-saas-billing-invoices-resend-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_responses/superadmin-saas-billing-invoices-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-export.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-manual-payment.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-recovery-center.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-resend.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/invoices_types/superadmin-saas-billing-invoices.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/invoices/invoices_types/superadmin-saas-billing-invoices.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/invoices/invoices_workers/superadmin-saas-billing-invoices-resend-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-recovery-center-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-recovery-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-recovery-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/invoices/superadmin-saas-billing-invoices-resend-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `saas-billing/invoices/superadmin-saas-billing-invoices.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/invoices/superadmin-saas-billing-invoices.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `saas-billing/invoices/superadmin-saas-billing-invoices.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `saas-billing/invoices/superadmin-saas-billing-invoices.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `saas-billing/invoices/superadmin-saas-billing-invoices.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `saas-billing/invoices/superadmin-saas-billing-invoices.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `saas-billing/invoices/superadmin-saas-billing-invoices.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `saas-billing/plans/plans_dtos/superadmin-saas-billing-plans-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/plans/plans_dtos/superadmin-saas-billing-plans-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/plans/plans_dtos/superadmin-saas-billing-plans-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/plans/plans_responses/superadmin-saas-billing-plans-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/plans/plans_services/superadmin-saas-billing-plans-archive.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/plans/plans_services/superadmin-saas-billing-plans-business-controls.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/plans/plans_services/superadmin-saas-billing-plans-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/plans/plans_services/superadmin-saas-billing-plans-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/plans/plans_services/superadmin-saas-billing-plans-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/plans/plans_services/superadmin-saas-billing-plans-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/plans/plans_services/superadmin-saas-billing-plans-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `saas-billing/plans/plans_types/superadmin-saas-billing-plans.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/plans/plans_types/superadmin-saas-billing-plans.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/plans/superadmin-saas-billing-plans-api.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/plans/superadmin-saas-billing-plans-business-controls-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `saas-billing/plans/superadmin-saas-billing-plans-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/plans/superadmin-saas-billing-plans-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `saas-billing/plans/superadmin-saas-billing-plans-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `saas-billing/plans/superadmin-saas-billing-plans-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `saas-billing/plans/superadmin-saas-billing-plans.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `saas-billing/plans/superadmin-saas-billing-plans.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `saas-billing/plans/superadmin-saas-billing-plans.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `saas-billing/plans/superadmin-saas-billing-plans.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `saas-billing/plans/superadmin-saas-billing-plans.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `saas-billing/plans/superadmin-saas-billing-plans.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `saas-billing/plans/superadmin-saas-billing-plans.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `saas-billing/superadmin-saas-billing.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `settings/settings_dtos/superadmin-settings-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `settings/settings_dtos/superadmin-settings-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `settings/settings_dtos/superadmin-settings-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `settings/settings_responses/superadmin-settings-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `settings/settings_services/superadmin-settings-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `settings/settings_services/superadmin-settings-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `settings/settings_services/superadmin-settings-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `settings/settings_services/superadmin-settings-governance.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `settings/settings_services/superadmin-settings-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `settings/settings_services/superadmin-settings-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `settings/settings_types/superadmin-settings.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `settings/settings_types/superadmin-settings.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `settings/superadmin-settings-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `settings/superadmin-settings-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `settings/superadmin-settings-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `settings/superadmin-settings-governance-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `settings/superadmin-settings-governance-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `settings/superadmin-settings-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `settings/superadmin-settings.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `settings/superadmin-settings.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `settings/superadmin-settings.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `settings/superadmin-settings.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `settings/superadmin-settings.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `settings/superadmin-settings.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `settings/superadmin-settings.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/backups/backups_dtos/superadmin-system-ops-backups-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_dtos/superadmin-system-ops-backups-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_dtos/superadmin-system-ops-backups-schedule.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_dtos/superadmin-system-ops-backups-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_dtos/superadmin-system-ops-backups-trigger.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_dtos/superadmin-system-ops-backups-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_repositories/superadmin-system-ops-backup-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/backups/backups_responses/superadmin-system-ops-backups-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_responses/superadmin-system-ops-backups-queued-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_responses/superadmin-system-ops-backups-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-download.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-restore.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-schedule.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-trigger.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_services/superadmin-system-ops-backups-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/backups_types/superadmin-system-ops-backups.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/backups/backups_types/superadmin-system-ops-backups.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/backups/backups_workers/superadmin-system-ops-backups-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/backups/superadmin-system-ops-backup-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/backups/superadmin-system-ops-backups-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/backups/superadmin-system-ops-backups-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/backups/superadmin-system-ops-backups-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/backups/superadmin-system-ops-backups-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/backups/superadmin-system-ops-backups-operations-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/backups/superadmin-system-ops-backups-operations-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/backups/superadmin-system-ops-backups-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/backups/superadmin-system-ops-backups.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/backups/superadmin-system-ops-backups.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/backups/superadmin-system-ops-backups.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/backups/superadmin-system-ops-backups.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `system-ops/backups/superadmin-system-ops-backups.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `system-ops/backups/superadmin-system-ops-backups.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/backups/superadmin-system-ops-backups.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-flush-tenant.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/infrastructure/infrastructure_responses/superadmin-system-ops-infrastructure-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-api-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-global.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-tenant.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-redis.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-uptime.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/infrastructure/infrastructure_types/superadmin-system-ops-infrastructure.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/infrastructure/infrastructure_types/superadmin-system-ops-infrastructure.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure-api-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure-cache-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure-telemetry-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/infrastructure/superadmin-system-ops-infrastructure.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-bulk-action.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/jobs/jobs_responses/superadmin-system-ops-jobs-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-bulk-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-bulk-retry.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-cancel.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-clear-completed.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-queue-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-retry-all.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-retry.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_services/superadmin-system-ops-jobs-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/jobs/jobs_types/superadmin-system-ops-jobs.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/jobs/jobs_types/superadmin-system-ops-jobs.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/jobs/superadmin-system-ops-jobs-bulk-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/jobs/superadmin-system-ops-jobs-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/jobs/superadmin-system-ops-jobs-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/jobs/superadmin-system-ops-jobs-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/jobs/superadmin-system-ops-jobs-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/jobs/superadmin-system-ops-jobs-queue-health-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/jobs/superadmin-system-ops-jobs-queue-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/jobs/superadmin-system-ops-jobs.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/jobs/superadmin-system-ops-jobs.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/jobs/superadmin-system-ops-jobs.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/jobs/superadmin-system-ops-jobs.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `system-ops/jobs/superadmin-system-ops-jobs.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `system-ops/jobs/superadmin-system-ops-jobs.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/jobs/superadmin-system-ops-jobs.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/migrations/migrations_dtos/superadmin-system-ops-migrations-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/migrations/migrations_dtos/superadmin-system-ops-migrations-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/migrations/migrations_dtos/superadmin-system-ops-migrations-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/migrations/migrations_dtos/superadmin-system-ops-migrations-trigger.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/migrations/migrations_dtos/superadmin-system-ops-migrations-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/migrations/migrations_responses/superadmin-system-ops-migrations-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `system-ops/migrations/migrations_services/superadmin-system-ops-migrations-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/migrations/migrations_services/superadmin-system-ops-migrations-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/migrations/migrations_services/superadmin-system-ops-migrations-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/migrations/migrations_services/superadmin-system-ops-migrations-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/migrations/migrations_services/superadmin-system-ops-migrations-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/migrations/migrations_services/superadmin-system-ops-migrations-trigger.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/migrations/migrations_services/superadmin-system-ops-migrations-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/migrations/migrations_types/superadmin-system-ops-migrations.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/migrations/migrations_types/superadmin-system-ops-migrations.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/migrations/superadmin-system-ops-migrations-advanced-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/migrations/superadmin-system-ops-migrations-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/migrations/superadmin-system-ops-migrations-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/migrations/superadmin-system-ops-migrations.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/migrations/superadmin-system-ops-migrations.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/migrations/superadmin-system-ops-migrations.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/migrations/superadmin-system-ops-migrations.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `system-ops/migrations/superadmin-system-ops-migrations.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `system-ops/migrations/superadmin-system-ops-migrations.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/migrations/superadmin-system-ops-migrations.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `system-ops/superadmin-system-ops-container.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `system-ops/superadmin-system-ops-summary-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `system-ops/superadmin-system-ops.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/superadmin-system-ops.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `system-ops/superadmin-system-ops.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `system-ops/superadmin-system-ops.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops/system-ops_services/superadmin-system-ops-summary.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops/system-ops_types/superadmin-system-ops.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops/system-ops_types/superadmin-system-ops.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `team/superadmin-team-administration-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `team/superadmin-team-alerts-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `team/superadmin-team-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `team/superadmin-team-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `team/superadmin-team.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `team/superadmin-team.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `team/superadmin-team.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `team/superadmin-team.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `team/superadmin-team.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `team/superadmin-team.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `team/superadmin-team.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `team/team_dtos/superadmin-team-alert-action.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team/team_dtos/superadmin-team-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team/team_dtos/superadmin-team-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team/team_dtos/superadmin-team-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team/team_responses/superadmin-team-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team/team_services/superadmin-team-alerts.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team/team_services/superadmin-team-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team/team_services/superadmin-team-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team/team_services/superadmin-team-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team/team_services/superadmin-team-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team/team_services/superadmin-team-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team/team_services/superadmin-team-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team/team_types/superadmin-team.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `team/team_types/superadmin-team.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `tickets/superadmin-tickets-actions.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `tickets/superadmin-tickets-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `tickets/superadmin-tickets-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `tickets/superadmin-tickets-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `tickets/superadmin-tickets-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `tickets/superadmin-tickets-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `tickets/superadmin-tickets-service-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/superadmin-tickets.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `tickets/superadmin-tickets.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `tickets/superadmin-tickets.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `tickets/superadmin-tickets.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `tickets/superadmin-tickets.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `tickets/superadmin-tickets.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `tickets/superadmin-tickets.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `tickets/tickets_dtos/superadmin-tickets-assign.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/tickets_dtos/superadmin-tickets-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/tickets_dtos/superadmin-tickets-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/tickets_dtos/superadmin-tickets-reply.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/tickets_dtos/superadmin-tickets-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/tickets_dtos/superadmin-tickets-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/tickets_responses/superadmin-tickets-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets/tickets_services/superadmin-tickets-actions.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_services/superadmin-tickets-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_services/superadmin-tickets-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_services/superadmin-tickets-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_services/superadmin-tickets-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_services/superadmin-tickets-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_services/superadmin-tickets-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_services/superadmin-tickets-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets/tickets_types/superadmin-tickets.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `tickets/tickets_types/superadmin-tickets.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `usage-meters/superadmin-usage-meters-analytics-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `usage-meters/superadmin-usage-meters-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `usage-meters/superadmin-usage-meters-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `usage-meters/superadmin-usage-meters.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `usage-meters/superadmin-usage-meters.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `usage-meters/superadmin-usage-meters.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `usage-meters/superadmin-usage-meters.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `usage-meters/superadmin-usage-meters.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `usage-meters/superadmin-usage-meters.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `usage-meters/usage-meters_dtos/superadmin-usage-meters-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `usage-meters/usage-meters_dtos/superadmin-usage-meters-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `usage-meters/usage-meters_dtos/superadmin-usage-meters-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `usage-meters/usage-meters_responses/superadmin-usage-meters-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `usage-meters/usage-meters_services/superadmin-usage-meters-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `usage-meters/usage-meters_services/superadmin-usage-meters-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `usage-meters/usage-meters_services/superadmin-usage-meters-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `usage-meters/usage-meters_services/superadmin-usage-meters-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `usage-meters/usage-meters_services/superadmin-usage-meters-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `usage-meters/usage-meters_services/superadmin-usage-meters-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `usage-meters/usage-meters_types/superadmin-usage-meters.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `usage-meters/usage-meters_types/superadmin-usage-meters.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `white-labeling/superadmin-white-labeling-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `white-labeling/superadmin-white-labeling-domains-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `white-labeling/superadmin-white-labeling-domains-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `white-labeling/superadmin-white-labeling-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `white-labeling/superadmin-white-labeling.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `white-labeling/superadmin-white-labeling.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `white-labeling/superadmin-white-labeling.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `white-labeling/superadmin-white-labeling.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `white-labeling/superadmin-white-labeling.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `white-labeling/superadmin-white-labeling.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `white-labeling/superadmin-white-labeling.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `white-labeling/white-labeling_dtos/superadmin-white-labeling-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling/white-labeling_dtos/superadmin-white-labeling-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling/white-labeling_dtos/superadmin-white-labeling-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling/white-labeling_dtos/superadmin-white-labeling-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling/white-labeling_responses/superadmin-white-labeling-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling/white-labeling_services/superadmin-white-labeling-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling/white-labeling_services/superadmin-white-labeling-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling/white-labeling_services/superadmin-white-labeling-domains.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling/white-labeling_services/superadmin-white-labeling-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling/white-labeling_services/superadmin-white-labeling-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling/white-labeling_services/superadmin-white-labeling-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling/white-labeling_services/superadmin-white-labeling-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling/white-labeling_types/superadmin-white-labeling.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `white-labeling/white-labeling_types/superadmin-white-labeling.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-affiliates-command.controller.ts::create` | POST | `/superadmin/affiliates` | This endpoint invokes `create` on `superadmin-affiliates-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-affiliates-command.controller.ts::update` | PATCH | `/superadmin/affiliates/:id` | This endpoint invokes `update` on `superadmin-affiliates-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-affiliates-command.controller.ts::pay` | POST | `/superadmin/affiliates/:id/pay` | This endpoint invokes `pay` on `superadmin-affiliates-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-affiliates-command.controller.ts::remove` | DELETE | `/superadmin/affiliates/:id` | This endpoint invokes `remove` on `superadmin-affiliates-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-affiliates-command.controller.ts::changeStatus` | PATCH | `/superadmin/affiliates/:id/status` | This endpoint invokes `changeStatus` on `superadmin-affiliates-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-affiliates-query.controller.ts::payoutHistory` | GET | `/superadmin/affiliates/payout-history` | This endpoint invokes `payoutHistory` on `superadmin-affiliates-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminAffiliatePayoutRecordDto[]` |
| `superadmin-affiliates-query.controller.ts::findAll` | GET | `/superadmin/affiliates` | This endpoint invokes `findAll` on `superadmin-affiliates-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-affiliates-query.controller.ts::findOne` | GET | `/superadmin/affiliates/:id` | This endpoint invokes `findOne` on `superadmin-affiliates-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-analytics-command.controller.ts::create` | POST | `/superadmin/analytics` | This endpoint invokes `create` on `superadmin-analytics-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-analytics-command.controller.ts::update` | PATCH | `/superadmin/analytics/:id` | This endpoint invokes `update` on `superadmin-analytics-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-analytics-command.controller.ts::remove` | DELETE | `/superadmin/analytics/:id` | This endpoint invokes `remove` on `superadmin-analytics-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-analytics-insights-query.controller.ts::main` | GET | `/superadmin/analytics` | This endpoint invokes `main` on `superadmin-analytics-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-analytics-insights-query.controller.ts::retentionInsights` | GET | `/superadmin/analytics/retention-insights` | This endpoint invokes `retentionInsights` on `superadmin-analytics-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-analytics-insights-query.controller.ts::retentionInsights` | GET | `/api/superadmin/analytics/retention-insights` | This endpoint invokes `retentionInsights` on `superadmin-analytics-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-analytics-query.controller.ts::findOne` | GET | `/superadmin/analytics/:id` | This endpoint invokes `findOne` on `superadmin-analytics-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-auth.controller.ts::login` | POST | `/auth/login` | This endpoint invokes `login` on `superadmin-auth.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-auth.controller.ts::refresh` | POST | `/auth/refresh` | This endpoint invokes `refresh` on `superadmin-auth.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-auth.controller.ts::logout` | POST | `/auth/logout` | This endpoint invokes `logout` on `superadmin-auth.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-auth.controller.ts::setGhostLoginCookie` | POST | `/auth/set-cookie` | This endpoint invokes `setGhostLoginCookie` on `superadmin-auth.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-auth.controller.ts::exitGhostLogin` | POST | `/auth/exit-ghost-login` | This endpoint invokes `exitGhostLogin` on `superadmin-auth.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-audience-insights-query.controller.ts::audienceInsights` | GET | `/superadmin/broadcasts/audience-insights` | This endpoint invokes `audienceInsights` on `superadmin-broadcasts-audience-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-audience-insights-query.controller.ts::audienceInsights` | GET | `/api/superadmin/broadcasts/audience-insights` | This endpoint invokes `audienceInsights` on `superadmin-broadcasts-audience-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-command.controller.ts::create` | POST | `/superadmin/broadcasts` | This endpoint invokes `create` on `superadmin-broadcasts-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-command.controller.ts::update` | PATCH | `/superadmin/broadcasts/:id` | This endpoint invokes `update` on `superadmin-broadcasts-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-command.controller.ts::remove` | DELETE | `/superadmin/broadcasts/:id` | This endpoint invokes `remove` on `superadmin-broadcasts-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-command.controller.ts::changeStatus` | PATCH | `/superadmin/broadcasts/:id/status` | This endpoint invokes `changeStatus` on `superadmin-broadcasts-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-contract.controller.ts::recipientCount` | GET | `/superadmin/broadcasts/recipient-count` | This endpoint invokes `recipientCount` on `superadmin-broadcasts-contract.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<` |
| `superadmin-broadcasts-contract.controller.ts::deliver` | POST | `/superadmin/broadcasts/:broadcastId/deliveries/:recipientId` | This endpoint invokes `deliver` on `superadmin-broadcasts-contract.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-query.controller.ts::findAll` | GET | `/superadmin/broadcasts` | This endpoint invokes `findAll` on `superadmin-broadcasts-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-broadcasts-query.controller.ts::findOne` | GET | `/superadmin/broadcasts/:id` | This endpoint invokes `findOne` on `superadmin-broadcasts-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-compliance-command.controller.ts::create` | POST | `/superadmin/compliance` | This endpoint invokes `create` on `superadmin-compliance-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-compliance-command.controller.ts::update` | PATCH | `/superadmin/compliance/:id` | This endpoint invokes `update` on `superadmin-compliance-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-compliance-command.controller.ts::remove` | DELETE | `/superadmin/compliance/:id` | This endpoint invokes `remove` on `superadmin-compliance-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-compliance-overview-query.controller.ts::main` | GET | `/superadmin/compliance` | This endpoint invokes `main` on `superadmin-compliance-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-compliance-query.controller.ts::findOne` | GET | `/superadmin/compliance/:id` | This endpoint invokes `findOne` on `superadmin-compliance-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-command.controller.ts::create` | POST | `/superadmin/dashboard` | This endpoint invokes `create` on `superadmin-dashboard-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-command.controller.ts::update` | PATCH | `/superadmin/dashboard/:id` | This endpoint invokes `update` on `superadmin-dashboard-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-command.controller.ts::remove` | DELETE | `/superadmin/dashboard/:id` | This endpoint invokes `remove` on `superadmin-dashboard-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-overview-query.controller.ts::businessOverview` | GET | `/superadmin/dashboard/business-overview` | This endpoint invokes `businessOverview` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-overview-query.controller.ts::businessOverview` | GET | `/api/superadmin/dashboard/business-overview` | This endpoint invokes `businessOverview` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-overview-query.controller.ts::kpis` | GET | `/superadmin/dashboard/kpis` | This endpoint invokes `kpis` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-overview-query.controller.ts::kpis` | GET | `/superadmin/dashboard/metrics` | This endpoint invokes `kpis` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-overview-query.controller.ts::revenueChart` | GET | `/superadmin/dashboard/revenue-chart` | This endpoint invokes `revenueChart` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-overview-query.controller.ts::growthChart` | GET | `/superadmin/dashboard/growth-chart` | This endpoint invokes `growthChart` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-dashboard-overview-query.controller.ts::revenueByTier` | GET | `/superadmin/dashboard/revenue-by-tier` | This endpoint invokes `revenueByTier` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminDashboardRevenueByTierResponseDto[]` |
| `superadmin-dashboard-overview-query.controller.ts::revenueByGeography` | GET | `/superadmin/dashboard/revenue-by-geography` | This endpoint invokes `revenueByGeography` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminDashboardRevenueByGeographyResponseDto[]` |
| `superadmin-dashboard-overview-query.controller.ts::recentOnboards` | GET | `/superadmin/dashboard/recent-onboards` | This endpoint invokes `recentOnboards` on `superadmin-dashboard-overview-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminDashboardRecentOnboardsResponseDto[]` |
| `superadmin-dashboard-query.controller.ts::findOne` | GET | `/superadmin/dashboard/:id` | This endpoint invokes `findOne` on `superadmin-dashboard-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-export-data.controller.ts::start` | POST | `/api/superadmin/export-data` | This endpoint invokes `start` on `superadmin-export-data.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-export-data.controller.ts::status` | GET | `/api/superadmin/export-data/:jobId` | This endpoint invokes `status` on `superadmin-export-data.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-export-data.controller.ts::download` | GET | `/api/superadmin/export-data/download/:jobId/:token` | This endpoint invokes `download` on `superadmin-export-data.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-command.controller.ts::createFlag` | POST | `/superadmin/features/flags` | This endpoint invokes `createFlag` on `superadmin-features-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-command.controller.ts::updateFlag` | PATCH | `/superadmin/features/flags/:id` | This endpoint invokes `updateFlag` on `superadmin-features-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-command.controller.ts::toggleFlag` | POST | `/superadmin/features/flags/:id/toggle` | This endpoint invokes `toggleFlag` on `superadmin-features-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-command.controller.ts::deleteFlag` | DELETE | `/superadmin/features/flags/:id` | This endpoint invokes `deleteFlag` on `superadmin-features-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-query.controller.ts::history` | GET | `/superadmin/features/flags/:id/history` | This endpoint invokes `history` on `superadmin-features-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-query.controller.ts::findOne` | GET | `/superadmin/features/:id` | This endpoint invokes `findOne` on `superadmin-features-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-release-note-command.controller.ts::createReleaseNote` | POST | `/superadmin/features/notes` | This endpoint invokes `createReleaseNote` on `superadmin-features-release-note-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-release-note-command.controller.ts::updateReleaseNote` | PATCH | `/superadmin/features/notes/:id` | This endpoint invokes `updateReleaseNote` on `superadmin-features-release-note-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-release-note-command.controller.ts::deleteReleaseNote` | DELETE | `/superadmin/features/notes/:id` | This endpoint invokes `deleteReleaseNote` on `superadmin-features-release-note-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-features-rollout-insights-query.controller.ts::findFeaturesRolloutInsights` | GET | `/superadmin/features/rollout-insights` | This endpoint invokes `findFeaturesRolloutInsights` on `superadmin-features-rollout-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminFeaturesRolloutInsightsResponseDto` |
| `superadmin-features-rollout-insights-query.controller.ts::findFeaturesRolloutInsights` | GET | `/api/superadmin/features/rollout-insights` | This endpoint invokes `findFeaturesRolloutInsights` on `superadmin-features-rollout-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminFeaturesRolloutInsightsResponseDto` |
| `superadmin-features-rollout-insights-query.controller.ts::findFeaturesData` | GET | `/superadmin/features` | This endpoint invokes `findFeaturesData` on `superadmin-features-rollout-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminFeaturesResponseDataDto` |
| `superadmin-global-audit-audit-logs-query.controller.ts::list` | GET | `/superadmin/audit-logs` | This endpoint invokes `list` on `superadmin-global-audit-audit-logs-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-command.controller.ts::create` | POST | `/superadmin/global-audit` | This endpoint invokes `create` on `superadmin-global-audit-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-command.controller.ts::update` | PATCH | `/superadmin/global-audit/:id` | This endpoint invokes `update` on `superadmin-global-audit-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-command.controller.ts::remove` | DELETE | `/superadmin/global-audit/:id` | This endpoint invokes `remove` on `superadmin-global-audit-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-investigation-query.controller.ts::investigation` | GET | `/superadmin/global-audit/investigation` | This endpoint invokes `investigation` on `superadmin-global-audit-investigation-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-investigation-query.controller.ts::investigation` | GET | `/api/superadmin/global-audit/investigation` | This endpoint invokes `investigation` on `superadmin-global-audit-investigation-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-investigation-query.controller.ts::investigation` | GET | `/superadmin/audit-logs/investigation` | This endpoint invokes `investigation` on `superadmin-global-audit-investigation-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-query.controller.ts::findAll` | GET | `/superadmin/global-audit` | This endpoint invokes `findAll` on `superadmin-global-audit-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-global-audit-query.controller.ts::findOne` | GET | `/superadmin/global-audit/:id` | This endpoint invokes `findOne` on `superadmin-global-audit-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-command.controller.ts::bulkAction` | POST | `/superadmin/gyms/business-controls` | This endpoint invokes `bulkAction` on `superadmin-gyms-administration-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-command.controller.ts::bulkAction` | POST | `/api/superadmin/gyms/business-controls` | This endpoint invokes `bulkAction` on `superadmin-gyms-administration-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-command.controller.ts::emailOwner` | POST | `/superadmin/gyms/:id/email` | This endpoint invokes `emailOwner` on `superadmin-gyms-administration-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-command.controller.ts::impersonate` | POST | `/superadmin/gyms/:id/impersonate` | This endpoint invokes `impersonate` on `superadmin-gyms-administration-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-query.controller.ts::businessControls` | GET | `/superadmin/gyms/business-controls` | This endpoint invokes `businessControls` on `superadmin-gyms-administration-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-query.controller.ts::businessControls` | GET | `/api/superadmin/gyms/business-controls` | This endpoint invokes `businessControls` on `superadmin-gyms-administration-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-query.controller.ts::stats` | GET | `/superadmin/gyms/stats` | This endpoint invokes `stats` on `superadmin-gyms-administration-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<` |
| `superadmin-gyms-administration-query.controller.ts::detailBusinessOverview` | GET | `/superadmin/gym-detail/business-overview` | This endpoint invokes `detailBusinessOverview` on `superadmin-gyms-administration-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-administration-query.controller.ts::detailBusinessOverview` | GET | `/api/superadmin/gym-detail/business-overview` | This endpoint invokes `detailBusinessOverview` on `superadmin-gyms-administration-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::findAll` | GET | `/api/gyms` | This endpoint invokes `findAll` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::stats` | GET | `/api/gyms/stats` | This endpoint invokes `stats` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<` |
| `superadmin-gyms-api.controller.ts::export` | POST | `/api/gyms/export` | This endpoint invokes `export` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::exportStatus` | GET | `/api/gyms/export/:jobId` | This endpoint invokes `exportStatus` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::exportDownload` | GET | `/api/gyms/export/:jobId/download` | This endpoint invokes `exportDownload` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::provision` | POST | `/api/gyms/provision` | This endpoint invokes `provision` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::findOne` | GET | `/api/gyms/:id` | This endpoint invokes `findOne` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::create` | POST | `/api/gyms` | This endpoint invokes `create` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::update` | PATCH | `/api/gyms/:id` | This endpoint invokes `update` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::changeStatus` | PATCH | `/api/gyms/:id/status` | This endpoint invokes `changeStatus` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::remove` | DELETE | `/api/gyms/:id` | This endpoint invokes `remove` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::emailOwner` | POST | `/api/gyms/:id/email` | This endpoint invokes `emailOwner` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-api.controller.ts::impersonate` | POST | `/api/gyms/:id/impersonate` | This endpoint invokes `impersonate` on `superadmin-gyms-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-command.controller.ts::create` | POST | `/superadmin/gyms` | This endpoint invokes `create` on `superadmin-gyms-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-command.controller.ts::provision` | POST | `/superadmin/gyms/provision` | This endpoint invokes `provision` on `superadmin-gyms-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-command.controller.ts::update` | PATCH | `/superadmin/gyms/:id` | This endpoint invokes `update` on `superadmin-gyms-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-command.controller.ts::remove` | DELETE | `/superadmin/gyms/:id` | This endpoint invokes `remove` on `superadmin-gyms-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-command.controller.ts::changeStatus` | PATCH | `/superadmin/gyms/:id/status` | This endpoint invokes `changeStatus` on `superadmin-gyms-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-lookup.controller.ts::findGymsLookup` | GET | `/gyms` | This endpoint invokes `findGymsLookup` on `superadmin-gyms-lookup.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminGymsLookupItem[]` |
| `superadmin-gyms-query.controller.ts::findAll` | GET | `/superadmin/gyms` | This endpoint invokes `findAll` on `superadmin-gyms-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-gyms-query.controller.ts::export` | GET | `/superadmin/gyms/export` | This endpoint invokes `export` on `superadmin-gyms-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<` |
| `superadmin-gyms-query.controller.ts::findOne` | GET | `/superadmin/gyms/:id` | This endpoint invokes `findOne` on `superadmin-gyms-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-advanced-command.controller.ts::generateKey` | POST | `/superadmin/integrations/keys` | This endpoint invokes `generateKey` on `superadmin-integrations-advanced-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-advanced-command.controller.ts::generateKey` | POST | `/api/superadmin/integrations/generate-key` | This endpoint invokes `generateKey` on `superadmin-integrations-advanced-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-advanced-query.controller.ts::main` | GET | `/superadmin/integrations` | This endpoint invokes `main` on `superadmin-integrations-advanced-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-command.controller.ts::create` | POST | `/superadmin/integrations` | This endpoint invokes `create` on `superadmin-integrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-command.controller.ts::update` | PATCH | `/superadmin/integrations/:id` | This endpoint invokes `update` on `superadmin-integrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-command.controller.ts::remove` | DELETE | `/superadmin/integrations/:id` | This endpoint invokes `remove` on `superadmin-integrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-command.controller.ts::changeStatus` | PATCH | `/superadmin/integrations/:id/status` | This endpoint invokes `changeStatus` on `superadmin-integrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-integrations-query.controller.ts::findOne` | GET | `/superadmin/integrations/:id` | This endpoint invokes `findOne` on `superadmin-integrations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-command.controller.ts::create` | POST | `/superadmin/messaging` | This endpoint invokes `create` on `superadmin-messaging-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-command.controller.ts::createMessage` | POST | `/superadmin/messaging/messages` | This endpoint invokes `createMessage` on `superadmin-messaging-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-command.controller.ts::update` | PATCH | `/superadmin/messaging/:id` | This endpoint invokes `update` on `superadmin-messaging-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-command.controller.ts::remove` | DELETE | `/superadmin/messaging/:id` | This endpoint invokes `remove` on `superadmin-messaging-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-command.controller.ts::changeStatus` | PATCH | `/superadmin/messaging/:id/status` | This endpoint invokes `changeStatus` on `superadmin-messaging-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-insights-query.controller.ts::templateInsights` | GET | `/superadmin/messaging/template-insights` | This endpoint invokes `templateInsights` on `superadmin-messaging-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-insights-query.controller.ts::templateInsights` | GET | `/api/superadmin/messaging/template-insights` | This endpoint invokes `templateInsights` on `superadmin-messaging-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-insights-query.controller.ts::whatsappBulkCenter` | GET | `/superadmin/messaging/whatsapp/bulk-center` | This endpoint invokes `whatsappBulkCenter` on `superadmin-messaging-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-notification.controller.ts::list` | GET | `/superadmin/messaging/notifications` | This endpoint invokes `list` on `superadmin-messaging-notification.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<SuperadminMessagingNotificationResponseDto[]` |
| `superadmin-messaging-notification.controller.ts::markAllRead` | PATCH | `/superadmin/messaging/notifications/read-all` | This endpoint invokes `markAllRead` on `superadmin-messaging-notification.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<null` |
| `superadmin-messaging-notification.controller.ts::markRead` | PATCH | `/superadmin/messaging/notifications/:id/read` | This endpoint invokes `markRead` on `superadmin-messaging-notification.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-query.controller.ts::findAll` | GET | `/superadmin/messaging` | This endpoint invokes `findAll` on `superadmin-messaging-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-query.controller.ts::findTenants` | GET | `/superadmin/messaging/tenants` | This endpoint invokes `findTenants` on `superadmin-messaging-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<Array<` |
| `superadmin-messaging-query.controller.ts::findMessages` | GET | `/superadmin/messaging/messages` | This endpoint invokes `findMessages` on `superadmin-messaging-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-query.controller.ts::findOne` | GET | `/superadmin/messaging/:id` | This endpoint invokes `findOne` on `superadmin-messaging-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-messaging-whatsapp-command.controller.ts::whatsappCampaign` | POST | `/superadmin/messaging/whatsapp/campaigns` | This endpoint invokes `whatsappCampaign` on `superadmin-messaging-whatsapp-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-advanced-query.controller.ts::main` | GET | `/superadmin/profile` | This endpoint invokes `main` on `superadmin-profile-advanced-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-command.controller.ts::create` | POST | `/superadmin/profile` | This endpoint invokes `create` on `superadmin-profile-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-command.controller.ts::update` | PATCH | `/superadmin/profile/:id` | This endpoint invokes `update` on `superadmin-profile-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-command.controller.ts::remove` | DELETE | `/superadmin/profile/:id` | This endpoint invokes `remove` on `superadmin-profile-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-query.controller.ts::findOne` | GET | `/superadmin/profile/:id` | This endpoint invokes `findOne` on `superadmin-profile-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-security-command.controller.ts::update` | PATCH | `/superadmin/profile` | This endpoint invokes `update` on `superadmin-profile-security-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-security-command.controller.ts::password` | PATCH | `/superadmin/profile/password` | This endpoint invokes `password` on `superadmin-profile-security-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-profile-security-command.controller.ts::twoFactor` | PATCH | `/superadmin/profile/2fa` | This endpoint invokes `twoFactor` on `superadmin-profile-security-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-analytics-query.controller.ts::main` | GET | `/superadmin/reports` | This endpoint invokes `main` on `superadmin-reports-analytics-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-analytics-query.controller.ts::comparison` | GET | `/superadmin/reports/comparison` | This endpoint invokes `comparison` on `superadmin-reports-analytics-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-analytics-query.controller.ts::comparison` | GET | `/api/superadmin/reports/comparison` | This endpoint invokes `comparison` on `superadmin-reports-analytics-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-command.controller.ts::create` | POST | `/superadmin/reports` | This endpoint invokes `create` on `superadmin-reports-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-command.controller.ts::update` | PATCH | `/superadmin/reports/:id` | This endpoint invokes `update` on `superadmin-reports-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-command.controller.ts::remove` | DELETE | `/superadmin/reports/:id` | This endpoint invokes `remove` on `superadmin-reports-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-query.controller.ts::revenue` | GET | `/superadmin/reports/revenue` | This endpoint invokes `revenue` on `superadmin-reports-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-query.controller.ts::cancellations` | GET | `/superadmin/reports/cancellations` | This endpoint invokes `cancellations` on `superadmin-reports-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-query.controller.ts::health` | GET | `/superadmin/reports/health` | This endpoint invokes `health` on `superadmin-reports-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-reports-query.controller.ts::findOne` | GET | `/superadmin/reports/:id` | This endpoint invokes `findOne` on `superadmin-reports-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-command.controller.ts::create` | POST | `/superadmin/saas-billing/coupons` | This endpoint invokes `create` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-command.controller.ts::update` | PATCH | `/superadmin/saas-billing/coupons/:id` | This endpoint invokes `update` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-command.controller.ts::remove` | DELETE | `/superadmin/saas-billing/coupons/:id` | This endpoint invokes `remove` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-command.controller.ts::changeStatus` | PATCH | `/superadmin/saas-billing/coupons/:id/status` | This endpoint invokes `changeStatus` on `superadmin-saas-billing-coupons-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-query.controller.ts::findAll` | GET | `/superadmin/saas-billing/coupons` | This endpoint invokes `findAll` on `superadmin-saas-billing-coupons-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-query.controller.ts::findOne` | GET | `/superadmin/saas-billing/coupons/:id` | This endpoint invokes `findOne` on `superadmin-saas-billing-coupons-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-redemptions-query.controller.ts::redemptions` | GET | `/superadmin/saas-billing/coupons/:id/redemptions` | This endpoint invokes `redemptions` on `superadmin-saas-billing-coupons-redemptions-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-coupons-restore-command.controller.ts::restore` | POST | `/superadmin/saas-billing/coupons/:id/restore` | This endpoint invokes `restore` on `superadmin-saas-billing-coupons-restore-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-command.controller.ts::create` | POST | `/superadmin/saas-billing/invoices` | This endpoint invokes `create` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-command.controller.ts::update` | PATCH | `/superadmin/saas-billing/invoices/:id` | This endpoint invokes `update` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-command.controller.ts::remove` | DELETE | `/superadmin/saas-billing/invoices/:id` | This endpoint invokes `remove` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-command.controller.ts::changeStatus` | PATCH | `/superadmin/saas-billing/invoices/:id/status` | This endpoint invokes `changeStatus` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::findAll` | GET | `/superadmin/saas-billing/invoices` | This endpoint invokes `findAll` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::export` | GET | `/superadmin/saas-billing/invoices/export` | This endpoint invokes `export` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::download` | GET | `/superadmin/saas-billing/invoices/:id/download` | This endpoint invokes `download` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::findOne` | GET | `/superadmin/saas-billing/invoices/:id` | This endpoint invokes `findOne` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-command.controller.ts::manualPayment` | POST | `/superadmin/saas-billing/invoices/manual-payment` | This endpoint invokes `manualPayment` on `superadmin-saas-billing-invoices-recovery-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-command.controller.ts::resend` | POST | `/superadmin/saas-billing/invoices/:id/resend` | This endpoint invokes `resend` on `superadmin-saas-billing-invoices-recovery-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::recoveryCenter` | GET | `/superadmin/saas-billing/invoices/recovery-center` | This endpoint invokes `recoveryCenter` on `superadmin-saas-billing-invoices-recovery-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::recoveryCenter` | GET | `/api/superadmin/saas-billing/invoices/recovery-center` | This endpoint invokes `recoveryCenter` on `superadmin-saas-billing-invoices-recovery-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::resendJobStatus` | GET | `/superadmin/saas-billing/invoices/resend-jobs/:jobId` | This endpoint invokes `resendJobStatus` on `superadmin-saas-billing-invoices-recovery-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-api.controller.ts::businessControls` | GET | `/api/superadmin/saas-billing/plans/business-controls` | This endpoint invokes `businessControls` on `superadmin-saas-billing-plans-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::create` | POST | `/superadmin/saas-billing/plans` | This endpoint invokes `create` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::update` | PATCH | `/superadmin/saas-billing/plans/:id` | This endpoint invokes `update` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::remove` | DELETE | `/superadmin/saas-billing/plans/:id` | This endpoint invokes `remove` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::archive` | PATCH | `/superadmin/saas-billing/plans/:id/archive` | This endpoint invokes `archive` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::findAll` | GET | `/superadmin/saas-billing/plans` | This endpoint invokes `findAll` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::businessControls` | GET | `/superadmin/saas-billing/plans/business-controls` | This endpoint invokes `businessControls` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::businessControls` | GET | `/superadmin/saas-billing/plans/api/superadmin/saas-billing/plans/business-controls` | This endpoint invokes `businessControls` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::findOne` | GET | `/superadmin/saas-billing/plans/:id` | This endpoint invokes `findOne` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-settings-command.controller.ts::create` | POST | `/superadmin/settings` | This endpoint invokes `create` on `superadmin-settings-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-settings-command.controller.ts::update` | PATCH | `/superadmin/settings/:id` | This endpoint invokes `update` on `superadmin-settings-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-settings-command.controller.ts::remove` | DELETE | `/superadmin/settings/:id` | This endpoint invokes `remove` on `superadmin-settings-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-settings-governance-query.controller.ts::governance` | GET | `/superadmin/settings/governance` | This endpoint invokes `governance` on `superadmin-settings-governance-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-settings-governance-query.controller.ts::governance` | GET | `/api/superadmin/settings/governance` | This endpoint invokes `governance` on `superadmin-settings-governance-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-settings-query.controller.ts::findAll` | GET | `/superadmin/settings` | This endpoint invokes `findAll` on `superadmin-settings-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-settings-query.controller.ts::findOne` | GET | `/superadmin/settings/:id` | This endpoint invokes `findOne` on `superadmin-settings-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-command.controller.ts::create` | POST | `/superadmin/system-ops/backups` | This endpoint invokes `create` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-command.controller.ts::update` | PATCH | `/superadmin/system-ops/backups/:id` | This endpoint invokes `update` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/backups/:id` | This endpoint invokes `remove` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/backups/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-command.controller.ts::patchSchedule` | PATCH | `/superadmin/system-ops/backups/schedule` | This endpoint invokes `patchSchedule` on `superadmin-system-ops-backups-operations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-command.controller.ts::trigger` | POST | `/superadmin/system-ops/backups/trigger` | This endpoint invokes `trigger` on `superadmin-system-ops-backups-operations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-command.controller.ts::restore` | POST | `/superadmin/system-ops/backups/:id/restore` | This endpoint invokes `restore` on `superadmin-system-ops-backups-operations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::schedule` | GET | `/superadmin/system-ops/backups/schedule` | This endpoint invokes `schedule` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::health` | GET | `/superadmin/system-ops/backups/health` | This endpoint invokes `health` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::health` | GET | `/api/superadmin/system-ops/backups/health` | This endpoint invokes `health` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::jobStatus` | GET | `/superadmin/system-ops/backups/jobs/:jobId` | This endpoint invokes `jobStatus` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::download` | GET | `/superadmin/system-ops/backups/:id/download` | This endpoint invokes `download` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::downloadFile` | GET | `/superadmin/system-ops/backups/:id/download/file` | This endpoint invokes `downloadFile` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-query.controller.ts::findAll` | GET | `/superadmin/system-ops/backups` | This endpoint invokes `findAll` on `superadmin-system-ops-backups-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-query.controller.ts::findOne` | GET | `/superadmin/system-ops/backups/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-backups-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-cache-command.controller.ts::flushGlobal` | POST | `/superadmin/system-ops/infrastructure/redis/flush-global` | This endpoint invokes `flushGlobal` on `superadmin-system-ops-infrastructure-cache-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-infrastructure-cache-command.controller.ts::flushTenant` | POST | `/superadmin/system-ops/infrastructure/redis/flush-tenant` | This endpoint invokes `flushTenant` on `superadmin-system-ops-infrastructure-cache-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::create` | POST | `/superadmin/system-ops/infrastructure` | This endpoint invokes `create` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::update` | PATCH | `/superadmin/system-ops/infrastructure/:id` | This endpoint invokes `update` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/infrastructure/:id` | This endpoint invokes `remove` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/infrastructure/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-query.controller.ts::findAll` | GET | `/superadmin/system-ops/infrastructure` | This endpoint invokes `findAll` on `superadmin-system-ops-infrastructure-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-query.controller.ts::findOne` | GET | `/superadmin/system-ops/infrastructure/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-infrastructure-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::redis` | GET | `/superadmin/system-ops/infrastructure/redis` | This endpoint invokes `redis` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::uptime` | GET | `/superadmin/system-ops/infrastructure/uptime` | This endpoint invokes `uptime` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::uptime` | GET | `/superadmin/system-ops/infrastructure/uptime-history` | This endpoint invokes `uptime` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::apiHealth` | GET | `/superadmin/system-ops/infrastructure/api-health` | This endpoint invokes `apiHealth` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::apiHealth` | GET | `/api/superadmin/system-ops/infrastructure/api-health` | This endpoint invokes `apiHealth` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::retryAll` | POST | `/superadmin/system-ops/jobs/retry-all` | This endpoint invokes `retryAll` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::retry` | POST | `/superadmin/system-ops/jobs/:id/retry` | This endpoint invokes `retry` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::cancel` | POST | `/superadmin/system-ops/jobs/:id/cancel` | This endpoint invokes `cancel` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::clearCompleted` | POST | `/superadmin/system-ops/jobs/clear-completed` | This endpoint invokes `clearCompleted` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::bulkRetry` | POST | `/superadmin/system-ops/jobs/bulk-retry` | This endpoint invokes `bulkRetry` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::bulkDelete` | POST | `/superadmin/system-ops/jobs/bulk-delete` | This endpoint invokes `bulkDelete` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::create` | POST | `/superadmin/system-ops/jobs` | This endpoint invokes `create` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::update` | PATCH | `/superadmin/system-ops/jobs/:id` | This endpoint invokes `update` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/jobs/:id` | This endpoint invokes `remove` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/jobs/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-query.controller.ts::findAll` | GET | `/superadmin/system-ops/jobs` | This endpoint invokes `findAll` on `superadmin-system-ops-jobs-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-query.controller.ts::findOne` | GET | `/superadmin/system-ops/jobs/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-jobs-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-queue-health-query.controller.ts::queueHealth` | GET | `/superadmin/system-ops/jobs/queue-health` | This endpoint invokes `queueHealth` on `superadmin-system-ops-jobs-queue-health-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-queue-health-query.controller.ts::queueHealth` | GET | `/api/superadmin/system-ops/jobs/queue-health` | This endpoint invokes `queueHealth` on `superadmin-system-ops-jobs-queue-health-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-advanced-command.controller.ts::trigger` | POST | `/superadmin/system-ops/migrations/trigger` | This endpoint invokes `trigger` on `superadmin-system-ops-migrations-advanced-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::create` | POST | `/superadmin/system-ops/migrations` | This endpoint invokes `create` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::update` | PATCH | `/superadmin/system-ops/migrations/:id` | This endpoint invokes `update` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/migrations/:id` | This endpoint invokes `remove` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/migrations/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-query.controller.ts::findAll` | GET | `/superadmin/system-ops/migrations` | This endpoint invokes `findAll` on `superadmin-system-ops-migrations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-query.controller.ts::findOne` | GET | `/superadmin/system-ops/migrations/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-migrations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-summary-query.controller.ts::findSystemOpsSummary` | GET | `/superadmin/system-ops/summary` | This endpoint invokes `findSystemOpsSummary` on `superadmin-system-ops-summary-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-summary-query.controller.ts::findSystemOpsSummary` | GET | `/api/superadmin/system-ops/summary` | This endpoint invokes `findSystemOpsSummary` on `superadmin-system-ops-summary-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-team-administration-query.controller.ts::main` | GET | `/superadmin/team` | This endpoint invokes `main` on `superadmin-team-administration-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-team-alerts-command.controller.ts::alerts` | PATCH | `/superadmin/team/alerts` | This endpoint invokes `alerts` on `superadmin-team-alerts-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-team-command.controller.ts::create` | POST | `/superadmin/team` | This endpoint invokes `create` on `superadmin-team-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-team-command.controller.ts::update` | PATCH | `/superadmin/team/:id` | This endpoint invokes `update` on `superadmin-team-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-team-command.controller.ts::remove` | DELETE | `/superadmin/team/:id` | This endpoint invokes `remove` on `superadmin-team-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-team-query.controller.ts::findOne` | GET | `/superadmin/team/:id` | This endpoint invokes `findOne` on `superadmin-team-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-actions.controller.ts::close` | POST | `/superadmin/tickets/:id/close` | This endpoint invokes `close` on `superadmin-tickets-actions.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-actions.controller.ts::assign` | POST | `/superadmin/tickets/:id/assign` | This endpoint invokes `assign` on `superadmin-tickets-actions.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-actions.controller.ts::reply` | POST | `/superadmin/tickets/:id/reply` | This endpoint invokes `reply` on `superadmin-tickets-actions.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-command.controller.ts::create` | POST | `/superadmin/tickets` | This endpoint invokes `create` on `superadmin-tickets-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-command.controller.ts::update` | PATCH | `/superadmin/tickets/:id` | This endpoint invokes `update` on `superadmin-tickets-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-command.controller.ts::remove` | DELETE | `/superadmin/tickets/:id` | This endpoint invokes `remove` on `superadmin-tickets-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-command.controller.ts::changeStatus` | PATCH | `/superadmin/tickets/:id/status` | This endpoint invokes `changeStatus` on `superadmin-tickets-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-insights-query.controller.ts::insights` | GET | `/superadmin/tickets/service-insights` | This endpoint invokes `insights` on `superadmin-tickets-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-insights-query.controller.ts::insights` | GET | `/api/superadmin/tickets/service-insights` | This endpoint invokes `insights` on `superadmin-tickets-insights-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-query.controller.ts::findAll` | GET | `/superadmin/tickets` | This endpoint invokes `findAll` on `superadmin-tickets-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-tickets-query.controller.ts::findOne` | GET | `/superadmin/tickets/:id` | This endpoint invokes `findOne` on `superadmin-tickets-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-usage-meters-analytics-query.controller.ts::main` | GET | `/superadmin/usage-meters` | This endpoint invokes `main` on `superadmin-usage-meters-analytics-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-usage-meters-analytics-query.controller.ts::main` | GET | `/api/superadmin/usage-meters` | This endpoint invokes `main` on `superadmin-usage-meters-analytics-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-usage-meters-command.controller.ts::create` | POST | `/superadmin/usage-meters` | This endpoint invokes `create` on `superadmin-usage-meters-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-usage-meters-command.controller.ts::update` | PATCH | `/superadmin/usage-meters/:id` | This endpoint invokes `update` on `superadmin-usage-meters-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-usage-meters-command.controller.ts::remove` | DELETE | `/superadmin/usage-meters/:id` | This endpoint invokes `remove` on `superadmin-usage-meters-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-usage-meters-query.controller.ts::findOne` | GET | `/superadmin/usage-meters/:id` | This endpoint invokes `findOne` on `superadmin-usage-meters-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-command.controller.ts::create` | POST | `/superadmin/white-labeling` | This endpoint invokes `create` on `superadmin-white-labeling-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-command.controller.ts::update` | PATCH | `/superadmin/white-labeling/:id` | This endpoint invokes `update` on `superadmin-white-labeling-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-command.controller.ts::remove` | DELETE | `/superadmin/white-labeling/:id` | This endpoint invokes `remove` on `superadmin-white-labeling-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-command.controller.ts::changeStatus` | PATCH | `/superadmin/white-labeling/:id/status` | This endpoint invokes `changeStatus` on `superadmin-white-labeling-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-domains-command.controller.ts::status` | PATCH | `/superadmin/white-labeling/domains/:id/status` | This endpoint invokes `status` on `superadmin-white-labeling-domains-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-domains-command.controller.ts::status` | PATCH | `/api/superadmin/white-labeling/domains/:id/status` | This endpoint invokes `status` on `superadmin-white-labeling-domains-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-domains-query.controller.ts::domains` | GET | `/superadmin/white-labeling/domains` | This endpoint invokes `domains` on `superadmin-white-labeling-domains-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-domains-query.controller.ts::domains` | GET | `/api/superadmin/white-labeling/domains` | This endpoint invokes `domains` on `superadmin-white-labeling-domains-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-query.controller.ts::findAll` | GET | `/superadmin/white-labeling` | This endpoint invokes `findAll` on `superadmin-white-labeling-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-white-labeling-query.controller.ts::findOne` | GET | `/superadmin/white-labeling/:id` | This endpoint invokes `findOne` on `superadmin-white-labeling-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: affiliates, analytics, auth, broadcasts, compliance, dashboard, export-data, features, global-audit, gyms, integrations, messaging, profile, reports, saas-billing, settings, system-ops, team, tickets, usage-meters, white-labeling
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_config, superadmin_core_database, superadmin_core_events, superadmin_core_external, superadmin_core_jobs, superadmin_core_observability, superadmin_core_pagination, superadmin_core_realtime, superadmin_core_security, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-affiliates.entity → `superadmin_affiliates`, superadmin-analytics.entity → `superadmin_analytics_snapshots`, superadmin-broadcasts-contract-snapshot.entity → `superadmin_broadcasts_contract_snapshots`, superadmin-broadcasts.entity → `superadmin_broadcasts`, superadmin-compliance-document.entity → `superadmin_compliance_documents`, superadmin-compliance.entity → `superadmin_compliance_snapshots`, superadmin-dashboard.entity → `superadmin_dashboard_snapshots`, superadmin-export-data-job.entity → `superadmin_export_jobs`, superadmin-features-contract-snapshot.entity → `superadmin_features_contract_snapshots`, superadmin-features-release-note.entity → `superadmin_feature_release_notes`, superadmin-features.entity → `superadmin_feature_flags`, superadmin-global-audit-contract-snapshot.entity → `superadmin_global_audit_contract_snapshots`, superadmin-global-audit.entity → `audit_logs`, superadmin-gyms-detail-contract-snapshot.entity → `superadmin_gym_detail_contract_snapshots`, superadmin-gyms-export-job.entity → `superadmin_gyms_export_jobs`, superadmin-gyms.entity → `tenants`, superadmin-integrations-contract-snapshot.entity → `superadmin_integrations_contract_snapshots`, superadmin-integrations.entity → `superadmin_integration_keys`, superadmin-messaging-contract-snapshot.entity → `superadmin_messaging_contract_snapshots`, superadmin-messaging-notification.entity → `superadmin_notifications`, superadmin-messaging.entity → `superadmin_tenant_messages`, superadmin-profile.entity → `superadmin_profiles`, superadmin-reports.entity → `superadmin_report_snapshots`, superadmin-saas-billing-coupons.entity → `superadmin_coupons`, superadmin-saas-billing-invoices-contract-snapshot.entity → `superadmin_invoices_contract_snapshots`, superadmin-saas-billing-invoices-resend-job.entity → `superadmin_saas_invoice_resend_jobs`, superadmin-saas-billing-invoices.entity → `superadmin_saas_invoices`, superadmin-saas-billing-plans-contract-snapshot.entity → `superadmin_plans_contract_snapshots`, superadmin-saas-billing-plans.entity → `superadmin_subscription_plans`, superadmin-settings-contract-snapshot.entity → `superadmin_settings_contract_snapshots`, superadmin-settings.entity → `superadmin_platform_settings`, superadmin-system-ops-backup-job.entity → `superadmin_backup_jobs`, superadmin-system-ops-backups-contract-snapshot.entity → `superadmin_backups_contract_snapshots`, superadmin-system-ops-backups-schedule-contract-snapshot.entity → `superadmin_backup_schedule_contract_snapshots`, superadmin-system-ops-backups.entity → `superadmin_backup_records`, superadmin-system-ops-infrastructure-contract-snapshot.entity → `superadmin_infrastructure_contract_snapshots`, superadmin-system-ops-infrastructure.entity → `superadmin_infrastructure_nodes`, superadmin-system-ops-jobs-contract-snapshot.entity → `superadmin_jobs_contract_snapshots`, superadmin-system-ops-jobs.entity → `superadmin_background_jobs`, superadmin-system-ops-migrations.entity → `superadmin_migration_logs`, superadmin-system-ops.entity → `superadmin_system_ops_snapshots`, superadmin-team.entity → `superadmin_team_snapshots`, superadmin-tickets-contract-snapshot.entity → `superadmin_tickets_contract_snapshots`, superadmin-tickets.entity → `superadmin_support_tickets`, superadmin-usage-meters.entity → `superadmin_usage_meters`, superadmin-white-labeling.entity → `superadmin_white_label_domains`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: SUPERADMIN.EXPORT.COMPLETED
- Background Jobs: gyms/superadmin-gyms-export-job.entity.ts, export-data/superadmin-export-data-job.constants.ts, export-data/superadmin-export-data-job.entity.ts, saas-billing/invoices/superadmin-saas-billing-invoices-resend-job.entity.ts, saas-billing/invoices/invoices_responses/superadmin-saas-billing-invoices-resend-job-status-response.dto.ts, saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository.ts, export-data/export-data_repositories/superadmin-export-data-job.repository.ts, system-ops/backups/superadmin-system-ops-backup-job.entity.ts, system-ops/jobs/superadmin-system-ops-jobs-query.controller.ts, system-ops/jobs/superadmin-system-ops-jobs.constants.ts, system-ops/jobs/superadmin-system-ops-jobs.repository.ts, system-ops/jobs/superadmin-system-ops-jobs-command.controller.ts, system-ops/jobs/superadmin-system-ops-jobs.module.ts, system-ops/jobs/superadmin-system-ops-jobs-bulk-command.controller.ts, system-ops/jobs/superadmin-system-ops-jobs-queue-health-response.dto.ts, system-ops/jobs/superadmin-system-ops-jobs.seeder.ts, system-ops/jobs/superadmin-system-ops-jobs-queue-health-query.controller.ts, system-ops/jobs/superadmin-system-ops-jobs-contract-snapshot.repository.ts, system-ops/jobs/superadmin-system-ops-jobs.entity.ts, system-ops/jobs/superadmin-system-ops-jobs-contract-snapshot.entity.ts, system-ops/jobs/superadmin-system-ops-jobs.mapper.ts, system-ops/jobs/superadmin-system-ops-jobs.exceptions.ts, system-ops/jobs/jobs_types/superadmin-system-ops-jobs.interfaces.ts, system-ops/jobs/jobs_types/superadmin-system-ops-jobs.enums.ts, system-ops/jobs/jobs_responses/superadmin-system-ops-jobs-response.dto.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-bulk-retry.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-bulk-delete.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-find.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-update.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-retry.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-create.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-queue-health.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-status.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-retry-all.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-cancel.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-clear-completed.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-delete.service.ts, system-ops/jobs/jobs_services/superadmin-system-ops-jobs-list.service.ts, system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-status.dto.ts, system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-bulk-action.dto.ts, system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-query.dto.ts, system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-create.dto.ts, system-ops/jobs/jobs_dtos/superadmin-system-ops-jobs-update.dto.ts, system-ops/backups/backups_repositories/superadmin-system-ops-backup-job.repository.ts, system-ops/backups/backups_responses/superadmin-system-ops-backups-job-status-response.dto.ts, gyms/gyms_responses/superadmin-gyms-export-job-status-response.dto.ts, gyms/gyms_repositories/superadmin-gyms-export-job.repository.ts
- Idempotency Keys: `/api/gyms`, `/api/gyms/:id`, `/api/gyms/:id/email`, `/api/gyms/:id/impersonate`, `/api/gyms/:id/status`, `/api/gyms/export`, `/api/gyms/provision`, `/api/superadmin/export-data`, `/api/superadmin/gyms/business-controls`, `/api/superadmin/integrations/generate-key`, `/api/superadmin/white-labeling/domains/:id/status`, `/auth/exit-ghost-login`, `/auth/login`, `/auth/logout`, `/auth/refresh`, `/auth/set-cookie`, `/superadmin/affiliates`, `/superadmin/affiliates/:id`, `/superadmin/affiliates/:id/pay`, `/superadmin/affiliates/:id/status`, `/superadmin/analytics`, `/superadmin/analytics/:id`, `/superadmin/broadcasts`, `/superadmin/broadcasts/:broadcastId/deliveries/:recipientId`, `/superadmin/broadcasts/:id`, `/superadmin/broadcasts/:id/status`, `/superadmin/compliance`, `/superadmin/compliance/:id`, `/superadmin/dashboard`, `/superadmin/dashboard/:id`, `/superadmin/features/flags`, `/superadmin/features/flags/:id`, `/superadmin/features/flags/:id/toggle`, `/superadmin/features/notes`, `/superadmin/features/notes/:id`, `/superadmin/global-audit`, `/superadmin/global-audit/:id`, `/superadmin/gyms`, `/superadmin/gyms/:id`, `/superadmin/gyms/:id/email`, `/superadmin/gyms/:id/impersonate`, `/superadmin/gyms/:id/status`, `/superadmin/gyms/business-controls`, `/superadmin/gyms/provision`, `/superadmin/integrations`, `/superadmin/integrations/:id`, `/superadmin/integrations/:id/status`, `/superadmin/integrations/keys`, `/superadmin/messaging`, `/superadmin/messaging/:id`, `/superadmin/messaging/:id/status`, `/superadmin/messaging/messages`, `/superadmin/messaging/notifications/:id/read`, `/superadmin/messaging/notifications/read-all`, `/superadmin/messaging/whatsapp/campaigns`, `/superadmin/profile`, `/superadmin/profile/2fa`, `/superadmin/profile/:id`, `/superadmin/profile/password`, `/superadmin/reports`, `/superadmin/reports/:id`, `/superadmin/saas-billing/coupons`, `/superadmin/saas-billing/coupons/:id`, `/superadmin/saas-billing/coupons/:id/restore`, `/superadmin/saas-billing/coupons/:id/status`, `/superadmin/saas-billing/invoices`, `/superadmin/saas-billing/invoices/:id`, `/superadmin/saas-billing/invoices/:id/resend`, `/superadmin/saas-billing/invoices/:id/status`, `/superadmin/saas-billing/invoices/manual-payment`, `/superadmin/saas-billing/plans`, `/superadmin/saas-billing/plans/:id`, `/superadmin/saas-billing/plans/:id/archive`, `/superadmin/settings`, `/superadmin/settings/:id`, `/superadmin/system-ops/backups`, `/superadmin/system-ops/backups/:id`, `/superadmin/system-ops/backups/:id/restore`, `/superadmin/system-ops/backups/:id/status`, `/superadmin/system-ops/backups/schedule`, `/superadmin/system-ops/backups/trigger`, `/superadmin/system-ops/infrastructure`, `/superadmin/system-ops/infrastructure/:id`, `/superadmin/system-ops/infrastructure/:id/status`, `/superadmin/system-ops/infrastructure/redis/flush-global`, `/superadmin/system-ops/infrastructure/redis/flush-tenant`, `/superadmin/system-ops/jobs`, `/superadmin/system-ops/jobs/:id`, `/superadmin/system-ops/jobs/:id/cancel`, `/superadmin/system-ops/jobs/:id/retry`, `/superadmin/system-ops/jobs/:id/status`, `/superadmin/system-ops/jobs/bulk-delete`, `/superadmin/system-ops/jobs/bulk-retry`, `/superadmin/system-ops/jobs/clear-completed`, `/superadmin/system-ops/jobs/retry-all`, `/superadmin/system-ops/migrations`, `/superadmin/system-ops/migrations/:id`, `/superadmin/system-ops/migrations/:id/status`, `/superadmin/system-ops/migrations/trigger`, `/superadmin/team`, `/superadmin/team/:id`, `/superadmin/team/alerts`, `/superadmin/tickets`, `/superadmin/tickets/:id`, `/superadmin/tickets/:id/assign`, `/superadmin/tickets/:id/close`, `/superadmin/tickets/:id/reply`, `/superadmin/tickets/:id/status`, `/superadmin/usage-meters`, `/superadmin/usage-meters/:id`, `/superadmin/white-labeling`, `/superadmin/white-labeling/:id`, `/superadmin/white-labeling/:id/status`, `/superadmin/white-labeling/domains/:id/status`

## Business Flow / Key Sequences
1. Application imports `BackendSuperadminModule`.
2. The container registers CoreModule, AuthModule, HealthModule and isolated Superadmin feature modules.
3. Feature controllers receive requests and delegate to their own DTO/service/repository graph.
4. Global infrastructure applies authentication, validation, idempotency, audit and response handling.

## File Responsibility Map
- `backend-superadmin.module.ts` — module composition only; MUST NOT contain feature business logic.
- `core/` — framework-level infrastructure only.
- `modules/backend_superadmin/<feature>/` — business feature implementation and localized documentation.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/affiliates` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/affiliates/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/affiliates/:id/pay` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/affiliates/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/affiliates/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/affiliates/payout-history` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/affiliates` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/affiliates/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/analytics` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/analytics/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/analytics/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/analytics` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/analytics/retention-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/analytics/retention-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/analytics/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/login` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/refresh` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/logout` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/set-cookie` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /auth/exit-ghost-login` | `NOT_DECLARED_IN_CONTROLLER` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/broadcasts/audience-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/broadcasts/audience-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/broadcasts` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/broadcasts/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/broadcasts/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/broadcasts/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/broadcasts/recipient-count` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/broadcasts/:broadcastId/deliveries/:recipientId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/broadcasts` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/broadcasts/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/compliance` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/compliance/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/compliance/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/compliance` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/compliance/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/dashboard` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/dashboard/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/dashboard/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/dashboard/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/kpis` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/metrics` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/revenue-chart` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/growth-chart` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/revenue-by-tier` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/revenue-by-geography` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/recent-onboards` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/dashboard/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/superadmin/export-data` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/export-data/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/export-data/download/:jobId/:token` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/features/flags` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/features/flags/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/features/flags/:id/toggle` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/features/flags/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features/flags/:id/history` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/features/notes` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/features/notes/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/features/notes/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features/rollout-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/features/rollout-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/audit-logs` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/global-audit` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/global-audit/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/global-audit/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/global-audit/investigation` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/global-audit/investigation` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/audit-logs/investigation` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/global-audit` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/global-audit/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms/:id/email` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms/:id/impersonate` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/gyms/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/stats` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gym-detail/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/gym-detail/business-overview` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/stats` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/export` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/export/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/export/:jobId/download` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/provision` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /api/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /api/gyms/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /api/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/:id/email` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/gyms/:id/impersonate` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/gyms/provision` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/gyms/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/export` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/gyms/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/integrations/keys` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /api/superadmin/integrations/generate-key` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/integrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/integrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/integrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/integrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/integrations/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/integrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/messaging` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/messaging/messages` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/messaging/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/template-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/messaging/template-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/whatsapp/bulk-center` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/notifications` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/notifications/read-all` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/messaging/notifications/:id/read` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/tenants` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/messages` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/messaging/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/messaging/whatsapp/campaigns` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/profile` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/profile` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/profile/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/profile/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/profile/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/profile` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/profile/password` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/profile/2fa` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/reports` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/reports/comparison` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/reports/comparison` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/reports` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/reports/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/reports/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/reports/revenue` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/reports/cancellations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/reports/health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/reports/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/coupons` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/coupons/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons/:id/redemptions` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/coupons/:id/restore` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/invoices` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/invoices/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/invoices/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/invoices/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/export` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/:id/download` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/invoices/manual-payment` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/invoices/:id/resend` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/recovery-center` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/saas-billing/invoices/recovery-center` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/resend-jobs/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/plans` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/plans/:id/archive` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/api/superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/settings` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/settings/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/settings/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/settings/governance` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/settings/governance` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/settings` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/settings/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/backups` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/backups/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/backups/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/backups/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/backups/schedule` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/backups/trigger` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/backups/:id/restore` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/schedule` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/backups/health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/jobs/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/:id/download` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/:id/download/file` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure/redis/flush-global` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure/redis/flush-tenant` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/infrastructure/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/redis` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/uptime` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/uptime-history` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/api-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/infrastructure/api-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/retry-all` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/:id/retry` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/:id/cancel` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/clear-completed` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/bulk-retry` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/bulk-delete` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/jobs/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/jobs/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/jobs/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/jobs` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/jobs/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/jobs/queue-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/jobs/queue-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/migrations/trigger` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/migrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/migrations/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/migrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/summary` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/summary` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/team` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/team/alerts` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/team` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/team/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/team/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/team/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/tickets/:id/close` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/tickets/:id/assign` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/tickets/:id/reply` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/tickets` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/tickets/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/tickets/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/tickets/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/tickets/service-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/tickets/service-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/tickets` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/tickets/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/usage-meters` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/usage-meters` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/usage-meters` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/usage-meters/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/usage-meters/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/usage-meters/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/white-labeling` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/white-labeling/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/white-labeling/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/white-labeling/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/white-labeling/domains/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /api/superadmin/white-labeling/domains/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/white-labeling/domains` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/white-labeling/domains` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/white-labeling` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/white-labeling/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Do not use the role/domain container as an AI repair boundary — see Rules 0A-0C.
- Do not create a domain-level shared business utility folder — see Rule 8C.
- Do not add direct sibling business imports; use declared events for runtime coupling — see Rule 49.

## Frozen API Contract
Each child feature owns its frozen API contract in its feature documentation. No domain-level API contract should override a child feature contract.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
No dedicated frontend UI Data Requirements section was supplied for this module. The frozen Stage 1 requirement IDs remain the authoritative frontend-derived evidence; no additional fields are invented here.

### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [ ] Rule 0A: Feature module remains the AI repair unit.
- [ ] Rule 0D: `backend_` role/domain namespace is used.
- [ ] Rule 19: Feature documentation is synchronized in the same commit as feature changes.
