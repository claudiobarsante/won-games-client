import * as S from './styles';

export type CheckboxProps = {
  label?: string;
  labelFor?: string;
};

const Checkbox = ({ label, labelFor = '' }: CheckboxProps) => (
  <S.Container>
    <input id={labelFor} type="checkbox" />
    {!!label && <label htmlFor={labelFor}>{label}</label>}
  </S.Container>
);

export default Checkbox;
