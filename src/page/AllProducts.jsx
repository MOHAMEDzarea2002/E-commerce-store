import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
// import {fetchAllProducts}from '../store/api/apiSlice'
import ProductCard from "../component/Product/ProductCard/ProductCard";
import "./style.css";
export default function Category() {
  // useState  Categories
  const [categories, setCategories] = useState([]);
  const [Show, setShow] = useState(false);
  // useState  selectedCategory
  const [selectedCategory, setSelectedCategory] = useState("");
  // useState ShowLoadMore

  // fetch Categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const { Products } = useSelector((state) => {
    return state.api;
  });
  // Change Category
  const ChangeCategory = (category) => {
    setSelectedCategory(category);
  };
  // Filter Products by selectedCategory
  const FiltersProduct = useMemo(
    () => ({
      Filters: Products?.filter((p) =>
        selectedCategory == "" ? p : p.category == selectedCategory,
      ),
      // AllProduct: Products?.filter((p)=>(  p.category == selectedCategory))
    }),
    [Products, selectedCategory],
  );

  function Active(element) {
    const ele = element;
    const but = document.querySelectorAll(".but-category");

    but.forEach((e) => {
      e.classList.remove("active");
      if (e.contains(ele.target)) {
        e.classList.add("active");
      }
    });
  }
  return (
<div className="Category relative w-full"> 
  <div className="py-0">
    <div className="flex  flex-row gap-3 min-h-screen"> 
      
      {/* Sidebar - List Category */}
      <div className= "md:w-45 w-30    bg-white rounded-lg p-2">
        <div className="mt-5 sticky top-40 transition-all duration-300"> 
        
          <button
            className="block w-fit mx-auto p-1 mb-5 cursor-pointer shadow-sm border text-sm"
            onClick={() => setShow(!Show)}
          >
            Show-Category
          </button>
          
          <div
            className={`overflow-y-auto overflow-x-hidden ${Show ? "h-64 opacity-100" : "h-0 opacity-0"} transition-all duration-300 ease-in-out`}
          >
            <button
              className="but-category border-b-2 text-left text-black text-sm py-1 p-2 capitalize cursor-pointer block w-full"
              onClick={() => ChangeCategory("")}
            >
              All 
            </button>
            {categories?.map((category, index) => (
              <button
                key={index}
                className="but-category w-full text-left border-b-2 my-1 p-2 text-sm capitalize cursor-pointer"
                onClick={(e) => {
                  ChangeCategory(category.slug);
                  Active(e);
                }}
              >
                {category.slug}
              </button>
            ))}
          </div>
        </div>
      </div>

    
      <div className="flex-1"> 
        <h1 className="text-3xl py-2 capitalize block w-fit mx-auto">
          {selectedCategory === "" ? "All Product" : selectedCategory}
        </h1>
        
        <div className="flex flex-row items-center flex-wrap justify-center gap-4 transition-all duration-300 ease-in pb-10">
          {FiltersProduct?.Filters?.map((product, index) => (
            <div key={index} className="w-70">
              <ProductCard products={product} />
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>
  );
}
