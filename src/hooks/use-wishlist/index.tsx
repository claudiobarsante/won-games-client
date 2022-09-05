import { createContext, useContext, useEffect, useMemo } from 'react';
import { GameCardProps } from 'components/GameCard';
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist';
import { useQueryWishlist } from 'graphql/queries/wishlist';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { gamesMapper } from 'utils/mappers';
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist';
import { useMutation } from '@apollo/client';

export type WishlistContextData = {
  items: GameCardProps[];
  isInWishlist: (id: string) => boolean;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  loading: boolean;
};

export const WishlistContextDefaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false
};

export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues
);

export type WishlistProviderProps = {
  children: React.ReactNode;
};

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const { data: session, status } = useSession();
  const [wishlistId, setWishlistId] = useState<string | null>();
  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([]);

  const [createList, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.createWishlist?.wishlist?.games || []);
        setWishlistId(data?.createWishlist?.wishlist?.id);
      }
    }
  );

  const [updateList, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.updateWishlist?.wishlist?.games || []);
      }
    }
  );

  const isAuthenticated = status === 'authenticated' ? true : false;

  const { data, loading: loadingQuery } = useQueryWishlist({
    skip: !isAuthenticated, //can't run the query if there's no authenticated user
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  });

  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.games || []);
    setWishlistId(data?.wishlists[0]?.id);
  }, [data]);

  const isInWishlist = (id: string) =>
    !!wishlistItems.find((game) => game.id === id);

  const wishlistIds = useMemo(
    () => wishlistItems.map((game) => game.id),
    [wishlistItems]
  );

  const addToWishlist = (id: string) => {
    //*if the wishlist doesn't exist, create it
    if (!wishlistId) {
      return createList({
        variables: { input: { data: { games: [...wishlistIds, id] } } }
      });
    }
    //*if the wishlist exists, update it
    return updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: { games: [...wishlistIds, id] }
        }
      }
    });
  };

  const removeFromWishlist = (id: string) => {
    updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: { games: wishlistIds.filter((gameId: string) => gameId !== id) }
        }
      }
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        loading: loadingQuery || loadingCreate || loadingUpdate
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
