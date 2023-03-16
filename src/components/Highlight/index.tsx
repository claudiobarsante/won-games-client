import * as S from './styles';
import Button from 'components/Button';
import Image from 'next/image';

export type HighlightProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttonLabel: string;
  buttonLink: string;
  floatImage?: string;
  alignment?: 'right' | 'left';
};
const Highlight = ({
  title,
  subtitle,
  backgroundImage,
  buttonLabel,
  buttonLink,
  floatImage,
  alignment = 'right'
}: HighlightProps) => (
  <S.Container alignment={alignment} data-cy="highlight">
    <Image src={backgroundImage} alt={`${title} background`} layout="fill" />
    {!!floatImage && (
      <S.FloatImageWrapper>
        <Image src={floatImage} alt={title} width={400} height={300} />
      </S.FloatImageWrapper>
    )}
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
