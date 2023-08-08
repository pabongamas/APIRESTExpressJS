const express = require("express");
const CategoriesService = require('./../services/categories.service');

const router=express.Router();
const serviceCategories=new CategoriesService();

router.get('/',(req,res)=>{
  const categories=serviceCategories.find();
  res.json(categories);
});

router.get("/:categoryId/products/:productId",(req,res)=>{
  const {categoryId,productId}=req.params;
  res.json({
    categoryId,productId
  });
})

module.exports=router;
