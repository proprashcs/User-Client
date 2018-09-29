import express from 'express';
import mongoose from 'mongoose'; 
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { restRouter } from './api';


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/invoice-builder');
const app =  express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(logger('dev', {
    skip: function (req, res) { return res.statusCode == 404 }
  }));
app.use('/api', restRouter);
//middleware
const swaggerDocument = require('./config/swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
    })
  );
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.message = 'Invalid Route';
    error.status =404;
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.json({
        error:{
            message:error.message,
        },
    })
})

app.listen(PORT, ()=>{
console.log(`server is  running at port ${PORT}`);
})