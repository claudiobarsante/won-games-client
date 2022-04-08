import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import filterItemsMock from 'components/ExploreSidebar/mock';
import { MockedProvider } from '@apollo/client/testing';

import Games from '.';
import { QUERY_GAMES } from 'graphql/queries/games';
import { fetchMoreMock, gamesMock } from './mocks';
import userEvent from '@testing-library/user-event';
import apolloCache from 'utils/apolloCache';

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

jest.mock('components/ExploreSidebar', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock ExploreSidebar">{children}</div>;
  }
}));

describe('<Games />', () => {
  it('should render sections', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    // it starts without data
    // shows loading
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    // we wait until we have data to get the elements
    // get => tem certeza do elemento
    // query => Não tem o elemento
    // find => processos assincronos
    expect(
      await screen.findByTestId('Mock ExploreSidebar')
    ).toBeInTheDocument();
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

    screen.logTestingPlaygroundURL();
  });
});