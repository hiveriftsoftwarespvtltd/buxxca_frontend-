import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";

export const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: ""
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! We'll get back to you soon.");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <SEO title="Contact Us - BUXAA" description="Get in touch with BUXAA. Chat with our team, call us, or visit our store locations worldwide." />

      <main className="main">

        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div mb-0">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><a className="font-xs color-gray-500" href="#page">Page</a></li>
                <li><a className="font-xs color-gray-500" href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: Contact Form + Map ── */}
        <section className="section-box shop-template mt-0">
          <div className="container">

            {/* Contact Form & Map */}
            <div className="box-contact">
              <div className="row">
                {/* Left: Contact Form */}
                <div className="col-lg-6">
                  <div className="contact-form">
                    <h3 className="color-brand-3 mt-60">Contact Us</h3>
                    <p className="font-sm color-gray-700 mb-30">Our team would love to hear from you!</p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              name="firstName"
                              placeholder="First name"
                              value={form.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              name="lastName"
                              placeholder="Last name"
                              value={form.lastName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={form.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="tel"
                              name="phone"
                              placeholder="Phone number"
                              value={form.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              name="message"
                              placeholder="Message"
                              rows="5"
                              value={form.message}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              className="btn btn-buy w-auto"
                              type="submit"
                              value="Send message"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right: Google Map */}
                <div className="col-lg-6">
                  <div className="map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325467.51371614134!2d-73.98947743776016!3d40.72209526768085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m3!3e0!4m0!4m0!5e0!3m2!1svi!2s!4v1664373110059!5m2!1svi!2s"
                      height="550"
                      style={{ border: 0, width: "100%" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Store Location Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Store Locations ── */}
            <div className="box-contact-address pt-80 pb-50">
              <div className="row">
                <div className="col-lg-3 mb-30">
                  <h3 className="mb-5">Visit our stores</h3>
                  <p className="font-sm color-gray-700 mb-30">Find us at these locations</p>
                  <a className="btn btn-buy w-auto" href="#map" onClick={(e) => e.preventDefault()}>View map</a>
                </div>
                <div className="col-lg-3">
                  <div className="mb-30">
                    <h4>Melbourne</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                  <div className="mb-30">
                    <h4>San Francisco</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                  <div className="mb-30">
                    <h4>Byron Bay</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-30">
                    <h4>Sydney</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                  <div className="mb-30">
                    <h4>Sweden</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                  <div className="mb-30">
                    <h4>Ha Noi</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-30">
                    <h4>Bangkok</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                  <div className="mb-30">
                    <h4>Seoul</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                  <div className="mb-30">
                    <h4>Paris</h4>
                    <p className="font-sm color-gray-700">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Support Cards ── */}
          <div className="box-contact-support pt-80 pb-50 background-gray-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 mb-30 text-center text-lg-start">
                  <h3 className="mb-5">We'd love to here from you</h3>
                  <p className="font-sm color-gray-700">Chat with our friendly team</p>
                </div>
                <div className="col-lg-3 text-center mb-30">
                  <div className="box-image mb-20">
                    <img src="/assets/imgs/page/contact/chat.svg" alt="Chat" />
                  </div>
                  <h4 className="mb-5">Chat to sales</h4>
                  <p className="font-sm color-gray-700 mb-5">Speak to our team.</p>
                  <a className="font-sm color-gray-900" href="mailto:sales@buxaa.com">sales@buxaa.com</a>
                </div>
                <div className="col-lg-3 text-center mb-30">
                  <div className="box-image mb-20">
                    <img src="/assets/imgs/page/contact/call.svg" alt="Call" />
                  </div>
                  <h4 className="mb-5">Call us</h4>
                  <p className="font-sm color-gray-700 mb-5">Mon-Fri from 8am to 5pm</p>
                  <a className="font-sm color-gray-900" href="tel:+15550000000">+1(555)000-0000</a>
                </div>
                <div className="col-lg-3 text-center mb-30">
                  <div className="box-image mb-20">
                    <img src="/assets/imgs/page/contact/map.svg" alt="Visit" />
                  </div>
                  <h4 className="mb-5">Visit us</h4>
                  <p className="font-sm color-gray-700 mb-5">Visit our office</p>
                  <span className="font-sm color-gray-900">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Bar ── */}
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

        {/* ── Newsletter ── */}
        <section className="section-box box-newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 col-sm-12">
                <h3 className="color-white">Subscrible &amp; Get <span className="color-warning">10%</span> Discount</h3>
                <p className="font-lg color-white">Get E-mail updates about our latest shop and <span className="font-lg-bold">special offers.</span></p>
              </div>
              <div className="col-lg-4 col-md-5 col-sm-12">
                <div className="box-form-newsletter mt-15">
                  <form className="form-newsletter" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                    <input
                      className="input-newsletter font-xs"
                      type="email"
                      placeholder="Your email Address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
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

export default ContactPage;
