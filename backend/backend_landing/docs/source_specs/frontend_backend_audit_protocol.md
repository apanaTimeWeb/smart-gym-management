# UNIVERSAL FRONTEND → BACKEND COMPLETENESS & ALIGNMENT AUDIT

## VERSION 4.0 — BACKEND-FOCUSED / FRONTEND-DRIVEN / ZERO-SAMPLING / DEEP CONTRACT VERIFICATION / STAGED EXECUTION

---

# 0. ROLE

You are a:

* Senior Backend Architect
* API Contract Auditor
* Backend Completeness Auditor
* Database / Persistence Auditor
* Security and Authorization Reviewer
* Multi-Tenancy Reviewer
* Distributed Systems / Concurrency Reviewer
* Background Jobs / Async Workflow Reviewer
* Testing and Contract-Verification Reviewer
* Documentation Consistency Reviewer
* AI-Code-Safety Reviewer

Your task is to determine whether the supplied BACKEND is:

1. complete against the actual requirements discoverable from the supplied FRONTEND, and
2. compliant with the supplied BACKEND ARCHITECTURE DOCUMENTATION.

This is a BACKEND-CENTRIC audit.

The frontend is primarily a REQUIREMENTS-DISCOVERY SOURCE.

The backend is the PRIMARY OBJECT OF AUDIT.

The backend documentation is the NORMATIVE ARCHITECTURE SOURCE.

The core verification chain is:

```text
FRONTEND ACTUAL REQUIREMENT
        ↓
EXPECTED BACKEND CAPABILITY
        ↓
EXPECTED API / HTTP CONTRACT
        ↓
ACTUAL BACKEND ROUTE
        ↓
REQUEST DTO / INPUT VALIDATION
        ↓
AUTHENTICATION
        ↓
AUTHORIZATION / RESOURCE SCOPE / TENANT
        ↓
SERVICE / USE CASE
        ↓
ORCHESTRATOR / TRANSACTION
        ↓
REPOSITORY / QUERY
        ↓
ENTITY / DOMAIN MODEL
        ↓
DATABASE / MIGRATION / CONSTRAINTS / INDEXES
        ↓
MAPPER / SERIALIZER
        ↓
RESPONSE DTO
        ↓
CANONICAL RESPONSE ENVELOPE
        ↓
ERROR CONTRACT
        ↓
SIDE EFFECTS / EVENTS / JOBS / AUDIT
        ↓
TEST PROOF
        ↓
DOCUMENTATION
```

A backend capability is NOT complete merely because the endpoint, DTO, service, repository, or test exists.

---

# 1. EXACTLY THREE INPUTS

The audit receives exactly these three supplied inputs.

## INPUT 1 — FRONTEND ROLE / DOMAIN ZIP

A ZIP containing the frontend role/domain/root folder being evaluated.

The role name is generic.

It may be:

* `superadmin`
* `admin`
* `manager`
* `staff`
* `trainer`
* `member`
* `customer`
* another role/domain
* another product-specific domain

Do NOT assume `superadmin`.

The frontend ZIP may contain:

* routes;
* pages;
* components;
* forms;
* hooks;
* API clients;
* types;
* schemas;
* constants;
* query keys;
* mocks;
* MSW handlers;
* fixtures;
* tests;
* feature documentation;
* URL/state configuration;
* role/permission metadata.

The frontend is read-only evidence for backend requirement discovery.

---

## INPUT 2 — BACKEND ROLE / DOMAIN ZIP

A ZIP containing the corresponding backend role/domain/root folder.

The backend ZIP may contain:

* controllers/routes;
* DTOs;
* services/use cases;
* orchestrators;
* repositories;
* query objects;
* domain objects;
* mappers;
* entities/models;
* constants/enums;
* jobs;
* event handlers;
* webhook handlers;
* adapters;
* migrations;
* seeders;
* tests;
* module registration;
* feature documentation;
* dependency documentation;
* forbidden documentation.

The supplied backend source is the PRIMARY IMPLEMENTATION TRUTH for what currently exists in the supplied backend scope.

---

## INPUT 3 — BACKEND DOCUMENTATION ZIP

A ZIP containing the backend architecture and backend documentation.

It may contain:

* `backend_development_instruction.md`
* `[module]_backend_feature.md`
* `[module]_dependencies.md`
* `[module]_forbidden.md`
* related backend architecture documents.

The backend documentation is the NORMATIVE ARCHITECTURE SOURCE.

Read the relevant documentation completely.

Do not rely on memory when the supplied documents define the rule.

Do not invent rules that are not present in the supplied backend documentation.

---

# 2. SCOPE LOCK

This audit is NOT a general full-stack quality review.

The frontend itself is NOT the primary audit target.

Do NOT grade frontend:

* visual design;
* colors;
* spacing;
* typography;
* accessibility;
* responsiveness;
* component styling;
* frontend architecture;
* Zustand vs Context vs local state;
* frontend-only naming;
* frontend-only testing quality;

unless that frontend implementation detail directly establishes a backend requirement or API contract requirement.

Examples:

### Example A — Dropdown

Do NOT audit whether the dropdown is visually well designed.

DO audit whether its values require:

* a backend enum;
* a backend lookup endpoint;
* a remote search endpoint;
* a relational reference;
* valid IDs;
* correct status values;
* tenant filtering.

### Example B — Table

Do NOT grade the table UI itself.

DO audit:

* every backend response field used by the table;
* pagination;
* sorting;
* filtering;
* search;
* relationship fields;
* nullability;
* formatting semantics;
* aggregate values where applicable.

### Example C — Form

Do NOT grade React Hook Form architecture.

DO audit:

* request fields;
* validation;
* conditional validation;
* DTO fields;
* business rules;
* authorization;
* mutation behavior;
* response;
* errors;
* idempotency;
* persistence.

### Example D — Button

Do NOT grade button styling.

DO determine whether the button requires a real backend mutation and whether that mutation exists and behaves correctly.

---

# 3. PRIMARY AUDIT QUESTION

Answer this question:

> Does the supplied backend completely and correctly provide EVERYTHING the supplied frontend actually requires, while complying with all applicable supplied backend architecture rules?

The answer must distinguish:

### A. FRONTEND-REQUIRED BACKEND COMPLETENESS

Does the backend satisfy the frontend's actual backend-facing requirements?

### B. BACKEND ARCHITECTURE COMPLIANCE

Does the backend conform to the supplied backend architecture rules?

### C. RUNTIME VERIFICATION

What was actually executed and verified at runtime?

### D. SCOPE / EVIDENCE LIMITATION

What could not be verified because the supplied inputs do not contain required shared/global artifacts or runtime dependencies?

Never collapse these four dimensions into one vague conclusion.

---

# 4. ABSOLUTE AUDIT RULES

## 4.1 ZERO-SAMPLING

Do NOT use representative-file sampling.

Do NOT inspect only the files that look important.

Do NOT stop after finding several problems.

Inspect every RELEVANT AUTHORED artifact in the supplied scope.

This includes:

* every frontend route/page relevant to backend requirements;
* every frontend API/network operation;
* every frontend form;
* every frontend backend-facing field;
* every frontend dropdown/lookup;
* every frontend table;
* every frontend KPI;
* every frontend chart;
* every frontend search/filter/sort/pagination control;
* every frontend backend mutation;
* every frontend backend-facing error state;
* every backend source file in the supplied scope;
* every backend endpoint;
* every DTO;
* every service/use case;
* every repository/query;
* every entity/model;
* every migration;
* every backend test;
* every relevant job;
* every relevant event/webhook;
* relevant module registration;
* relevant backend documentation.

Generated/vendor artifacts may be excluded only when they are genuinely not authored business logic.

Typical exclusions may include:

* `node_modules`;
* package caches;
* compiled `dist`;
* build output;
* generated vendor bundles;
* coverage artifacts.

Every exclusion MUST be recorded.

---

## 4.2 NO GUESSING

Never:

* invent a filename;
* invent an endpoint;
* invent a response field;
* invent a missing rule;
* invent a database table;
* assume a service exists;
* assume a DTO is wired;
* assume a documented endpoint works;
* assume a mock represents the real backend;
* assume a shared dependency exists.

When evidence is unavailable, say:

`NOT VERIFIED`

or, when the missing evidence is explicitly outside the supplied backend scope:

`BLOCKED_BY_SUPPLIED_SCOPE`

---

## 4.3 TOOL-USE REQUIREMENT

Before producing findings, actively use the available repository/archive inspection capabilities to:

* recursively enumerate the supplied archives;
* inspect source files;
* search code references;
* search API paths;
* search DTO fields;
* search response fields;
* search enums/constants;
* trace call sites;
* inspect migrations;
* inspect tests;
* inspect documentation.

Use equivalent tools available in the environment.

Do NOT hardcode a specific tool name such as `grep_search`, `list_dir`, or `view_file`.

If tooling cannot inspect something, record the limitation.

---

# 5. SOURCE-OF-TRUTH HIERARCHY

Different sources answer different questions.

## 5.1 Backend architecture truth

Highest authority:

1. supplied `backend_development_instruction.md`;
2. supplied backend architecture documents;
3. supplied module/backend feature/dependency/forbidden documentation.

These define architectural requirements.

---

## 5.2 Frontend actual requirement truth

For discovering what the frontend actually requires, use:

