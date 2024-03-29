//import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import { renderWithTheme } from 'utils/tests/helpers';
import { render, screen } from 'utils/test-utils';
import UserDropdown from '.';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  push: jest.fn() // or use query:{}
}));

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    render(<UserDropdown username="Willian" />);
    expect(screen.getByText(/willian/i)).toBeInTheDocument();
  });

  it('should render the menu', () => {
    render(<UserDropdown username="Willian" />);

    // open menu
    userEvent.click(screen.getByText(/willian/i));

    expect(
      screen.getByRole('link', { name: /my profile/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign out/i })
    ).toBeInTheDocument();
  });
});
