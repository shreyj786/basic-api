const express = require("express");
const app = express();
const morgan = require("morgan");

const productRoutes = require('./routes/products'); 
const ordersRoutes = require('./routes/orders'); 


app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use( (req,res,next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept,Authorization");

    if(req.method === 'OPTIONS'){
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); 
       return res.status(200).json({}); 
    }

} );


// Routes which handles requests 
app.use('/products',  productRoutes);
app.use('/orders',  ordersRoutes);

app.use(( req,res,next ) => {
    const error = Error('Not found'); 
    error.status = 400; 
    next(error);
} ); 

app.use(( error, req, res, next ) => {

res.status(error.status || 500); 
res.json({
error: {
    message: error.message,
}

})


})


module.exports = app;
