import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    user(id: 1) {
      posts {
        data {
          id
          title
        }
      }
    }
  }
`;
