/**
 * @note Dashboard does NOT have a dedicated database entity.
 * Dashboard metrics are computed aggregations (COUNT queries, SUM queries)
 * derived from other entities (Gym, Invoice, Plan, etc.).
 *
 * The DashboardService computes these values dynamically.
 * No persistent dashboard data is stored in the database.
 */
