const express = require("express");
const { faker } = require("@faker-js/faker");
const router=express.Router();

router.get('/',(req,res)=>{
  const users=[];
  const {size}=req.query;
  const limit =size||10;
  for (let index = 0; index < limit; index++) {
    users.push({
      id:faker.number.int(),
      name:faker.person.fullName(),
      image:faker.image.url()
  })
  }
  res.json(users);
});


router.get('/',(req,res)=>{
  const {limit,offset}=req.query;
  if(limit&&offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send("No hay prametros")
  }
});

module.exports=router;