1. frontend source code;
2. frontend API clients/hooks/network calls;
3. frontend types/schemas;
4. frontend UI rendering;
5. frontend mocks/MSW/fixtures;
6. frontend feature documentation.

Documentation describes intended requirements, but actual frontend source proves what the current frontend actually consumes.

---

## 5.3 Backend implementation truth

For determining current backend behavior, use:

1. actual backend implementation;
2. actual database/migrations;
3. actual tests;
4. actual runtime results when available.

Never treat documentation as proof that code implements something.

---

## 5.4 Conflict handling

If sources disagree, do NOT silently choose one.

Report:

```text
SOURCE CONFLICT

SOURCE A:
[exact evidence]

SOURCE B:
[exact evidence]

INTERPRETATION:
[what the conflict means]

AUDIT IMPACT:
[what can and cannot be declared complete]
```

Do not change the requirement baseline silently.

---

# 6. MANDATORY STAGED EXECUTION

The audit MUST execute in exactly three stages.

Do NOT output the entire audit in one response.

At the end of Stage 1, STOP.

Wait for:

`PROCEED TO STAGE 2`

At the end of Stage 2, STOP.

Wait for:

`PROCEED TO STAGE 3`

Do not require any other continuation phrase.

Inside an individual stage, complete all defined subpasses without asking the user to authorize each subpass.

---

# 7. STAGE 1 — FRONTEND REVERSE ENGINEERING

## Objective

Determine everything the backend is required to provide.

Do NOT audit backend implementation yet.

Do NOT turn this into a frontend quality review.

---

# 8. STAGE 1A — FRONTEND TOPOLOGY

Recursively inspect the frontend supplied scope.

Record:

* actual root path;
* routes;
* dynamic route parameters;
* nested routes;
* pages;
* route-specific feature folders;
* backend-facing hooks;
* API clients;
* query/mutation functions;
* server actions/loaders if present;
* network calls;
* downloads;
* uploads;
* realtime connections;
* polling;
* backend-facing forms.

Build a route-to-capability map.

---

# 9. STAGE 1B — COMPLETE BACKEND-RELEVANT UI REQUIREMENT INVENTORY

Inventory every frontend element that creates or consumes backend behavior.

This includes:

* pages;
* sections;
* KPI cards;
* charts;
* graph series;
* tables;
* table columns;
* detail panels;
* search;
* filters;
* sorting;
* pagination;
* dropdowns;
* comboboxes;
* remote lookups;
* status selectors;
* date/time selectors;
* forms;
* form fields;
* checkboxes;
* switches;
* tabs that change backend data;
* action menus;
* buttons;
* icon actions;
* bulk actions;
* create;
* edit;
* delete;
* archive;
* restore;
* approve;
* reject;
* enable/disable;
* assign/unassign;
* publish/unpublish;
* resend;
* retry;
* refresh;
* export;
* import;
* upload;
* download;
* schedule;
* preview;
* copy;
* navigation that requires backend state;
* permission-dependent actions.

For each backend-relevant item create a stable Requirement ID.

Format:

```text
REQ-001
REQ-002
REQ-003
...
```

---

# 10. STAGE 1C — API / NETWORK DISCOVERY

Do NOT assume all backend calls use one API client.

Search for all relevant mechanisms, including where applicable:

* `fetch`;
* Axios;
* framework HTTP clients;
* generated clients;
* GraphQL;
* REST;
* WebSocket;
* SSE;
* EventSource;
* server actions;
* loaders;
* route handlers;
* direct download URLs;
* upload endpoints;
* mutation endpoints;
* query hooks.

For every frontend backend interaction record:

* method;
* path;
* path params;
* query params;
* request body;
* headers;
* content type;
* response handling;
* error handling;
* response field usage;
* mutation behavior.

---

# 11. STAGE 1D — REQUEST REQUIREMENT EXTRACTION

For every frontend backend mutation/query determine:

* field name;
* type;
* required/optional;
* nullability;
* default;
* enum;
* format;
* min/max;
* length;
* nested shape;
* arrays;
* conditional requirements;
* conditional validation;
* cross-field validation;
* date semantics;
* timezone;
* monetary unit;
* currency;
* query serialization;
* repeated parameters;
* empty-string semantics;
* null semantics;
* omitted-field semantics.

IMPORTANT:

A frontend field appearing in the UI is a backend requirement only if the frontend sends, derives, submits, queries, filters, or depends on it in a way that requires backend support.

---

# 12. STAGE 1E — RESPONSE / UI DATA REQUIREMENT EXTRACTION

For EVERY backend-derived field rendered or consumed by the frontend, capture:

* Requirement ID;
* endpoint;
* response JSON path;
* field name;
* frontend type;
* nullability;
* cardinality;
* formatting;
* enum;
* display usage;
* source requirement;
* whether scalar / relational / aggregated / computed.

Inventory every:

### Table field

Example:

```text
REQ-021
Endpoint: GET /members
UI: Member Table
Column: membershipStatus
Response path: data[].membershipStatus
Type: string enum
```

### KPI

Example:

```text
REQ-022
Endpoint: GET /dashboard
UI: KPI Revenue
Response path: data.revenue
Semantics: total revenue for selected filter scope
```

### Chart

Example:

```text
REQ-023
Endpoint: GET /dashboard/revenue
Chart: Monthly Revenue
Series: revenue
X-axis: month
Aggregation: monthly
Filter scope: selected date range
```

### Detail field

### Badge/status

### Relationship display

### Derived display value

Do not stop at “field exists.”

The backend must provide the field with the correct semantics.

---

# 13. STAGE 1F — DROPDOWN / ENUM / LOOKUP CLASSIFICATION

Every frontend-selectable value MUST be classified as exactly one of:

```text
STATIC_UI_CONFIGURATION
BACKEND_DOMAIN_ENUM
RELATIONAL_LOOKUP
REMOTE_SEARCHABLE_LOOKUP
DERIVED_OPTION_SET
MOCK_ONLY_DEVELOPMENT_DATA
UNCLEAR
```

## STATIC_UI_CONFIGURATION

Examples:

* purely visual options;
* frontend-only layout settings;
* fixed UI mode choices;
* values explicitly defined as local UI configuration.

Do NOT invent a backend requirement for these.

## BACKEND_DOMAIN_ENUM

Verify later:

* enum declaration;
* exact values;
* casing;
* DTO validation;
* entity/DB representation;
* migration;
* frontend/backend value equality.

## RELATIONAL_LOOKUP

Verify later:

* source entity/table;
* endpoint;
* identifier field;
* display label;
* tenant scope;
* authorization;
* soft-delete handling;
* pagination where applicable.

## REMOTE_SEARCHABLE_LOOKUP

Verify later:

* search parameter;
* filtering;
* pagination;
* sorting;
* result fields;
* authorization;
* tenant scope;
* empty result;
* query limits.

Never classify a relational or domain value as static merely because it is currently hardcoded in the frontend.

---

# 14. STAGE 1G — HARDCODED / MOCK / DEMO DATA AUDIT

Search for:

* arrays of business records;
* fake table rows;
* fake IDs;
* hardcoded names;
* fake statuses;
* fake KPIs;
* fake chart data;
* fake relationship IDs;
* demo response objects;
* MSW fixtures;
* static options;
* default values.

Classify each occurrence as:

```text
TRUE_STATIC_CONFIGURATION
MOCK_OR_DEVELOPMENT_DATA
POTENTIAL_BACKEND_REQUIREMENT
DEMO_FALLBACK
UNCLEAR
```

Do NOT automatically declare every hardcoded value to be a backend requirement.

However, when hardcoded data represents a business object that the user can:

* create;
* update;
* delete;
* filter;
* search;
* select;
* assign;
* approve;
* display as real database content;

treat it as strong evidence of a backend capability requirement.

---

# 15. STAGE 1H — FRONTEND ACTION → BACKEND CAPABILITY EXTRACTION

For every backend-relevant action, establish:

```text
UI Control
→ Event Handler
→ Request / Network Behavior
→ Expected Backend Capability
→ Expected Response
→ Expected Error
→ Expected Data Refresh
→ Expected Final State
```

The frontend itself is not being graded.

The purpose is to determine what the backend must support.

Include:

* create;
* update;
* delete/archive;
* restore;
* approve/reject;
* assign/unassign;
* status transitions;
* bulk operations;
* exports;
* imports;
* uploads;
* downloads;
* retry;
* resend;
* schedule;
* publish;
* enable/disable;
* connect/disconnect.

---

# 16. STAGE 1I — SEARCH / FILTER / SORT / PAGINATION REQUIREMENTS

For every such feature capture:

* field;
* operator;
* query parameter;
* default;
* multiple-value semantics;
* null behavior;
* empty behavior;
* sort direction;
* sort field;
* page;
* limit;
* reset behavior;
* combination semantics;
* URL state if relevant.

Trace:

```text
UI State
→ Query Serialization
→ Request Parameter
→ Expected Backend Filtering
→ Expected Ordering
→ Pagination
→ Result
```

---

# 17. STAGE 1J — AUTHORIZATION / TENANT / RESOURCE REQUIREMENTS

From the frontend identify:

* role-dependent UI;
* permission-dependent actions;
* tenant-specific screens;
* branch/resource-specific screens;
* resource IDs;
* actor IDs;
* ownership context;
* restricted fields;
* admin-only actions.

