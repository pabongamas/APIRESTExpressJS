const { faker } = require('@faker-js/faker');
const {Op}=require('sequelize');
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

  async find(query) {
    const options={
      include:['category'],
      where:{}
    }
    const {limit,offset,price}=query;
    if(limit && offset){
      options.limit=limit;
      options.offset=offset;
    }
    if(price){
      options.where.price=price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        // esto se hace con los operadores de  sequelize 
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products=await models.Product.findAll(options);
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
