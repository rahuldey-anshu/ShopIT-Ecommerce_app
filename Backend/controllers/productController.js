const Product = require('../models/productModel')

const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


//only admin has the access to create a product
//Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors( async (req, res, next) => {
    
    const product =await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    })
})

//Get all products => /api/v1/products ? keyword=apple
exports.getProducts = catchAsyncErrors( async (req , res , next) => {


    const resPerPage = 14 ;
    const productsCount = await Product.countDocuments()


    const apiFeatures = new APIFeatures(Product.find(), req.query)
                         .search()
                         .filter()
                         .pagination(resPerPage) 

    const products = await apiFeatures.query;

    
        res.status(200).json({
            success: true,
            count: products.length,
            productsCount,
            products
    
        })

})


//Get single product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors( async (req, res , next) => {
  
    const product =await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found' , 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})



//only admin has the access to update a product
// Update Product  => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found' , 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });

})


//Delete Product => http://localhost:8000/api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors( async (req, res , next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found' , 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
})



















