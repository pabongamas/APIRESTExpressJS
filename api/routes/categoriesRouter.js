const express = require("express");
const passport = require('passport');
const CategoryService = require('../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');
const boom = require('@hapi/boom');

const router=express.Router();
const serviceCategories=new CategoryService();
const autenticacionJwt= passport.authenticate('jwt', { session: false });
router.get('/',autenticacionJwt, async (req, res, next) => {
  try {
    const categories = await serviceCategories.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
autenticacionJwt,
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await serviceCategories.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',autenticacionJwt,
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await serviceCategories.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.log("acaaaaa bvoy");
      next(error);
    }
  }
);

router.patch(
  '/:id',
  autenticacionJwt,
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await serviceCategories.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  autenticacionJwt,
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await serviceCategories.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports=router;
