//import { screen } from '@testing-library/react';
//import { renderWithTheme } from 'utils/tests/helpers';
import { render, screen } from 'utils/test-utils';
import Ribbon from '.';

describe('<Ribbon />', () => {
  it('should render the text correctly', () => {
    render(<Ribbon>Best Seller</Ribbon>);

    expect(screen.getByText(/Best Seller/i)).toBeInTheDocument();
  });

  it('should render with the primary color', () => {
    render(<Ribbon color="primary">Best Seller</Ribbon>);

    expect(screen.getByText(/Best Seller/i)).toHaveStyle({
      'background-color': '#F231A5'
    });
  });

  it('should render with the secondary color', () => {
    render(<Ribbon color="secondary">Best Seller</Ribbon>);

    expect(screen.getByText(/Best Seller/i)).toHaveStyle({
      'background-color': '#3CD3C1'
    });
  });

  it('should render with the normal size as default', () => {
    render(<Ribbon size="normal">Best Seller</Ribbon>);

    expect(screen.getByText(/Best Seller/i)).toHaveStyle({
      height: '3.6rem',
      'font-size': '1.4rem'
    });
  });

  it('should render with the small size', () => {
    render(<Ribbon size="small">Best Seller</Ribbon>);

    expect(screen.getByText(/Best Seller/i)).toHaveStyle({
      height: '2.6rem',
      'font-size': '1.2rem'
    });
  });
});
