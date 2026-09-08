# 🚫 FORBIDDEN IN MANAGER SCHEDULE MODULE

1. **No direct DOM manipulation for Tooltips**: Do not use `title=` attribute on HTML elements to show tooltips. Always use `<ManagerTooltip>`.
2. **No useState for search/filters**: Do not store the search or day filter in local React state. Always use `useSearchParams` to ensure shareable URLs.
3. **No hardcoded generic `<p>` tag empty states**: Always use `<ManagerEmptyState />` for lists/tables that have no data.
4. **No global/admin imports**: Do not import components or types from `/admin` or `/superadmin`.
5. **No inline colors**: Do not hardcode colors in `ManagerScheduleKPIs` or `ManagerScheduleWeeklyGrid`. Use defined theme tokens.
