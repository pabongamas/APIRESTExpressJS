const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// const pool = require('./../libs/postgres.pool');
 const {models} = require('../libs/sequelize');

class ProductsService {
  constructor() {
  }
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products=await models.Product.findAll({
      include:['category']
    });
    return products;
  }

  async findOne(id) {
    const category = await models.Product.findByPk(id, {
      include: ['category']
    });
    return category;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
