const UsersService = require('./users.service');
const service = new UsersService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const { config } = require('../../config/config');

const { models } = require('../libs/sequelize');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throwboom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throwboom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }
  signToken(user){
    const payload={
        sub:user.id,
        role:user.role
    }
    const token=jwt.sign(payload,config.jwtSecret);
    return {
        user,
        token
    }
  }
  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword,
      },
    });

    await transporter.sendMail({
      from: `"Foo Boo 👻" <${config.mailerEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Nuevo correo de prueba', // Subject line
      text: 'Estoy usando Nodemailer!', // plain text body
      html: '<b>Holaaaaaaaaaa!</b>', // html body
    });

    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
