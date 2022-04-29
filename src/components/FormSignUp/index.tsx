import Link from 'next/link';
import {
  AccountCircle,
  Email,
  Lock,
  ErrorOutline
} from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';
import {
  FormContainer,
  FormLink,
  FormLoading,
  FormError
} from 'components/Form';
import { useState } from 'react';
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';
import { useMutation } from '@apollo/client';
import { MUTATION_REGISTER } from 'graphql/mutations/register';
import { signIn } from 'next-auth/react';
import { FieldErrors, signUpValidate } from 'utils/validations';

const FormSignUp = () => {
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  });

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) =>
      setFormError(
        err?.graphQLErrors[0]?.extensions?.exception.data.message[0].messages[0]
          .message
      ),
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

    setFormError('');

    const errors = signUpValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      return;
    }

    setFieldError({});

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
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="User name"
          type="text"
          error={fieldError?.username}
          onInputChange={(newValue) => handleInput('username', newValue)}
          icon={<AccountCircle />}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldError?.email}
          onInputChange={(newValue) => handleInput('email', newValue)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
          onInputChange={(newValue) => handleInput('password', newValue)}
          icon={<Lock />}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          error={fieldError?.confirm_password}
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
