import axios from 'axios'
import {ADD_TO_CART, REMOVE_CART_ITEMS, SAVE_SHIPPING_ITEMS} from '../constants/cartConstants'

// Items adding to cart
export const addItemsCart = (id,quantity) => async(dispatch,getState) => {
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:ADD_TO_CART,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.stock,
                quantity
            }
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

//REMOVE from cart
export const removeCartItems = (id) => async(dispatch,getState) => {
    dispatch({
        type: REMOVE_CART_ITEMS,
        payload: id,
      });
    
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//Save shipping info
export const saveShippingInfo = (data) => async(dispatch,getState) => {
    dispatch({
        type: SAVE_SHIPPING_ITEMS,
        payload: data,
      });    
      localStorage.setItem('shippingInfo', JSON.stringify(data));
}