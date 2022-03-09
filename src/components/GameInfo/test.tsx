import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import GameInfo from '.';

const props = {
  title: 'My Game Title',
  description: 'Game Description',
  price: 210
};

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    const { container } = renderWithTheme(<GameInfo {...props} />);

    // esperar por um heading (title)
    // esperar por description
    // esperar pelo price
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /wishlist/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText(/\$210\.00/)).toBeInTheDocument();
  });

  it('should render buttons', () => {
    renderWithTheme(<GameInfo {...props} />);

    // esperar button add to cart
    // esperar button wishlist
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /wishlist/i })
    ).toBeInTheDocument();
  });
});
