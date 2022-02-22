import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import { themeApp } from 'styles/theme';

import ProfileMenu from '.';

describe('<ProfileMenu />', () => {
  it('should render the menu', () => {
    const { container } = renderWithTheme(<ProfileMenu />);

    // verificar os 4 links existentes
    expect(
      screen.getByRole('link', { name: /my profile/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /my cards/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /my orders/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign out/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the menu with an active link defined', () => {
    renderWithTheme(<ProfileMenu activeLink="/profile/cards" />);

    expect(screen.getByRole('link', { name: /my cards/i })).toHaveStyle({
      background: themeApp.colors.primary,
      color: themeApp.colors.white
    });
  });
});
