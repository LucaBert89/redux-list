import { client } from "../graphql";
import { GET_USERS } from "./query";

const getPosts = async () => {
  const response = await client.query({ query: GET_USERS });
  console.log(response);
  return response;
};

export default getPosts;
