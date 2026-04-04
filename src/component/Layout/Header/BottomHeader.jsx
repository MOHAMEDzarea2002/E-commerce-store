import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { IoPersonAdd } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

function BottomHeader() {
  const menuCategoryRef = useRef(null);
  const iconCateRef = useRef(null);
  const sideBarRef = useRef(null);
  const iconBarRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Shop All", link: "/Shop_All" },
    { title: "Offers", link: "/Offers" },
    { title: "Contact", link: "/contact" },
    { title: "Cart", link: "/PageCart" },
  ];

  // Fetch categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setIsLoading(false);
      });
  }, []);

  // Close sidebar & category on outside click or link click
  useEffect(() => {
    function handleClick(e) {
      const sidebar = sideBarRef.current;
      const icon = iconBarRef.current;
      const menuCategory = menuCategoryRef.current;
      const iconCate = iconCateRef.current;

      const clickedLink = e.target.closest("a");

      // Sidebar
      const clickedOutsideSidebar =
        sidebar &&
        !sidebar.contains(e.target) &&
        icon &&
        !icon.contains(e.target);
      if (clickedOutsideSidebar || (clickedLink && sidebar?.contains(e.target))) {
        setIsSidebarOpen(false);
      }

      // Category
      const clickedOutsideCategory =
        menuCategory &&
        !menuCategory.contains(e.target) &&
        iconCate &&
        !iconCate.contains(e.target);
      if (clickedOutsideCategory || (clickedLink && menuCategory?.contains(e.target))) {
        setIsCategoryOpen(false);
      }
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {/* Overlay - mobile only */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <nav className="w-full bg-white border-b border-gray-100 shadow-sm h-12 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-3">

          {/* ── Left ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Hamburger - mobile only */}
            <button
              ref={iconBarRef}
              aria-label="Toggle menu"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors flex-shrink-0"
            >
              {isSidebarOpen ? <IoClose className="text-lg" /> : <IoMenu className="text-lg" />}
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                ref={iconCateRef}
                onClick={() => setIsCategoryOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
              >
                <span className="hidden sm:inline">All Categories</span>
                <span className="sm:hidden">Categories</span>
                <FaChevronDown
                  className={`text-[10px] text-gray-400 transition-transform duration-250 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              <div
                ref={menuCategoryRef}
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
                  isCategoryOpen
                    ? "opacity-100 scale-y-100 pointer-events-auto"
                    : "opacity-0 scale-y-95 pointer-events-none"
                }`}
              >
                <div className="overflow-y-auto max-h-64">
                  {isLoading ? (
                    <div className="p-2 space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 rounded-md bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    categories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/Category/${category.slug}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 border-b border-gray-50 last:border-none hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Nav Links - desktop only */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: Auth icons ── */}
          <div className="flex items-center gap-1">
            <Link
              to="/LoginAndRegister"
              title="Login"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
            >
              <CiLogin />
            </Link>
            <Link
              to="/LoginAndRegister"
              title="Register"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-xl"
            >
              <IoPersonAdd />
            </Link>
          </div>
        </div>

        {/* ── Mobile Sidebar ── */}
        <div
          ref={sideBarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-lg">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <IoClose className="text-lg" />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto py-2">
            {navLinks.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className="flex items-center px-5 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
          
          {/* Sidebar Footer - Login & Register buttons */}
          <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
            <Link
              to="/LoginAndRegister"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-blue-500 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <CiLogin className="text-lg" />
              Login
            </Link>
            <Link
              to="/LoginAndRegister"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              <IoPersonAdd className="text-base" />
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default BottomHeader;