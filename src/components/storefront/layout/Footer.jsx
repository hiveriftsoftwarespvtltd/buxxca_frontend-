import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 width-25 mb-30">
              <h4 className="mb-30 color-gray-1000">Contact</h4>
              <div className="font-md mb-20 color-gray-900">
                <strong className="font-md-bold">Address:</strong> 502 New Design Str, Melbourne, San Francisco, CA 94110, United States
              </div>
              <div className="font-md mb-20 color-gray-900">
                <strong className="font-md-bold">Phone:</strong> (+01) 123-456-789
              </div>
              <div className="font-md mb-20 color-gray-900">
                <strong className="font-md-bold">E-mail:</strong> contact@buxaa-market.com
              </div>
              <div className="font-md mb-20 color-gray-900">
                <strong className="font-md-bold">Hours:</strong> 8:00 - 17:00, Mon - Sat
              </div>
              <div className="mt-30">
                <a className="icon-socials icon-facebook" href="#"></a>
                <a className="icon-socials icon-instagram" href="#"></a>
                <a className="icon-socials icon-twitter" href="#"></a>
                <a className="icon-socials icon-linkedin" href="#"></a>
              </div>
            </div>
            <div className="col-lg-3 width-20 mb-30">
              <h4 className="mb-30 color-gray-1000">Explore BUXXA</h4>
              <ul className="menu-footer">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/shop">Our Collections</Link></li>
                <li><Link to="/shop?category=Premium%20Collection&subcategory=New%20Arrivals">New Arrivals</Link></li>
                <li><Link to="/shop?category=Premium%20Collection&subcategory=Best%20Sellers">Best Sellers</Link></li>
                <li><Link to="/shop?category=Corporate%20Collection">Corporate Gifting</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 width-16 mb-30">
              <h4 className="mb-30 color-gray-1000">Customer Service</h4>
              <ul className="menu-footer">
                <li><Link to="/contact">FAQs</Link></li>
                <li><Link to="/terms">Shipping Policy</Link></li>
                <li><Link to="/terms">Return &amp; Refund Policy</Link></li>
                <li><Link to="/terms">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms &amp; Conditions</Link></li>
                <li><Link to="/account?tab=order-tracking">Track Your Order</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 width-16 mb-30">
              <h4 className="mb-30 color-gray-1000">My Account</h4>
              <ul className="menu-footer">
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/account?tab=orders">Order History</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/login">Login / Register</Link></li>
                <li><Link to="/account?tab=setting">Manage Addresses</Link></li>
                <li><Link to="/contact">Support Center</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 width-23">
              <h4 className="mb-30 color-gray-1000">App &amp; Payment</h4>
              <div>
                <p className="font-md color-gray-900">Download our Apps and get extra 15% Discount on your first Order...!</p>
                <div className="mt-20">
                  <a className="mr-10" href="#">
                    <img src="/assets/imgs/template/appstore.png" alt="BUXAA" />
                  </a>
                  <a href="#">
                    <img src="/assets/imgs/template/google-play.png" alt="BUXAA" />
                  </a>
                </div>
                <p className="font-md color-gray-900 mt-20 mb-10">Secured Payment Gateways</p>
                <img src="/assets/imgs/template/payment-method.png" alt="BUXAA" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-2">
        <div className="footer-bottom-1">
          <div className="container">
            <div className="footer-2-top mb-20 flex flex-wrap items-center gap-4">
              <Link to="/"><img alt="BUXAA" src="/assets/imgs/template/buxaa-logo.png" style={{ maxHeight: "40px", objectFit: "contain" }} /></Link>
              <span className="font-xs color-gray-400 ml-10">|</span>
              <Link className="font-xs color-gray-1000 ml-10" to="/about">Our Story</Link>
              <span className="font-xs color-gray-400">|</span>
              <Link className="font-xs color-gray-1000" to="/shop?category=Travel%20Bags">Travel Collection</Link>
              <span className="font-xs color-gray-400">|</span>
              <Link className="font-xs color-gray-1000" to="/shop?category=Premium%20Collection&subcategory=New%20Arrivals">New Arrivals</Link>
              <span className="font-xs color-gray-400">|</span>
              <Link className="font-xs color-gray-1000" to="/shop?category=Premium%20Collection&subcategory=Best%20Sellers">Best Sellers</Link>
              <span className="font-xs color-gray-400">|</span>
              <Link className="font-xs color-gray-1000" to="/contact">Support</Link>
            </div>
            <div className="footer-2-bottom mb-15">
              <div className="head-left-footer">
                <h6 className="color-gray-1000">Shop By Category:</h6>
              </div>
              <div className="tags-footer">
                <Link to="/shop?category=Backpacks">Backpacks</Link>
                <Link to="/shop?category=Travel%20Bags">Travel Bags</Link>
                <Link to="/shop?category=Laptop%20Bags">Laptop Bags</Link>
                <Link to="/shop?category=Duffel%20Bags">Duffel Bags</Link>
                <Link to="/shop?category=Sling%20Bags">Sling Bags</Link>
                <Link to="/shop?category=Organizers">Travel Organizers</Link>
                <Link to="/shop?category=Corporate%20Collection">Corporate Gifts</Link>
                <Link to="/shop?category=Premium%20Collection">Accessories</Link>
              </div>
            </div>
            <div className="footer-2-bottom">
              <div className="head-left-footer">
                <h6 className="color-gray-1000">Shop By Purpose:</h6>
              </div>
              <div className="tags-footer">
                <Link to="/shop?purpose=Office%20Use">Office Use</Link>
                <Link to="/shop?purpose=Travel">Travel</Link>
                <Link to="/shop?purpose=Daily%20Commute">Daily Commute</Link>
                <Link to="/shop?purpose=Business%20Trips">Business Trips</Link>
                <Link to="/shop?purpose=Weekend%20Getaways">Weekend Getaways</Link>
                <Link to="/shop?purpose=Gym%20&amp;%20Fitness">Gym &amp; Fitness</Link>
                <Link to="/shop?purpose=Corporate%20Gifting">Corporate Gifting</Link>
                <Link to="/shop?purpose=Student%20Essentials">Student Essentials</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer-bottom mt-20">
            <div className="row">
              <div className="col-lg-6 col-md-12 text-center text-lg-start">
                <span className="color-gray-900 font-sm">
                  Copyright &copy; 2026 BUXAA Market. All rights reserved.
                </span>
              </div>
              <div className="col-lg-6 col-md-12 text-center text-lg-end">
                <ul className="menu-bottom">
                  <li><Link className="font-sm color-gray-900" to="/terms">Conditions of Use</Link></li>
                  <li><Link className="font-sm color-gray-900" to="/terms">Privacy Notice</Link></li>
                  <li><Link className="font-sm color-gray-900" to="/careers">Interest-Based Ads</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
