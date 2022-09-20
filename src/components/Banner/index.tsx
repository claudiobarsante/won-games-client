import * as S from './styles';
import Button from './../Button';
import Ribbon, { RibbonSizes, RibbonColors } from 'components/Ribbon';
import Image from 'next/image';

export type BannerProps = {
  img: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
  ribbon?: React.ReactNode;
  ribbonSize?: RibbonSizes;
  ribbonColor?: RibbonColors;
};

const Banner = ({
  img,
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  ribbon,
  ribbonSize = 'normal',
  ribbonColor = 'primary'
}: BannerProps) => (
  <>
    <S.Container>
      {!!ribbon && (
        <Ribbon color={ribbonColor} size={ribbonSize}>
          {ribbon}
        </Ribbon>
      )}

      <S.ImageWrapper>
        <Image
          src={img}
          alt={title}
          layout="fill"
          objectFit="cover"
          aria-label={title}
        />
      </S.ImageWrapper>

      <S.Caption>
        <S.Title>{title}</S.Title>
        <S.Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
        <Button as="a" href={buttonLink} size="large">
          {buttonLabel}
        </Button>
      </S.Caption>
    </S.Container>
  </>
);

export default Banner;
