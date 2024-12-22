const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true,
    trim:true,
   }
})


module.exports = mongoose.model('Todos', TodoSchema)