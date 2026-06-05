import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { SEO } from "../../components/common/SEO";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { EmptyState } from "../../components/common/EmptyState";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

export const CartPage = () => {
  const {
    items,
    subtotal,
    discount,
    shipping,
    total,
    updateQty,
    removeItem,
    applyCoupon,
    coupon
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState({ text: "", isError: false });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMsg({ text: res.message, isError: false });
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  if (items.length === 0) {
    return (
      <main className="main">
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li>
                  <Link className="font-xs color-gray-1000" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="font-xs color-gray-500">Cart</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container text-center py-5">
          <div className="mb-4">
            <img src="/assets/imgs/template/favicon.svg" alt="Empty Cart" style={{ width: "80px", opacity: 0.5 }} />
          </div>
          <h3 className="mb-3">Your cart is empty</h3>
          <p className="text-muted mb-4">
            Looks like you haven't added any products to your cart yet. Let's do some shopping!
          </p>
          <Link to="/shop" className="btn btn-buy w-auto">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title="Your Shopping Cart - BUXAA"
        description="Review items in your shopping cart, apply discounts, and proceed to checkout."
      />

      <main className="main">
        {/* Breadcrumbs */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li>
                  <Link className="font-xs color-gray-1000" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="font-xs color-gray-500" to="/shop">
                    Shop
                  </Link>
                </li>
                <li>
                  <span className="font-xs color-gray-500">Cart</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cart template section */}
        <section className="section-box shop-template mt-30">
          <div className="container">
            <div className="row">
              {/* Left Column: Cart items & controls */}
              <div className="col-lg-9">
                <div className="box-carts">
                  {/* Table Head */}
                  <div className="head-wishlist">
                    <div className="item-wishlist">
                      <div className="wishlist-cb">
                        <input className="cb-layout cb-all" type="checkbox" defaultChecked />
                      </div>
                      <div className="wishlist-product">
                        <span className="font-md-bold color-brand-3">Product</span>
                      </div>
                      <div className="wishlist-price">
                        <span className="font-md-bold color-brand-3">Unit Price</span>
                      </div>
                      <div className="wishlist-status">
                        <span className="font-md-bold color-brand-3">Quantity</span>
                      </div>
                      <div className="wishlist-action">
                        <span className="font-md-bold color-brand-3">Subtotal</span>
                      </div>
                      <div className="wishlist-remove">
                        <span className="font-md-bold color-brand-3">Remove</span>
                      </div>
                    </div>
                  </div>

                  {/* Table Body list */}
                  <div className="content-wishlist mb-20">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant}`} className="item-wishlist">
                        <div className="wishlist-cb">
                          <input className="cb-layout cb-select" type="checkbox" defaultChecked />
                        </div>
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
                              {item.variant && (
                                <p className="text-[10px] text-muted mt-5">
                                  Variant: {item.variant}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="wishlist-price">
                          <h4 className="color-brand-3">${item.price.toFixed(2)}</h4>
                        </div>
                        <div className="wishlist-status">
                          <div className="box-quantity">
                            <div className="input-quantity">
                              <input
                                className="font-xl color-brand-3"
                                type="text"
                                value={item.qty}
                                readOnly
                              />
                              <span
                                className="minus-cart"
                                onClick={() => updateQty(item.id, item.qty - 1, item.variant)}
                              />
                              <span
                                className="plus-cart"
                                onClick={() => updateQty(item.id, item.qty + 1, item.variant)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="wishlist-action">
                          <h4 className="color-brand-3">${(item.price * item.qty).toFixed(2)}</h4>
                        </div>
                        <div className="wishlist-remove">
                          <a
                            className="btn btn-delete"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem(item.id, item.variant);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions row */}
                  <div className="row mb-40">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                      <Link className="btn btn-buy w-auto arrow-back mb-10" to="/shop">
                        Continue shopping
                      </Link>
                    </div>
                  </div>

                  {/* Calculate shipping & Coupon row */}
                  <div className="row mb-50">
                    <div className="col-lg-6 col-md-6">
                      <div className="box-cart-left">
                        <h5 className="font-md-bold mb-10">Calculate Shipping</h5>
                        <span className="font-sm-bold mb-5 d-inline-block color-gray-500">
                          Flat rate:{" "}
                        </span>
                        <span className="font-sm-bold d-inline-block color-brand-3">FREE</span>
                        <p className="font-sm color-gray-500 mt-5">
                          Free shipping applies automatically on all catalog orders!
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-lg-6 col-md-6">
                      <div className="box-cart-right p-20">
                        <h5 className="font-md-bold mb-10">Apply Coupon</h5>
                        <span className="font-sm-bold mb-5 d-inline-block color-gray-500">
                          Using A Promo Code? (Try <strong className="color-brand-2">BUXAA20</strong>)
                        </span>
                        <form
                          onSubmit={handleApplyCoupon}
                          className="form-group d-flex align-items-center"
                        >
                          <input
                            className="form-control mr-15"
                            placeholder="Enter Your Coupon"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <button type="submit" className="btn btn-buy w-auto">
                            Apply
                          </button>
                        </form>
                        {couponMsg.text && (
                          <p
                            className={`font-xs font-bold mt-10 ${
                              couponMsg.isError ? "text-danger" : "text-success"
                            }`}
                          >
                            {couponMsg.text}
                          </p>
                        )}
                        {coupon && (
                          <p className="font-xs text-success mt-5">
                            Coupon <strong>{coupon}</strong> applied!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Checkout Summary */}
              <div className="col-lg-3">
                <div className="summary-cart">
                  <div className="border-bottom mb-10 pb-10">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <span className="font-md-bold color-gray-500">Subtotal</span>
                      </div>
                      <div className="col-6 text-end">
                        <h4>${subtotal.toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>
                  
                  {discount > 0 && (
                    <div className="border-bottom mb-10 pb-10">
                      <div className="row align-items-center">
                        <div className="col-6">
                          <span className="font-md-bold color-gray-500">Discount</span>
                        </div>
                        <div className="col-6 text-end">
                          <h4 className="text-success">-${discount.toFixed(2)}</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-bottom mb-10 pb-10">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <span className="font-md-bold color-gray-500">Shipping</span>
                      </div>
                      <div className="col-6 text-end">
                        <h4>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="mb-20">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <span className="font-md-bold color-gray-500">Total</span>
                      </div>
                      <div className="col-6 text-end">
                        <h4>${total.toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="box-button">
                    <Link className="btn btn-buy" to="/checkout">
                      Proceed To CheckOut
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default CartPage;
