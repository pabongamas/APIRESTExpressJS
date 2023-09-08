const { Strategy } = require('passport-local');
const UsersService = require('./../../../services/users.service');
const boom=require('boom');
const bcrypt=require('bcrypt');
const service = new UsersService();

const LocalStrategy = new Strategy(async (email, password, done) => {
  try {
    const user=await service.findByEmail(email);
    if(!user){
      done(boom.unauthorized(),false);
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      done(boom.unauthorized(),false);
    }
    done(null,user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;
