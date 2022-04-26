import { gql } from '@apollo/client';

export const MUTATION_REGISTER = gql`
  mutation MutationRegister($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      # user {
      #   username
      #   email
      #   confirmed
      #   blocked
      #   role {
      #     name
      #   }
      # }
    }
  }
`;
