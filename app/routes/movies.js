const express=require('express');
const routes=express.Router();

const movieController=require('../API/controllers/movies');

routes.get('/',movieController.getAll);
routes.post('/',movieController.create);
routes.get('/:movieId',movieController.getById);
routes.put('/:movieId',movieController.updateById);
routes.delete('/:movieId',movieController.deleteById);


module.exports=routes;