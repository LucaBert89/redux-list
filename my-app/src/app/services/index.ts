import { client } from "../graphql";
import { GET_PRODUCTS, GET_PRODUCT } from "./query";

const getProducts = async () => {
  const response = await client.query({ query: GET_PRODUCTS });

  return response;
};

const getSingleProduct = async (id: string | undefined) => {
  console.log(id);
  const response = await client.query({
    query: GET_PRODUCT,
    variables: { productId: id },
  });
  console.log(response);
  return response;
};

export { getProducts, getSingleProduct };
