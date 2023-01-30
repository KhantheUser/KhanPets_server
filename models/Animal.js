const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema({
    name : {
        type :String,
        required : [true,'Animal must have a name']
    },
    inStock : {
        type : Boolean,
        default :true
    },
    address :{
        type :String,
        required :[true,'Animal must have a address']
    },
    type :{
        type :String,
        required :[true,'Animal must have a type']
    },
    sex :{
        type :String,
        required :[true,'Animal must have a sex']

    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
      },
      price :{
        type:Number,
        required :[true,'Animal must have a price']
      },
      generic:{
        type :String,
        required :[true,'Animal must have a generic']

      },
      quantity:{
        type:Number,
        default :1
      },
      img : {
        type :Array,
        default :[]
      },
      desc :{
        type :String,
        required :[true,'Animal must have a description']
      },
      age:{
        type :Number,
        required :[true,'Animal must have a age']
      }
},{timestamps:true})


const Animal = mongoose.model('Animal',animalSchema);
module.exports = Animal;