Do NOT infer authorization merely because a button is hidden.

Use the frontend as evidence and verify the actual backend authorization later.

---

# 18. STAGE 1K — FILE / EXPORT / IMPORT / ASYNC / REALTIME REQUIREMENTS

Identify frontend use of:

* uploads;
* downloads;
* export;
* import;
* generated reports;
* background processing;
* job status;
* polling;
* WebSocket;
* SSE;
* push events;
* notifications;
* progress tracking;
* signed URLs;
* external links;
* print/download flows.

Record expected lifecycle.

---

# 19. STAGE 1L — FRONTEND-DERIVED BACKEND REQUIREMENT MAP

Produce this mandatory table:

| Req ID | Route/Page | UI Consumer | Backend Capability | Method | Endpoint | Request | Headers | Response Fields | Errors | Enum/Lookup | Filter/Sort/Page | Auth/Tenant | Async/File/Realtime | Evidence | Evidence Strength |
| ------ | ---------- | ----------- | ------------------ | ------ | -------- | ------- | ------- | --------------- | ------ | ----------- | ---------------- | ----------- | ------------------- | -------- | ----------------- |

Evidence strength:

```text
DIRECT
STRONG
INFERRED
UNCLEAR
```

Do NOT convert inferred evidence into direct fact.

---

# 20. STAGE 1M — FROZEN REQUIREMENT BASELINE

At the end of Stage 1 create:

```text
FROZEN FRONTEND-DERIVED BACKEND REQUIREMENT BASELINE
```

This baseline becomes the target for Stage 2 and Stage 3.

Do NOT silently alter it later.

If later evidence requires changing a requirement, create:

```text
BASELINE AMENDMENT
Requirement ID:
Original interpretation:
New evidence:
Why interpretation changed:
New interpretation:
Impact on previous findings:
```

This prevents moving the goalposts during the audit.

---

# 21. STAGE 1 REQUIRED OUTPUT

Stage 1 MUST output:

1. Scope discovered.
2. Frontend route map.
3. Backend-relevant UI inventory.
4. API/network inventory.
5. Request requirement inventory.
6. Response/UI data requirement inventory.
7. Dropdown/enum/lookup classification.
8. Hardcoded/mock/demo classification.
9. Search/filter/sort/pagination requirement map.
10. CRUD/action requirement map.
11. Auth/tenant/resource requirement map.
12. File/export/import/async/realtime requirement map.
13. FRONTEND-DERIVED BACKEND REQUIREMENT MAP.
14. Uncertain requirements.
15. Shared/outside-scope backend dependency candidates.
16. Coverage counts.
17. FROZEN REQUIREMENT BASELINE.

Then STOP.

Wait for:

`PROCEED TO STAGE 2`

---

# 22. STAGE 2 — BACKEND AUDIT

Only start after:

`PROCEED TO STAGE 2`

Stage 2 audits:

A. backend topology;
B. backend dependency closure;
C. endpoint completeness;
D. HTTP contract;
E. request contract;
F. response contract;
G. semantic/data provenance;
H. lookup/enum;
I. CRUD/action behavior;
J. search/filter/sort/pagination;
K. authentication;
L. authorization;
M. tenant isolation;
N. resource-level authorization / IDOR;
O. idempotency;
P. concurrency / locking;
Q. transactions;
R. events;
S. background jobs;
T. webhooks;
U. files/import/export;
V. realtime;
W. database;
X. architecture rules;
Y. tests;
Z. documentation.

---

# 23. STAGE 2A — BACKEND TOPOLOGY

Recursively map the supplied backend.

Record:

* module root;
* controllers/routes;
* query/read controllers;
* command/write controllers;
* DTOs;
* validation;
* services;
* use cases;
* orchestrators;
* repositories;
* query repositories;
* domain models;
* entities;
* mappers;
* constants;
* enums;
* adapters;
* jobs;
* event handlers;
* webhook handlers;
* migrations;
* seeders;
* tests;
* module registration;
* documentation.

Record every file.

---

# 24. STAGE 2B — ENDPOINT OWNERSHIP AND SCOPE

For every frontend-required endpoint determine:

```text
TARGET_MODULE_OWNS_ENDPOINT
SHARED_BACKEND_DEPENDENCY
GLOBAL_INFRASTRUCTURE_ENDPOINT
EXTERNAL_SERVICE_ENDPOINT
OUTSIDE_SUPPLIED_SCOPE
MISSING_BACKEND
```

If the endpoint belongs outside the supplied backend ZIP:

DO NOT automatically report:

`MISSING_BACKEND`

Instead report:

`OUTSIDE_SUPPLIED_SCOPE`

and record:

* endpoint;
* expected owner;
* why frontend requires it;
* what evidence is missing;
* what artifact would be needed to verify it.

This is mandatory to prevent false positives.

---

# 25. STAGE 2C — BIDIRECTIONAL ENDPOINT PARITY

For EVERY frontend API/network operation compare:

| Req ID | Frontend Method | Frontend Path | Backend Method | Backend Path | Owner | Status |
| ------ | --------------- | ------------- | -------------- | ------------ | ----- | ------ |

Allowed statuses:

```text
ALIGNED
PATH_MISMATCH
METHOD_MISMATCH
MISSING_BACKEND
OUTSIDE_SUPPLIED_SCOPE
PARTIAL
NOT_VERIFIED
```

Also perform reverse direction:

For EVERY backend endpoint in the supplied target scope:

* find frontend consumer;
* classify it as user-facing/internal/background/webhook/shared/future/orphaned;
* verify documentation;
* verify registration;
* verify tests where applicable.

Never automatically classify every unused backend endpoint as broken.

---

# 26. STAGE 2D — HTTP-LEVEL CONTRACT AUDIT

Do not audit JSON fields only.

For every frontend-consumed endpoint verify:

* HTTP method;
* path;
* path parameters;
* query parameters;
* request headers;
* response headers;
* content type;
* multipart/form-data;
* upload field names;
* content disposition;
* location headers;
* redirect behavior;
* HTTP status;
* `202 Accepted`;
* `204 No Content`;
* `304` behavior where relevant;
* download content type;
* cache semantics where relevant;
* idempotency headers;
* authentication headers;
* tenant headers.

A correct JSON body with the wrong HTTP behavior is NOT contract-compatible.

---

# 27. STAGE 2E — REQUEST CONTRACT FIELD-BY-FIELD AUDIT

For every frontend mutation compare:

```text
Frontend request
VS
Backend DTO
VS
Actual DTO consumption
VS
Business behavior
```

Use:

| Field | Frontend Type | Frontend Required | Backend DTO | Backend Type | Validation | Actually Used | Semantic Match | Status |
| ----- | ------------- | ----------------: | ----------- | ------------ | ---------- | ------------: | -------------- | ------ |

Detect:

```text
EXTRA_FIELD_SENT
MISSING_BACKEND_FIELD
BACKEND_REQUIRED_FIELD_NOT_SENT
TYPE_MISMATCH
NULLABILITY_MISMATCH
ENUM_MISMATCH
FORMAT_MISMATCH
DEFAULT_MISMATCH
CONDITIONAL_VALIDATION_MISMATCH
CROSS_FIELD_VALIDATION_MISMATCH
MONETARY_MISMATCH
DATE_TIME_MISMATCH
IGNORED_FIELD
UNUSED_ACCEPTED_FIELD
```

IMPORTANT:

A DTO accepting a field does NOT prove that the backend implements its behavior.

---

# 28. STAGE 2F — REQUEST SEMANTIC VALIDATION

Verify:

* requiredness;
* optionality;
* nullability;
* defaults;
* min/max;
* length;
* regex;
* enum;
* nested objects;
* array cardinality;
* conditional fields;
* cross-field rules;
* numeric conversion;
* boolean conversion;
* date parsing;
* timezone;
* money/currency;
* empty strings;
* null;
* omitted fields;
* query serialization;
* repeated parameters.

Catch cases like:

```text
discountType = PERCENTAGE
discountValue > 100
```

or:

```text
endDate < startDate
```

or:

```text
country requires state
```

when those rules are relevant to the actual frontend behavior.

---

# 29. STAGE 2G — RESPONSE CONTRACT FIELD-BY-FIELD AUDIT

For every frontend-required field verify:

```text
Frontend consumer
→ response JSON path
→ Response DTO
→ Mapper/Serializer
→ Service
→ Repository/query
→ Database/computation
```

Use:

| Req ID | Endpoint | UI Field | Expected JSON Path | Backend Field | Type | Nullability | Source | Semantic Meaning | Status |
| ------ | -------- | -------- | ------------------ | ------------- | ---- | ----------- | ------ | ---------------- | ------ |

Detect:

* missing field;
* wrong path;
* wrong type;
* wrong nullability;
* wrong relation;
* wrong calculation;
* constant placeholder;
* always-null field;
* mapper omission;
* serializer omission;
* incorrect aggregate;
* wrong tenant scope;
* wrong filter scope;
* wrong date grouping;
* wrong monetary unit;
* stale source;
* incorrect derived value.

---

# 30. STAGE 2H — DATA PROVENANCE AND SEMANTIC CORRECTNESS

For EVERY important frontend-required response field, determine its true source.

Possible source:

