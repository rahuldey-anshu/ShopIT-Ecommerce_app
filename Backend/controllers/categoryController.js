const Category = require('../models/categoryModel');
const slugify = require('slugify');
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('..//middlewares/catchAsyncErrors')


function createCategories(categories, parentId = null) {

    const categoryList = [] ;
    let category ;
    if(parentId == null ) {

        category = categories.filter( c => c.parentId == undefined ) ;
    }
    else {
        category = categories.filter( c => c.parentId == parentId ) ;
    }

    for(let cat of category) {
        categoryList.push({ 
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategories(categories , cat._id)    //used recursive function
        });
    }
    return categoryList ;
}

exports.addCategory = catchAsyncErrors(async (req, res, next) => {
    const categoryObj = {
        name : req.body.name ,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId) {
        categoryObj.parentId = req.body.parentId ;
    }

    const category = new Category(categoryObj);
    category.save((error , cat) => {
        if(error) {
            return res.status(400).json({ error }) ;
        }
        if(cat) {
            return res.status(200).json({ 
                success: true,
                cat
             })
        }
    })
})

exports.getCategories = catchAsyncErrors(async (req, res, next) => {

    const categories  = await Category.find({})
    .exec((error , categories) => {
        if(error)
        return res.status(400).json({ error }) ;

        if(categories) {

            const categoryList = createCategories(categories);

            res.status(200).json({ categoryList })
        }
    })
})