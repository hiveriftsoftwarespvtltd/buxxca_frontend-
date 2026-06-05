import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SEO } from "../../components/common/SEO";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import { EmptyState } from "../../components/common/EmptyState";
import { ShoppingBag } from "lucide-react";

// Zod Validation Schema matching the original HTML form inputs
const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address1: z.string().min(5, "Address 1 is required"),
  address2: z.string().optional(),
  country: z.string().min(2, "Country/Region is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "ZIP / Postal code must be at least 5 digits"),
  company: z.string().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  additionalInfo: z.string().optional()
});

export const CheckoutPage = () => {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "United States"
    }
  });

  const onSubmit = (data) => {
    // Generate a mock order ID
    const mockId = `BX${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(mockId);
    setOrderPlaced(true);
    clearCart();
  };

  // If order is placed, show success screen aligned with template
  if (orderPlaced) {
    return (
      <>
        <SEO title="Order Success" description="Your order was placed successfully!" />
        <main className="main">
          <div className="section-box">
            <div className="breadcrumbs-div">
              <div className="container">
                <ul className="breadcrumb">
                  <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                  <li><Link className="font-xs color-gray-500" to="/shop">Shop</Link></li>
                  <li><span className="font-xs color-gray-500">Order Confirmed</span></li>
                </ul>
              </div>
            </div>
          </div>
          <section className="section-box shop-template mt-60 mb-60">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mx-auto text-center">
                  <div className="box-border p-40" style={{ background: "#fff", borderRadius: "8px", border: "1px solid #eee" }}>
                    <div className="mb-20">
                      <img src="/assets/imgs/template/favicon.svg" alt="BUXAA" style={{ width: "64px" }} />
                    </div>
                    <h3 className="color-brand-3 mb-20">Order Confirmed!</h3>
                    <p className="font-md color-gray-500 mb-30">
                      Thank you for shopping with BUXAA. Your order has been placed successfully and is being processed.
                    </p>
                    <div className="table-responsive mb-30">
                      <table className="table table-striped text-start" style={{ width: "100%", fontSize: "13px" }}>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #eee" }}>
                            <td className="py-2"><strong>Order Number:</strong></td>
                            <td className="py-2 text-brand-1 text-end"><strong>{orderId}</strong></td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #eee" }}>
                            <td className="py-2"><strong>Status:</strong></td>
                            <td className="py-2 text-end"><span className="btn btn-gray font-xs font-bold" style={{ padding: "2px 8px" }}>Awaiting Fulfillment</span></td>
                          </tr>
                          <tr>
                            <td className="py-2"><strong>Estimated Delivery:</strong></td>
                            <td className="py-2 text-end">3-5 Business Days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <Link to="/shop" className="btn btn-buy w-auto">Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <>
        <SEO title="Checkout" description="Proceed to checkout to purchase your items." />
        <main className="main">
          <div className="section-box">
            <div className="breadcrumbs-div">
              <div className="container">
                <ul className="breadcrumb">
                  <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                  <li><Link className="font-xs color-gray-500" to="/shop">Shop</Link></li>
                  <li><span className="font-xs color-gray-500">Checkout</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container py-5 text-center">
            <div className="max-w-md mx-auto py-5">
              <EmptyState
                icon={ShoppingBag}
                title="Your cart is empty"
                message="You must add items to your cart before proceeding to checkout."
              >
                <Link to="/shop" className="btn btn-buy w-auto mt-20">
                  Go to Shop
                </Link>
              </EmptyState>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO title="Checkout Secure" description="Provide billing/shipping details and complete your BUXAA order." />
      <main className="main">
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><Link className="font-xs color-gray-500" to="/shop">Shop</Link></li>
                <li><span className="font-xs color-gray-500">Checkout</span></li>
              </ul>
            </div>
          </div>
        </div>

        <section className="section-box shop-template">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="row">
              {/* Left Column: Form Info */}
              <div className="col-lg-6">
                <div className="box-border">
                  <div className="box-payment">
                    <a className="btn btn-gpay"><img src="/assets/imgs/page/checkout/gpay.svg" alt="GPay" /></a>
                    <a className="btn btn-paypal"><img src="/assets/imgs/page/checkout/paypal.svg" alt="PayPal" /></a>
                    <a className="btn btn-amazon"><img src="/assets/imgs/page/checkout/amazon.svg" alt="Amazon Pay" /></a>
                  </div>
                  
                  <div className="border-bottom-4 text-center mb-20">
                    <div className="text-or font-md color-gray-500">Or</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-sm-6 mb-20">
                      <h5 className="font-md-bold color-brand-3 text-sm-start text-center">Contact information</h5>
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-20 text-sm-end text-center">
                      <span className="font-sm color-brand-3">Already have an account?</span>
                      <Link className="font-sm color-brand-1" to="/login"> Login</Link>
                    </div>

                    {/* Email Field */}
                    <div className="col-lg-12">
                      <div className="form-group mb-15">
                        <input
                          type="email"
                          className={`form-control font-sm ${errors.email ? "is-invalid" : ""}`}
                          placeholder="Email*"
                          {...register("email")}
                        />
                        {errors.email && (
                          <div className="text-danger font-xs mt-5">{errors.email.message}</div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="font-sm color-brand-3" htmlFor="checkboxOffers">
                          <input className="checkboxOffer mr-10" id="checkboxOffers" type="checkbox" />
                          Keep me up to date on news and exclusive offers
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <h5 className="font-md-bold color-brand-3 mt-15 mb-20">Shipping address</h5>
                    </div>

                    {/* First Name */}
                    <div className="col-lg-6">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className={`form-control font-sm ${errors.firstName ? "is-invalid" : ""}`}
                          placeholder="First name*"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <div className="text-danger font-xs mt-5">{errors.firstName.message}</div>
                        )}
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-lg-6">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className={`form-control font-sm ${errors.lastName ? "is-invalid" : ""}`}
                          placeholder="Last name*"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <div className="text-danger font-xs mt-5">{errors.lastName.message}</div>
                        )}
                      </div>
                    </div>

                    {/* Address 1 */}
                    <div className="col-lg-12">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className={`form-control font-sm ${errors.address1 ? "is-invalid" : ""}`}
                          placeholder="Address 1*"
                          {...register("address1")}
                        />
                        {errors.address1 && (
                          <div className="text-danger font-xs mt-5">{errors.address1.message}</div>
                        )}
                      </div>
                    </div>

                    {/* Address 2 */}
                    <div className="col-lg-12">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className="form-control font-sm"
                          placeholder="Address 2"
                          {...register("address2")}
                        />
                      </div>
                    </div>

                    {/* Country Selector */}
                    <div className="col-lg-6">
                      <div className="form-group mb-15">
                        <select
                          className={`form-control font-sm select-style1 color-gray-700 ${errors.country ? "is-invalid" : ""}`}
                          {...register("country")}
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="India">India</option>
                          <option value="Australia">Australia</option>
                        </select>
                        {errors.country && (
                          <div className="text-danger font-xs mt-5">{errors.country.message}</div>
                        )}
                      </div>
                    </div>

                    {/* City */}
                    <div className="col-lg-6">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className={`form-control font-sm ${errors.city ? "is-invalid" : ""}`}
                          placeholder="City*"
                          {...register("city")}
                        />
                        {errors.city && (
                          <div className="text-danger font-xs mt-5">{errors.city.message}</div>
                        )}
                      </div>
                    </div>

                    {/* ZIP Code */}
                    <div className="col-lg-12">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className={`form-control font-sm ${errors.zip ? "is-invalid" : ""}`}
                          placeholder="PostCode / ZIP*"
                          {...register("zip")}
                        />
                        {errors.zip && (
                          <div className="text-danger font-xs mt-5">{errors.zip.message}</div>
                        )}
                      </div>
                    </div>

                    {/* Company Name */}
                    <div className="col-lg-6">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className="form-control font-sm"
                          placeholder="Company name"
                          {...register("company")}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-lg-6">
                      <div className="form-group mb-15">
                        <input
                          type="text"
                          className={`form-control font-sm ${errors.phone ? "is-invalid" : ""}`}
                          placeholder="Phone*"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <div className="text-danger font-xs mt-5">{errors.phone.message}</div>
                        )}
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="col-lg-12">
                      <div className="form-group mb-0">
                        <textarea
                          className="form-control font-sm"
                          placeholder="Additional Information"
                          rows="5"
                          {...register("additionalInfo")}
                        ></textarea>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="row mt-20">
                  <div className="col-lg-6 col-5 mb-20">
                    <Link className="btn font-sm-bold color-brand-1 arrow-back-1" to="/cart">
                      Return to Cart
                    </Link>
                  </div>
                  <div className="col-lg-6 col-7 mb-20 text-end">
                    <button type="submit" className="btn btn-buy w-auto arrow-next">
                      Place an Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Review */}
              <div className="col-lg-6">
                <div className="box-border">
                  <h5 className="font-md-bold mb-20">Your Order</h5>
                  
                  <div className="listCheckout" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant}`} className="item-wishlist">
                        <div className="wishlist-product">
                          <div className="product-wishlist">
                            <div className="product-image">
                              <Link to={`/product/${item.slug}`}>
                                <img src={item.image} alt={item.name} />
                              </Link>
                            </div>
                            <div className="product-info">
                              <Link to={`/product/${item.slug}`}>
                                <h6 className="color-brand-3">{item.name}</h6>
                              </Link>
                              <div className="rating">
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <span className="font-xs color-gray-500"> ({item.reviewCount || 65})</span>
                              </div>
                              {item.variant && (
                                <p className="font-xs color-gray-500 mt-5">Color/Variant: {item.variant}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="wishlist-status">
                          <h5 className="color-gray-500">x{item.qty}</h5>
                        </div>
                        <div className="wishlist-price">
                          <h4 className="color-brand-3 font-lg-bold">{formatPrice(item.price)}</h4>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-group d-flex mt-15">
                    <input className="form-control mr-15" placeholder="Enter Your Coupon" />
                    <button type="button" className="btn btn-buy w-auto">Apply</button>
                  </div>

                  <div className="form-group mb-0">
                    <div className="row mb-10">
                      <div className="col-lg-6 col-6">
                        <span className="font-md-bold color-brand-3">Subtotal</span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="font-lg-bold color-brand-3">{formatPrice(subtotal)}</span>
                      </div>
                    </div>
                    
                    {discount > 0 && (
                      <div className="row mb-10">
                        <div className="col-lg-6 col-6">
                          <span className="font-md-bold text-success">Discount</span>
                        </div>
                        <div className="col-lg-6 col-6 text-end">
                          <span className="font-lg-bold text-success">-{formatPrice(discount)}</span>
                        </div>
                      </div>
                    )}

                    <div className="border-bottom mb-10 pb-5">
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <span className="font-md-bold color-brand-3">Shipping</span>
                        </div>
                        <div className="col-lg-6 col-6 text-end">
                          <span className="font-lg-bold color-brand-3">
                            {shipping === 0 ? "FREE" : formatPrice(shipping)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <span className="font-md-bold color-brand-3">Total</span>
                      </div>
                      <div className="col-lg-6 col-6 text-end">
                        <span className="font-lg-bold color-brand-1">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Feature section from template */}
        <section className="section-box mt-90 mb-50">
          <div className="container">
            <ul class="list-col-5">
              <li>
                <div class="item-list">
                  <div class="icon-left"><img src="/assets/imgs/template/delivery.svg" alt="Ecom" /></div>
                  <div class="info-right">
                    <h5 class="font-lg-bold color-gray-100">Free Delivery</h5>
                    <p class="font-sm color-gray-500">From all orders over $10</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-list">
                  <div class="icon-left"><img src="/assets/imgs/template/support.svg" alt="Ecom" /></div>
                  <div class="info-right">
                    <h5 class="font-lg-bold color-gray-100">Support 24/7</h5>
                    <p class="font-sm color-gray-500">Shop with an expert</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-list">
                  <div class="icon-left"><img src="/assets/imgs/template/voucher.svg" alt="Ecom" /></div>
                  <div class="info-right">
                    <h5 class="font-lg-bold color-gray-100">Gift voucher</h5>
                    <p class="font-sm color-gray-500">Refer a friend</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-list">
                  <div class="icon-left"><img src="/assets/imgs/template/return.svg" alt="Ecom" /></div>
                  <div class="info-right">
                    <h5 class="font-lg-bold color-gray-100">Return &amp; Refund</h5>
                    <p class="font-sm color-gray-500">Free return over $200</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-list">
                  <div class="icon-left"><img src="/assets/imgs/template/secure.svg" alt="Ecom" /></div>
                  <div class="info-right">
                    <h5 class="font-lg-bold color-gray-100">Secure payment</h5>
                    <p class="font-sm color-gray-500">100% Protected</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
export default CheckoutPage;
