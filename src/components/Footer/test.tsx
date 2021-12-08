import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../utils/tests/helpers';
import Footer from '.';

describe('<Footer />', () => {
  it('should render 4 column topics', () => {
    const { container } = renderWithTheme(<Footer />);

    const contact = screen.getByRole('heading', { name: /contact/i });
    expect(contact).toBeInTheDocument();
    expect(contact.getAttribute('color')).toBe('black');

    expect(
      screen.getByRole('heading', { name: /follow us/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /links/i })).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /location/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
