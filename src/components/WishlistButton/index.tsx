import { Favorite, FavoriteBorder } from '@styled-icons/material-outlined';
import Button, { ButtonProps } from 'components/Button';
import { useWishlist } from 'hooks/use-wishlist';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Spinner from 'components/Spinner';

type WishlistButtonProps = {
  id: string;
  hasText?: boolean;
} & Pick<ButtonProps, 'size'>;

const WishlistButton = ({
  id,
  hasText,
  size = 'small'
}: WishlistButtonProps) => {
  const { data: session, status } = useSession();
  //the 'loading' from the useWishlist is global. So if I click in one
  //game all others wishlist buttons will show a loading spinner
  // so I have to use an individual state for each button
  const [loading, setLoading] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const handleClick = async () => {
    setLoading(true);
    isInWishlist(id) ? await removeFromWishlist(id) : await addToWishlist(id);
    setLoading(false);
  };

  const ButtonText = isInWishlist(id)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';

  if (status === 'unauthenticated') return null;

  return (
    <Button
      icon={
        loading ? (
          <Spinner />
        ) : isInWishlist(id) ? (
          <Favorite aria-label={ButtonText} />
        ) : (
          <FavoriteBorder aria-label={ButtonText} />
        )
      }
      onClick={handleClick}
      minimal
      size={size}
    >
      {hasText && ButtonText}
    </Button>
  );
};

export default WishlistButton;
