const { faker } = require("@faker-js/faker");

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.person.fullName(),
        image: faker.image.url(),
      });
    }
  }
  create() {}

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find((user) => user.id === id);
  }

  update() {}

  delete() {}
}

module.exports = UsersService;
