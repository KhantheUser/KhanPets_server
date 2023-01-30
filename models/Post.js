const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId :{
    type :mongoose.Schema.ObjectId,
    ref : 'User',
    required : [true,'A Post must have a user id']
  },
  desc : {
    type :String,
    max :500
  },
  img :{
    type:String
  },
  likes :{
    type :Array,
    default :[]

  }
},
{
    timestamps : true
})

postSchema.pre(/^find/,function(next){
  this.populate({
    path : 'userId',
    select : '_id username avatar'

  })
  next()
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post