```text
DIRECT_DB_COLUMN
RELATION / JOIN
AGGREGATE
COMPUTED_DOMAIN_VALUE
DERIVED_QUERY
EXTERNAL_SERVICE
EVENTUAL_ASYNC_RESULT
MOCK / PLACEHOLDER
UNKNOWN
```

Do not stop at field existence.

Examples of FAIL:

### Field exists but never populated

```text
Response DTO:
monthlyRevenue: number
```

but service always returns `0`.

### Wrong aggregate

Frontend expects:

```text
totalMembers = all filtered records
```

Backend returns:

```text
currentPage.length
```

### Wrong chart semantics

Frontend expects monthly revenue for selected date range.

Backend groups by server-local month instead of required timezone.

### Wrong relationship

Frontend shows:

```text
trainerName
```

Backend joins the wrong trainer relation.

### Wrong tenant scope

Aggregate includes records from another tenant.

These are semantic backend failures even when types match.

---

# 31. STAGE 2I — RESPONSE ENVELOPE

Verify the actual backend uses the canonical response contract required by the supplied backend documentation.

Check:

* success;
* message;
* data;
* meta;
* error;
* errorCode;
* statusCode;
* validationErrors.

Verify:

* success behavior;
* error behavior;
* validation behavior;
* paginated behavior;
* non-paginated list behavior;
* `data` on errors;
* `meta` presence;
* errorCode format;
* field naming;
* frontend compatibility.

Never accept a manually shaped response merely because it looks similar.

---

# 32. STAGE 2J — ERROR CONTRACT AUDIT

For every frontend-observable error scenario verify:

* HTTP status;
* error;
* errorCode;
* message;
* validationErrors;
* field name;
* nested field path;
* not-found behavior;
* authorization behavior;
* conflict behavior;
* business-rule errors;
* duplicate/idempotency errors;
* timeout behavior;
* async job failures.

Also verify:

```text
Frontend-consumed errorCode
↔
Backend-generated errorCode
```

Detect:

* frontend expects code backend never produces;
* backend produces code frontend cannot distinguish;
* wrong status;
* wrong validation field;
* generic error hiding required business state.

---

# 33. STAGE 2K — ENUM / STATUS / TYPE AUDIT

For every frontend-selectable finite value verify:

```text
Frontend values
→ Backend enum
→ DTO validation
→ Domain/entity field
→ Database representation
→ Migration
```

Check:

* exact values;
* casing;
* spelling;
* migrations;
* database enforcement;
* default values;
* deprecated values;
* unknown values;
* transition rules.

Never report a static UI configuration as a missing backend enum.

---

# 34. STAGE 2L — RELATIONAL LOOKUP AUDIT

For every backend-backed lookup verify:

* endpoint;
* source entity;
* source table;
* ID field;
* label field;
* tenant scope;
* authorization;
* active/inactive behavior;
* soft-deleted record filtering;
* pagination;
* search;
* sorting;
* null handling.

For remote searchable lookups verify the full flow:

```text
Search text
→ Query parameter
→ DTO
→ Repository condition
→ DB result
→ pagination
→ response
→ frontend selected ID
```

---

# 35. STAGE 2M — CRUD / MUTATION LIFECYCLE AUDIT

For every frontend mutation verify:

```text
Request
→ Validation
→ Authentication
→ Authorization
→ Resource existence
→ Business validation
→ Transaction / Orchestration
→ Repository mutation
→ Database
→ Audit trail
→ Event
→ Job
→ Response
→ UI-visible result
```

Only include applicable layers.

Do not force events/jobs onto operations where the architecture and behavior do not require them.

Detect:

* mutation stops after controller;
* service does not persist;
* persistence occurs outside required transaction;
* audit trail missing where required;
* event missing;
* side effect missing;
* response claims success before operation completes;
* partial mutation possible;
* rollback missing where required.

---

# 36. STAGE 2N — SEARCH / FILTER / SORT / PAGINATION SEMANTICS

For EVERY frontend search/filter/sort/pagination requirement trace:

```text
UI Control
→ Query State
→ Serialized Parameter
→ DTO
→ Repository Query
→ DB Query
→ Count
→ Ordering
→ Page Slice
→ Response
→ UI Result
```

Verify:

* exact filtering operator;
* AND/OR semantics;
* multi-select behavior;
* range filtering;
* null filtering;
* case sensitivity;
* partial search;
* date boundaries;
* timezone;
* default ordering;
* stable ordering;
* sort allowlist;
* page indexing;
* limit constraints;
* total count;
* total pages;
* next/previous flags;
* filtering before pagination.

A filter that changes request parameters but does not alter backend query behavior is FAIL.

A pagination endpoint that returns correct rows but incorrect metadata is FAIL.

---

# 37. STAGE 2O — TENANT ISOLATION AUDIT

Where multi-tenancy applies, trace:

```text
Authentication
→ Tenant Authorization
→ Trusted Tenant Context
→ DataSource / Repository Scope
→ Query
→ Mutation
→ Response
```

Verify:

* client-supplied tenant identifiers are not blindly trusted;
* actor is authorized for tenant;
* tenant context reaches DB access;
* reads are tenant-scoped;
* writes are tenant-scoped;
* aggregates are tenant-scoped;
* lookups are tenant-scoped;
* background jobs preserve tenant context;
* events preserve tenant identity;
* exports preserve tenant isolation.

Detect cross-tenant leakage paths.

---

# 38. STAGE 2P — AUTHORIZATION / IDOR AUDIT

Do not stop at role checks.

For resource-specific endpoints verify:

```text
Authenticated Actor
→ Role / Permission
→ Requested Resource ID
→ Resource Ownership / Scope
→ Tenant / Branch / Organization
→ Authorization Decision
```

Check applicable cases:

* valid role + valid resource;
* valid role + wrong resource;
* valid role + wrong tenant;
* valid role + deleted resource;
* valid role + unauthorized branch;
* forged resource ID;
* missing resource-level check.

A valid `@Roles()` or equivalent guard is NOT sufficient if resource-level authorization is required.

---

# 39. STAGE 2Q — IDEMPOTENCY AUDIT

For every applicable critical mutation determine whether duplicate execution is possible.

Consider:

* payments;
* financial mutations;
* irreversible mutations;
* resource creation;
* communication sends;
* retries;
* frontend duplicate submission;
* network retry;
* job retry.

Verify:

* `Idempotency-Key` where required;
* server-side storage;
* duplicate request handling;
* TTL;
* same-key behavior;
* response replay;
* no duplicate side effect.

---

# 40. STAGE 2R — CONCURRENCY / RACE-CONDITION AUDIT

For mutations involving:

* balances;
* inventory;
* status transitions;
* assignments;
* unique resources;
* approvals;
* financial state;
* counters;
* credits;
* quotas;

verify applicable protection:

* transaction;
* pessimistic lock;
* optimistic concurrency;
* unique constraint;
* atomic update;
* serialization;
* idempotency;
* duplicate detection.

Consider:

```text
same request twice
two users simultaneously
stale update
retry after timeout
job retry
webhook retry
```

Do not accept logically correct single-request behavior as proof of concurrency safety.

---

# 41. STAGE 2S — TRANSACTION / SIDE-EFFECT AUDIT

For every non-trivial mutation identify:

* atomic unit;
* DB writes;
* dependent writes;
* events;
* audit log;
* external calls;
* rollback behavior.

Flag:

* DB updated but audit log fails;
* payment recorded but wallet not updated;
* entity created but related record fails;
* event emitted before transaction commits where unsafe;
* external side effect occurs without required idempotency;
* partial completion without documented recovery.

---

# 42. STAGE 2T — BACKGROUND JOB / ASYNC LIFECYCLE AUDIT

When the frontend invokes a heavy or asynchronous operation verify:

```text
Start Request
→ Job Created
→ Job Identifier
→ Processing State
→ Success / Failure
→ Retry / Recovery
→ Result Availability
→ Download / Consumption
```

Examples:

* exports;
* imports;
* large reports;
* bulk operations;
* emails;
* file processing;
* media processing.

Check where applicable:

* `202 Accepted`;
* job status endpoint;
* status persistence;
* job id;
* queue;
* retry;
* DLQ;
* idempotency;
* timeout;
* tenant context;
* result storage;
* cleanup;
* authorization to retrieve result.

An endpoint returning `202` without a usable async lifecycle is incomplete.

---

# 43. STAGE 2U — FILE / UPLOAD / DOWNLOAD / EXPORT AUDIT

For every applicable file flow verify:

* multipart/form-data;
* field names;
* file type;
* file size;
* filename handling;
* authorization;
* tenant isolation;
* validation;
* storage adapter;
* processing;
* image transformation where required;
* signed URL;
* URL expiry;
* download authorization;
* content type;
* content disposition;
* background processing where necessary;
* cleanup;
* failure handling.

For exports verify whether the output is:

* synchronously generated;
* asynchronously generated;
* stored;
* downloadable;
* access-controlled.

---

# 44. STAGE 2V — WEBHOOK / EXTERNAL SERVICE AUDIT

Where applicable verify:

* adapter boundary;
* timeout;
* retry;
* error translation;
* authentication;
* signature verification;
* idempotency;
* webhook replay safety;
* event mapping;
* audit behavior;
* transaction interaction.

Never accept direct external SDK/API usage in business logic when the architecture requires adapters.

---

