const mongoose = require('mongoose');

const cartSchema =new mongoose.Schema({
    userId : {
        type : String,
        required : [true,'User name is required'],
        
    },
    product :
        {
          type : mongoose.Schema.ObjectId,
          ref : 'Animal'
        }
      ,
     quantity :{
        type :Number,
        default:1
     } 
   
    
},{timestamps:true})

module.exports = mongoose.model('Cart',cartSchema);
