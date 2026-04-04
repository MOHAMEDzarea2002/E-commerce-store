import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Product/ProductCard/ProductCard";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("laptops");
  const [showAll, setShowAll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const VISIBLE_COUNT = 8;

  // Fetch categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const { Products } = useSelector((state) => state.api);

  const filteredProducts = Products?.filter(
    (product) => product.category === selectedCategory
  ) ?? [];

  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, VISIBLE_COUNT);

  // Animate on category change
  function handleCategoryChange(slug) {
    if (slug === selectedCategory) return;
    setIsAnimating(true);
    setShowAll(false);
    setTimeout(() => {
      setSelectedCategory(slug);
      setIsAnimating(false);
    }, 200);
  }

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest text-blue-500 uppercase mb-2">
            Browse by
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Shop by Category
          </h2>
          <div className="mt-3 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-blue-500" />
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.slice(0, 10).map((category) => {
            const isActive = selectedCategory === category.slug;
            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* ── Stats bar ── */}
        <div className="flex items-center justify-between mb-5 px-1">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {visibleProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <p className="text-sm font-semibold text-blue-600 capitalize">
            {categories.find((c) => c.slug === selectedCategory)?.name ?? selectedCategory}
          </p>
        </div>

        {/* ── Products Grid ── */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-200 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} products={product} />
            ))
          ) : (
            // Empty state
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-2xl">
                🛍️
              </div>
              <p className="text-gray-500 font-medium">No products found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>

        {/* ── View More / Less Button ── */}
        {filteredProducts.length > VISIBLE_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-500 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200 group"
            >
              {showAll ? (
                <>
                  Show Less
                  <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  View All {filteredProducts.length} Products
                  <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}