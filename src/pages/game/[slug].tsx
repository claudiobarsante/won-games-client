import Game, { GameTemplateProps } from 'templates/Game';
import { useRouter } from 'next/router';
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games';
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { initializeApollo } from 'utils/apollo';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { gamesMapper, highlightMapper } from 'utils/mappers';
import {
  QueryUpcoming,
  QueryUpcomingVariables
} from 'graphql/generated/QueryUpcoming';
import { QUERY_UPCOMING } from 'graphql/queries/upcoming';
import { getImageUrl } from 'utils/getImageUrl';

const apolloClient = initializeApollo();

export default function Index(props: GameTemplateProps) {
  const router = useRouter();

  // se a rota não tiver sido gerada ainda
  // você pode mostrar um loading
  // uma tela de esqueleto
  if (router.isFallback) return null;

  return <Game {...props} />;
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  });

  const paths = data.games.map((game) => ({ params: { slug: game.slug } }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {
  //Get game data
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache'
  });

  if (!data.games.length) {
    return { notFound: true };
  }

  const game = data.games[0];

  //Get recommended games
  const { data: recommendedSection } =
    await apolloClient.query<QueryRecommended>({
      query: QUERY_RECOMMENDED
    });

  //Get upcomming games and highlight
  const TODAY = new Date().toISOString().slice(0, 10);
  const { data: upcoming } = await apolloClient.query<
    QueryUpcoming,
    QueryUpcomingVariables
  >({ query: QUERY_UPCOMING, variables: { date: TODAY } });

  return {
    revalidate: 60,
    props: {
      slug: params?.slug,
      cover: `${getImageUrl(game.cover?.src)}`,
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `${getImageUrl(image.src)}`,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: upcoming.showcase?.upComingGames?.title,
      upcomingGames: gamesMapper(upcoming.upcomingGames),
      upcomingHighlight: highlightMapper(
        upcoming.showcase?.upComingGames?.highlight
      ),
      recommendedTitle: recommendedSection.recommended?.section?.title,
      recommendedGames: gamesMapper(
        recommendedSection.recommended?.section?.games
      )
    }
  };
};
