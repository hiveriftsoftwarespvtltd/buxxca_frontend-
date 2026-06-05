import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../shop/ProductCard";
import { products } from "../../../data/products";

export const DealOfDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 14,
    minutes: 36,
    seconds: 45
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Use products for the right side grid
  const dealProducts = products.slice(0, 6);

  return (
    <section className="section-box pt-50">
      <div className="container">
        {/* Section Header with countdown banner */}
        <div className="head-main bd-gray-200">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="mb-5">Trending Products</h3>
              <p className="font-base color-gray-500">Special products in this month.</p>
            </div>
            <div className="col-lg-6 text-end">
              <div className="box-all-hurry">
                <div className="d-inline-block box-text-hurryup text-left">
                  <span className="font-md-bold color-gray-900">Hurry up!</span>
                  <br />
                  <span className="font-xs color-gray-500">Offers end in:</span>
                </div>
                <div className="box-count box-count-square hide-period">
                  <div className="deals-countdown">
                    <span className="countdown-section">
                      <span className="countdown-amount font-sm-bold">{timeLeft.days}</span>
                      <span className="countdown-period">d</span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount font-sm-bold">{timeLeft.hours}</span>
                      <span className="countdown-period">h</span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount font-sm-bold">{timeLeft.minutes}</span>
                      <span className="countdown-period">m</span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount font-sm-bold">{timeLeft.seconds}</span>
                      <span className="countdown-period">s</span>
                    </span>
                  </div>
                </div>
                <Link className="btn btn-view-all font-md-bold" to="/shop">View All</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="row">
          {/* Left Special Offer Countdown Card */}
          <div className="col-lg-4">
            <div className="card-grid-style-3 hover-show hurry-up">
              <div className="card-grid-inner">
                <span className="label">
                  <span className="font-lg-bold color-white">Hurry Up!</span>
                </span>
                <div className="image-box">
                  <Link to="/shop?category=Backpacks">
                    <img src="/assets/imgs/page/homepage1/computer.png" alt="BUXAA" style={{ maxHeight: "180px", objectFit: "contain", margin: "0 auto" }} />
                  </Link>
                </div>
                <div className="text-center mt-10 mb-15">
                  <h4>Special Offer</h4>
                  <p className="font-base color-gray-500">Remains until the end of the offer</p>
                </div>
                
                <div className="box-count box-count-square justify-center flex mb-3">
                  <div className="deals-countdown">
                    <span>{timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s</span>
                  </div>
                </div>

                <div className="divide"></div>
                
                <div className="info-right text-left">
                  <span className="font-xs color-gray-500">Bags</span>
                  <br />
                  <Link className="color-brand-3 font-sm-bold" to="/shop?category=Backpacks">
                    <h5>BUXXA Waterproof Laptop Backpack</h5>
                  </Link>
                  <div className="rating">
                    <img src="/assets/imgs/template/icons/star.svg" alt="star" className="inline mr-1" />
                    <img src="/assets/imgs/template/icons/star.svg" alt="star" className="inline mr-1" />
                    <img src="/assets/imgs/template/icons/star.svg" alt="star" className="inline mr-1" />
                    <img src="/assets/imgs/template/icons/star.svg" alt="star" className="inline mr-1" />
                    <img src="/assets/imgs/template/icons/star.svg" alt="star" className="inline mr-1" />
                    <span className="font-xs color-gray-500"> (128)</span>
                  </div>
                  <div className="price-info">
                    <h3 className="color-brand-3 price-main d-inline-block mr-2">Rs. 2,499</h3>
                    <span className="color-gray-500 price-line"><del>Rs. 4,999</del></span>
                  </div>
                  
                  {/* Progress Meter */}
                  <div className="box-progress mt-3">
                    <div className="progress" style={{ height: "6px", backgroundColor: "#e9ecef", borderRadius: "3px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "50%", backgroundColor: "#1A3DAA", borderRadius: "3px" }}
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <span className="font-xs color-gray-500">Available: </span>
                        <span className="font-xs-bold color-gray-900">568</span>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-end">
                        <span className="font-xs color-gray-500">Sold: </span>
                        <span className="font-xs-bold color-gray-900">289</span>
                      </div>
                    </div>
                  </div>

                  <div className="divide"></div>
                  
                  <ul className="list-features">
                    <li>Ergonomic shoulder strap design</li>
                    <li>15.6-inch padded laptop compartment</li>
                    <li>Waterproof and scratch-resistant materials</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Standard Products Grid */}
          <div className="col-lg-8">
            <div className="row">
              {dealProducts.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfDay;
