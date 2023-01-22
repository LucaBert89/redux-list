import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
    Products {
      productId
      product
      companyName
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($productId: String) {
    Product(productId: $productId) {
      productName
      price
      product
      productDescription
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: String!) {
    removeProduct(productId: $productId) {
      productId
    }
  }
`;