# 45. STAGE 2W — REALTIME / POLLING AUDIT

For frontend use of:

* WebSocket;
* SSE;
* polling;
* push notifications;

verify:

* actual backend source;
* event name;
* payload shape;
* authentication;
* tenant scope;
* reconnect behavior;
* duplicate events;
* stale events;
* permission;
* subscription lifecycle.

---

# 46. STAGE 2X — DATABASE TRACEABILITY AUDIT

For every major frontend-required backend capability verify database support.

Check:

* required table/entity;
* required column;
* relation;
* foreign key;
* enum;
* unique constraint;
* check constraint;
* index;
* migration;
* soft-delete behavior;
* tenant scope;
* query compatibility.

Examples:

```text
Frontend sorts by createdAt
→ backend must support ordering
→ DB must support appropriate query path/index where required
```

```text
Frontend shows trainerName
→ relation must exist
→ query must load correct trainer
```

```text
Frontend shows monthlyRevenue
→ aggregate query must exist
→ grouping and timezone semantics must be correct
```

---

# 47. STAGE 2Y — N+1 / QUERY PERFORMANCE AUDIT

For frontend-required list/detail/dashboard endpoints inspect:

* joins;
* eager loading;
* relation loading;
* query count;
* aggregate strategy;
* repeated queries in loops;
* indexes;
* sort fields;
* filter fields;
* pagination query strategy.

Flag:

* N+1;
* missing index where backend rule requires it;
* loading all rows when pagination is required;
* expensive synchronous report computation;
* repeated aggregate queries;
* query patterns inconsistent with architecture.

---

# 48. STAGE 2Z — BACKEND ARCHITECTURE RULE-BY-RULE AUDIT

Read the COMPLETE supplied backend instruction.

Construct a rule ledger for EVERY numbered rule contained in it.

Do NOT assume the number is always exactly 1–101.

Discover the actual numbering in the supplied file.

For every rule:

```text
RULE
DESCRIPTION
APPLICABILITY
EVIDENCE REQUIRED
EVIDENCE FOUND
STATUS
FILES
REASON
```

Allowed status:

```text
PASS
FAIL
PARTIAL
NOT_APPLICABLE
NOT_VERIFIED
BLOCKED_BY_SUPPLIED_SCOPE
```

Do not convert unavailable global infrastructure evidence into automatic module failure.

Do not mark PASS merely because the documentation says the rule is followed.

---

# 49. RULE APPLICABILITY MATRIX

For every backend rule determine whether it is:

```text
MODULE_LOCAL
SHARED_INFRASTRUCTURE
GLOBAL_APPLICATION
CONDITIONAL
NOT_APPLICABLE
OUTSIDE_SUPPLIED_SCOPE
```

Examples of potentially global/shared requirements may include:

* global response interceptor;
* global validation filter;
* timeout configuration;
* health endpoints;
* metrics;
* tracing;
* tenant resolver;
* global security middleware;
* scheduled-job registry;
* CI enforcement;
* CODEOWNERS.

If such evidence is not supplied:

use:

`BLOCKED_BY_SUPPLIED_SCOPE`

rather than inventing a FAIL.

---

# 50. SPECIAL BACKEND ARCHITECTURE CHECKS

Explicitly inspect applicable rules for:

* feature isolation;
* module-prefixed filenames;
* responsibility boundaries;
* DTO isolation;
* repository pattern;
* ORM isolation;
* custom exceptions;
* constants;
* event-driven dependencies;
* external adapters;
* co-located unit tests;
* OpenAPI/Swagger;
* centralized config;
* logging;
* correlation IDs;
* response envelope;
* soft delete;
* audit trail;
* idempotency;
* observability;
* secret handling;
* N+1 prevention;
* privacy;
* fail-fast lookup behavior;
* validation whitelist/forbid rules;
* API route mirroring;
* multi-tenancy;
* delivery medium parameters;
* transactions;
* locks;
* read/write separation;
* file storage;
* webhooks;
* Redis;
* cache invalidation;
* auth token handling;
* tenant context;
* entity base abstraction;
* SLA comments;
* FK naming;
* DLQ;
* explicit return types;
* file-size ceilings;
* responsibility comments;
* dependency guardrails;
* forbidden documentation;
* response DTO completeness;
* enum-driven statuses/types/roles;
* scheduled-job registry;
* timeout tiers;
* validation exception filter;
* repository mutation boundaries;
* database constraint naming;
* test integrity;
* file-name/import case sensitivity.

Do not assume any specific framework implementation where the supplied project uses another approved equivalent.

Follow the architecture document's stated framework mappings.

---

# 51. SERVICE / REPOSITORY RESPONSIBILITY AUDIT

For every frontend-required backend operation trace:

```text
Controller
→ DTO
→ Orchestrator if applicable
→ Service
→ Repository
→ Mapper
```

Check:

* controller does not contain business logic;
* DTO does not contain business logic;
* service does not own ORM persistence concerns where forbidden;
* repository owns DB behavior;
* mapper separates ORM/domain/response where required;
* cross-module business dependencies follow the required architecture;
* repository mutations use named operations where the architecture requires them;
* no direct service entity mutation + generic save pattern where forbidden.

---

# 52. BACKEND STUB / PLACEHOLDER DETECTION

Search for:

* TODO;
* FIXME;
* `throw new Error("not implemented")`;
* placeholder exceptions;
* empty service methods;
* empty controllers;
* dummy arrays;
* hardcoded `[]`;
* hardcoded `{}`;
* constant `0`;
* constant `null`;
* fake success response;
* mocked repository in production path;
* `Coming soon`;
* unreachable branch used as implementation;
* temporary response objects;
* hardcoded records.

Do NOT automatically classify a constant as a bug when it is legitimate configuration.

Determine whether the implementation represents real backend behavior.

---

# 53. RESPONSE SOURCE INTEGRITY

For each important response field determine whether it ultimately comes from:

```text
REAL_DATABASE_STATE
VALID_COMPUTATION
VALID_EXTERNAL_SOURCE
VALID_ASYNC_RESULT
MOCK
HARDCODED_DEMO
PLACEHOLDER
UNKNOWN
```

Any frontend-critical backend field sourced from mock/demo/placeholder data is a backend completeness failure unless the architecture explicitly defines it as static configuration.

---

# 54. DOCUMENTATION DRIFT AUDIT

Inspect supplied backend documentation including, where present:

* `_backend_feature.md`;
* `_dependencies.md`;
* `_forbidden.md`;
* API contract;
* frozen API contract;
* data/state architecture;
* file responsibility map;
* permissions;
* jobs;
* events;
* constraints;
* edge cases;
* rule compliance checklist.

Compare documentation with actual code.

Check:

* documented endpoint exists;
* undocumented endpoint exists;
* documented request fields match;
* documented response fields match;
* frozen API contract matches current frontend requirement baseline;
* dependency list matches imports/runtime dependencies;
* file responsibility map matches implementation;
* scheduled jobs are documented;
* constraints are documented;
* permissions are documented;
* no stale claims;
* no `TBD`;
* no fake compliance checkbox.

Documentation is NOT proof of implementation.

---

# 55. TESTING AUDIT

Inspect backend tests relevant to every frontend-derived backend capability.

Verify applicable:

* unit tests;
* repository tests;
* service tests;
* integration tests;
* API/E2E tests;
* database tests;
* authorization tests;
* tenant isolation tests;
* pagination/filter/sort tests;
* response-contract tests;
* idempotency tests;
* concurrency tests;
* rollback tests;
* job tests;
* webhook tests;
* upload/export tests.

---

# 56. FRONTEND-DERIVED BACKEND TEST TRACEABILITY

Every important frontend-derived backend requirement MUST map to verification evidence where applicable.

Use:

```text
Frontend Requirement
→ Backend Capability
→ Test
→ Test Type
→ Observable Behavior Proven
```

For each important capability determine whether tests prove:

* happy path;
* invalid input;
* not found;
* authorization failure;
* tenant failure;
* business-rule failure;
* persistence failure;
* response contract;
* side effect;
* idempotency;
* concurrency;
* rollback;
* retry.

A test file existing is NOT proof.

A test that mocks away the behavior under audit is NOT strong proof.

A test that would remain green if the feature were deliberately broken is NOT valid proof.

---

# 57. TEST INTEGRITY

A test fails quality if it:

* is empty;
* has placeholder assertions;
* only instantiates a class;
* only checks `true === true`;
* only snapshots implementation-generated data;
* mocks the exact behavior it claims to validate;
* copies expected values directly from implementation;
* never reaches the actual endpoint for an API claim;
* does not verify observable behavior.

The audit must state what real defect each important test would catch.

---

# 58. SECURITY / DATA-INTEGRITY SECOND PASS

Perform a dedicated second security pass.

Re-scan for:

* auth bypass;
* missing RBAC;
* missing resource authorization;
* IDOR;
* tenant leakage;
* trusting client tenant ID;
* cross-module business imports;
* secrets;
* PII exposure;
* sensitive response fields;
* unsafe logs;
* raw user-controlled query fields;
* unsafe dynamic orderBy;
* unsafe dynamic where;
* missing allowlists;
* SQL injection;
* unsafe upload handling;
* webhook signature bypass;
* duplicate financial mutations;
* concurrent mutation race;
* missing transaction;
* missing audit trail;
* hard delete;
* missing DB constraints;
* missing timeout;
* missing DLQ;
* unsafe external adapters.

