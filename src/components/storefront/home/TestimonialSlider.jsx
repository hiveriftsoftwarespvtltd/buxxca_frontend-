import React from "react";

export const TestimonialSlider = () => {
  return (
    <section className="section-box mt-90 mb-50">
      <div className="container">
        <ul className="list-col-5">
          <li>
            <div className="item-list">
              <div className="icon-left">
                <img src="/assets/imgs/template/delivery.svg" alt="BUXAA" />
              </div>
              <div className="info-right">
                <h5 className="font-lg-bold color-gray-100">Free Delivery</h5>
                <p className="font-sm color-gray-500">Free Shipping On eligible orders nationwide</p>
              </div>
            </div>
          </li>
          <li>
            <div className="item-list">
              <div className="icon-left">
                <img src="/assets/imgs/template/support.svg" alt="BUXAA" />
              </div>
              <div className="info-right">
                <h5 className="font-lg-bold color-gray-100">Support 24/7</h5>
                <p className="font-sm color-gray-500">Shop with an expert</p>
              </div>
            </div>
          </li>
          <li>
            <div className="item-list">
              <div className="icon-left">
                <img src="/assets/imgs/template/voucher.svg" alt="BUXAA" />
              </div>
              <div className="info-right">
                <h5 className="font-lg-bold color-gray-100">Premium Quality</h5>
                <p className="font-sm color-gray-500">Crafted with durable materials</p>
              </div>
            </div>
          </li>
          <li>
            <div className="item-list">
              <div className="icon-left">
                <img src="/assets/imgs/template/return.svg" alt="BUXAA" />
              </div>
              <div className="info-right">
                <h5 className="font-lg-bold color-gray-100">Easy Returns</h5>
                <p className="font-sm color-gray-500">Hassle-free return process</p>
              </div>
            </div>
          </li>
          <li>
            <div className="item-list">
              <div className="icon-left">
                <img src="/assets/imgs/template/secure.svg" alt="BUXAA" />
              </div>
              <div className="info-right">
                <h5 className="font-lg-bold color-gray-100">Secure Payments</h5>
                <p className="font-sm color-gray-500">100% safe transactions</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TestimonialSlider;
