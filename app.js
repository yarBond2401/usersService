require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const AppError = require('./errors/appError')
const ErrorHandler = require('./errors/errorHandler')
const ErrorSender = require('./errors/errorController')
const userRoutes = require('./routes/userRoutes')
const app = express();

const AppErrorSender = new ErrorSender(AppError, ErrorHandler);

if (process.env.NODE_ENV==='development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})
app.use('/users', userRoutes);

app.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    })

app.use(AppErrorSender.sendErrors);

module.exports = app;
