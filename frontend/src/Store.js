import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { newProductReducer, newReviewReducer, productDetailReducer, productReducer, productReviewReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, ordersReducer } from './reducers/orderReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer=combineReducers({
    products:productsReducer,
    productDetails:productDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:ordersReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewReducer,
    review:reviewReducer,
})

let initialState ={
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[],
        shippingInfo:localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) :{}
    }
};
const middleware=[thunk];

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;