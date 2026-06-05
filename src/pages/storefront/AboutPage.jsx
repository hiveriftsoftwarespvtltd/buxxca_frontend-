import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";

export const AboutPage = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
    setNewsletterEmail("");
  };

  return (
    <>
      <SEO title="About Us - BUXAA" description="Learn more about BUXAA, the global leading online marketplace. Our team, our mission, and our values." />

      <main className="main">
        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><a className="font-xs color-gray-500" href="#page">Pages</a></li>
                <li><a className="font-xs color-gray-500" href="#about">About Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global Leading Online Shop */}
        <section className="section-box shop-template mt-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h5 className="color-gray-500 mb-10">About us</h5>
                <h2>Global Leading Online Shop</h2>
                <div className="row mt-20">
                  <div className="col-lg-6">
                    <p className="font-sm font-medium color-gray-700 mb-15">
                      BUXAA expands global footprint, delivering entertaining experiences customised to each user. Branches are expanding both in size and number.
                    </p>
                    <p className="font-sm font-medium color-gray-700 mb-15">
                      Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Lacus vel facilisis volutpat est velit. Urna neque viverra justo nec. Suspendisse faucibus interdum posuere lorem ipsum dolor. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Tortor vitae purus faucibus ornare.
                    </p>
                    <p className="font-sm font-medium color-gray-700 mb-15">
                      Tempus iaculis urna id volutpat lacus laoreet. Id neque aliquam vestibulum morbi blandit. Lacinia quis vel eros donec ac odio tempor orci. Lectus sit amet est placerat in egestas erat imperdiet. Nunc congue nisi vitae suscipit. Sed adipiscing diam donec adipiscing tristique risus.
                    </p>
                    <ul className="list-services mt-20">
                      <li className="hover-up">We provide qualified &amp; expert</li>
                      <li className="hover-up">Modern tools &amp; technology use</li>
                      <li className="hover-up">Neat &amp; cleaning top Services</li>
                      <li className="hover-up">We Develop Digital Future</li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <img src="/assets/imgs/page/about/img.png" alt="About BUXAA" />
                  </div>
                </div>

                {/* Experience Stats */}
                <div className="box-contact-support pt-80 pb-50 pl-50 pr-50 background-gray-50 mt-50 mb-90">
                  <div className="row">
                    <div className="col-lg-3 mb-30 text-center text-lg-start">
                      <h4 className="mb-5">12 Years</h4>
                      <p className="font-md color-gray-700">We’ve more than 12 years working experience.</p>
                    </div>
                    <div className="col-lg-3 mb-30 text-center text-lg-start">
                      <h4 className="mb-5">2000+ Employee</h4>
                      <p className="font-md color-gray-700 mb-5">We’ve more than 2000 employees working near you.</p>
                    </div>
                    <div className="col-lg-3 mb-30 text-center text-lg-start">
                      <h4 className="mb-5">68 Branches</h4>
                      <p className="font-md color-gray-700 mb-5">We have 68 branches across the country and are expanding</p>
                    </div>
                    <div className="col-lg-3 mb-30 text-center text-lg-start">
                      <h4 className="mb-5">15 Countries</h4>
                      <p className="font-md color-gray-700 mb-5">We are present in 15 countries around the world</p>
                    </div>
                  </div>
                </div>

                {/* Behind The Brands */}
                <h5 className="color-gray-500 mb-10">Behind The Brands</h5>
                <h2 className="mb-40">The people who work at BUXAA share the vision and values of our community.</h2>
                <div className="row mb-50">
                  {/* Staff 1 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft1.png" alt="Ronald Richards" /></div>
                      <div className="info-staff">
                        <h5>Ronald Richards</h5>
                        <p className="font-md color-gray-500">Chief Executive Officer</p>
                      </div>
                    </div>
                  </div>
                  {/* Staff 2 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft2.png" alt="Jenny Wilson" /></div>
                      <div className="info-staff">
                        <h5>Jenny Wilson</h5>
                        <p className="font-md color-gray-500">Chief Financial Officer</p>
                      </div>
                    </div>
                  </div>
                  {/* Staff 3 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft3.png" alt="Cody Fisher" /></div>
                      <div className="info-staff">
                        <h5>Cody Fisher</h5>
                        <p className="font-md color-gray-500">Chief Operating Officer</p>
                      </div>
                    </div>
                  </div>
                  {/* Staff 4 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft4.png" alt="Jacob Jones" /></div>
                      <div className="info-staff">
                        <h5>Jacob Jones</h5>
                        <p className="font-md color-gray-500">Chief Technology Officer</p>
                      </div>
                    </div>
                  </div>
                  {/* Staff 5 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft5.png" alt="Leslie Alexander" /></div>
                      <div className="info-staff">
                        <h5>Leslie Alexander</h5>
                        <p className="font-md color-gray-500">Chief Marketing Officer</p>
                      </div>
                    </div>
                  </div>
                  {/* Staff 6 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft6.png" alt="Ralph Edwards" /></div>
                      <div className="info-staff">
                        <h5>Ralph Edwards</h5>
                        <p className="font-md color-gray-500">Chief Human Resources Officer</p>
                      </div>
                    </div>
                  </div>
                  {/* Staff 7 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft7.png" alt="Eleanor Pena" /></div>
                      <div className="info-staff">
                        <h5>Eleanor Pena</h5>
                        <p className="font-md color-gray-500">Chief Legal Officer</p>
                      </div>
                    </div>
                  </div>
                  {/* Staff 8 */}
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card-staff hover-up">
                      <div className="image-staff"><img src="/assets/imgs/page/about/staft8.png" alt="Theresa Webb" /></div>
                      <div className="info-staff">
                        <h5>Theresa Webb</h5>
                        <p className="font-md color-gray-500">Chief Product Officer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partners Logo */}
                <h5 className="color-gray-500 mb-10">Our Partners</h5>
                <h2 className="mb-40">Trusted by 18,000+ Vendors</h2>
                <div className="box-images-logo mb-50">
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/microsoft.svg" alt="Microsoft" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/sony.svg" alt="Sony" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/acer.svg" alt="Acer" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/nokia.svg" alt="Nokia" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/asus.svg" alt="Asus" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/casio.svg" alt="Casio" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/dell.svg" alt="Dell" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/panasonic.svg" alt="Panasonic" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/vaio.svg" alt="Vaio" /></Link>
                  <Link className="hover-up" to="/shop"><img src="/assets/imgs/page/about/sharp.svg" alt="Sharp" /></Link>
                </div>

                <div className="border-1 mb-80 mt-50"></div>

                {/* Visit our stores */}
                <h2 className="mb-5">Visit our stores</h2>
                <p className="font-sm color-gray-700">Find us at these locations</p>
                <div className="box-contact-address pt-30 pb-50">
                  <div className="row">
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
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
            </div>
          </div>

          {/* Support Section */}
          <div className="box-contact-support pt-80 pb-50 background-gray-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10">
                  <div className="row">
                    <div className="col-lg-3 mb-30 text-center text-lg-start">
                      <h3 className="mb-5">We'd love to hear from you</h3>
                      <p className="font-sm color-gray-700">Chat with our friendly team</p>
                    </div>
                    <div className="col-lg-3 text-center mb-30">
                      <div className="box-image mb-20"><img src="/assets/imgs/page/contact/chat.svg" alt="Chat" /></div>
                      <h4 className="mb-5">Chat to sales</h4>
                      <p className="font-sm color-gray-700 mb-5">Speak to our team.</p>
                      <a className="font-sm color-gray-900" href="mailto:sales@buxaa.com">sales@buxaa.com</a>
                    </div>
                    <div className="col-lg-3 text-center mb-30">
                      <div className="box-image mb-20"><img src="/assets/imgs/page/contact/call.svg" alt="Call" /></div>
                      <h4 className="mb-5">Call us</h4>
                      <p className="font-sm color-gray-700 mb-5">Mon-Fri from 8am to 5pm</p>
                      <a className="font-sm color-gray-900" href="tel:+15550000000">+1(555)000-0000</a>
                    </div>
                    <div className="col-lg-3 text-center mb-30">
                      <div className="box-image mb-20"><img src="/assets/imgs/page/contact/map.svg" alt="Visit" /></div>
                      <h4 className="mb-5">Visit us</h4>
                      <p className="font-sm color-gray-700 mb-5">Visit our office</p>
                      <span className="font-sm color-gray-900">205 North Michigan Avenue, Suite 810<br />Chicago, 60601, USA</span>
                    </div>
                  </div>
                </div>
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
                <h3 className="color-white">Subscrible &amp; Get <span class="color-warning">10%</span> Discount</h3>
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

export default AboutPage;
