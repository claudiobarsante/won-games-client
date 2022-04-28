import Link from 'next/link';
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormContainer, FormLink, FormLoading } from 'components/Form';
import { useState } from 'react';
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';
import { useMutation } from '@apollo/client';
import { MUTATION_REGISTER } from 'graphql/mutations/register';
import { signIn } from 'next-auth/react';

const FormSignUp = () => {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  });

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => console.log(err),
    onCompleted: () => {
      !error &&
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        });
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    });
  };

  const handleInput = (field: string, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="User name"
          type="text"
          onInputChange={(newValue) => handleInput('username', newValue)}
          icon={<AccountCircle />}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          onInputChange={(newValue) => handleInput('email', newValue)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(newValue) => handleInput('password', newValue)}
          icon={<Lock />}
        />
        <TextField
          name="confirm-password"
          placeholder="Confirm password"
          type="password"
          onInputChange={(newValue) =>
            handleInput('confirm_password', newValue)
          }
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign up now</span>}
        </Button>

        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormContainer>
  );
};

export default FormSignUp;
