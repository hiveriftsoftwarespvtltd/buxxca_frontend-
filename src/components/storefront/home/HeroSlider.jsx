import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const HeroSlider = () => {
  const slides = [
    {
      subtitle: "PREMIUM CARRY SOLUTIONS",
      title: "BUXXA Executive Series",
      heading: "Travel & Office Backpacks",
      bgClass: "bg-11",
      bgImage: "/assets/imgs/page/homepage1/banner.png",
      desc: "Engineered for modern professionals. Waterproof compartments, dedicated laptop sleeves, and ergonomic design."
    },
    {
      subtitle: "DURABLE & STYLISH",
      title: "Hard Case Pouches & Organizers",
      heading: "Gadget Protection",
      bgClass: "bg-11-2",
      bgImage: "/assets/imgs/page/homepage1/banner-hero-2.png",
      desc: "Keep your cables, adapters, and valuable accessories organized and protected with our premium shockproof utility pouches."
    },
    {
      subtitle: "ADVENTURE AWAITS",
      title: "BUXXA Travel Duffels",
      heading: "Weekender & Cabin Bags",
      bgClass: "bg-11-3",
      bgImage: "/assets/imgs/page/homepage1/banner-hero-3.png",
      desc: "Maximize your storage. Durable materials, heavy-duty zippers, and sleek aesthetics for your weekend getaways."
    }
  ];

  return (
    <section className="section-box">
      <div className="banner-hero banner-1">
        <div className="container">
          <div className="row">
            {/* Main Slider */}
            <div className="col-lg-8">
              <div className="box-swiper">
                <div className="swiper-container swiper-group-1">
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="w-full h-full"
                  >
                    {slides.map((slide, idx) => (
                      <SwiperSlide key={idx}>
                        <div
                          className={`banner-big ${slide.bgClass}`}
                          style={{ backgroundImage: `url(${slide.bgImage})` }}
                        >
                          <span className="font-sm text-uppercase">{slide.subtitle}</span>
                          <h2 className="mt-10">{slide.title}</h2>
                          <h1>{slide.heading}</h1>
                          <div className="row">
                            <div className="col-lg-5 col-md-7 col-sm-12">
                              <p className="font-sm color-brand-3">{slide.desc}</p>
                            </div>
                          </div>
                          <div className="mt-30">
                            <Link className="btn btn-brand-2 mr-2" to="/shop">Shop now</Link>
                            <Link className="btn btn-link" to="/about">Learn more</Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            {/* Right Side Promo Banners */}
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="banner-small banner-small-1 bg-13">
                    <span className="color-danger text-uppercase font-sm-lh32">
                      15% <span className="color-brand-3">Corporate Discount</span>
                    </span>
                    <h4 className="mb-10">Corporate Gifting Sets</h4>
                    <p className="color-brand-3 font-desc">
                      Custom branding and<br className="d-none d-lg-block" /> bulk order rates.
                    </p>
                    <div className="mt-20">
                      <Link className="btn btn-brand-3 btn-arrow-right" to="/shop?category=Corporate%20Collection">Shop now</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="banner-small banner-small-2 bg-14">
                    <span className="color-danger text-uppercase font-sm-lh32">NEW ARRIVALS</span>
                    <h4 className="mb-10">Premium Sling Bags</h4>
                    <p className="color-brand-3 font-md">
                      Compact and lightweight<br className="d-none d-lg-block" /> everyday carry.
                    </p>
                    <div className="mt-20">
                      <Link className="btn btn-brand-2 btn-arrow-right" to="/shop?category=Sling%20Bags">Shop now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
