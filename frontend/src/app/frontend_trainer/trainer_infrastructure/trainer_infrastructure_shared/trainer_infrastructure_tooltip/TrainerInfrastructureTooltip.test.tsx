import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it } from 'vitest';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/trainer_infrastructure_tooltip/TrainerInfrastructureTooltip';






describe('TrainerInfrastructureTooltip', () => {
  it('reveals content through a touch/click interaction', async () => {
    const user = userEvent.setup();
    render(<TrainerInfrastructureTooltip content="Full member name"><span>Truncated member name</span></TrainerInfrastructureTooltip>);
    await user.click(screen.getByText('Truncated member name'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Full member name');
  });
});
