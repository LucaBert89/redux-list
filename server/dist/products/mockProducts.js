import { faker } from "@faker-js/faker";
// import { faker } from '@faker-js/faker/locale/de';
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
export default createRandomProducts;
