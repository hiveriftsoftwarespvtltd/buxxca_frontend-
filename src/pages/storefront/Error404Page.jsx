import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";

export const Error404Page = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
    setNewsletterEmail("");
  };

  return (
    <>
      <SEO title="Page Not Found - 404 - BUXAA" description="The page you are looking for does not exist on BUXAA." />

      <main className="main">
        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><a className="font-xs color-gray-500" href="#page">Pages</a></li>
                <li><a className="font-xs color-gray-500" href="#404">Error 404</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 404 Section */}
        <section className="section-box shop-template mt-60">
          <div className="container">
            <div className="text-center mb-150 mt-50"> 
              <div className="image-404 mb-50">
                <img src="/assets/imgs/page/account/404.png" alt="404 Error" style={{ maxWidth: "250px" }} />
              </div>
              <h3>404 - Page Not Found</h3>
              <p className="font-md-bold color-gray-600">Looks like the page doesn't exist.</p>
              <div className="mt-15">
                <Link className="btn btn-buy w-auto arrow-back" to="/">Back to Homepage</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-box box-newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 col-sm-12">
                <h3 className="color-white">Subscrible &amp; Get <span className="color-warning">10%</span> Discount</h3>
                <p className="font-lg color-white">Get E-mail updates about our latest shop and <span className="font-lg-bold">special offers.</span></p>
              </div>
              <div className="col-lg-4 col-md-5 col-sm-12">
                <div className="box-form-newsletter mt-15">
                  <form className="form-newsletter" onSubmit={handleNewsletterSubmit}>
                    <input
                      className="input-newsletter font-xs"
                      type="email"
                      placeholder="Your email Address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                    />
                    <button className="btn btn-brand-2" type="submit">Sign Up</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Error404Page;
