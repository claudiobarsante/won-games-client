//import { screen } from '@testing-library/react';

//import { renderWithTheme } from 'utils/tests/helpers';
import { render, screen } from 'utils/test-utils';
import FormSignIn from '.';

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

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    // verifique email
    // verifique password
    // verifique button
    const { container } = render(<FormSignIn />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in now/i })
    ).toBeInTheDocument();

    expect(container.parentElement).toMatchSnapshot();
  });

  it('should render the forgot password link', () => {
    render(<FormSignIn />);

    expect(
      screen.getByRole('link', { name: /forgot your password\?/i })
    ).toBeInTheDocument();
  });

  it('should render text to sign up if already have an account', () => {
    render(<FormSignIn />);

    // text
    // link
    //expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/don’t have an account\?/i)).toBeInTheDocument();
  });
});
