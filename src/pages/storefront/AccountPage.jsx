import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "../../components/common/SEO";
import { useAuth } from "../../hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

export const AccountPage = () => {
  const { user, logout } = useAuth();
  const { items: wishlistItems, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentUser = user || { name: "Steven Job", email: "stevenjob@gmail.com", role: "customer" };
  const activeTab = searchParams.get("tab") || "notification";

  // Order Tracking state
  const [trackingId, setTrackingId] = useState("FDSFWRFAF13585");

  // Settings state
  const [profileName, setProfileName] = useState(currentUser.name);
  const [profileUsername, setProfileUsername] = useState(currentUser.email.split("@")[0]);
  const [profilePhone, setProfilePhone] = useState("(+01) 234 567 89");
  const [profileEmail, setProfileEmail] = useState(currentUser.email);
  const [keepUpdated, setKeepUpdated] = useState(true);
  const [firstName, setFirstName] = useState("Steven");
  const [lastName, setLastName] = useState("Job");
  const [address1, setAddress1] = useState("205 North Michigan Avenue, Suite 810");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("Chicago");
  const [zip, setZip] = useState("60601");
  const [country, setCountry] = useState("USA");
  const [companyName, setCompanyName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("(+01) 688 866 99");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleTabChange = (tabName) => setSearchParams({ tab: tabName });

  const handleAddToCart = (product) => {
    addItem(product, 1, product.variants?.colors?.[0]?.name || "");
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert("Profile settings saved successfully!");
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <SEO title="My Account - BUXAA" description="Manage your BUXAA customer profile, view orders, track packages, and edit settings." />

      <main className="main">
        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><span className="font-xs color-gray-500">My Account</span></li>
              </ul>
            </div>
          </div>
        </div>

        <section className="section-box shop-template mt-30">
          <div className="container box-account-template">
            <h3>Hello {currentUser.name}</h3>
            <p className="font-md color-gray-500">
              From your account dashboard. you can easily check &amp; view your recent orders,<br className="d-none d-lg-block" />
              manage your shipping and billing addresses and edit your password and account details.
            </p>

            <div className="box-tabs mb-100">
              {/* Tab Navigation — exact same as original */}
              <ul className="nav nav-tabs nav-tabs-account" role="tablist">
                <li>
                  <a href="#tab-notification" className={activeTab === "notification" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); handleTabChange("notification"); }}>
                    Notification
                  </a>
                </li>
                <li>
                  <a href="#tab-wishlist" className={activeTab === "wishlist" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); handleTabChange("wishlist"); }}>
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#tab-orders" className={activeTab === "orders" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); handleTabChange("orders"); }}>
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#tab-order-tracking" className={activeTab === "order-tracking" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); handleTabChange("order-tracking"); }}>
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a href="#tab-setting" className={activeTab === "setting" ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); handleTabChange("setting"); }}>
                    Setting
                  </a>
                </li>
                <li>
                  <a href="#logout" onClick={(e) => { e.preventDefault(); user ? logout() : window.location.href = "/login"; }}>
                    Sign out
                  </a>
                </li>
              </ul>

              <div className="border-bottom mt-20 mb-40"></div>

              <div className="tab-content mt-30">

                {/* ── TAB 1: NOTIFICATION ── */}
                {activeTab === "notification" && (
                  <div className="tab-pane fade active show" id="tab-notification" role="tabpanel">
                    <div className="list-notifications">
                      <div className="item-notification">
                        <div className="image-notification">
                          <img src="/assets/imgs/page/account/img-1.png" alt="Ecom" />
                        </div>
                        <div className="info-notification">
                          <h5 className="mb-5">COD payment confirmed</h5>
                          <p className="font-md color-brand-3">Order<span className="font-md-bold"> 220914QR92BXNH</span> has been confirmed. Please check the estimated delivery time in the order details section!</p>
                        </div>
                        <div className="button-notification">
                          <a className="btn btn-buy w-auto" href="#view"
                            onClick={(e) => { e.preventDefault(); handleTabChange("orders"); }}>
                            View Details
                          </a>
                        </div>
                      </div>

                      <div className="item-notification">
                        <div className="image-notification">
                          <img src="/assets/imgs/page/account/img-2.png" alt="Ecom" />
                        </div>
                        <div className="info-notification">
                          <h5 className="mb-5">COD payment confirmed</h5>
                          <p className="font-md color-brand-3">Order<span className="font-md-bold"> 220914QR92BXNH</span> has been confirmed. Please check the estimated delivery time in the order details section!</p>
                        </div>
                        <div className="button-notification">
                          <a className="btn btn-buy w-auto" href="#view"
                            onClick={(e) => { e.preventDefault(); handleTabChange("orders"); }}>
                            View Details
                          </a>
                        </div>
                      </div>

                      <div className="item-notification">
                        <div className="image-notification">
                          <img src="/assets/imgs/page/account/img-3.png" alt="Ecom" />
                        </div>
                        <div className="info-notification">
                          <h5 className="mb-5">COD payment confirmed</h5>
                          <p className="font-md color-brand-3">Order<span className="font-md-bold"> 220914QR92BXNH</span> has been confirmed. Please check the estimated delivery time in the order details section!</p>
                        </div>
                        <div className="button-notification">
                          <a className="btn btn-buy w-auto" href="#view"
                            onClick={(e) => { e.preventDefault(); handleTabChange("orders"); }}>
                            View Details
                          </a>
                        </div>
                      </div>

                      <div className="item-notification">
                        <div className="image-notification">
                          <img src="/assets/imgs/page/account/img-4.png" alt="Ecom" />
                        </div>
                        <div className="info-notification">
                          <h5>COD payment confirmed</h5>
                          <p className="font-md color-brand-3">Order<span className="font-md-bold"> 220914QR92BXNH</span> has been confirmed. Please check the estimated delivery time in the order details section!</p>
                        </div>
                        <div className="button-notification">
                          <a className="btn btn-buy w-auto" href="#view"
                            onClick={(e) => { e.preventDefault(); handleTabChange("orders"); }}>
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>

                    <nav>
                      <ul className="pagination">
                        <li className="page-item"><a className="page-link page-prev" href="#prev" onClick={(e) => e.preventDefault()}></a></li>
                        <li className="page-item"><a className="page-link" href="#1" onClick={(e) => e.preventDefault()}>1</a></li>
                        <li className="page-item"><a className="page-link active" href="#2" onClick={(e) => e.preventDefault()}>2</a></li>
                        <li className="page-item"><a className="page-link" href="#3" onClick={(e) => e.preventDefault()}>3</a></li>
                        <li className="page-item"><a className="page-link" href="#4" onClick={(e) => e.preventDefault()}>4</a></li>
                        <li className="page-item"><a className="page-link" href="#5" onClick={(e) => e.preventDefault()}>5</a></li>
                        <li className="page-item"><a className="page-link" href="#6" onClick={(e) => e.preventDefault()}>6</a></li>
                        <li className="page-item"><a className="page-link page-next" href="#next" onClick={(e) => e.preventDefault()}></a></li>
                      </ul>
                    </nav>
                  </div>
                )}

                {/* ── TAB 2: WISHLIST ── */}
                {activeTab === "wishlist" && (
                  <div className="tab-pane fade active show" id="tab-wishlist" role="tabpanel">
                    <div className="box-wishlist">
                      <div className="head-wishlist">
                        <div className="item-wishlist">
                          <div className="wishlist-cb"><input className="cb-layout cb-all" type="checkbox" /></div>
                          <div className="wishlist-product"><span className="font-md-bold color-brand-3">Product</span></div>
                          <div className="wishlist-price"><span className="font-md-bold color-brand-3">Price</span></div>
                          <div className="wishlist-status"><span className="font-md-bold color-brand-3">Stock status</span></div>
                          <div className="wishlist-action"><span className="font-md-bold color-brand-3">Action</span></div>
                          <div className="wishlist-remove"><span className="font-md-bold color-brand-3">Remove</span></div>
                        </div>
                      </div>
                      <div className="content-wishlist">
                        {wishlistItems.length === 0 ? (
                          /* Show static items like original if wishlist empty */
                          <>
                            <div className="item-wishlist">
                              <div className="wishlist-cb"><input className="cb-layout cb-select" type="checkbox" /></div>
                              <div className="wishlist-product">
                                <div className="product-wishlist">
                                  <div className="product-image">
                                    <Link to="/shop"><img src="/assets/imgs/page/product/img-sub.png" alt="Ecom" /></Link>
                                  </div>
                                  <div className="product-info">
                                    <Link to="/shop"><h6 className="color-brand-3">Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h6></Link>
                                    <div className="rating">
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <span className="font-xs color-gray-500"> (65)</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wishlist-price"><h4 className="color-brand-3">$2.51</h4></div>
                              <div className="wishlist-status"><span className="btn btn-gray font-md-bold color-brand-3">In Stock</span></div>
                              <div className="wishlist-action"><Link className="btn btn-cart font-sm-bold" to="/cart">Add to Cart</Link></div>
                              <div className="wishlist-remove"><a className="btn btn-delete" href="#remove" onClick={(e) => e.preventDefault()}></a></div>
                            </div>
                            <div className="item-wishlist">
                              <div className="wishlist-cb"><input className="cb-layout cb-select" type="checkbox" /></div>
                              <div className="wishlist-product">
                                <div className="product-wishlist">
                                  <div className="product-image">
                                    <Link to="/shop"><img src="/assets/imgs/page/product/img-sub2.png" alt="Ecom" /></Link>
                                  </div>
                                  <div className="product-info">
                                    <Link to="/shop"><h6 className="color-brand-3">Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h6></Link>
                                    <div className="rating">
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <span className="font-xs color-gray-500"> (65)</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wishlist-price"><h4 className="color-brand-3">$1.51</h4></div>
                              <div className="wishlist-status"><span className="btn btn-gray font-md-bold color-brand-3">In Stock</span></div>
                              <div className="wishlist-action"><Link className="btn btn-cart font-sm-bold" to="/cart">Add to Cart</Link></div>
                              <div className="wishlist-remove"><a className="btn btn-delete" href="#remove" onClick={(e) => e.preventDefault()}></a></div>
                            </div>
                          </>
                        ) : (
                          wishlistItems.map((product) => (
                            <div key={product.id} className="item-wishlist">
                              <div className="wishlist-cb"><input className="cb-layout cb-select" type="checkbox" /></div>
                              <div className="wishlist-product">
                                <div className="product-wishlist">
                                  <div className="product-image">
                                    <Link to={`/product/${product.slug}`}>
                                      <img src={product.images ? product.images[0] : product.image} alt={product.name} />
                                    </Link>
                                  </div>
                                  <div className="product-info">
                                    <Link to={`/product/${product.slug}`}>
                                      <h6 className="color-brand-3">{product.name}</h6>
                                    </Link>
                                    <div className="rating">
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                      <span className="font-xs color-gray-500"> ({product.reviewCount || 65})</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="wishlist-price"><h4 className="color-brand-3">{formatPrice(product.price)}</h4></div>
                              <div className="wishlist-status"><span className="btn btn-gray font-md-bold color-brand-3">In Stock</span></div>
                              <div className="wishlist-action">
                                <button onClick={() => handleAddToCart(product)} className="btn btn-cart font-sm-bold">Add to Cart</button>
                              </div>
                              <div className="wishlist-remove">
                                <button onClick={() => toggleWishlist(product)} className="btn btn-delete"></button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB 3: ORDERS ── */}
                {activeTab === "orders" && (
                  <div className="tab-pane fade active show" id="tab-orders" role="tabpanel">

                    {/* Order 1 — Delivery in progress */}
                    <div className="box-orders">
                      <div className="head-orders">
                        <div className="head-left">
                          <h5 className="mr-20">Order ID: #EWFDSAF1321655</h5>
                          <span className="font-md color-brand-3 mr-20">Date: 18 September 2022</span>
                          <span className="label-delivery">Delivery in progress</span>
                        </div>
                        <div className="head-right">
                          <a className="btn btn-buy font-sm-bold w-auto" href="#track"
                            onClick={(e) => { e.preventDefault(); handleTabChange("order-tracking"); }}>
                            Track Order
                          </a>
                        </div>
                      </div>
                      <div className="body-orders">
                        <div className="list-orders">
                          <div className="item-orders">
                            <div className="image-orders"><img src="/assets/imgs/page/account/img-1.png" alt="Ecom" /></div>
                            <div className="info-orders"><h5>Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h5></div>
                            <div className="quantity-orders"><h5>Quantity: 01</h5></div>
                            <div className="price-orders"><h3>$2.51</h3></div>
                          </div>
                          <div className="item-orders">
                            <div className="image-orders"><img src="/assets/imgs/page/account/img-1.png" alt="Ecom" /></div>
                            <div className="info-orders"><h5>Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h5></div>
                            <div className="quantity-orders"><h5>Quantity: 01</h5></div>
                            <div className="price-orders"><h3>$2.51</h3></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order 2 — Delivered */}
                    <div className="box-orders">
                      <div className="head-orders">
                        <div className="head-left">
                          <h5 className="mr-20">Order ID: #EWFDSAF1321655</h5>
                          <span className="font-md color-brand-3 mr-20">Date: 18 September 2022</span>
                          <span className="label-delivery label-delivered">Delivered</span>
                        </div>
                        <div className="head-right"><a className="btn btn-buy font-sm-bold w-auto" href="#view" onClick={(e) => e.preventDefault()}>View Order</a></div>
                      </div>
                      <div className="body-orders">
                        <div className="list-orders">
                          <div className="item-orders">
                            <div className="image-orders"><img src="/assets/imgs/page/account/img-1.png" alt="Ecom" /></div>
                            <div className="info-orders"><h5>Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h5></div>
                            <div className="quantity-orders"><h5>Quantity: 01</h5></div>
                            <div className="price-orders"><h3>$2.51</h3></div>
                          </div>
                          <div className="item-orders">
                            <div className="image-orders"><img src="/assets/imgs/page/account/img-1.png" alt="Ecom" /></div>
                            <div className="info-orders"><h5>Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h5></div>
                            <div className="quantity-orders"><h5>Quantity: 01</h5></div>
                            <div className="price-orders"><h3>$2.51</h3></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order 3 — Cancelled */}
                    <div className="box-orders">
                      <div className="head-orders">
                        <div className="head-left">
                          <h5 className="mr-20">Order ID: #EWFDSAF1321655</h5>
                          <span className="font-md color-brand-3 mr-20">Date: 18 September 2022</span>
                          <span className="label-delivery label-cancel">Cancel</span>
                        </div>
                        <div className="head-right"><a className="btn btn-buy font-sm-bold w-auto" href="#view" onClick={(e) => e.preventDefault()}>View Order</a></div>
                      </div>
                      <div className="body-orders">
                        <div className="list-orders">
                          <div className="item-orders">
                            <div className="image-orders"><img src="/assets/imgs/page/account/img-1.png" alt="Ecom" /></div>
                            <div className="info-orders"><h5>Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h5></div>
                            <div className="quantity-orders"><h5>Quantity: 01</h5></div>
                            <div className="price-orders"><h3>$2.51</h3></div>
                          </div>
                          <div className="item-orders">
                            <div className="image-orders"><img src="/assets/imgs/page/account/img-1.png" alt="Ecom" /></div>
                            <div className="info-orders"><h5>Samsung 36&quot; French door 28 cu. ft. Smart Energy Star Refrigerator</h5></div>
                            <div className="quantity-orders"><h5>Quantity: 01</h5></div>
                            <div className="price-orders"><h3>$2.51</h3></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <nav>
                      <ul className="pagination">
                        <li className="page-item"><a className="page-link page-prev" href="#prev" onClick={(e) => e.preventDefault()}></a></li>
                        <li className="page-item"><a className="page-link" href="#1" onClick={(e) => e.preventDefault()}>1</a></li>
                        <li className="page-item"><a className="page-link active" href="#2" onClick={(e) => e.preventDefault()}>2</a></li>
                        <li className="page-item"><a className="page-link" href="#3" onClick={(e) => e.preventDefault()}>3</a></li>
                        <li className="page-item"><a className="page-link" href="#4" onClick={(e) => e.preventDefault()}>4</a></li>
                        <li className="page-item"><a className="page-link" href="#5" onClick={(e) => e.preventDefault()}>5</a></li>
                        <li className="page-item"><a className="page-link" href="#6" onClick={(e) => e.preventDefault()}>6</a></li>
                        <li className="page-item"><a className="page-link page-next" href="#next" onClick={(e) => e.preventDefault()}></a></li>
                      </ul>
                    </nav>
                  </div>
                )}

                {/* ── TAB 4: ORDER TRACKING ── */}
                {activeTab === "order-tracking" && (
                  <div className="tab-pane fade active show" id="tab-order-tracking" role="tabpanel">
                    <p className="font-md color-gray-600">
                      To track your order please enter your OrderID in the box below and press "Track" button. This was given to you on<br className="d-none d-lg-block" />
                      your receipt and in the confirmation email you should have received.
                    </p>
                    <div className="row mt-30">
                      <div className="col-lg-6">
                        <div className="form-tracking">
                          <form onSubmit={handleTrackOrder}>
                            <div className="d-flex">
                              <div className="form-group box-input">
                                <input className="form-control" type="text" placeholder="FDSFWRFAF13585"
                                  value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
                              </div>
                              <div className="form-group box-button">
                                <button className="btn btn-buy font-md-bold" type="submit">Tracking Now</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="border-bottom mb-20 mt-20"></div>
                    <h3 className="mb-10">Order Status: <span className="color-success">International shipping</span></h3>
                    <h6 className="color-gray-500">Estimated Delivery Date: 27 August - 29 August</h6>

                    <div className="table-responsive">
                      <div className="list-steps">
                        <div className="item-step">
                          <div className="rounded-step">
                            <div className="icon-step step-1 active"></div>
                            <h6 className="mb-5">Order Placed</h6>
                            <p className="font-md color-gray-500">15 August 2022</p>
                          </div>
                        </div>
                        <div className="item-step">
                          <div className="rounded-step">
                            <div className="icon-step step-2 active"></div>
                            <h6 className="mb-5">In Production</h6>
                            <p className="font-md color-gray-500">16 August 2022</p>
                          </div>
                        </div>
                        <div className="item-step">
                          <div className="rounded-step">
                            <div className="icon-step step-3 active"></div>
                            <h6 className="mb-5">International shipping</h6>
                            <p className="font-md color-gray-500">17 August 2022</p>
                          </div>
                        </div>
                        <div className="item-step">
                          <div className="rounded-step">
                            <div className="icon-step step-4"></div>
                            <h6 className="mb-5">Shipping Final Mile</h6>
                            <p className="font-md color-gray-500">18 August 2022</p>
                          </div>
                        </div>
                        <div className="item-step">
                          <div className="rounded-step">
                            <div className="icon-step step-5"></div>
                            <h6 className="mb-5">Delivered</h6>
                            <p className="font-md color-gray-500">19 August 2022</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="list-features">
                      <ul>
                        <li>09:10 25 August 2022: Delivery in progress</li>
                        <li>08:25 25 August 2022: The order has arrived at warehouse 05-YBI Marvel LM Hub</li>
                        <li>05:44 25 August 2022: Order has been shipped</li>
                        <li>04:51 25 August 2022: The order has arrived at Marvel SOC warehouse</li>
                        <li>20:54 18 August 2022: Order has been shipped</li>
                        <li>18:21 17 August 2022: The order has arrived at Marvel SOC warehouse</li>
                        <li>17:09 17 August 2022: Order has been shipped</li>
                        <li>15:23 17 August 2022: The order has arrived at warehouse 20-HNI Marvel 2 SOC</li>
                        <li>12:42 16 August 2022: Successful pick up</li>
                        <li>10:44 15 August 2022: The sender is preparing the goods</li>
                      </ul>
                    </div>

                    <h3>Package Location</h3>
                    <div className="map-account">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193548.25784139088!2d-74.12251055507726!3d40.71380001554004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zVGjDoG5oIHBo4buRIE5ldyBZb3JrLCBUaeG7g3UgYmFuZyBOZXcgWW9yaywgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1664974174994!5m2!1svi!2s"
                        style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        title="Package Location Map"
                      ></iframe>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <p className="color-gray-500 mb-20">Maecenas porttitor augue sit amet nibh venenatis bibendum. Morbi lorem elit, fringilla quis libero vitae, tincidunt commodo purus. Quisque diam nisi, tincidunt sed vehicula nec, fermentum vitae lectus. Curabitur sit amet sagittis libero. Pellentesque cursus turpis at ipsum luctus tempor.</p>
                      </div>
                      <div className="col-lg-6">
                        <p className="color-gray-500 mb-20">Ut auctor varius nisl, scelerisque dictum justo maximus ut. Fusce rhoncus, augue sed molestie consectetur, leo felis ultricies erat, nec lobortis enim dui eu justo. Pellentesque aliquam hendrerit venenatis. Integer efficitur bibendum lectus sed sollicitudin. Suspendisse faucibus posuere euismod.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB 5: SETTING ── */}
                {activeTab === "setting" && (
                  <div className="tab-pane fade active show" id="tab-setting" role="tabpanel">
                    <div className="row">
                      <div className="col-lg-6 mb-20">
                        <form onSubmit={handleSaveSettings}>
                          <div className="row">
                            <div className="col-lg-12 mb-20">
                              <h5 className="font-md-bold color-brand-3 text-sm-start text-center">Contact information</h5>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Fullname *"
                                  value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Username *"
                                  value={profileUsername} onChange={(e) => setProfileUsername(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Phone Number *"
                                  value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Email *"
                                  value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="font-sm color-brand-3" htmlFor="checkboxOffers">
                                  <input className="checkboxOffer" id="checkboxOffers" type="checkbox"
                                    checked={keepUpdated} onChange={(e) => setKeepUpdated(e.target.checked)} />
                                  {" "}Keep me up to date on news and exclusive offers
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <h5 className="font-md-bold color-brand-3 mt-15 mb-20">Shipping address</h5>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="First name*"
                                  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Last name*"
                                  value={lastName} onChange={(e) => setLastName(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Address 1*"
                                  value={address1} onChange={(e) => setAddress1(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Address 2*"
                                  value={address2} onChange={(e) => setAddress2(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <select className="form-control font-sm select-style1 color-gray-700"
                                  value={country} onChange={(e) => setCountry(e.target.value)}>
                                  <option value="">Select an option...</option>
                                  <option value="USA">USA</option>
                                  <option value="United Kingdom">United Kingdom</option>
                                  <option value="India">India</option>
                                  <option value="Australia">Australia</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="City*"
                                  value={city} onChange={(e) => setCity(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="PostCode / ZIP*"
                                  value={zip} onChange={(e) => setZip(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Company name"
                                  value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <input className="form-control font-sm" type="text" placeholder="Phone*"
                                  value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-0">
                                <textarea className="form-control font-sm" placeholder="Additional Information" rows="5"
                                  value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}></textarea>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mt-20">
                                <input type="submit" className="btn btn-buy w-auto h54 font-md-bold" value="Save change" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-lg-1 mb-20"></div>
                      <div className="col-lg-5 mb-20">
                        <div className="mt-40">
                          <h4 className="mb-10">{firstName} {lastName}</h4>
                          <div className="mb-10">
                            <p className="font-sm color-brand-3 font-medium">Home Address:</p>
                            <span className="font-sm color-gray-500 font-medium">{address1}, {city}, {zip}, {country}</span>
                          </div>
                          <div className="mb-10">
                            <p className="font-sm color-brand-3 font-medium">Delivery address:</p>
                            <span className="font-sm color-gray-500 font-medium">{address1}, {city}, {zip}, {country}</span>
                          </div>
                          <div className="mb-10">
                            <p className="font-sm color-brand-3 font-medium">Phone Number:</p>
                            <span className="font-sm color-gray-500 font-medium">{profilePhone} - {shippingPhone}</span>
                          </div>
                          <div className="mb-10 mt-15">
                            <a className="btn btn-cart w-auto" href="#default" onClick={(e) => e.preventDefault()}>Set as Default</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AccountPage;
