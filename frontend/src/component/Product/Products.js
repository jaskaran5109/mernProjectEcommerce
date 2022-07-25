import React,{Fragment, useEffect,useState} from 'react'
import './Products.css'
import {getProduct,clearErrors} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import ProductCard from '../Home/ProductCard'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
import { Typography } from '@material-ui/core'
import MetaData from '../layout/MetaData'

const categories=[
    "Laptop",
    "Phone",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
]


const Products = ({match}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState("")
    const [ratings, setRating] = useState(0)
    const {loading,error,products,productCount,resultPerPage,filteredProductCount}=useSelector(state=>state.products)
    const [price, setPrice] = useState([0,25000])


    const keyword=match.params.keyword;
    const setCurrentPageNo =(e)=>{
        setCurrentPage(e)

    }
    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings))
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error]);
    
    const priceHandler=(e,newPrice)=>{
        setPrice(newPrice)

    }

    let count=filteredProductCount;
  return (
    <Fragment>
        {loading  ? <Loader/> : <Fragment>
            <MetaData title={`Products -- ECOMMERCE`}/>
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {products && products.map(product =>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

              <div className="filterBox">
                    <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                            />

                    <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map(category =>(
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={()=>setCategory(category)}
                                >{category}</li>
                            ))}
                        </ul>

                    <fileset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e,newRating) =>{
                                setRating(newRating)
                            }}
                            aria-labelledby='continous-slider'
                            valueLabelDisplay='auto'
                            min={0}
                            max={5}
                            />
                    </fileset>
              </div>
            
                
            {resultPerPage<count && <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>} 

            </Fragment>}
    </Fragment>
  )
}

export default Products