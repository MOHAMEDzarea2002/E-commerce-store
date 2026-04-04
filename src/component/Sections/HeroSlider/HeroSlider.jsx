import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// Images
import Hero1 from "../../../assets/img/banner_Hero1.jpg";
import Hero2 from "../../../assets/img/banner_Hero2.jpg";
import Hero3 from "../../../assets/img/banner_Hero3.jpg";

const slides = [
  {
    id: 1,
    image: Hero1,
    alt: "Xbox 360 Controller Banner",
    badge: "🔥 Hot Deal",
    title: "Microsoft Xbox 360 Controller",
    subtitle: "Up to 50% Off",
    description: "Compatible with Windows 11 / 10 / 8 / 7 / XP",
    cta: "Shop Now",
    ctaLink: "/Shop_All",
    accentColor: "from-blue-600 to-blue-400",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    image: Hero2,
    alt: "Hero Banner 2",
    badge: "⚡ New Arrival",
    title: "Premium Gaming Headset",
    subtitle: "Starting from $29.99",
    description: "Immersive surround sound — feel every moment",
    cta: "Explore Now",
    ctaLink: "/Shop_All",
    accentColor: "from-purple-600 to-purple-400",
    badgeColor: "bg-purple-500",
  },
  {
    id: 3,
    image: Hero3,
    alt: "Hero Banner 3",
    badge: "🎁 Limited Offer",
    title: "Smart Wireless Keyboard",
    subtitle: "Free Shipping Today Only",
    description: "Ultra-slim design — work from anywhere",
    cta: "Get Yours",
    ctaLink: "/Shop_All",
    accentColor: "from-emerald-600 to-emerald-400",
    badgeColor: "bg-emerald-500",
  },
];

// Arrow SVG
const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const ChevronLeft = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

function HeroSlider() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-gray-100 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-52 sm:h-72 md:h-96 lg:h-[480px] overflow-hidden">

                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-6 sm:px-10 lg:px-14 max-w-lg space-y-3 sm:space-y-4">

                      {/* Badge */}
                      <span className={`inline-block ${slide.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide`}>
                        {slide.badge}
                      </span>

                      {/* Title */}
                      <h1 className="text-white font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
                        {slide.title}
                      </h1>

                      {/* Subtitle */}
                      <p className={`font-bold text-sm sm:text-lg md:text-2xl bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent`}>
                        {slide.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-300 text-xs sm:text-sm hidden sm:block">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex items-center gap-3 pt-1">
                        <Link
                          to={slide.ctaLink}
                          className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.accentColor} text-white font-bold text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200`}
                        >
                          {slide.cta}
                          <ChevronRight />
                        </Link>
                        <Link
                          to="/Shop_All"
                          className="text-white/80 text-sm font-medium hover:text-white underline underline-offset-2 transition-colors hidden sm:inline"
                        >
                          View All Deals
                        </Link>
                      </div>

                    </div>
                  </div>

                  {/* Slide counter */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {slide.id} / {slides.length}
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── Custom Navigation Arrows - desktop only ── */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>

          {/* ── Custom Pagination Dots ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSlider;