//import { screen } from '@testing-library/react';
//import { render } from 'utils/tests/helpers';
import { render, screen } from 'utils/test-utils';
import GameInfo from '.';

import 'session.mock'; //is importing from /jest/session.mock.ts

const props = {
  id: '1',
  title: 'My Game Title',
  description: 'Game Description',
  price: 210
};

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    const { container } = render(<GameInfo {...props} />);

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
    render(<GameInfo {...props} />);

    // esperar button add to cart
    // esperar button wishlist
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add to wishlist/i })
    ).toBeInTheDocument();
  });
});
