import { client } from "../graphql";
import { GET_PRODUCTS } from "./query";

const getPosts = async () => {
  const response = await client.query({ query: GET_PRODUCTS });
  console.log(response);
  return response;
};

export default getPosts;
