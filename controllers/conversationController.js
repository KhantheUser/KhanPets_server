

const Conversation = require('../models/Conversation')
const catchAsync = require('../utils/catchAsync')

exports.createConversation = catchAsync(async(req,res,next)=>{
    
    const newConversation = await Conversation.create({
        members : [req.body.senderId,req.body.receiverId]
    })
    res.status(201).json({
        status :"success",
        data : newConversation
    })
})

exports.getConversation = catchAsync(async(req,res,next)=>{
    
    // let conversations;
    // if(req.query.sender === req.query.receiver){
    //     conversations = [];
        
        
    // }else{

    //     conversations =await Conversation.find({members : {$in : [req.query.sender]}})
    //    conversations = conversations.filter((con)=>con.members.includes(req.query.receiver))
       
    // }
    
    // console.log(conversations);
    

        const    conversations = await Conversation.find({members : {$all :[req.query.sender,req.query.receiver]}})
       
    res.status(200).json({
        status:"success",
        data : conversations
    })
})

exports.getAllConversation = catchAsync(async(req,res,next)=>{
    const conversation = await Conversation.find({members:{$in:req.params.userId}})
    res.status(200).json({
        status :"success",
        data :{
            data : conversation
        }
    })
})