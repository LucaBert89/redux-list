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
    Product(productId: String): Product
  }

  type Mutation {
   removeProduct(productId:String!): Product
  }
`;
const PRODUCTS = [];
Array.from({ length: 5000 }).forEach(() => {
    PRODUCTS.push(createRandomProducts());
});
const resolvers = {
    Query: {
        Products: () => PRODUCTS,
        Product: (parent, args) => {
            return PRODUCTS.find((product) => product.productId === args.productId);
        },
    },
    Mutation: {
        removeProduct: (parent, args) => {
            console.log(args);
            const index = PRODUCTS.map(e => e.productId).indexOf(args.productId);
            if (index < 0) {
                throw new Error('Product not found.');
            }
            PRODUCTS.splice(index, 1);
            return args.productId;
        }
    }
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
