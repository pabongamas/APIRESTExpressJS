const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}
  async create(userId) {
   
    const customer=await models.Customer.findOne({
      where:{'$user.id$':userId},
      include:[
        {
          association:'user',
        }
      ]
    })
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    const customerId=customer.id;
    const newOrder = await models.Order.create({"customerId":customerId});
    return newOrder;
  }
  async addItem(data) {
    // contiene la relacion con ordenes y productos el OrderProduct
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const rta = await models.Order.findAll({
      include: ['customer'],
    });
    return rta;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      // estas asociaciones se hacen aca en el array include y se  pueden hacer tanto en
      // el objeto especificando o solo el alias de la asociacion
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return order;
  }
  async findByUser(userId){
    const orders=await models.Order.findAll({
      where:{'$customer.user.id$':userId},
      include:[
        {
          association:'customer',
          include:['user']
        }
      ]
    });
    return orders;
  }

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = OrderService;
