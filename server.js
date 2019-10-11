const express=require('express');
const app=express();

const port=process.env.port || 6585;

const logger=require('morgan');
app.use(logger('dev'));

const userRouter=require('./app/routes/users');
const movieRouter=require('./app/routes/movies');
const bodyParser=require('body-parser');
const mongoose=require('./app/config/database');
const jwt=require('jsonwebtoken');

app.set('secretKey','nodeRESTAPI');

//Database Connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection error!'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/',(req,res,next)=>{

    res.json({"tutoral":"JWT Token Learn"});
});


//Publice Routes
app.use('/users',userRouter);

//Private Routes
app.use('/movies', validateUser,movieRouter);

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});


function validateUser(req,res,next) {
    
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'),
    function (err,decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        }else{
            req.body.userId = decoded.id;
            next();
        }
    });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});




app.listen(port,()=>console.log(`This server is running on port ${port}`));
