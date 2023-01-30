const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId :{
    type : String
  },
  sender :{
    type:mongoose.Schema.ObjectId,
    ref :'User'


  },
  text:{
    type:String
  }
},
{
    timestamps : true
})

MessageSchema.pre(/^find/,function(next){
  this.populate({
    path :'sender',
    select : 'avatar'
  })
  next()
})

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message