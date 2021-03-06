//import { screen } from '@testing-library/react';
//import { renderWithTheme } from '../../utils/tests/helpers';
import { render, screen } from 'utils/test-utils';
import Heading from '.';

describe('<Heading />', () => {
  it('should render a white heading by default', () => {
    render(<Heading>Won Games</Heading>);
    //-- role heading = h1,h2,h3...
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      color: '#FAFAFA'
    });
  });

  it('should render a black heading when color is passed', () => {
    render(<Heading color="black">Won Games</Heading>);
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      color: '#030517'
    });
  });

  //? -- if the property has '-' or spaces should be wrapped with ''
  it('should render a heading with a line to the left side', () => {
    render(<Heading lineLeft>Won Games</Heading>);
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      'border-left': '0.7rem solid #F231A5'
    });
  });

  it('should render a heading with a line at the bottom', () => {
    render(<Heading lineBottom>Won Games</Heading>);
    // -- to test ::after, should use toHaveStyleRule and a modifier
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyleRule(
      'border-bottom',
      '0.5rem solid #F231A5',
      {
        modifier: '::after'
      }
    );
  });

  it('should render a heading with a small size', () => {
    render(<Heading size="small">Won Games</Heading>);
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      'font-size': '1.6rem'
    });
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyleRule(
      'width',
      '3rem',
      {
        modifier: '::after'
      }
    );
  });

  it('should render a heading with a huge size', () => {
    render(<Heading size="huge">Won Games</Heading>);

    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      'font-size': '5.2rem'
    });
  });

  it('should render a Heading with a secondary line color', () => {
    render(
      <Heading lineColor="secondary" lineLeft lineBottom>
        Lorem Ipsum
      </Heading>
    );

    const heading = screen.getByRole('heading', { name: /lorem ipsum/i });
    expect(heading).toHaveStyle({ 'border-left': '0.7rem solid #3CD3C1' });
    expect(heading).toHaveStyleRule('border-bottom', '0.5rem solid #3CD3C1', {
      modifier: '::after'
    });
  });
});
