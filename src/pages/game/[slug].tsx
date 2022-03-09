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
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` }
  });

  if (!data.games.length) {
    return { notFound: true };
  }

  const game = data.games[0];

  return {
    props: {
      revalidate: 60,
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `http://localhost:1337${image.src}`,
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
      }
    }
  };
};
