import * as S from './styles';
import Button from 'components/Button';

export type HighlightProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttonLabel: string;
  buttonLink: string;
};
const Highlight = ({
  title,
  subtitle,
  backgroundImage,
  buttonLabel,
  buttonLink
}: HighlightProps) => (
  <S.Container backgroundImage={backgroundImage}>
    <S.Content>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      <Button as="a" href={buttonLink}>
        {buttonLabel}
      </Button>
    </S.Content>
  </S.Container>
);

export default Highlight;
