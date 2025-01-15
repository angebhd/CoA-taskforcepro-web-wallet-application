require('dotenv').config();
const express = require('express');

// Routes imports
const transactionRoutes = require('./src/routes/transactions')


const app = express();


// Routes 
app.use('/api/transactions', transactionRoutes);
app.listen(process.env.PORT || 3001, ()=> console.log("Backend has started, listening on port " + process.env.PORT));