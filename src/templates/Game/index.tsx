import Gallery, { GalleryImageProps } from 'components/Gallery';
import GameInfo, { GameInfoProps } from 'components/GameInfo';
import Base from 'templates/Base';
import TextContent from 'components/TextContent';
import * as S from './styles';
import GameDetails, { GameDetailsProps } from 'components/GameDetails';
import { GameCardProps } from 'components/GameCard';
import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';
import { Divider } from 'components/Divider';
import { NextSeo } from 'next-seo';

export type GameTemplateProps = {
  slug?: string;
  cover: string;
  gameInfo: GameInfoProps;
  gallery?: GalleryImageProps[];
  description: string;
  details: GameDetailsProps;
  upcomingGames: GameCardProps[];
  upcomingHighlight: HighlightProps;
  recommendedGames: GameCardProps[];
  recommendedTitle: string;
  upcomingTitle: string;
};
const Game = ({
  slug,
  cover,
  gameInfo,
  gallery,
  description,
  details,
  upcomingGames,
  upcomingHighlight,
  recommendedGames,
  recommendedTitle,
  upcomingTitle
}: GameTemplateProps) => (
  <Base>
    <NextSeo
      title={`${gameInfo.title} - Won Games`}
      description={gameInfo.description} // use a small description
      canonical={`https://wongames.willianjusten.com.br/game/${slug}`}
      openGraph={{
        url: `https://wongames.willianjusten.com.br/game/${slug}`,
        title: `${gameInfo.title} - Won Games`,
        description: gameInfo.description,
        images: [
          {
            url: cover,
            alt: `${gameInfo.title}`
          }
        ]
      }}
    />
    <S.Cover src={cover} role="image" aria-label="cover" />
    <S.Main>
      <S.SectionGameInfo>
        <GameInfo {...gameInfo} />
      </S.SectionGameInfo>
      <S.SectionGallery>
        {!!gallery && <Gallery items={gallery} />}
      </S.SectionGallery>
      <S.SectionDescription>
        <TextContent title="Description" content={description} />
      </S.SectionDescription>
      <S.SectionGameDetails>
        <GameDetails {...details} />
        <Divider />
      </S.SectionGameDetails>

      <Showcase
        title={upcomingTitle}
        games={upcomingGames}
        highlight={upcomingHighlight}
      />

      <Showcase title={recommendedTitle} games={recommendedGames} />
    </S.Main>
  </Base>
);

export default Game;
