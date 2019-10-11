const express=require('express');
const routes= express.Router();

const userController=require('../API/controllers/users');

routes.post('/register',userController.create);
routes.post('/authenticate',userController.authenticate);

module.exports=routes;
