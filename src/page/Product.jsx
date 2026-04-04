import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";

// Redux actions
import { addCart, Increment, Decrement, removeCart } from "../store/Cart/CartSlice";

// Swiper
import { FreeMode, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Components
import CardProduct from "../component/Product/ProductCard/ProductCard";

// Icons
import { FaOpencart, FaStar, FaStarHalfAlt, FaRegStar, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi";
import { IoClose, IoChevronBack } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

// Star rating helper
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < Math.floor(rating))
          return <FaStar key={i} className="text-amber-400 text-sm" />;
        if (i < rating)
          return <FaStarHalfAlt key={i} className="text-amber-400 text-sm" />;
        return <FaRegStar key={i} className="text-gray-300 text-sm" />;
      })}
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );
}

function ProductD() {
  const { ProductID } = useParams();
  const productId = Number(ProductID);
  const dispatch = useDispatch();

  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  const { Products } = useSelector((state) => state?.api);

  const product = useMemo(
    () => Products?.find((item) => item.id === productId),
    [Products, productId]
  );

  const cartItems = useSelector((state) => state?.cart?.items);
  const productInCart = cartItems?.find((item) => item.id === productId);

  const similarProducts = useMemo(
    () => Products?.filter((p) => p.category === product?.category && p.id !== productId) ?? [],
    [Products, product, productId]
  );

  const discount = product?.discountPercentage
    ? Math.round(product.discountPercentage)
    : null;

  const originalPrice = discount
    ? Math.round(product.price / (1 - discount / 100))
    : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <IoClose className="text-xl" />
          </button>
          <img
            src={lightboxImg}
            alt="Product zoom"
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/Shop_All" className="hover:text-blue-600 transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{product.title}</span>
        </div>

        {/* ── Main Product Section ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* ── Image Gallery ── */}
            <div className="p-6 bg-gray-50 flex flex-col gap-4">
              {/* Main image */}
              <div
                className="relative rounded-2xl overflow-hidden bg-white flex items-center justify-center h-72 sm:h-96 cursor-zoom-in shadow-sm"
                onClick={() => setLightboxImg(product.images?.[activeImg])}
              >
                <img
                  src={product.images?.[activeImg]}
                  alt={product.title}
                  className="h-full w-full object-contain hover:scale-105 transition-transform duration-400"
                />
                {discount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                    -{discount}%
                  </span>
                )}
                <span className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                  Click to zoom
                </span>
              </div>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        activeImg === i
                          ? "border-blue-500 shadow-md shadow-blue-200"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <div className="p-6 sm:p-8 flex flex-col gap-5">

              {/* Category + Brand */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full capitalize">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <MdVerified className="text-blue-400" />
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} />
                {product.stock > 0 ? (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-end gap-3 py-4 border-y border-gray-100">
                <span className="text-4xl font-black text-blue-600">
                  ${product.price}
                </span>
                {originalPrice && (
                  <span className="text-gray-400 text-lg line-through mb-1">
                    ${originalPrice}
                  </span>
                )}
                {discount && (
                  <span className="mb-1 text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-lg">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Quantity + Cart */}
              <div className="flex items-center gap-4">
                {/* Quantity control */}
                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() =>
                      productInCart?.Quantity <= 1
                        ? dispatch(removeCart(product))
                        : dispatch(Decrement(product.id))
                    }
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-gray-800">
                    {productInCart?.Quantity || 0}
                  </span>
                  <button
                    onClick={() => dispatch(Increment(product.id))}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  disabled={product.stock === 0}
                  onClick={() => !productInCart && dispatch(addCart(product))}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm
                    ${productInCart
                      ? "bg-green-500 text-white shadow-green-200 cursor-default"
                      : product.stock === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 cursor-pointer hover:scale-[1.02]"
                    }`}
                >
                  {productInCart ? (
                    <><FaOpencart className="text-lg" /> In Cart</>
                  ) : (
                    <><BiCartAdd className="text-lg" /> Add to Cart</>
                  )}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: <FaTruck className="text-blue-500" />, label: "Free Shipping" },
                  { icon: <FaUndo className="text-blue-500" />, label: "Easy Returns" },
                  { icon: <FaShieldAlt className="text-blue-500" />, label: "Secure Pay" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl text-center">
                    <span className="text-xl">{icon}</span>
                    <span className="text-xs font-semibold text-gray-600">{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── Similar Products ── */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">More like this</p>
                <h2 className="text-2xl font-black text-gray-900">Similar Products</h2>
              </div>
              <Link
                to={`/Category/${product.category}`}
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                View all →
              </Link>
            </div>

            <Swiper
              modules={[FreeMode, Autoplay]}
              freeMode={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={16}
              breakpoints={{
                320:  { slidesPerView: 1.2 },
                480:  { slidesPerView: 2.2 },
                768:  { slidesPerView: 3.2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {similarProducts.map((p) => (
                <SwiperSlide key={p.id}>
                  <CardProduct products={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductD;