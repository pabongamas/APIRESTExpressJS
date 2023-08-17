const { faker } = require("@faker-js/faker");
const getConnection=require('../libs/postgres')
const pool=require('./../libs/postgres.pool');
class UsersService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool=pool;
    this.pool.on('error', (err) => console.log("el error es"+err));
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
    const query='select * from tasks';
    const rta=await this.pool.query(query);
    return rta.rows;
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // return rta.rows;
  }

  findOne(id) {
    return this.users.find((user) => user.id === id);
  }

  update() {}

  delete() {}
}

module.exports = UsersService;
