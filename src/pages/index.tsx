import Home, { HomeTemplateProps } from 'templates/Home';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';
import { initializeApollo } from 'utils/apollo';
import { QueryHome, QueryHomeVariables } from 'graphql/generated/QueryHome';
import { QUERY_HOME } from 'graphql/queries/home';
import { GetStaticProps } from 'next';
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers';

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const TODAY = new Date().toISOString().slice(0, 10);
  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query<QueryHome, QueryHomeVariables>({
    query: QUERY_HOME,
    variables: {
      date: TODAY
    }
  });

  return {
    props: {
      revalidade: 60,
      banners: bannerMapper(banners),
      newGames: gamesMapper(newGames),
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      upcomingGames: gamesMapper(upcomingGames),
      upcomingHighligth: highlightMapper(sections?.upComingGames?.highlight),
      freeGames: gamesMapper(freeGames),
      freeHighligth: highlightMapper(sections?.freeGames?.highlight),
      newGamesTitle: sections?.newGames?.title,
      mostPopularGamesTitle: sections?.popularGames?.title,
      upcomingGamesTitle: sections?.upComingGames?.title,
      freeGamesTitle: sections?.freeGames?.title
    }
  };
};