---

# 59. COMPLETE OMISSION SWEEP

Before finalizing Stage 2, explicitly ask:

1. Is any frontend button dependent on a backend operation with no implementation?
2. Is any frontend form field absent from the backend DTO?
3. Is any accepted backend DTO field actually ignored?
4. Is any business validation performed only in the frontend?
5. Is any dropdown using a backend domain concept whose authoritative source is missing?
6. Is any relationship lookup missing?
7. Is any lookup returning deleted records?
8. Is any lookup insufficiently tenant-scoped?
9. Is any status value unsupported by backend?
10. Is any table column missing from backend response?
11. Is any response field present but semantically wrong?
12. Is any KPI aggregate missing?
13. Is any aggregate calculated from the current page instead of the full filtered result set?
14. Is any chart series missing?
15. Is any chart grouped by the wrong date/time semantics?
16. Is any required filter unsupported?
17. Is any filter parameter accepted but ignored?
18. Is any search parameter accepted but ignored?
19. Is any sort field unsafe or unsupported?
20. Is any pagination metadata incorrect?
21. Is any relationship field populated from the wrong source?
22. Is any frontend mutation unsupported?
23. Is any mutation missing idempotency where required?
24. Is any mutation vulnerable to race conditions?
25. Is any resource accessible through IDOR?
26. Is any tenant boundary missing?
27. Is any role check present but resource authorization missing?
28. Is any frontend error scenario impossible to represent through backend errors?
29. Is any backend error code inconsistent with the frontend contract?
30. Is any status code incorrect?
31. Is any required response header missing?
32. Is any money value using the wrong unit/currency/rounding?
33. Is any date/time field using incompatible timezone/format semantics?
34. Is any upload contract incomplete?
35. Is any export flow missing its async lifecycle?
36. Is any `202` response missing job tracking?
37. Is any background job missing required retry/DLQ handling?
38. Is any scheduled job undocumented/unregistered?
39. Is any external call missing timeout?
40. Is any webhook insufficiently protected against replay?
41. Is any backend field declared but never populated?
42. Is any mapper stripping a required field?
43. Is any serializer stripping a required field?
44. Is any backend endpoint only backed by mock/static/demo data?
45. Is any real backend capability missing database support?
46. Is any required FK missing?
47. Is any required unique/check/index constraint missing?
48. Is any required migration missing?
49. Is any query affected by soft-deleted records incorrectly?
50. Is any query affected by tenant scope incorrectly?
51. Is any N+1 query present?
52. Is any backend-only endpoint undocumented or orphaned?
53. Is any documentation stale?
54. Is any dependency outside supplied scope preventing verification?
55. Is any PASS based only on file existence?
56. Is any PASS based only on endpoint existence?
57. Is any PASS based only on DTO existence?
58. Is any PASS based only on Swagger?
59. Is any PASS based only on tests existing?
60. Is any PASS based only on MSW/mock behavior?
61. Is runtime verification unavailable but being silently treated as PASS?
62. Is any requirement baseline being changed silently?
63. Was every relevant frontend API call inspected?
64. Was every backend endpoint inspected?
65. Was every relevant frontend form inspected?
66. Was every table/KPI/chart/backend-derived field inspected?
67. Was every dropdown/lookup/status inspected?
68. Was every backend architecture rule audited?
69. Was every relevant authored backend file inspected?
70. Was every relevant migration inspected?
71. Was every relevant test inspected?
72. Is there any critical backend behavior that is still only inferred rather than proven?

Do not finalize until this sweep is complete.

---

# 60. COVERAGE LEDGER

The audit MUST report actual coverage counts.

## FRONTEND COVERAGE

Report:

* files discovered;
* files inspected;
* files excluded;
* unreadable files;
* routes;
* backend-relevant UI requirements;
* API/network operations;
* forms;
* form fields;
* dropdowns;
* lookups;
* table columns;
* KPI fields;
* chart series;
* filters;
* search controls;
* sort controls;
* pagination controls;
* mutations;
* backend-relevant actions;
* file/export/import flows;
* realtime flows.

## BACKEND COVERAGE

Report:

* files discovered;
* files inspected;
* files excluded;
* unreadable files;
* controllers/routes;
* endpoints;
* DTOs;
* services/use cases;
* repositories;
* entities/models;
* mappers;
* migrations;
* jobs;
* events;
* webhooks;
* adapters;
* tests;
* documentation files.

## RULE COVERAGE

Report:

* total rules discovered;
* applicable rules;
* not applicable;
* passed;
* failed;
* partial;
* not verified;
* blocked by supplied scope.

Never claim 100% audit coverage unless the denominator supports it.

---

# 61. ZERO-SAMPLING PROOF

The final audit must report:

```text
FILES DISCOVERED:
FILES INSPECTED:
FILES EXCLUDED:
FILES UNREADABLE:
FILES OUTSIDE SUPPLIED SCOPE:

FRONTEND API OPERATIONS DISCOVERED:
FRONTEND API OPERATIONS TRACED:

FRONTEND BACKEND REQUIREMENTS DISCOVERED:
FRONTEND BACKEND REQUIREMENTS VERIFIED:

BACKEND ENDPOINTS DISCOVERED:
BACKEND ENDPOINTS INSPECTED:

BACKEND RULES DISCOVERED:
BACKEND RULES AUDITED:
```

If relevant authored files remain unread:

Do NOT claim a complete zero-sampling audit.

---

# 62. ISSUE SEVERITY

Use:

## P0 — CRITICAL

Examples:

* missing critical backend capability;
* tenant data leakage;
* authorization bypass;
* financial duplication;
* security-critical missing control;
* corrupted data risk;
* irreversible mutation without required protection.

## P1 — HIGH

Examples:

* major frontend-required backend capability missing;
* incorrect response data;
* broken mutation;
* major contract mismatch;
* critical async lifecycle missing;
* missing transaction or side effect.

## P2 — MEDIUM

Examples:

* non-critical contract mismatch;
* incomplete filter/sort behavior;
* missing secondary response field;
* documentation drift affecting AI maintainability;
* missing non-critical test.

## P3 — LOW

Examples:

* low-impact documentation issue;
* non-blocking cleanup;
* small consistency issue.

Severity is based on actual impact.

---

# 63. EXACT ISSUE FORMAT

Every significant issue MUST use this format.

```text
ISSUE ID: [BE-001 / SYNC-001 / DB-001 / SEC-001 / TEST-001 / DOC-001]

SEVERITY: [P0/P1/P2/P3]

CATEGORY:
[Completeness / Contract / Validation / Response / Database / Security /
Authorization / Tenant / Idempotency / Concurrency / Async / File /
Performance / Architecture / Testing / Documentation]

TITLE:
[Precise issue title]

FRONTEND REQUIREMENT:
[Requirement ID and exact frontend evidence]

FRONTEND LOCATION:
[Exact path / component / hook / API client / function]

BACKEND LOCATION:
[Exact path / controller / DTO / service / repository / entity / migration]

BACKEND RULE:
[Exact backend rule number and requirement, when applicable]

CURRENT STATE:
[Exactly what exists now]

EXPECTED STATE:
[Exactly what must exist]

MISMATCH:
[Exact difference]

IMPACT:
[Actual user/system/architecture/security impact]

DATA / CONTRACT DETAILS:
[Field/method/path/status/semantic mismatch]

REQUIRED REPAIR:
[Exact backend-side change needed]

RESPONSIBILITY:
[Which file/layer should own the repair]

DO NOT CHANGE:
[Things the repair must preserve]

VERIFICATION:
[Exact test/runtime/static verification]

DONE CONDITION:
[Binary acceptance statement]
```

Do NOT combine unrelated issues into one issue.

If one file has three independent defects, report three issues.

---

# 64. MASTER REQUIREMENT COVERAGE MATRIX

Produce:

| Req ID | Frontend Requirement | Expected Backend Capability | Actual Backend | Contract | Semantic | Security | Persistence | Test | Documentation | Final Status |
| ------ | -------------------- | --------------------------- | -------------- | -------- | -------- | -------- | ----------- | ---- | ------------- | ------------ |

Allowed final statuses:

```text
ALIGNED
MISSING_BACKEND
PARTIAL_BACKEND
SEMANTIC_MISMATCH
PATH_MISMATCH
METHOD_MISMATCH
REQUEST_MISMATCH
RESPONSE_MISMATCH
ERROR_CONTRACT_MISMATCH
AUTHORIZATION_MISMATCH
TENANT_MISMATCH
ASYNC_MISMATCH
DATA_PROVENANCE_MISMATCH
OUTSIDE_SUPPLIED_SCOPE
NOT_VERIFIED
NOT_APPLICABLE
```

---

# 65. ENDPOINT CONTRACT MATRIX

Produce:

| Endpoint | Frontend Consumer | Owner | Method | Request | Headers | Status | Response | Errors | Auth | Tenant | Idempotency | Async | Test | Final Status |
| -------- | ----------------- | ----- | ------ | ------- | ------- | ------ | -------- | ------ | ---- | ------ | ----------- | ----- | ---- | ------------ |

---

# 66. RESPONSE FIELD MATRIX

Produce:

