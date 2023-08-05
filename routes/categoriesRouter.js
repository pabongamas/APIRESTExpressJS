const express = require("express");
const { faker } = require("@faker-js/faker");
const router=express.Router();

router.get('/',(req,res)=>{
  const categories=[];
  const {size}=req.query;
  const limit =size||10;
  for (let index = 0; index < limit; index++) {
    categories.push({
      id:faker.number.int(),
      name:faker.commerce.productName(),
      image:faker.image.url()
  })
  }
  res.json(categories);
});

router.get("/:categoryId/products/:productId",(req,res)=>{
  const {categoryId,productId}=req.params;
  res.json({
    categoryId,productId
  });
})

module.exports=router;
