const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class CustomersService {
  constructor() {
    this.customers = [];
    this.generate();
  }
  generate() {}
  async create(data) {
    //esto para crear un customer normalmente osea crear un customer con un id dado
    // const newCustomer = await models.Customer.create(data);
    //si utilizamos el creacion del customer con la creacion del usuario en el mismo obj
    //dado debemos hacer esto , crear primero  el usuario con los datos que mandan en el 
    //objeto user
    // const newUser = await models.User.create(data.user);
    //en ...data va estar toda la informacion ,esta va a igualarse con el patch y le definimos 
    //el user id para la relacion entre customer y user
    // const newCustomer = await models.Customer.create({
    //     ...data,
    //     userId:newUser.id
    // });
    //essto anterior se puede mejorar de la siguiente manera 
     const newCustomer = await models.Customer.create(data,{
        include:['user']
     });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomersService;
