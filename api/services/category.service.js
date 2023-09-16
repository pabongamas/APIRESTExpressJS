const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class CategoryService {
  constructor() {
    this.categories = [];
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category){
      throw boom.notFound('Categoria No encontrada');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    if(!category){
      throw boom.notFound('Categoria No encontrada');
    }
    const rta = await categories.update(changes);
    return rta;
  }

  async delete(id) {
    const category =  await this.findOne(id);
    if(!category){
      throw boom.notFound('Categoria No encontrada');
    }
    await category.destroy();
    return { id };
    
  }

}

module.exports = CategoryService;
