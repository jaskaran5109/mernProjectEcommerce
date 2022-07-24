const Order=require("../models/orderModel")
const Product=require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError=require('../middleware/catchAsyncError');

//create new order
exports.newOrder=catchAsyncError(async(req,res,next)=>{

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;
    const order=await Order.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    }) 

    res.status(201).json({
        success:true,
        order
    })
})

//Get single Order 
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order)
    {
        return next(new ErrorHandler("Order not found with this id",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//Get all Orders - logged in user
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all Orders - admin
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find();

    let totalAmt=0;
    orders.forEach(order=>{totalAmt+=order.totalPrice})
    res.status(200).json({
        success:true,
        totalAmt,
        orders
    })
})

//Update Order Status--  admin
exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("Order not found with this id",404))
    }
    if(order.orderStatus==="Delivered")
    {
        return next(new ErrorHandler("You have already deliverd this order",400))
    }
    if(req.body.status==="Shipped")
    {
        order.orderItems.forEach(async (o)=>{
            await updateStock(o.Product,o.quantity);
        })
    }

    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered")
    {
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.Stock=product.Stock-quantity;
    await product.save({validateBeforeSave:false})

}

//Delete Order - admin
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("Order not found with this id",404))
    }
    await order.remove();
    res.status(200).json({
        success:true,
    })
})