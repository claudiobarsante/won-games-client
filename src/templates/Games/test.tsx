import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import filterItemsMock from 'components/ExploreSidebar/mock';
import { MockedProvider } from '@apollo/client/testing';

import Games from '.';
import { fetchMoreMock, gamesMock, noGamesMock } from './mocks';
import userEvent from '@testing-library/user-event';
import apolloCache from 'utils/apolloCache';
import 'session.mock';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const push = jest.fn();

useRouter.mockImplementation(() => ({
  prefetch: jest.fn().mockResolvedValue(undefined),
  push,
  query: '',
  asPath: '',
  route: '/'
}));

// to avoid errors 'create element' - use link too when mocking rounter
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  }
}));

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

// jest.mock('components/ExploreSidebar', () => ({
//   __esModule: true,
//   default: function Mock({ children }: { children: React.ReactNode }) {
//     return <div data-testid="Mock ExploreSidebar">{children}</div>;
//   }
// }));

describe('<Games />', () => {
  it('should render sections', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    // we wait until we have data to get the elements
    // get => tem certeza do elemento
    // query => Não tem o elemento
    // find => processos assincronos
    // expect(
    //   await screen.findByTestId('Mock ExploreSidebar')
    // ).toBeInTheDocument();
    expect(await screen.findByText(/Price/i)).toBeInTheDocument();
    expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument();
    expect(
      await screen.getByRole('button', { name: /show more/i })
    ).toBeInTheDocument();
  });

  it('should render more games when show more is clicked', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: /show more/i }));

    expect(await screen.findByText(/Fetch More Game/i)).toBeInTheDocument();

    // screen.logTestingPlaygroundURL();
  });

  it('should change push router when selecting a filter', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    userEvent.click(await screen.findByRole('checkbox', { name: /windows/i }));
    userEvent.click(await screen.findByRole('checkbox', { name: /linux/i }));
    userEvent.click(await screen.findByLabelText(/low to high/i));

    expect(push).toHaveBeenCalledWith({
      pathname: '/games',
      query: { platforms: ['windows', 'linux'], sort_by: 'low-to-high' }
    });
  });

  it('should render empty when no games found', async () => {
    renderWithTheme(
      <MockedProvider mocks={[noGamesMock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    expect(
      await screen.findByText(/We didn't find any games with this filter/i)
    ).toBeInTheDocument();
  });
});
