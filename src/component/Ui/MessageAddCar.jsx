import React, { useState, useEffect } from "react";
import '../../styles/global.css'
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";

function MessageAddCar({ Product }) {
  // State Show Message And Return True wth Key Change
  const [show, setShow] = useState(true); 

  // check Product In Cart
  const isInCart = useSelector((state) =>
    state?.cart?.items?.find((item) => item.id === Product.id),
  );
  // Use Effect To Hide Message After 3 Seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  // if Show False Or Product Null Return Null
  if (!show || !isInCart  ) return null;
// Create Portal To Show Message In Body
  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        zIndex: 9999,
        padding: "15px 25px",
       
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        border: "1px solid #c3e6cb",
        minWidth: "250px",
      }}
      className="messageAddCart duration-500  ease-in w-80 "
    >
      {/*container Message*/}
      <div className="flex">

        <img
          src={Product.images[0]}
          alt={Product.title}
          className="w-15 h-15 object-cover rounded-full mr-4"
        />
        <div>
          {/*content Message*/}
          <h4 className="text-lg font-semibold mb-2 ">Added to Cart!</h4>
          <p className="text-sm">
            {Product.title} 
            <span className="text-gray-500 ml-1">has been added to your cart.</span>
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default MessageAddCar;
