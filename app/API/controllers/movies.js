const movieModel=require('../models/movies');

module.exports={
    getById:function (req,res,next) {
        console.log(req.body);

        movieModel.findById(req.params.movieId,function(err,movieInfo){
            if (err) {
                next(err);
            }else{
                res.json({
                    status:"success",
                    message:"Movie Found",
                    data:{movies:movieInfo}
                });
            }
        });
    },

    getAll:function (req,res,next) {
        let movieList=[];
    
        movieModel.find({},function(err,movies){
            if (err) {
                next(err);
            }else{
                for (const movie of movies) {
                    movieList.push({
                        id:movie._id,
                        name:movie.name,
                        release_on:movie.release_on
                    });
                }

                res.json({
                    status:"success",
                    message:"Movie List Found",
                    data:{movies:movieList}
                });    
            }
        });
    },

    updateById:function(req,res,next){
        movieModel.findByIdAndUpdate(req.params.movieId,
            {name:req.body.name},
            function (err,movieInfo){
                if (err) {
                    next(err);
                }else{
                    res.json({
                        status:"success",
                        message:"Movie updated Successfully",
                        data:null
                    });
                }
            }
            );
    },

    deleteById:function(req,res,next){

        movieModel.findByIdAndRemove(req.params.movieId,function(err,movieInfo){

            if (err) {
                next(err);
            }else{
                res.json({ status: "success", message: "Movie deleted successfully!!!", data: null });
            }
        });
    },

    create:function (req,res,next){

        movieModel.create({
            name:req.body.name,
            release_on:req.body.release_on
        },
        function (err,result) {
            if (err) {
                next(err);
            }else{
                res.json({ status: "success", message: "Movie added successfully!!!", data: null });
            }
        });
    }
};