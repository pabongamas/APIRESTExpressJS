const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);


router.get('/filter', (req, res) => {
  res.send('yo soy un fillter');
});
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    // if(id==='999'){
    //   res.status(404).json({
    //     message:"Not found"
    //   });
    // }else{
    //   res.status(200).json({
    //     id,
    //     name:'product 2',
    //     price:2000
    //   });
    // }
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);
//el patch y el put hacen la misma accion , se puede utilizar para actualizar , solo que por convencion se indica que el put se le tiene que enviar todo los campos del
//objeto , el patch no ,este puede ser parcial
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }

    // res.json({
    //   message:'Updated',
    //   data:body,
    //   id,
    // })
  },
);
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
  // res.json({
  //   message:'Deleted',
  //   id,
  // })
});

module.exports = router;
