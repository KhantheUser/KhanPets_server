const Message = require("../models/Message");
const catchAsync = require("../utils/catchAsync");

exports.createMessage = catchAsync(async(req,res,next)=>{
    const message = await Message.create(req.body)
    res.status(201).json({
        status :"success",
        data :message
    })
})

exports.getMessages = catchAsync(async(req,res,next)=>{
    const messages = await Message.find({
        conversationId : req.params.conversationId
    })
    res.status(200).json({
        status:"success",
        data:messages
    })
})