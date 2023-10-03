const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/vector',{useNewUrlParser:true})

const database = mongoose.connection


database.once('open' ,  () =>{ console.log("Succesfully connected JSS with MONGO DB")})
database.on('error' ,  () =>{console.log("Not connected with DATA BASE")})

module.exports = database
