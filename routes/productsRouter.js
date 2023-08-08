const express = require('express');
const ProductsService = require('./../services/product.service');
const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('yo soy un fillter');
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
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
  const product = await service.findOne(id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const body = req.body;
  // res.status(201).json({
  //   message:'Created',
  //   data:body
  // })
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});
//el patch y el put hacen la misma accion , se puede utilizar para actualizar , solo que por convencion se indica que el put se le tiene que enviar todo los campos del
//objeto , el patch no ,este puede ser parcial
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message:error.message
    });
  }
  
  // res.json({
  //   message:'Updated',
  //   data:body,
  //   id,
  // })
});
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
