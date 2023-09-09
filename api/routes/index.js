const express=require('express');

const productsRouter=require('./productsRouter');
const usersRouter=require('./usersRouter');
const categoriesRouter=require('./categoriesRouter');
const customersRouter=require('./customersRouter');
const ordersRouter=require('./orders.router');
const authRouter=require('./auth.router');


function routerApi(app){
  const router=express.Router();
  app.use('/api/v1',router);
  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/categories',categoriesRouter);
  router.use('/customers',customersRouter);
  router.use('/orders',ordersRouter);
  router.use('/auth',authRouter);

}

module.exports=routerApi;
