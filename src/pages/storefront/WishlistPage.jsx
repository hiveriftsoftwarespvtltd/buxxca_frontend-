import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { SEO } from "../../components/common/SEO";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { EmptyState } from "../../components/common/EmptyState";
import { RatingStars } from "../../components/common/RatingStars";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

export const WishlistPage = () => {
  const { items, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product, 1, product.variants?.colors?.[0]?.name || "");
    alert(`${product.name} added to cart!`);
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
                  <span className="font-xs color-gray-500">Wishlist</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container text-center py-5">
          <div className="mb-4">
            <img src="/assets/imgs/template/favicon.svg" alt="Empty Wishlist" style={{ width: "80px", opacity: 0.5 }} />
          </div>
          <h3 className="mb-3">Your wishlist is empty</h3>
          <p className="text-muted mb-4">
            You don't have any items saved in your wishlist yet.
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
        title="My Wishlist - BUXAA"
        description="Review products you've saved to your wishlist, add them to your cart, or remove them."
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
                  <span className="font-xs color-gray-500">Wishlist</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Wishlist template section */}
        <section className="section-box shop-template mt-30">
          <div className="container">
            <div className="box-wishlist">
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
                    <span className="font-md-bold color-brand-3">Price</span>
                  </div>
                  <div className="wishlist-status">
                    <span className="font-md-bold color-brand-3">Stock status</span>
                  </div>
                  <div className="wishlist-action">
                    <span className="font-md-bold color-brand-3">Action</span>
                  </div>
                  <div className="wishlist-remove">
                    <span className="font-md-bold color-brand-3">Remove</span>
                  </div>
                </div>
              </div>

              {/* Table Body list */}
              <div className="content-wishlist">
                {items.map((product) => (
                  <div key={product.id} className="item-wishlist">
                    <div className="wishlist-cb">
                      <input className="cb-layout cb-select" type="checkbox" defaultChecked />
                    </div>
                    <div className="wishlist-product">
                      <div className="product-wishlist">
                        <div className="product-image">
                          <Link to={`/product/${product.slug}`}>
                            <img src={product.images ? product.images[0] : ""} alt={product.name} />
                          </Link>
                        </div>
                        <div className="product-info">
                          <Link to={`/product/${product.slug}`}>
                            <h6 className="color-brand-3">{product.name}</h6>
                          </Link>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <img
                                key={i}
                                src="/assets/imgs/template/icons/star.svg"
                                alt="star"
                                style={{
                                  opacity: i < Math.floor(product.rating || 5) ? 1 : 0.3,
                                  width: "12px",
                                  display: "inline-block"
                                }}
                              />
                            ))}
                            <span className="font-xs color-gray-500">
                              {" "}
                              ({product.reviewCount || 0})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wishlist-price">
                      <h4 className="color-brand-3">${product.price.toFixed(2)}</h4>
                    </div>
                    <div className="wishlist-status">
                      <span className="btn btn-gray font-md-bold color-brand-3">In Stock</span>
                    </div>
                    <div className="wishlist-action">
                      <a
                        className="btn btn-cart font-sm-bold"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </a>
                    </div>
                    <div className="wishlist-remove">
                      <a
                        className="btn btn-delete"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back CTA */}
            <div className="mt-40">
              <Link className="btn btn-buy w-auto arrow-back" to="/shop">
                Back to Shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default WishlistPage;
