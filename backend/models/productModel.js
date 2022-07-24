const { kMaxLength } = require("buffer");
const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product price"],
        maxLength:[8,"Price cannot excede 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true
            },        
            url:{
                type:String,
                required:true
            }}
    ],
    category:{
        type:String,
        required:[true,"Please enter Product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numberOfReviews:{
        type:String,
        default:0
    },
    reviews:[
        {
            user:{    
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
    
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Product",productSchema);