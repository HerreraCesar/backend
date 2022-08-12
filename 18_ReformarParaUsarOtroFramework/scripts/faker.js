import { faker } from "@faker-js/faker";

const fakerProducts = async (quantity) => {
  let products = [];
  for (let i = 0; i < quantity; i++) {
    const product = {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.business(640, 480, true),
    };
    products.push(product);
  }
  return products;
};

export { fakerProducts };
