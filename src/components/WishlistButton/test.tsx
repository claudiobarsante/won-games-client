import { WishlistContextDefaultValues } from 'hooks/use-wishlist';
import { render, screen } from 'utils/test-utils';

import WishlistButton from '.';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useSession = jest.spyOn(require('next-auth/react'), 'useSession');
const mockSession = { jwt: '123', user: { email: 'lorem@ipsum.com' } };
useSession.mockImplementation(() => {
  return { data: mockSession, status: 'authenticated' };
});

describe('<WishlistButton />', () => {
  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    };

    render(<WishlistButton id="1" />, { wishlistProviderProps });

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument();
  });

  it('should render a button to remove from wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true
    };

    render(<WishlistButton id="1" />, { wishlistProviderProps });

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument();
  });

  it('should render a button with add to wishlist text', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    };

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

    expect(screen.getByText(/add to wishlist/i)).toBeInTheDocument();
  });

  it('should render a button with remove from wishlist text', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true
    };

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

    expect(screen.getByText(/remove from wishlist/i)).toBeInTheDocument();
  });

  it('should not render if not logged', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useSession = jest.spyOn(require('next-auth/react'), 'useSession');
    const mockSession = { jwt: '', user: { email: '' } };
    useSession.mockImplementationOnce(() => {
      return { data: mockSession, status: 'unauthenticated' };
    });

    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true
    };

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps });

    expect(screen.queryByText(/remove from wishlist/i)).not.toBeInTheDocument();
  });
});
