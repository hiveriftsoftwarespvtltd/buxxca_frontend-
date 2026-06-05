import React from "react";
import { Link } from "react-router-dom";

export const PopularCategories = () => {
  return (
    <section className="section-box mt-50">
      <div className="container">
        <div className="row">
          {/* Left Column: Premium Storage Solutions Banner */}
          <div className="col-xl-4 col-lg-12 mb-30">
            <div className="banner-2 bg-xbox" style={{ backgroundColor: "#1A3DAA", backgroundImage: "none", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px" }}>
              <span className="color-danger text-uppercase font-sm-bold" style={{ color: "#C9A84C" }}>Top Selling Products</span>
              <h3 className="font-30 color-white mt-10 mb-10" style={{ fontSize: "32px", fontWeight: "800", lineHeight: "1.2" }}>Travel Smart with BUXXA</h3>
              <p className="color-gray-300 font-16 mb-25" style={{ color: "#e5e7eb" }}>Designed for modern travelers. Built for everyday adventures.</p>
              <div className="mt-10">
                <Link className="btn btn-brand-2 btn-arrow-right animate-bounce" to="/shop" style={{ backgroundColor: "#C9A84C", borderColor: "#C9A84C", color: "#111827", fontWeight: "700" }}>
                  Shop Collection &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Image Gallery of Promos */}
          <div className="col-xl-8 col-lg-12">
            <div className="image-gallery mb-30">
              <div className="image-big">
                <div className="banner-img-left bg-controller" style={{ backgroundImage: "url(/assets/imgs/page/homepage1/img-1-2.png)" }}>
                  <h3 className="font-33 mb-10 text-left color-brand-3">Travel Backpacks</h3>
                  <p className="font-18 text-left color-gray-600">Built for long weekend trips</p>
                  <div className="mt-25 text-left">
                    <Link className="btn btn-brand-2 btn-arrow-right" to="/shop?category=Backpacks">Shop Now</Link>
                  </div>
                </div>
              </div>
              <div className="image-small">
                <div className="bg-metaverse" style={{ backgroundImage: "url(/assets/imgs/page/homepage1/img-1-3.png)" }}>
                  <h3 className="mb-10 font-32 text-left color-brand-3">Utility Pouches</h3>
                  <p className="font-16 text-left color-gray-600">Secure accessories storage</p>
                  <div className="mt-15 text-left">
                    <Link className="btn btn-link-brand-2 btn-arrow-brand-2" to="/shop?category=Organizers">learn more</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="image-gallery">
              <div className="image-small">
                <div className="bg-electronic" style={{ backgroundImage: "url(/assets/imgs/page/homepage1/img-1-4.png)" }}>
                  <h3 className="font-32 text-left color-brand-3">Sling Bags</h3>
                  <p className="font-16 color-gray-600 text-left">Lightweight city carry</p>
                </div>
              </div>
              <div className="image-big">
                <div className="bg-phone" style={{ backgroundImage: "url(/assets/imgs/page/homepage1/banner-2.png)" }}>
                  <h3 className="font-33 mb-15 text-left color-white">Super discount for your first purchase</h3>
                  <p className="font-18 text-left color-gray-100">Sign up today and get exclusive travel discounts.</p>
                  <div className="mt-25 text-left">
                    <Link className="btn btn-brand-2 btn-arrow-right" to="/register">Shop Now</Link>
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

export default PopularCategories;
