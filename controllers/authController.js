const User = require('../models/User')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')



const signToken = (userId)=>{
    return jwt.sign({
        id : userId
    },process.env.JWT_SECRET,{
        expiresIn :process.env.JWT_EXPIRES_IN
    })
}


exports.signup = catchAsync(async(req,res,next)=>{
    const newUser = await User.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm,
        phone : req.body.phone ,
        birth : req.body.birth
    })
    const token = signToken(newUser._id)
    res.status(200).json({
        status :"success",
        token,
        data :{
            user : newUser
        }
    })
   
})

exports.login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body
    console.log(email,password);
    if(!email || !password) return next(new AppError('Please provide email and password',400))
    const user = await User.findOne({email:email}).select('password')
    console.log(user)
    if(!user || !(await user.comparePassword(password,user.password))){
        return next(new AppError('Incorrect email or password',401))
    }
    const token =  signToken(user._id)
    res.status(200).json({
        status :"success",
        token,
        data :{
            user
        }
    })

})