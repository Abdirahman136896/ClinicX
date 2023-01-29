const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const app = express();
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const doctorRoute = require('./routes/doctor');
const branchRoute = require('./routes/branch')
const dashboardRoute = require('./routes/dashboard');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/category',categoryRoute);
app.use('/product',productRoute);
app.use('/bill',billRoute);
app.use('/doctor',doctorRoute);
app.use('/branch',branchRoute);
app.use('/dashboard',dashboardRoute);

module.exports = app;