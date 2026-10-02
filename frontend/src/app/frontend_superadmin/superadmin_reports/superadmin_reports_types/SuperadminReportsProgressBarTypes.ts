/**
 * RESPONSIBILITY: Owns the TypeScript props contract for SuperadminReportsProgressBarProps.
 * INTENT: Keep component props isolated from JSX implementation according to the feature type-isolation rule.
 * DATA FLOW: Parent feature component -> SuperadminReportsProgressBarProps -> presentational component.
 */
export interface SuperadminReportsProgressBarProps {
  value: number;
  className: string;
}
