import { faker } from "@faker-js/faker";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const typeDefs = `#graphql
  type Product {
    productId: String
    product: String
    productDescription: String
    productName: String
    price: Float
    companyName: String
  }

  type Query {
    Products: [Product]
  }
`;
const PRODUCTS = [];
Array.from({ length: 5000 }).forEach(() => {
    PRODUCTS.push(createRandomProducts());
});
const resolvers = {
    Query: {
        Products: () => PRODUCTS,
    },
};
function createRandomProducts() {
    return {
        productId: faker.datatype.uuid(),
        product: faker.commerce.product(),
        productDescription: faker.commerce.productDescription(),
        productName: faker.commerce.productName(),
        price: faker.commerce.price(),
        companyName: faker.company.name(),
    };
}
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Server listening at: ${url}`);