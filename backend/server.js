const app=require("./app");
const cloudinary=require("cloudinary");
const connectDatabse=require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the engine due to uncaught exception")
    process.exit(1)
})

//config
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path:"backend/config/config.env"})
}

//Connecting to DB
connectDatabse();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the engine due to unhandled promise rejection")
    server.close(()=>{
        process.exit(1);
    })
})