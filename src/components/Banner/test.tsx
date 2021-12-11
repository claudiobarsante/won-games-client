import { screen } from '@testing-library/react';

import Banner from '.';
import { renderWithTheme } from '../../utils/tests/helpers';

const props = {
  img: 'https://source.unsplash.com/user/willianjusten/1042x580',
  title: 'Defy death',
  subtitle: '<p>Play the new <strong>CrashLands</strong> season',
  buttonLabel: 'Buy now',
  buttonLink: '/games/defy-death'
};

describe('<Banner />', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(<Banner {...props} />);

    expect(
      screen.getByRole('heading', { name: /Defy death/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Play the new CrashLands season/ })
    ).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Defy death');
    expect(
      screen.getByRole('img', { name: /Defy death/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Buy now/i })).toHaveAttribute(
      'href',
      '/games/defy-death'
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
