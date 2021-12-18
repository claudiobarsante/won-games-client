import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import { themeApp } from 'styles/theme';

import GameCard from '.';

const props = {
  name: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: '$235.00',
  promotionalPrice: ''
};
describe('<GameCard  />', () => {
  it('should render the GameCard correctly', () => {
    renderWithTheme(<GameCard {...props} />);

    expect(
      screen.getByRole('heading', { name: props.name })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: props.developer })
    ).toBeInTheDocument();

    expect(screen.getByRole('img', { name: props.name })).toBeInTheDocument();

    expect(screen.getByRole('img', { name: props.name })).toHaveAttribute(
      'src',
      'https://source.unsplash.com/user/willianjusten/300x140'
    );

    expect(screen.getByText(props.price)).toBeInTheDocument();

    expect(screen.getByLabelText(/Add To Wishlist/i)).toBeInTheDocument();
  });

  it('should render current price with no promotion', () => {
    renderWithTheme(<GameCard {...props} />);

    expect(screen.getByText(props.price)).toHaveStyle({
      backgroundColor: themeApp.colors.secondary
    });

    expect(screen.getByText(props.price)).not.toHaveStyle({
      'text-decoration': 'line-through'
    });
  });

  it('should render a line-through in price when promotional', () => {
    props.promotionalPrice = '$100';
    renderWithTheme(<GameCard {...props} />);

    expect(screen.getByText(props.price)).toHaveStyle({
      color: '#8F8F8F',
      'text-decoration': 'line-through'
    });
    expect(screen.getByText(props.promotionalPrice)).toHaveStyle({
      backgroundColor: '#3cd3c1'
    });
  });

  it('should render a filled  Favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />);

    expect(screen.getByLabelText(/Remove from Wishlist/i)).toBeInTheDocument();
  });

  it('should call onFave method when favorite is clicked', () => {
    const onFav = jest.fn();

    renderWithTheme(<GameCard {...props} favorite onFav={onFav} />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onFav).toBeCalled();

    expect(screen.getByLabelText(/Remove from Wishlist/i)).toBeInTheDocument();
  });

  it('should render Ribbon', () => {
    renderWithTheme(
      <GameCard
        {...props}
        ribbon="My Ribbon"
        ribbonColor="secondary"
        ribbonSize="small"
      />
    );
    const ribbon = screen.getByText(/my ribbon/i);

    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' });
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' });
    expect(ribbon).toBeInTheDocument();
  });
});
