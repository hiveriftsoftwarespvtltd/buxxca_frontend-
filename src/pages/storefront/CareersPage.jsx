import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";

export const CareersPage = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
    setNewsletterEmail("");
  };

  return (
    <>
      <SEO title="Careers - BUXAA" description="Explore career opportunities and internships at BUXAA. We seek the brightest and most talented individuals globally." />

      <main className="main">
        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><a className="font-xs color-gray-500" href="#page">Pages</a></li>
                <li><a className="font-xs color-gray-500" href="#careers">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Careers Content */}
        <section className="section-box shop-template mt-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto page-content">
                <h2 className="text-center mb-20">Work with us</h2>
                <img className="mb-30" src="/assets/imgs/page/about/team-2.jpg" alt="Work with us" style={{ width: "100%", borderRadius: "4px" }} />
                
                <p className="font-md color-gray-700 mb-20">
                  We recognize that poverty has no borders. Neither does excellence. We are continually in search of the brightest, most talented individuals from around the globe.
                </p>
                
                <h5>Programs and Internships</h5>
                <p className="font-sm color-gray-600 mb-20">
                  But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
                </p>
                <p className="font-sm color-gray-600 mb-20">
                  To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.
                </p>
                
                <h5>Current Openings</h5>
                <p className="font-sm color-gray-600 mb-20">
                  These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.
                </p>
                <p className="font-sm color-gray-600 mb-20">
                  But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
                </p>
                <p className="font-sm color-gray-600 mb-20">
                  To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.
                </p>
                
                <h5>Behind the Mission</h5>
                <p className="font-sm color-gray-600 mb-20">
                  These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.
                </p>
                <p className="font-sm color-gray-600 mb-20">
                  But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
                </p>
                <p className="font-sm color-gray-600 mb-20">
                  To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.
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

export default CareersPage;
