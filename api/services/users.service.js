const { faker } = require("@faker-js/faker");
const getConnection=require('../libs/postgres')
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

  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM tasks');
    return rta.rows;
  }

  findOne(id) {
    return this.users.find((user) => user.id === id);
  }

  update() {}

  delete() {}
}

module.exports = UsersService;
