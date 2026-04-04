import "../App.css";
// import React
import React from "react";
// import Link
import { Link } from "react-router-dom";
// import Redux
import { useDispatch, useSelector } from "react-redux";
// import Actions
import { Increment, Decrement, removeCart } from "../store/Cart/CartSlice";
// import Icons
import { MdDelete } from "react-icons/md";

function Cart() {
  // Dispatch Actions
  const Dispatch = useDispatch();
  // Get Cart Items From Store
  const CartItems = useSelector((state) => {
    return state.cart.items;
  });

  return (
    <div className="container flex justify-center items-center ">
      <div className=" flex flex-col   bg-white rounded-lg w-130 h-150 ">
        <h1 className="text-2xl text-blue-400 p-4 border-gray-300 border-b-2 ">
          Order Summary
        </h1>
        {/* Cart */}
        <div className="flex flex-col gap-4 mt-4 h-full overflow-auto">
          {CartItems.length > 0 ? (
            CartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 "
              >
                <div className="flex italic items-center gap-2 ">
                  <img draggable="false" src={item?.images[0]} className="w-25" />
                  <div className="flex flex-col">
                    <h1 className="text-sm">{item?.title}</h1>
                    <div className="text-gray-500">EG:{item?.price}</div>
                    <div className="flex items-center gap-2">
                      <button
                        className="cursor-pointer bg-gray-200 w-5 h-5 flex items-center justify-center text-2xl text-blue-400 hover:text-blue-500 hover:scale-130  transition-transform duration-200"
                        onClick={() => Dispatch(Decrement(item.id))}
                      >
                        -
                      </button>
                      <p className="text-sm text-blue-400">{item?.Quantity}</p>
                      <button
                        className="cursor-pointer bg-gray-200 w-5 h-5 flex items-center justify-center text-2xl text-blue-400 hover:text-blue-500 hover:scale-130  transition-transform duration-200"
                        onClick={() => Dispatch(Increment(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="cursor-pointer text-2xl text-red-400 hover:text-red-500 hover:scale-130  transition-transform duration-200"
                  onClick={() => Dispatch(removeCart(item))}
                >
                  <MdDelete />
                </button>
              </div>
            ))
          ) : (
            // If Cart Is Empty
            <p className="text-gray-500 text-center">Your cart is empty
            <Link to="/" className="text-blue-400 hover:text-blue-500 hover:underline block">Shop Now</Link>
            </p>
          )}
        </div>

        <div>
          <div className="flex gap-2 p-3 text-lg border-y-2 border-gray-200">
            Total:
            <div className="flex  items-center gap-2">
              <p>$</p>
              <span className="text-blue-400">
                {" "}
                {CartItems.reduce(
                  (total, item) =>
                    ` ${Number(total) + Number(Math.ceil(item.price)) * Number(Math.ceil(item.Quantity))}`,
                  0,
                )}
              </span>
            </div>
          </div>
          <div className=" w-full">
            <button className="block cursor-pointer m-auto text-lg bg-blue-500  p-2 rounded-sm text-white my-3">
              Place Order

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
