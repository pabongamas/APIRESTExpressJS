const { faker } = require('@faker-js/faker');
const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt=require('bcrypt');
// const getConnection=require('../libs/postgres')
// const pool=require('./../libs/postgres.pool');
class UsersService {
  constructor() {
    this.users = [];
    this.generate();
    // this.pool=pool;
    // this.pool.on('error', (err) => console.log("el error es"+err));
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        image: faker.image.url(),
      });
    }
  }
  async create(data) {
    const hash=await bcrypt.hash(data.password,10);
    const newUser = await models.User.create({
      ...data,
      password:hash
    });
    //quitar password del usuario creado al retornanr la informacion al frontend
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include:['customer']
    });
    return rta;
    // const query='select * from tasks';
    // try {
    //   const rta=await this.pool.query(query);
    //   return rta.rows;
    // } catch (e) {
    //  console.log("aca");
    // }

    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // return rta.rows;
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where:{email}
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return  user ;
    // return this.users.find((user) => user.id === id);
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user =  await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
