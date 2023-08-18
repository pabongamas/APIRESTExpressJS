const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        image: faker.image.url(),
      });
    }
  }
  create() {}

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((categorie) => categorie.id === id);
  }

  update() {}

  delete() {}
}

module.exports = CategoriesService;
