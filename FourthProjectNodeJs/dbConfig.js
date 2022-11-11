require('dotenv').config();

let mongodb = require('mongodb');
let mongoose = require('mongoose');

let secret = process.env.MONGO;

mongoose.connect(secret, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });

let con = mongoose.connection;

module.exports = con;