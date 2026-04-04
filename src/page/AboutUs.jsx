import React from "react";
import { Link } from "react-router-dom";
function AboutUs() {
  return (
    <div className="container ">
      <div className=" ">
        <div className="text-5xl text-center w-180 max-w-full  mx-auto line-clamp-5">
          <h1>About Us</h1>
          Everything you need to know about your Zaria brand.
        </div>
        <div className="text-7xl text-center mt-10">Z</div>
      </div>

<div className="my-20">
        <div >
        <p className="text-2xl text-center w-180 max-w-full  mx-auto mt-10 line-clamp-5">
          "At Zarea we believe quality is a lifestyle. Our journey began with
          one goal: providing premium Innovative Tech Solutions that blend
          modern design with the durability you deserve. We are here to inspire
          you with a shopping experience that exceeds expectations."
        </p>
        
      </div>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 bg-black p-2 rounded-lg text-center mt-10 block w-40 mx-auto text-2xl"
      >
        Shopping
      </Link>
</div>
  
    </div>
  );
}

export default AboutUs;
