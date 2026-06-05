import React from "react";
import { Link } from "react-router-dom";

export const BannerRow = () => {
  return (
    <section className="section-box pt-50">
      <div className="container">
        <div className="row">
          {/* Sling Bags Banner */}
          <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 mb-30">
            <div className="bg-5 block-iphone" style={{ backgroundImage: "url(/assets/imgs/page/homepage1/banner-small-1.png)" }}>
              <span className="color-brand-3 font-sm-lh32">Starting from Rs. 1,499</span>
              <h3 className="font-xl mb-10">Sling Bags Collection</h3>
              <p className="font-base color-brand-3 mb-10">Special Sale</p>
              <Link className="btn btn-arrow" to="/shop?category=Sling%20Bags">learn more</Link>
            </div>
          </div>

          {/* Premium Duffels Banner */}
          <div className="col-xl-4 col-lg-7 col-md-7 col-sm-12 mb-30">
            <div className="bg-4 block-samsung" style={{ backgroundImage: "url(/assets/imgs/page/homepage1/banner-small-2.png)" }}>
              <span className="color-brand-3 font-sm-lh32">New Arrivals</span>
              <h3 className="font-xl mb-10">Premium Duffel Series</h3>
              <p className="font-base color-brand-3 mb-20">Weekend Ready</p>
              <Link className="btn btn-brand-2 btn-arrow-right" to="/shop?category=Duffel%20Bags">learn more</Link>
            </div>
          </div>

          {/* Tech Organizers Banner */}
          <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12">
            <div className="bg-6 block-drone" style={{ backgroundImage: "url(/assets/imgs/page/homepage1/banner-1.png)" }}>
              <h3 className="font-33 mb-20">Professional Tech Organizers</h3>
              <div className="mb-30">
                <strong className="font-18">Durable Hard Case Pouches for Cables &amp; Gadgets</strong>
              </div>
              <Link className="btn btn-brand-2 btn-arrow-right" to="/shop?category=Organizers">learn more</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerRow;
