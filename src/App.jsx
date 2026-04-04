import "./index.css";
// components
import TopHeader from "./component/Layout/Header/TopHeader";
import BottomHeader from "./component/Layout/Header/BottomHeader";
import Footer from "./component/Layout/Footer/Footer";
// Import Page
import ProductDetails from "./page/Product";
import PageCart from "./page/Cart";
import Category from "./page/CategoryPage";
import Home from "./page/Home";
import LoginAndRegister from "./page/LoginAndRegister";
import AboutUs from "./page/AboutUs";
import AllProducts from "./page/AllProducts";
// react_Router
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="">
      <header className="fixed z-40 w-full ">
        <TopHeader />
        <BottomHeader />
      </header>
    <div className="py-30 md:pt-35 ">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop_All" element={<AllProducts />} />
        <Route path="/products/:ProductID" element={<ProductDetails />} />
        <Route path="/PageCart" element={<PageCart />} />
        <Route path="/Category/:CategoryName" element={<Category />} />
        <Route path="/LoginAndRegister" element={<LoginAndRegister />} />
        <Route path="/About" element={<AboutUs />} />
      </Routes>
    </div>
        <Footer />

    </div>
  );
}

export default App;

