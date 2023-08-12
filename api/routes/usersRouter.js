const express = require("express");
const UsersService = require('./../services/users.service');

const router=express.Router();
const serviceUser=new UsersService();

router.get('/',(req,res)=>{
  const users=serviceUser.find()
  res.json(users);
});

router.get("/:id",(req,res)=>{
  const {id}=req.params;
  const user=serviceUser.findOne(id);
  res.json(user);

})

module.exports=router;
