const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError=require('../middleware/catchAsyncError');
const User=require("../models/userModel")
const sendToken=require("../utils/jwttoken")
const sendEmail=require("../utils/sendEmail")
const crypto=require('crypto')
const cloudinary=require('cloudinary')
//Register our user

exports.registerUser=catchAsyncError(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    
      const { name, email, password } = req.body;
    
      const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
    
      sendToken(user, 201, res);
})

//Login user

exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    //checking if user has given password and email both
    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user)
        {return next(new ErrorHandler("Invalid email or password",401));}

    const isPasswordmatch=user.comparePassword(password);
    if(!isPasswordmatch)
        {return next(new ErrorHandler("Invalid email or password",401));}

    sendToken(user,200,res);
    
})


// Logout user

exports.logout=catchAsyncError( async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true

    })

    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})

// forgot password

exports.forgetPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user)
    {
        return next(new ErrorHandler("user Not found",404))
    }
    //get reset password token
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it.`;
    try{

        await sendEmail({
            email:user.email,
            subject:`Ecommerce password recovery`,
            message,
        })

        res.status(200).json({
            success:true,
            message:`Emaiil sent to ${user.email} successfullly`
        })
    }catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(err.message,500));
    }
})

//Reset Password

exports.resetPassword=catchAsyncError(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })
    if(!user)
    {
        return next(new ErrorHandler("Reset Password token is invalid or has been expired",404))
    }
    if(req.body.password!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match",400))
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();

    sendToken(user,200,res);
})

//Get user details

exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

// Update user password

exports.updatePassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordmatch=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordmatch)
        {return next(new ErrorHandler("Old password in incorrect",401));}

        if(req.body.newPassword!==req.body.confirmPassword)
        {
            return next(new ErrorHandler("Password does not match",401));
        }

        user.password=req.body.newPassword
        await user.save();
        sendToken(user,200,res);
})

// Update user Profile

exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    //we will add cloudinary later
    if(req.body.avatar!=="")
    {
        const user=await User.findById(req.user.id);
        const imageId=user.avatar.public_id

        await cloudinary.v2.uploader.destroy(imageId)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });

        newUserData.avatar ={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    }

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true
    })
    
})

//Get All Users(ADMIN)

exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users,
    })
})

//Get Single Users(ADMIN)

exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with id ${req.body.params}`,))
    }
    res.status(200).json({
        success:true,
        user,
    })
})

// Update user Role - admin

exports.updateRole=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false,
    })
    res.status(200).json({
        success:true
    })
    
})

// Delete user - admin

exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    
    //we will remove cloudinary later
    

    const user=await User.findById(req.params.id)
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`))
    }
    const imageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})



