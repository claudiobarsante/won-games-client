// -- Important this file has to be the first one imported
import '../../../.jest/match-media-mock';
// -- has to mock the matchmedia because the tests are running in the jsdom and it don't have all the features
// --
//import { render, screen } from '@testing-library/react';
import { render, screen } from 'utils/test-utils';
import Slider from '.';

describe('<Slider />', () => {
  it('should render children as slider item', () => {
    const { container } = render(
      <Slider settings={{ slidesToShow: 1, infinite: false }}>
        <p>Item 1</p>
        <p>Item 2</p>
      </Slider>
    );

    // -- parentElement?.parentElement has to go 2 levels up
    expect(
      screen.getByText(/item 1/i).parentElement?.parentElement
    ).toHaveClass('slick-slide');

    expect(
      screen.getByText(/item 2/i).parentElement?.parentElement
    ).toHaveClass('slick-slide');

    expect(container.firstChild).toMatchSnapshot();
  });
});
