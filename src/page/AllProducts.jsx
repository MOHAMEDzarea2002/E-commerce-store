import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../component/Product/ProductCard/ProductCard";
import "./style.css";

// ─── Constants ────────────────────────────────────────────────────────────────
const PRODUCTS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: "", label: "الترتيب الافتراضي" },
  { value: "price-asc", label: "السعر: منخفض → مرتفع" },
  { value: "price-desc", label: "السعر: مرتفع → منخفض" },
  { value: "rating-desc", label: "الأعلى تقييمًا" },
];

// ─── Custom Hook: Debounce ────────────────────────────────────────────────────
function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ─── Sub-component: Skeleton Card ────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="w-70 rounded-xl overflow-hidden bg-white border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
}

// ─── Sub-component: Empty State ───────────────────────────────────────────────
function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <span className="text-6xl">🔍</span>
      <h2 className="text-xl font-semibold text-gray-700">لا توجد منتجات مطابقة</h2>
      <p className="text-gray-400 text-sm">جرّب تغيير الفلاتر أو إعادة تعيينها</p>
      <button
        onClick={onReset}
        className="mt-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
      >
        إعادة تعيين الفلاتر
      </button>
    </div>
  );
}

// ─── Sub-component: Pagination ────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-8 pb-4 flex-wrap">
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-400 transition-colors"
      >
        ← السابق
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors
            ${currentPage === page
              ? "bg-indigo-600 text-white border-indigo-600"
              : "hover:bg-indigo-50 hover:border-indigo-400"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-400 transition-colors"
      >
        التالي →
      </button>
    </div>
  );
}

// ─── Sub-component: Star Rating Filter ───────────────────────────────────────
function StarRatingFilter({ value, onChange }) {
  const stars = [4, 3, 2, 1];
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => onChange(0)}
        className={`text-sm py-1 px-2 rounded text-left transition-colors ${
          value === 0 ? "bg-indigo-100 text-indigo-700 font-semibold" : "hover:bg-gray-100"
        }`}
      >
        الكل
      </button>
      {stars.map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`flex items-center gap-1 text-sm py-1 px-2 rounded transition-colors ${
            value === star ? "bg-indigo-100 text-indigo-700 font-semibold" : "hover:bg-gray-100"
          }`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < star ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
          <span className="ml-1">& أعلى</span>
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Category() {
  // ── Categories state ──────────────────────────────────────────────────────
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ── Filter states ─────────────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search so we don't filter on every keystroke
  const debouncedSearch = useDebounce(searchTerm, 350);

  // ── Redux ─────────────────────────────────────────────────────────────────
  const { Products } = useSelector((state) => state.api);

  // ── Fetch categories ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // ── Reset to page 1 when any filter changes ───────────────────────────────
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearch, minPrice, maxPrice, rating, sortOption]);

  // ── Reset all filters ─────────────────────────────────────────────────────
  const handleResetFilters = useCallback(() => {
    setSelectedCategory("");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setRating(0);
    setSortOption("");
    setCurrentPage(1);
  }, []);

  // ── Derived: any active filters? ──────────────────────────────────────────
  const hasActiveFilters =
    selectedCategory !== "" ||
    debouncedSearch !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    rating > 0 ||
    sortOption !== "";

  // ── Combined filter + sort + paginate (all in one useMemo) ────────────────
  const { paginatedProducts, totalPages, totalFiltered } = useMemo(() => {
    if (!Products) return { paginatedProducts: [], totalPages: 0, totalFiltered: 0 };

    // 1. Filter
    let result = Products.filter((p) => {
      const matchCategory = selectedCategory === "" || p.category === selectedCategory;
      const matchSearch =
        debouncedSearch === "" ||
        p.title?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);
      const matchRating = rating === 0 || p.rating >= rating;

      return matchCategory && matchSearch && matchMin && matchMax && matchRating;
    });

    // 2. Sort
    if (sortOption === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    const totalFiltered = result.length;
    const totalPages = Math.ceil(totalFiltered / PRODUCTS_PER_PAGE);

    // 3. Paginate
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = result.slice(start, start + PRODUCTS_PER_PAGE);

    return { paginatedProducts, totalPages, totalFiltered };
  }, [Products, selectedCategory, debouncedSearch, minPrice, maxPrice, rating, sortOption, currentPage]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="Category relative w-full min-h-screen bg-gray-50">
      <div className="flex flex-row gap-0 min-h-screen">

        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside
          className={`
            bg-white border-r border-gray-100 shadow-sm
            transition-all duration-300 ease-in-out overflow-hidden
            md:w-64 md:block
            ${isSidebarOpen ? "w-64" : "w-0 md:w-64"}
            shrink-0
          `}
        >
          <div className="sticky top-40 p-4 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-800 text-base">الفلاتر</h2>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-indigo-600 hover:underline font-medium"
                >
                  إعادة تعيين
                </button>
              )}
            </div>

            {/* Search */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                البحث
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                الفئة
              </label>
              <div className="max-h-52 overflow-y-auto space-y-0.5 pr-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors capitalize
                    ${selectedCategory === ""
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  الكل
                </button>
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors capitalize
                      ${selectedCategory === cat.slug
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    {cat.slug}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                نطاق السعر ($)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="من"
                  className="w-1/2 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="إلى"
                  className="w-1/2 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                التقييم
              </label>
              <StarRatingFilter value={rating} onChange={setRating} />
            </div>

            {/* Sort */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                الترتيب
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition bg-white"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </aside>

        {/* ── Main Content ────────────────────────────────────────────────── */}
        <main className="flex-1 px-4 py-6">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            {/* Mobile sidebar toggle */}
            <button
              className="md:hidden flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-50 transition"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span>☰</span>
              <span>الفلاتر</span>
              {hasActiveFilters && (
                <span className="bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {selectedCategory === "" ? "جميع المنتجات" : selectedCategory}
            </h1>

            {/* Count */}
            <span className="text-sm text-gray-400">
              {totalFiltered} منتج
            </span>
          </div>

          {/* Active filter pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("")} className="ml-1 hover:text-indigo-900">×</button>
                </span>
              )}
              {debouncedSearch && (
                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                  "{debouncedSearch}"
                  <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-indigo-900">×</button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                  ${minPrice || 0} – ${maxPrice || "∞"}
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="ml-1 hover:text-indigo-900">×</button>
                </span>
              )}
              {rating > 0 && (
                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                  {rating}★ & أعلى
                  <button onClick={() => setRating(0)} className="ml-1 hover:text-indigo-900">×</button>
                </span>
              )}
              {sortOption && (
                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                  {SORT_OPTIONS.find((o) => o.value === sortOption)?.label}
                  <button onClick={() => setSortOption("")} className="ml-1 hover:text-indigo-900">×</button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {isLoading ? (
            // Loading skeleton
            <div className="flex flex-row items-start flex-wrap justify-center gap-4">
              {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            // Empty state
            <EmptyState onReset={handleResetFilters} />
          ) : (
            // Products
            <div className="flex flex-row items-start flex-wrap justify-center gap-4 transition-all duration-300 ease-in">
              {paginatedProducts.map((product, index) => (
                <div key={product.id ?? index} className="w-70">
                  <ProductCard products={product} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />

        </main>
      </div>
    </div>
  );
}