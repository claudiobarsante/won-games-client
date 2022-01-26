import { screen } from '@testing-library/react';
import { themeApp } from 'styles/theme';

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

  it('should render with black label', () => {
    renderWithTheme(
      <Checkbox label="checkbox label" labelFor="check" labelColor="black" />
    );
    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: themeApp.colors.black
    });
  });
});
