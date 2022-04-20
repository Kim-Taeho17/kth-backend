const mongoose = require('mongoose');
const { Schema } = mongoose;


const Users = new Schema({
  id : "string",
  name: "string",
  psword: "string",
});


module.exports = mongoose.model('Users', Users, 'users');