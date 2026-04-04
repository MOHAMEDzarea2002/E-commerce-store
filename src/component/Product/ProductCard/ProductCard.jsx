import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useState, useMemo } from "react";

// Components
import MessageAddCart from "../../Ui/MessageAddCar";

// Icons
import { FaOpencart } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegShareSquare } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

// Redux
import { addCart } from "../../../store/Cart/CartSlice";

function CardProduct({ products }) {
  const product = products;
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state?.cart?.items, shallowEqual);

  const isInCart = useMemo(
    () => cartItems?.some((item) => item.id === product.id),
    [cartItems, product.id]
  );

  const [cartKey, setCartKey] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [imgError, setImgError] = useState(false);

  function handleAddCart() {
    setCartKey((k) => k + 1);
    dispatch(addCart(product));
  }

  // Discount badge
  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : null;

  // Star rating
  const rating = product.rating ?? 0;
  const fullStars = Math.floor(rating);

  return (
    <>
      <div className="group  relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">

        {/* ── Image Area ── */}
        <div className="relative overflow-hidden bg-gray-50 h-52 flex items-center justify-center">
          <Link to={`/products/${product.id}`}>
            <img
              loading="lazy"
              src={imgError ? "/fallback.jpg" : product.images?.[0]}
              alt={product.title}
              onError={() => setImgError(true)}
              className="h-44 w-full object-contain group-hover:scale-105 transition-transform duration-400"
            />
          </Link>

          {/* Discount Badge */}
          {discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              -{discount}%
            </span>
          )}

          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-3 right-3 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-lg">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 right-3 bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-lg">
              Out of stock
            </span>
          )}

          {/* ── Floating Action Buttons ── */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250">

            {/* Add to Cart */}
            <button
              onClick={handleAddCart}
              disabled={product.stock === 0}
              title={isInCart ? "In cart" : "Add to cart"}
              className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-md transition-all duration-200 text-lg
                ${isInCart
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white"
                }
                ${product.stock === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {isInCart ? <FaOpencart /> : <BiCartAdd />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setWishlist((w) => !w)}
              title={wishlist ? "Remove from wishlist" : "Add to wishlist"}
              className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-md transition-all duration-200 text-lg cursor-pointer
                ${wishlist
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
                }`}
            >
              <CiHeart />
            </button>

            {/* Share */}
            <button
              title="Share"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white text-gray-700 shadow-md hover:bg-gray-800 hover:text-white transition-all duration-200 text-lg cursor-pointer"
            >
              <FaRegShareSquare />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 p-4 gap-2">

          {/* Category */}
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide capitalize">
            {product.category}
          </span>

          {/* Title */}
          <h4 className="text-gray-900 font-bold text-base leading-snug line-clamp-1">
            {product.title}
          </h4>

          {/* Description */}
          <p className="text-gray-400 text-xs line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-xs ${
                  i < fullStars ? "text-amber-400" : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">({rating})</span>
          </div>

          {/* Price Row */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-blue-600 font-black text-lg">
                ${product.price}
              </span>
              {discount && (
                <span className="text-gray-400 text-xs line-through">
                  ${Math.round(product.price / (1 - discount / 100))}
                </span>
              )}
            </div>

            <Link
              to={`/products/${product.id}`}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              View Details
            </Link>
          </div>

        </div>
      </div>

      {/* Notification */}
      <MessageAddCart key={cartKey} Product={product} />
    </>
  );
}

export default CardProduct;