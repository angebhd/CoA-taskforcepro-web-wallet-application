const express = require('express');
const route = express.Router();

// Money in

route.get('/add', function(req, res) {
    res.send("Money received");
})

module.exports = route;