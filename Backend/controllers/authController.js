const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require('cloudinary')

//Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar , {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })


  const { name, email, phone, password } = req.body;

  const user = await User.create({
    name,
    email,
    phone,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url
        
    },
  });

  // const token = user.getJwtToken();

  // res.status(201).json({
  //     success: true,
  //     token
  // })
  sendToken(user, 200, res);
});



//Login User  => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email & password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  //Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong password", 401));
  }

  //    const token = user.getJwtToken();

  //    res.status(200).json({
  //        success: true,
  //        token
  //    })
  sendToken(user, 200, res);
});


//Get currently logged in user details  => /api/v1/currentuser

exports.getUserProfile  = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


//Update user profile  => /api/v1/currentuser/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone

    }

    //update avatar:
    if(req.body.avatar !== '') {
        const user = await User.findById(req.user.id);

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar , {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData , {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Update / Change password => /api/v1/password/update

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //check previous password of the user
  
    const isMatched = await user.comparePassword(req.body.oldPassword)
    

    if(!isMatched) {
        return next(new ErrorHandler('Old Password is incorrect' , 400));
    }

    user.password = req.body.password;
        await user.save();
    
    sendToken(user , 200 , res)

})



//Logout user  => /api/v1/logout 

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, { 
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out '
    })
})



//Admin Routes

// Get all users   =>  /api/v1/admin/users
exports.allusers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})

//Get user details   => /api/v1/admin/user/:id

exports.getUserDetails =  catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`user does not found with id:  ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
})



//Update current user profile   =>  /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role

    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData , {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

//Delete user  => /api/v1/admin/user/:id

exports.deleteUser =  catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`user does not found with id:  ${req.params.id}`));
    }

    //Remove avatar from cloudinary 

    await user.remove();

    res.status(200).json({
        success: true
        
    })
})










