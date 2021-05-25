const app = require('./app')
const cloudinary = require('cloudinary');

const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

// setting up config file
dotenv.config({ path: 'Backend/config/config.env'})

//connecting to database
connectDatabase();

//Setting up cloudinary configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET


})

const server = app.listen(process.env.PORT, () => {
console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})


//Handle Unhandled Promise rejections

process.on('unhandledRejection' , err=> {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled Promise rejection');
    server.close(()=>{
        process.exit(1);
    });

})


