import React from "react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import CardProduct from "../../Product/ProductCard/ProductCard";
export default function BestSellers() {
  const { Products } = useSelector((state) => state.api);

  // Filter Products For Deals Of The Day
  const BasteProducts = useMemo(() => {
    return Products?.filter(
      (p) => p.category == "mens-shirts" && p.price <= 30,
    );
  }, [Products]);

  return (
    <div className="container">
      <div className="py-10">
        <div className="border-b-2 mb-5  border-gray-300">
          <h1 className="text-blue-500 text-4xl mb-2">Best Sellers</h1>
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            voluptates?
          </p>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {BasteProducts?.map((product) => (
            <div key={product.id}>
              <CardProduct products={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
