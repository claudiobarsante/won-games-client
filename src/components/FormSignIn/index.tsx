import * as S from './styles';
import { Email, Lock } from '@styled-icons/material-outlined';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Link from 'next/link';
import { FormContainer, FormLink } from 'components/Form';

const FormSignIn = () => (
  <FormContainer>
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
      <FormLink>
        Don’t have an account?{''}
        <Link href="/sign-up">
          <a>Sign up</a>
        </Link>
      </FormLink>
    </form>
  </FormContainer>
);

export default FormSignIn;
