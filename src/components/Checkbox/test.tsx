//import { screen, waitFor } from '@testing-library/react';
import { themeApp } from 'styles/theme';
import userEvent from '@testing-library/user-event';
import Checkbox from '.';
//import { renderWithTheme } from './../../utils/tests/helpers';

import { render, screen, waitFor } from 'utils/test-utils';

describe('<Checkbox />', () => {
  it('should render with label', () => {
    render(<Checkbox label="checkbox label" labelFor="check" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    // from associated label
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument();
    //text from label
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check');
  });

  it('should render without label', () => {
    render(<Checkbox />);

    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument();
  });

  it('should render with black label', () => {
    render(
      <Checkbox label="checkbox label" labelFor="check" labelColor="black" />
    );
    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: themeApp.colors.black
    });
  });

  it('should dispatch onCheck when status change', async () => {
    const onCheck = jest.fn();
    render(<Checkbox label="Checkbox" onCheck={onCheck} />);

    expect(onCheck).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });

    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it('should dispatch onCheck when status change', async () => {
    const onCheck = jest.fn();
    render(<Checkbox label="Checkbox" onCheck={onCheck} isChecked />);

    expect(onCheck).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });

    expect(onCheck).toHaveBeenCalledWith(false);
  });

  it('should be accessible with tab', () => {
    render(<Checkbox label="Checkbox" labelFor="Checkbox" />);

    //first the page has the focus
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(screen.getByLabelText(/checkbox/i)).toHaveFocus();
  });
});
