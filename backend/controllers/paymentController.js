const catchAsyncErrors = require("../middleware/catchAsyncError");
require('dotenv').config({ path: './.env' })
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LLUKHSGn8NHy552x7kVsMY6EjBAVlTAQrFoWMlYA1XlV0XnT1qH45UXCxdcG07PruKXXxIH9GlV9SAtA1WZQSNM000qp1HPX9');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});