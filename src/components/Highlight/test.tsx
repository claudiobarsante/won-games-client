//import { screen } from '@testing-library/react';
//import { renderWithTheme } from 'utils/tests/helpers';

import { render, screen } from 'utils/test-utils';
import Highlight from '.';
import * as S from './styles';

const props = {
  title: 'Heading 1',
  subtitle: 'Heading 2',
  backgroundImage: '/img/red-dead-img.jpg',
  buttonLabel: 'Buy now',
  buttonLink: '/rdrd2'
};
describe('<Highlight />', () => {
  it('should render headings and button', () => {
    render(<Highlight {...props} />);

    expect(
      screen.getByRole('heading', { name: /Heading 1/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Heading 2/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Buy now/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Buy now/i })).toHaveAttribute(
      'href',
      '/rdrd2'
    );
  });

  it('should render background image', () => {
    const { container } = render(<Highlight {...props} />);

    // -- will get the S.Container(section)
    expect(container.firstChild).toBeInTheDocument();

    expect(container.firstChild).toHaveStyle({
      backgroundImage: `url(${props.backgroundImage})`
    });
  });

  it('should render float image', () => {
    render(<Highlight {...props} floatImage="/float-image.png" />);

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      '/float-image.png'
    );
  });

  it('should render align right by default', () => {
    const { container } = render(<Highlight {...props} />);

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-areas',
      "'floatimage content'"
    );

    expect(container.firstChild).toHaveStyleRule('text-align', 'right', {
      modifier: `${S.Content}`
    });
  });

  it('should render align left', () => {
    const { container } = render(<Highlight {...props} alignment="left" />);

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-areas',
      "'content floatimage'"
    );

    expect(container.firstChild).toHaveStyleRule('text-align', 'left', {
      modifier: `${S.Content}`
    });
  });
});
