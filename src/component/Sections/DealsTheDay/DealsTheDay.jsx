// Import Swiper
import { FreeMode, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Redux
import { useSelector } from "react-redux";
// Import React
import { useState, useEffect, useMemo } from "react";
// Import Card
import CardProduct from "../../Product/ProductCard/ProductCard";

export default function DealsTheDay() {
  // get products from redux store
  const { Products } = useSelector((state) => state.api);
// State For Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Filter Products For Deals Of The Day
  const dealProducts = useMemo(() => {
    return Products?.filter(
      (p) => p.category == "mens-shirts" && p.price <= 100,
    );
  }, [Products]);

// Countdown Timer Logic
  useEffect(() => {
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);

    const intervalId = setInterval(() => {
      let distance = targetDate.getTime() - new Date().getTime();
      if (distance < 0) {
        clearInterval(intervalId);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="container">
      <div className="py-10">
        {/* Heading */}
        <div className="border-b-2 mb-5 border-gray-300 ">
          <h1 className="text-blue-500 text-4xl mb-2">    Deals of the Day</h1>
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex items-center bg-black rounded-2xl overflow-hidden py-3 px-2">
          <div className="text-white bg-gradient-to-r from-blue-700 rounded-lg w-120 p-2">
            <span className="text-white line-clamp-2 md:text-3xl text-balance flex flex-wrap gap-2 text-center">
              Deals of the Day
            </span>
            <div className="flex justify-center items-center flex-col md:flex-row md:text-2xl">
              <span className="p-2">{timeLeft.days}d</span>
              <span className="p-2">{timeLeft.hours}h</span>
              <span className="p-2">{timeLeft.minutes}m</span>
              <span className="p-2">{timeLeft.seconds}s</span>
            </div>
          </div>

          <Swiper
            freeMode={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[FreeMode, Autoplay]}
            className="mySwiper"
            breakpoints={{
              300: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              800: { slidesPerView: 2, spaceBetween: 10 },
              1140: { slidesPerView: 3, spaceBetween: 10 },
            }}
          >
            {dealProducts?.map((product) => (
              <SwiperSlide key={product.id} className="max-w-80">
                <CardProduct products={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
