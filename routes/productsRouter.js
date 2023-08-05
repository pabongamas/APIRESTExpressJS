const express = require("express");
const { faker } = require("@faker-js/faker");

const router=express.Router();


router.get("/",(req,res)=>{
  const products=[];
  const {size}=req.query;
  const limit =size||10;
  for (let index = 0; index < limit; index++) {
  products.push({
    name:faker.commerce.productName(),
    price:parseInt(faker.commerce.price(),10),
    image:faker.image.url(),
  })
  }
  res.json(products);
})


router.get('/filter',(req,res)=>{
  res.send('yo soy un fillter');
})
router.get("/:id",(req,res)=>{
  const {id}=req.params;
  if(id==='999'){
    res.status(404).json({
      message:"Not found"
    });
  }else{
    res.status(200).json({
      id,
      name:'product 2',
      price:2000
    });
  }

})

router.post('/',(req,res)=>{
  const body=req.body;
  res.status(201).json({
    message:'Created',
    data:body
  })
});
//el patch y el put hacen la misma accion , se puede utilizar para actualizar , solo que por convencion se indica que el put se le tiene que enviar todo los campos del
//objeto , el patch no ,este puede ser parcial
router.patch('/:id',(req,res)=>{
  const{id}=req.params;
  const body=req.body;
  res.json({
    message:'Updated',
    data:body,
    id,
  })
});
router.delete('/:id',(req,res)=>{
  const{id}=req.params;
  res.json({
    message:'Deleted',
    id,
  })
});

module.exports=router;
