const express = require('express')
const router = express.Router();

const { addCategory , getCategories } = require('../controllers/categoryController')
const { isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth')


router.route('/category/create').post( isAuthenticatedUser , authorizeRoles('admin') ,addCategory);
router.route('/category/getcategories').get(getCategories)

module.exports = router;