// Component Slide Product To Show Product In Slide And Home Page

// Import Library Swiper
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useMemo } from "react";

// Import Redux
import { useSelector } from "react-redux";
// import Component Card
import ProductCard from "../ProductCard/ProductCard";

function SideProduct() {
  //   Get Products From Api
  const { Products } = useSelector((state) => {
    return state.api;
  });
  const FilterProducts = useMemo(
    () => ({
      accessories: Products?.filter(
        (product) => product.category === "mobile-accessories",
      ),
      tops: Products?.filter((product) => product.category === "tops"),
      mens_shirts: Products?.filter(
        (product) => product.category === "mens-shirts",
      ),
      fragrances: Products?.filter(
        (product) => product.category === "fragrances",
      ),
    }),

    [Products],
  );

  // Use Effect To Fetch Products

  const { status, error } = useSelector((state) => state.api);
  if (status === "failed")
    return <p className="flex justify-center text-2xl">Error: {error}</p>;
  if (status === "loading")
    return <p className="flex justify-center text-2xl"> Loading...</p>;
  return (
    <div className=" container">
      <div className="my-10">
        <div className="border-b-2 mb-5 border-gray-300 my-15">
          <h1 className="text-blue-500 text-4xl mb-2">tops</h1>
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            voluptates?
          </p>
        </div>
        <Swiper
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Autoplay]}
          className="mySwiper "
          breakpoints={{
            420: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            855: {
              slidesPerView: 3,
              spaceBetween: 30,
            },

            1330: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {/* filter product in api */}
          {FilterProducts?.tops?.map((product) => (
            <SwiperSlide>
              {/*// Map Products To Show In Slide */}
              <div className="max-w-80">
                <ProductCard key={product.id} products={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SideProduct;
