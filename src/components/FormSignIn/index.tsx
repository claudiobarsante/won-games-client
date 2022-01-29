import * as S from './styles';
import { Email, Lock } from '@styled-icons/material-outlined';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Link from 'next/link';
const FormSignIn = () => (
  <S.Container>
    <form>
      <TextField
        name="email"
        placeholder="Email"
        type="email"
        icon={<Email />}
      />
      <TextField
        name="password"
        placeholder="Password"
        type="password"
        icon={<Lock />}
      />
      <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
      <Button size="large" fullWidth>
        Sign in now
      </Button>
      <S.FormLink>
        Don’t have an account?{''}
        <Link href="/sign-up">
          <a>Sign up</a>
        </Link>
      </S.FormLink>
    </form>
  </S.Container>
);

export default FormSignIn;
