// React_Router
import { Link } from "react-router-dom";
// Logo
import Logo from "../../../assets/img/logo.png";
// React Hooks
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// Icons
import { CiSearch, CiHeart } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// Redux
import { fetchAllProducts } from "../../../store/api/apiSlice";

function TopHeader() {
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { Products } = useSelector((state) => state.api);
  const cartItems = useSelector((state) => state.cart.items);

  // Fetch products only if not already fetched
  useEffect(() => {
    if (!Products || Products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch]);

  // Close search results on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchValue("");
        setIsFocused(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredProducts = Products?.filter((item) =>
    searchValue === ""
      ? false
      : item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const showResults = searchValue !== "" && isFocused;

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex-shrink-0 flex items-center gap-2 group"
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-10 sm:h-12 hidden sm:block object-contain transition-opacity group-hover:opacity-80"
          />
          <span className="text-3xl font-black text-blue-600 sm:hidden tracking-tight">
            Z
          </span>
        </Link>

        {/* ── Search ── */}
        <div
          ref={searchRef}
          className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative"
        >
          {/* Input Row */}
          <div
            className={`flex items-center bg-gray-50 border-2 rounded-xl overflow-hidden transition-all duration-200 ${
              isFocused
                ? "border-blue-500 shadow-md shadow-blue-100"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <CiSearch className="text-xl text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              autoComplete="off"
              value={searchValue}
              placeholder="Search products..."
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 py-2.5 px-2 text-sm bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="mr-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoClose className="text-lg" />
              </button>
            )}
          </div>

          {/* Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              {filteredProducts?.length > 0 ? (
                <ul className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                  {filteredProducts.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`products/${item.id}`}
                        onClick={() => {
                          setSearchValue("");
                          setIsFocused(false);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <img
                          src={item.images?.[0] || "/fallback.jpg"}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400">{item.category}</p>
                        </div>
                        <span className="text-sm font-semibold text-blue-600 flex-shrink-0">
                          ${item.price}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-8 px-4 text-center">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-sm font-medium text-gray-700">لا توجد نتائج مطابقة</p>
                  <p className="text-xs text-gray-400 mt-1">
                    جرب كلمة بحث مختلفة
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Icons ── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          {/* Wishlist */}
          <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors group">
            <CiHeart className="text-2xl text-gray-600 group-hover:text-red-500 transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Cart */}
          <Link
            to="/PageCart"
            className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <FaOpencart className="text-2xl text-gray-600 group-hover:text-blue-500 transition-colors" />
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {cartItems.length > 99 ? "99+" : cartItems.length}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
}

export default TopHeader;