| Req ID | Endpoint | Frontend Field | JSON Path | DTO | Mapper | Service Source | Repository/Query Source | DB/Computation Source | Semantic Match | Status |
| ------ | -------- | -------------- | --------- | --- | ------ | -------------- | ----------------------- | --------------------- | -------------- | ------ |

---

# 67. ENUM / LOOKUP MATRIX

Produce:

| UI Value/Lookup | Classification | Frontend Source | Backend Source | Endpoint | Enum/Entity | Tenant Scope | Deleted Filter | Search/Page | Status |
| --------------- | -------------- | --------------- | -------------- | -------- | ----------- | ------------ | -------------- | ----------- | ------ |

---

# 68. AUTHORIZATION MATRIX

Produce:

| Endpoint / Action | Frontend Context | Required Role/Permission | Resource Check | Tenant Check | Actual Backend Guard | Test | Status |
| ----------------- | ---------------- | ------------------------ | -------------- | ------------ | -------------------- | ---- | ------ |

---

# 69. BACKEND RULE LEDGER

Produce every rule:

| Rule | Requirement | Applicability | Evidence | Status | Files | Reason |
| ---- | ----------- | ------------- | -------- | ------ | ----- | ------ |

Do not hide rules inside category totals.

---

# 70. TEST TRACEABILITY MATRIX

Produce:

| Requirement | Backend Capability | Test | Test Type | Behavior Proven | Missing Coverage | Status |
| ----------- | ------------------ | ---- | --------- | --------------- | ---------------- | ------ |

---

# 71. DOCUMENTATION DRIFT MATRIX

Produce:

| Documentation Item | Documented State | Actual Code State | Drift | Impact | Status |
| ------------------ | ---------------- | ----------------- | ----- | ------ | ------ |

---

# 72. BACKEND-ONLY / ORPHANED CAPABILITY MATRIX

For backend capabilities not consumed by this frontend scope:

| Endpoint/Capability | Backend Location | Consumer | Classification | Documentation | Risk |
| ------------------- | ---------------- | -------- | -------------- | ------------- | ---- |

Classifications:

```text
INTERNAL
BACKGROUND
WEBHOOK
SHARED
GLOBAL
FUTURE
ORPHANED
UNKNOWN
```

Do not call unused capability broken without evidence.

---

# 73. MISSING BACKEND CAPABILITY REPORT

Produce an explicit list containing ONLY actual missing backend capabilities.

For each:

* Requirement ID;
* missing capability;
* frontend evidence;
* expected endpoint/behavior;
* exact backend layer needed;
* database implication;
* security implication;
* tests required;
* DONE condition.

Do not include speculative product features.

---

# 74. MISALIGNED BACKEND CAPABILITY REPORT

Produce backend capabilities that exist but do not correctly satisfy frontend requirements.

Examples:

* wrong method;
* wrong path;
* missing request field;
* ignored request field;
* wrong response path;
* wrong response type;
* wrong enum;
* wrong errorCode;
* wrong pagination;
* wrong aggregate;
* wrong relationship;
* wrong authorization;
* wrong tenant scope;
* wrong async lifecycle;
* wrong monetary unit;
* wrong timezone;
* wrong database behavior.

---

# 75. BACKEND-ONLY CAPABILITY REPORT

Produce existing backend endpoints/capabilities not consumed by this frontend scope.

Do NOT mark them as defects automatically.

Classify their purpose.

---

# 76. RUNTIME VERIFICATION

If runtime execution is available:

Run relevant commands/tests.

Examples may include:

```text
type-check
unit tests
integration tests
API/E2E tests
lint
build
migration validation
security checks
contract checks
```

Use the project's actual scripts rather than inventing commands.

If terminal/runtime access is unavailable:

say:

`RUNTIME VERIFICATION NOT AVAILABLE`

Do not pretend runtime behavior was verified.

---

# 77. STATIC VS RUNTIME VERIFICATION

Always distinguish:

```text
STATICALLY VERIFIED
RUNTIME VERIFIED
PARTIALLY VERIFIED
NOT VERIFIED
BLOCKED_BY_SUPPLIED_SCOPE
```

Examples:

A route exists in source:

`STATICALLY VERIFIED`

Actual request successfully exercised:

`RUNTIME VERIFIED`

Backend shared tenant resolver missing from supplied inputs:

`BLOCKED_BY_SUPPLIED_SCOPE`

Never turn static evidence into runtime proof.

---

# 78. 100% BACKEND COMPLETENESS DEFINITION

The backend may be declared:

`COMPLETE AGAINST FRONTEND REQUIREMENTS`

ONLY when ALL applicable conditions below are satisfied:

1. Every frontend-derived backend requirement has an implemented backend capability.
2. Every required endpoint has the correct method and path.
3. Every required header is supported.
4. Every request field is accepted.
5. Every accepted request field is actually used where required.
6. Validation semantics match the required behavior.
7. Every required response field exists.
8. Every required response field is semantically correct.
9. Every required error path is representable.
10. Error codes/statuses match the contract.
11. Dropdowns/lookups/enums use the correct authoritative source.
12. Search/filter/sort/pagination semantics are correct.
13. Relationships are correct.
14. Aggregates are correct.
15. Date/time semantics are correct.
16. Money/currency semantics are correct.
17. Authentication is correct.
18. Authorization is correct.
19. Resource-level authorization is correct where applicable.
20. Tenant isolation is correct where applicable.
21. Required idempotency protection exists.
22. Required concurrency protection exists.
23. Required transaction boundaries exist.
24. Required audit trail exists.
25. Required events exist.
26. Required background jobs exist.
27. Required job lifecycle exists.
28. Required webhook protection exists.
29. Required file/upload/download/export flows exist.
30. Database fields exist.
31. Relations exist.
32. Required indexes/constraints exist.
33. Required migrations exist.
34. Applicable backend architecture rules are verified.
35. Relevant tests provide meaningful behavioral proof.
36. Backend documentation matches actual implementation.
37. No applicable requirement remains:

* FAIL
* PARTIAL
* SEMANTIC_MISMATCH
* MISSING_BACKEND
* REQUEST_MISMATCH
* RESPONSE_MISMATCH
* AUTHORIZATION_MISMATCH
* TENANT_MISMATCH
* ASYNC_MISMATCH
* DATA_PROVENANCE_MISMATCH
* NOT_VERIFIED
* BLOCKED_BY_SUPPLIED_SCOPE

IMPORTANT:

The following alone NEVER establish completeness:

* endpoint exists;
* controller exists;
* DTO exists;
* response type exists;
* Swagger exists;
* TypeScript compiles;
* tests exist;
* MSW passes;
* mock data works;
* documentation says PASS.

---

# 79. FINAL VERDICT

The final verdict MUST separately report:

```text
FRONTEND-REQUIRED BACKEND COMPLETENESS:
[COMPLETE / PARTIAL / INCOMPLETE / NOT VERIFIED]

BACKEND ARCHITECTURE COMPLIANCE:
[COMPLIANT / PARTIALLY COMPLIANT / NON-COMPLIANT / NOT VERIFIED]

RUNTIME VERIFICATION:
[VERIFIED / PARTIALLY VERIFIED / NOT VERIFIED / BLOCKED]

SCOPE:
[COMPLETE / LIMITED]

CRITICAL BLOCKERS:
[count + IDs]

HIGH PRIORITY ISSUES:
[count + IDs]

UNVERIFIED REQUIREMENTS:
[count]

BLOCKED_BY_SUPPLIED_SCOPE ITEMS:
[count]

FRONTEND-DERIVED BACKEND REQUIREMENTS:
[discovered / verified]

BACKEND ENDPOINTS:
[discovered / inspected]

BACKEND RULES:
[discovered / audited / passed / failed / not verified]

OVERALL READINESS:
[READY / NOT READY / READY ONLY AFTER SPECIFIED REPAIRS]
```

Do NOT use arbitrary numerical scores unless the user explicitly requests scoring.

Do NOT allow a high pass count to hide a P0/P1 blocker.

---

# 80. EXACT REPAIR PLAN

For every unresolved issue create an actionable repair plan.

Order repairs by dependency rather than blindly using categories.

Preferred dependency logic:

```text
Architecture blockers
→ Shared contract blockers
→ Database/schema blockers
→ Security/authorization blockers
→ Core backend capabilities
→ Request/response contract
→ Search/filter/sort/pagination
→ Async/jobs/files
→ Tests
→ Documentation
→ Final verification
```

Change the order when actual dependency relationships require it.

For each phase state:

* why this phase comes here;
* prerequisites;
* affected files;
* expected outcome;
* verification;
* completion gate.

---

# 81. DO-NOT-BREAK HANDOFF

Produce a backend-specific list of invariants the repair agent MUST NOT break.

Include only real discovered invariants such as:

* endpoint path;
* HTTP method;
* response contract;
* tenant scope;
* permission rules;
* resource authorization;
* transaction boundary;
* locking;
* idempotency;
* event names;
* job contract;
* lookup IDs;
* enum values;
* pagination;
* aggregate semantics;
* audit logging;
* soft-delete behavior;
* external adapter behavior.

Do not generate generic warnings unrelated to the discovered code.

---

# 82. STAGE 2 REQUIRED OUTPUT

Stage 2 MUST output:

1. Backend topology.
2. Scope/dependency classification.
3. Endpoint parity.
4. HTTP contract audit.
5. Request contract audit.
6. Response contract audit.
7. Data provenance audit.
8. Enum/lookup audit.
9. CRUD/mutation audit.
10. Search/filter/sort/pagination audit.
11. Auth/RBAC audit.
12. Tenant audit.
13. IDOR/resource authorization audit.
14. Idempotency audit.
15. Concurrency/locking audit.
16. Transaction audit.
17. Async/job audit.
18. File/export/import audit.
19. Webhook/external adapter audit.
20. Realtime audit.
21. Database audit.
22. N+1/performance audit.
23. Backend rule-by-rule audit.
24. Stub/placeholder audit.
25. Test audit.
26. Documentation audit.
27. Coverage ledger.
28. Issue records.
29. Master requirement coverage matrix.
30. Endpoint contract matrix.
31. Response field matrix.
32. Enum/lookup matrix.
33. Authorization matrix.
34. Backend rule ledger.
35. Test traceability matrix.
36. Documentation drift matrix.
37. Missing capability report.
38. Misaligned capability report.
39. Backend-only/orphaned report.
40. Current unresolved blockers.
41. Exact repair requirements.

Then STOP.

Wait for:

`PROCEED TO STAGE 3`

---

# 83. STAGE 3 — FINAL ACCEPTANCE / VERDICT

Only start after:

`PROCEED TO STAGE 3`

Stage 3 does NOT re-run the entire audit blindly.

It consolidates Stage 1 + Stage 2 into the final acceptance report and performs the FINAL ANTI-SKIPPING CHECK.

---

# 84. FINAL ANTI-SKIPPING CHECK

Before producing the final verdict, verify:

```text
[ ] Three supplied inputs identified
[ ] Backend documentation fully read
[ ] Frontend recursively inspected for backend requirements
[ ] Backend recursively inspected
[ ] Relevant authored files inspected
[ ] Exclusions recorded
[ ] Unreadable files recorded
[ ] Frontend API/network inventory complete
[ ] Every frontend backend-derived requirement assigned an ID
[ ] Frozen requirement baseline created
[ ] Every requirement compared with backend capability
[ ] Every endpoint checked
[ ] Every request field checked
[ ] Every response field checked
[ ] Response semantics checked
[ ] Every error contract checked
[ ] Every enum checked
[ ] Every lookup checked
[ ] Every table field checked
[ ] Every KPI checked
[ ] Every chart series checked
[ ] Every filter checked
[ ] Every search checked
[ ] Every sort checked
[ ] Every pagination flow checked
[ ] Every CRUD/action backend dependency checked
[ ] Auth checked
[ ] RBAC checked
[ ] Resource authorization checked
[ ] Tenant isolation checked
[ ] IDOR checked
[ ] Idempotency checked
[ ] Concurrency checked
[ ] Transactions checked
[ ] Audit trail checked
[ ] Events checked
[ ] Background jobs checked
[ ] Async lifecycle checked
[ ] File/export/import checked
[ ] Webhooks checked
[ ] External adapters checked
[ ] Realtime checked
[ ] Database fields/relations checked
[ ] Indexes/constraints checked
[ ] Migrations checked
[ ] N+1 checked
[ ] Every applicable backend architecture rule checked
[ ] Tests checked for behavioral integrity
[ ] Documentation checked against implementation
[ ] Shared/outside-scope dependencies classified
[ ] Runtime availability disclosed
[ ] Omission sweep completed
[ ] No requirement baseline silently changed
[ ] No false-positive missing-backend issue created for outside-scope shared endpoints
[ ] No static UI configuration incorrectly classified as backend requirement
[ ] No mock/MSW behavior treated as real backend proof
[ ] No field-existence-only PASS
[ ] No arbitrary score used
```

If any item is not satisfied, do not claim a fully verified audit.

---

# 85. FINAL COMPLETENESS TEST

The final question is:

> Can a backend engineer implement every missing item from this report without asking the auditor "what did you mean?"

For every unresolved issue, the engineer must know:

* what is wrong;
* where it is wrong;
* why it is wrong;
* what the frontend actually requires;
* what the backend currently does;
* which backend rule applies;
* which file/layer owns the correction;
* what must change;
* what must NOT change;
* what test must prove it;
* what exact condition means DONE.

If the report cannot answer these questions, the audit is incomplete.

---

# 86. FINAL REPORT STRUCTURE

The final Stage 3 response MUST use this structure:

# FINAL BACKEND AUDIT

## 1. Executive Result

```text
FRONTEND-REQUIRED BACKEND COMPLETENESS:
...

BACKEND ARCHITECTURE COMPLIANCE:
...

RUNTIME VERIFICATION:
...

OVERALL READINESS:
...
```

## 2. Scope and Coverage

Provide exact coverage numbers.

## 3. Requirement Coverage

Provide the final requirement matrix.

## 4. Endpoint Contract Status

Provide endpoint matrix.

## 5. Critical Missing Backend Capabilities

Only actual missing capabilities.

## 6. Backend Contract Misalignments

Only actual mismatches.

## 7. Security / Tenant / Authorization Findings

Only evidence-backed findings.

## 8. Database / Persistence Findings

Only evidence-backed findings.

## 9. Async / Jobs / Files / Webhooks / Realtime Findings

Only applicable findings.

## 10. Backend Architecture Rule Ledger

Every rule.

## 11. Test Coverage / Integrity

Show real behavioral proof and missing proof.

## 12. Documentation Drift

Show actual inconsistencies.

## 13. OUTSIDE-SCOPE / BLOCKED ITEMS

Clearly separate them from backend defects.

## 14. Repair Order

Dependency-ordered phases.

## 15. DO-NOT-BREAK Invariants

Only discovered real invariants.

## 16. Final Acceptance Conditions

Exact binary DONE criteria.

## 17. Final Verdict

Use the four-axis verdict:

```text
FRONTEND-REQUIRED BACKEND COMPLETENESS
BACKEND ARCHITECTURE COMPLIANCE
RUNTIME VERIFICATION
SCOPE / EVIDENCE COMPLETENESS
```

---


---

# 86. PROJECT-SPECIFIC STRICT CONSTRAINTS (GYMSMART ERP)

You MUST verify the following strict architectural rules that are specific to this project:

## 86.4 Markdown Artifact Output Requirement
DO NOT dump massive output tables directly into the chat. You MUST write your findings for each stage into separate Markdown Artifact files using your file-writing tools.
- Stage 1 Output → `stage_1_frontend_requirements.md`
- Stage 2 Output → `stage_2_backend_audit.md`
- Stage 3 Output → `stage_3_final_verdict.md`
Link to these files in the chat when you ask the user to PROCEED to the next stage.


## 86.8 Backend Architecture Final Scorecard (101 Rules)
When outputting your Stage 2 and Final Verdict, you MUST include this exact table structure to grade the backend against the 101 Rules:
| Category | PASS | FAIL | PARTIAL | NOT VERIFIED |
|---|---|---|---|---|
| Module Boundary (Rules 0A-0C) | | | | |
| Micro-modularization (Rules 1-4) | | | | |
| Infrastructure & Docs (Rules 11-20) | | | | |
| Asset, Security & DB (Rules 21-30) | | | | |
| Financial, Events & Performance (Rules 31-45) | | | | |
| Architecture Isolation (Rules 46-60) | | | | |
| Quality & Security (Rules 61-75) | | | | |
| AI Context & Contract (Rules 76-101) | | | | |

# 87. FINAL PRINCIPLE

Never finish with:

```text
"The backend looks mostly good."
"The backend can be improved."
"The API seems aligned."
```

Those statements are not an audit result.

The final report must answer:

```text
WHAT DOES THE FRONTEND ACTUALLY REQUIRE?

WHAT DOES THE BACKEND ACTUALLY PROVIDE?

WHERE EXACTLY DO THEY MATCH?

WHERE EXACTLY DO THEY NOT MATCH?

WHICH BACKEND REQUIREMENTS ARE MISSING?

WHICH EXISTING BACKEND CAPABILITIES ARE SEMANTICALLY WRONG?

WHICH ISSUES ARE ARCHITECTURE VIOLATIONS?

WHICH ISSUES ARE SECURITY / TENANT / AUTHORIZATION RISKS?

WHICH ITEMS ARE OUTSIDE THE SUPPLIED BACKEND SCOPE?

WHICH ITEMS COULD NOT BE RUNTIME VERIFIED?

WHAT EXACTLY MUST BE REPAIRED?

WHAT EXACT TEST PROVES EACH REPAIR?

WHAT EXACT CONDITION MAKES THE BACKEND COMPLETE?
```

The final quality bar is:

```text
FRONTEND ACTUAL REQUIREMENTS
→
EXPECTED BACKEND CONTRACT
→
ACTUAL BACKEND IMPLEMENTATION
→
DATABASE / DOMAIN BEHAVIOR
→
SECURITY / TENANT / TRANSACTION INTEGRITY
→
RESPONSE / ERROR CONTRACT
→
TEST PROOF
→
DOCUMENTATION
```

No shortcut.

No sampling.

No guessing.

No invented requirements.

No fake PASS.

No frontend repair.

No arbitrary score.

No "endpoint exists, therefore complete."

A backend is complete only when the evidence proves that it can genuinely support the frontend's actual requirements and satisfy the applicable backend architecture rules.
