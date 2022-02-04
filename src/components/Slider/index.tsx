import SlickSlider, { Settings } from 'react-slick';
import * as S from './styles';
import { forwardRef } from 'react';

export type SliderSettings = Settings;

export type SliderProps = {
  children: React.ReactNode;
  settings: SliderSettings;
};

const Slider: React.ForwardRefRenderFunction<SlickSlider, SliderProps> = (
  { children, settings },
  ref
) => (
  <S.Container>
    <SlickSlider ref={ref} {...settings}>
      {children}
    </SlickSlider>
  </S.Container>
);

export default forwardRef(Slider);
