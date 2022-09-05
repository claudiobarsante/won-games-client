import { Favorite, FavoriteBorder } from '@styled-icons/material-outlined';
import Button, { ButtonProps } from 'components/Button';
import { useWishlist } from 'hooks/use-wishlist';
import { useSession } from 'next-auth/react';

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
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const ButtonText = isInWishlist(id)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';

  if (status === 'unauthenticated') return null;

  return (
    <Button
      icon={
        isInWishlist(id) ? (
          <Favorite aria-label={ButtonText} />
        ) : (
          <FavoriteBorder aria-label={ButtonText} />
        )
      }
      minimal
      size={size}
    >
      {hasText && ButtonText}
    </Button>
  );
};

export default WishlistButton;
