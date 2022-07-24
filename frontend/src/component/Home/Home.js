import React, { Fragment,useEffect } from 'react'
import {CgMouse} from 'react-icons/all'
import MetaData from '../layout/MetaData'
import './Home.css'
import ProductCard from './ProductCard'
import {getProduct,clearErrors} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'

const Home = () => {
    const alert=useAlert();
    const dispatch=useDispatch();
    const {loading,error,products}=useSelector(state=>state.products)
    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
      dispatch(getProduct());
    }, [dispatch,error,alert])
    
    return (
    <Fragment>
        {loading? <Loader/> : <Fragment>
        <MetaData title="Ecommerce"/>
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>Find amazing products below</h1>

            <a href="#container">
                <button> 
                    Scroll <CgMouse/>
                </button>
            </a>    
        </div>
        <h2 className='homeHeading'>Featured products</h2>
        <div id="container" className='container'>
        {products && products.map(product=>(<ProductCard key={product._id} product={product}/>))}
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Home