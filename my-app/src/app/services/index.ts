import { client } from "../graphql";
import { GET_PRODUCTS } from "./query";

const getProducts = async () => {
  const response = await client.query({ query: GET_PRODUCTS });
  console.log(response);
  return response;
};

export default getProducts;
