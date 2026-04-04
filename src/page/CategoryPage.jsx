import React from 'react'
import { Link } from "react-router-dom";
// Import Library Swiper
import { FreeMode, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
// Import Fetch Api Products
import {fetchAllProducts} from "../store/api/apiSlice"
// Import Redux
import { useSelector , useDispatch } from "react-redux";
// import Component Card
import ProductCard from "../component/Product/ProductCard/ProductCard"
function SideProduct() {

  const {CategoryName}= useParams()
  const Dispatch = useDispatch()
const { Products } = useSelector((state) =>{
  return state?.api
} );

useEffect(()=>{
  Dispatch(fetchAllProducts())
},[Dispatch])
  return (
    <div className="p-4 container ">
      {/* Heading */}
    <div className="border-b-2 mb-5 border-gray-300">
      <h1 className="text-blue-500 text-3xl mb-2">{CategoryName}</h1>
      <p className="text-gray-400 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptates?</p>
    </div>
    {/* Products */}
    
    <div className="flex flex-wrap items-center justify-center">
            {Products?.filter((filtersProducts)=>{
        return filtersProducts.category == `${CategoryName}`
      }).map((product)=>(
        <div className='w-[300px] m-2'>
                    <ProductCard key={product.id}   products={product}/>
        
        </div>
      ))} 
    </div>
    </div>

  );
}

export default SideProduct;



