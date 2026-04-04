// import Component
import HeroSlider from "../component/Sections/HeroSlider/HeroSlider";
import ProductSlider from "../component/Product/SlidProduct/SlideProduct"
import Category from "../component/Sections/Category/CategorySection";     
import DealsTheDay from "../component/Sections/DealsTheDay/DealsTheDay";     
import BestSellers from "../component/Sections/BestSellers/BestSellers";     

import { useSelector } from "react-redux";
function Home() {
  const { status, error } = useSelector((state) => state.api);
  if (status === "failed") return <p>Error: {error}</p>;
if (status === "loading") {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner Loading*/}
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        
        {/* Text Loading*/}
        <p className="text-white text-lg font-semibold animate-pulse">
          Loading...
        </p>

      </div>
    </div>
  );
}
  return (
    <div className=" overflow-hidden">
      <HeroSlider/>
      <Category/>
      <BestSellers/>
      <ProductSlider/>
      <DealsTheDay/>
    </div>
  );

}
export default Home;
