/**
 * RESPONSIBILITY: Owns the TypeScript props contract for SuperadminUsageMetersProgressBarProps.
 * INTENT: Keep component props isolated from JSX implementation according to the feature type-isolation rule.
 * DATA FLOW: Parent feature component -> SuperadminUsageMetersProgressBarProps -> presentational component.
 */
export interface SuperadminUsageMetersProgressBarProps {
  value: number;
  limit: number;
  className: string;
  title?: string;
}
