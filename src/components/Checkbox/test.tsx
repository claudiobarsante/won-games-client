import { screen } from '@testing-library/react';

import Checkbox from '.';
import { renderWithTheme } from './../../utils/tests/helpers';

describe('<Checkbox />', () => {
  it('should render with label', () => {
    renderWithTheme(<Checkbox label="checkbox label" labelFor="check" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    // from associated label
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument();
    //text from label
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check');
  });

  it('should render without label', () => {
    renderWithTheme(<Checkbox />);

    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument();
  });
});
