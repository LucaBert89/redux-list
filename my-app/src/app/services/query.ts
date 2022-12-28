import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
    Products {
      productId
      product
      productDescription
      productName
      price
      companyName
    }
  }
`;
