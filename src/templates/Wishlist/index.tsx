import Base from 'templates/Base';
import { Container } from 'components/Container';
import Heading from 'components/Heading';
import Showcase from 'components/Showcase';
import { Grid } from 'components/Grid';

import GameCard, { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';
import { Divider } from 'components/Divider';
import Empty from 'components/Empty';
import { useWishlist } from 'hooks/use-wishlist';
import Loader from 'components/Loader';
import * as S from './styles';

export type WishlistTemplateProps = {
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
  recommendedTitle?: string;
};

const Wishlist = ({
  recommendedGames,
  recommendedHighlight,
  recommendedTitle = 'You may like these games'
}: WishlistTemplateProps) => {
  const { items, loading } = useWishlist();

  return (
    <Base>
      <Container data-cy="wishlist">
        <Heading lineLeft lineColor="secondary">
          Wishlist
        </Heading>

        {loading ? (
          <S.Loading>
            <Loader />
          </S.Loading>
        ) : items.length >= 1 ? (
          <Grid>
            {items?.map((game, index) => (
              <GameCard key={`wishlist-${index}`} {...game} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="Your wishlist is empty"
            description="Games added to your wishlist will appear here"
            hasLink
          />
        )}
        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
};
export default Wishlist;
