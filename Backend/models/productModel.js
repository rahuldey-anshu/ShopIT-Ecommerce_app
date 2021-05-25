const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'Please enter a product name'],
        trim: true,
        maxlength: [100, 'Product name can\'t exceed 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxlength: [5, 'Product price can\'t exceed 100 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true , 'Please enter a product description']
        
    },
    ratings: {
        type: Number,
        default:0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, 'Please enter category for the product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Phones',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxlength: [5, 'product name can\'t exceed 5 characters'], 
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }
],
createdAt: {
    type: Date,
    default: Date.now
}
})


module.exports = mongoose.model('Product' ,productSchema );