import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

export interface TrainerInfrastructureTooltipTriggerProps {
  className?: string;
  tabIndex?: number;
  'aria-describedby'?: string;
  'data-testid'?: string;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
}
