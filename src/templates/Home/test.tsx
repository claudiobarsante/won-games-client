import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import 'match-media-mock';
import bannerMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Home from '.';

const props = {
  banners: bannerMock,
  newGames: gamesMock,
  mostPopularHighlight: highlightMock,
  mostPopularGames: gamesMock,
  upcommingGames: gamesMock,
  upcommingHighligth: highlightMock,
  upcommingMoreGames: gamesMock,
  freeGames: gamesMock,
  freeHighligth: highlightMock
};

// jest.mock('components/Menu', () => {
//   return {
//     __esModule: true, // - to declare that it's a ES6 module
//     default: function Mock() {
//       // - export default came here as default
//       return <div data-testid="Mock Menu"></div>;
//     }
//     // -named export could cme here
//     //foo: jest.fn(()=> ...)
//   };
// });

// jest.mock('components/Footer', () => {
//   return {
//     __esModule: true,
//     default: function Mock() {
//       return <div data-testid="Mock Footer"></div>;
//     }
//   };
// });

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase"></div>;
    }
  };
});

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Banner Slider"></div>;
    }
  };
});

describe('<Home />', () => {
  it('should render Banner and Showcases', () => {
    renderWithTheme(<Home {...props} />);

    //  expect(screen.getByTestId('Mock Menu')).toBeInTheDocument();
    expect(screen.getByTestId('Mock Banner Slider')).toBeInTheDocument();
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(5);
    // expect(screen.getByTestId('Mock Footer')).toBeInTheDocument();
  });
});
