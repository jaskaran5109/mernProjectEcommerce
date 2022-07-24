import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import {useSelector,useDispatch} from 'react-redux'
import {addItemsCart, removeCartItems} from '../../actions/cartAction'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { Typography } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

const Cart = () => {
    const history=useHistory();
    const dispatch=useDispatch();

const {cartItems} =useSelector(state=>state.cart)

const increaseQuantity =(id,quantity,stock)=>{
    const newQty=quantity+1;
    if(stock<=quantity)
    {
        return;
    }
    dispatch(addItemsCart(id,newQty))
}
const checkOutHandler=()=>{
    history.push("/login?redirect=shipping")
}
const decreaseQuantity=(id,quantity)=>{
    const newQty=quantity-1;
    if(quantity<=1)
        return;
    dispatch(addItemsCart(id,newQty))
}
const deleteCartItems=(id)=>{
    dispatch(removeCartItems(id))
}
  return (
   <Fragment>
    {cartItems.length===0 ?(<div className="emptyCart">
        <RemoveShoppingCartIcon/>
        <Typography>Your cart is Empty</Typography>
        <Link to="/products">View Products</Link>
    </div> ): <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>SubTotal</p>
            </div>
            {cartItems && cartItems.map((item)=>(
                <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                <div className="cartInput">
                    <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly/>
                    <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                </div>
                <p className='cartSubtotal'>{`₹${item.quantity*item.price}`}</p>
            </div>
            ))}
           
            <div className='cartGrossProfit'>
                <div></div>
                <div className='cartGrossProfitBox'>
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce((acc,item)=> acc+ item.quantity*item.price ,0)}`}</p>
                </div>
                <div></div>
                <div className='checkOutBtn'>
                    <button onClick={checkOutHandler}>Check out</button>
                </div>
            </div>
        </div>
    </Fragment>}
   </Fragment>
  )
}

export default Cart