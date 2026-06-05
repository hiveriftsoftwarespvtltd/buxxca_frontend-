import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";

export const TermPage = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
    setNewsletterEmail("");
  };

  return (
    <>
      <SEO title="Terms and Conditions - BUXAA" description="Terms and conditions for using BUXAA marketplace. Privacy policy, cookie policies, and data processing information." />

      <main className="main">
        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><a className="font-xs color-gray-500" href="#page">Pages</a></li>
                <li><a className="font-xs color-gray-500" href="#terms">Term and Condition</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Term and Condition Content */}
        <section className="section-box shop-template mt-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto page-content">
                <h2 className="text-center mb-20">Term and Condition</h2>
                <img className="mb-30" src="/assets/imgs/page/about/team.jpg" alt="BUXAA Team" style={{ width: "100%", borderRadius: "4px" }} />
                
                <p className="font-md color-gray-700 mb-20">
                  Thank you for supporting BUXAA. In order to protect your personal data when you enjoy using services at BUXAA, we draw up this privacy policy.
                </p>

                <h5>1. Collection of Personal Data.</h5>
                <p className="font-sm color-gray-600 mb-10"><strong>1.1 Definition of personal data</strong></p>
                <p className="font-sm color-gray-600 mb-15">
                  Personal data means any information relating to an identified or identifiable natural person ('data subject'); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data. Personal data does not include data that has been irreversibly anonymized or aggregated so that it can no longer enable us, whether in combination with other information or otherwise, to identify you.
                </p>
                
                <p className="font-sm color-gray-600 mb-10"><strong>1.2 What Personal Data We Collect</strong></p>
                <p className="font-sm color-gray-600 mb-15">
                  Depending on the products and services you choose, we collect different kinds of personal data from or about you.
                </p>
                <p className="font-sm color-gray-600 mb-15">
                  <strong>(a) Data you provide:</strong> We collect the personal data you provide when you create an account to use our products and services or otherwise interact with us, such as when you fill in account information, participate in our online survey or promotional operations, leave comments about the products, and use our online help or online chat tool or email us.
                </p>
                <p className="font-sm color-gray-600 mb-15">
                  <strong>(b) Data from your terminal equipment:</strong> After obtaining your permission, Photos/Media/Files access may include the ability to read/write contents from/to your USB storage, format or mount external storage.
                </p>

                <h5>2. How We Use Cookies and Similar Technologies.</h5>
                <p className="font-sm color-gray-600 mb-15">
                  We use cookies and similar technologies to provide, protect, and improve our products and services, such as by personalizing content, offering and measuring advertisements, understanding user behavior, and providing a safer experience. You can remove or reject cookies using your browser or device settings, but in some cases doing so may affect your ability to use our products and services.
                </p>
                <p className="font-sm color-gray-600 mb-10"><strong>2.1 Definition of "Cookies"</strong></p>
                <p className="font-sm color-gray-600 mb-15">
                  Cookies are small text files that are placed on your device by websites that you are browsing. Cookies do a number of different jobs such as remembering your preferences and chosen items, assisting you to improve your site experience as well as trying to ensure that the adverts or offers you see online are more relevant to you.
                </p>

                <h5>3. How We Process Your Personal Data.</h5>
                <p className="font-sm color-gray-600 mb-15">
                  Except otherwise stipulated by law, we will use your personal data with your explicit consent for the purposes specified in this privacy policy as described below.
                </p>
                <p className="font-sm color-gray-600 mb-15">
                  <strong>3.1 Providing, improving, and developing our products and services:</strong> We may use your personal data to help us provide, improve, and develop our products and services. This includes helping you get a quick registration, complete shopping process with satisfying search functionalities, use convenient payment options, and diagnostic operations.
                </p>
                <p className="font-sm color-gray-600 mb-15">
                  <strong>3.2 Communicating with you:</strong> When you contact us, we can use your personal data to communicate with you about your account or transactions, and respond to your requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="section-box mt-90 mb-50">
          <div className="container">
            <ul className="list-col-5">
              <li>
                <div className="item-list">
                  <div className="icon-left"><img src="/assets/imgs/template/delivery.svg" alt="Free Delivery" /></div>
                  <div className="info-right">
                    <h5 className="font-lg-bold color-gray-100">Free Delivery</h5>
                    <p className="font-sm color-gray-500">From all orders over $10</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-list">
                  <div className="icon-left"><img src="/assets/imgs/template/support.svg" alt="Support" /></div>
                  <div className="info-right">
                    <h5 className="font-lg-bold color-gray-100">Support 24/7</h5>
                    <p className="font-sm color-gray-500">Shop with an expert</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-list">
                  <div className="icon-left"><img src="/assets/imgs/template/voucher.svg" alt="Gift" /></div>
                  <div className="info-right">
                    <h5 className="font-lg-bold color-gray-100">Gift voucher</h5>
                    <p className="font-sm color-gray-500">Refer a friend</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-list">
                  <div className="icon-left"><img src="/assets/imgs/template/return.svg" alt="Return" /></div>
                  <div className="info-right">
                    <h5 className="font-lg-bold color-gray-100">Return &amp; Refund</h5>
                    <p className="font-sm color-gray-500">Free return over $200</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="item-list">
                  <div className="icon-left"><img src="/assets/imgs/template/secure.svg" alt="Secure" /></div>
                  <div className="info-right">
                    <h5 className="font-lg-bold color-gray-100">Secure payment</h5>
                    <p className="font-sm color-gray-500">100% Protected</p>
                  </div>
                </div>
              </li>
            </ul>
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

export default TermPage;
