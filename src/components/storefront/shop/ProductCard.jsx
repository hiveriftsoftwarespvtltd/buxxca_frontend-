import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { useWishlist } from "../../../hooks/useWishlist";
import { useCompare } from "../../../hooks/useCompare";
import { useUI } from "../../../hooks/useUI";
import { formatPrice } from "../../../utils/formatPrice";

// Mini toast notification component (inline)
const CartToast = ({ name, visible }) => (
  <div
    style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      background: "#1A3DAA",
      color: "#fff",
      padding: "12px 22px",
      borderRadius: "8px",
      zIndex: 99999,
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      transition: "opacity 0.3s, transform 0.3s",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      pointerEvents: "none",
    }}
  >
    ✓ &nbsp;{name} added to cart!
  </div>
);

export const ProductCard = ({ product, viewMode = "grid" }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, isCompared } = useCompare();
  const { openQuickView } = useUI();
  const [toastVisible, setToastVisible] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1, product.variants?.colors?.[0]?.name || "");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const inWishlist = isWishlisted(product.id);
  const inCompare = isCompared(product.id);

  // Render rating stars based on rating number
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 5);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={i}
          src="/assets/imgs/template/icons/star.svg"
          alt="star"
          className="inline mr-0.5"
          style={{ opacity: i < fullStars ? 1 : 0.3 }}
        />
      );
    }
    return stars;
  };

  if (viewMode === "list") {
    return (
      <>
        <CartToast name={product.name} visible={toastVisible} />
        <div className="card-grid-style-3 card-grid-list-style">
          <div className="card-grid-inner flex flex-col md:flex-row gap-4 p-4">
            <div className="image-box relative flex-shrink-0 w-full md:w-48 h-48 flex items-center justify-center">
              {product.badge && <span className="label bg-brand-2">{product.badge}</span>}
              <Link to={`/product/${product.slug}`}>
                <img
                  src={product.images ? product.images[0] : ""}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>
            </div>
            <div className="info-right flex-grow">
              <Link className="font-xs color-gray-500" to="/shop">
                {product.brand}
              </Link>
              <br />
              <Link className="color-brand-3 font-sm-bold" to={`/product/${product.slug}`}>
                {product.name}
              </Link>
              <div className="rating mt-5">
                {renderStars(product.rating)}
                <span className="font-xs color-gray-500"> ({product.reviewCount || 0})</span>
              </div>
              <div className="price-info mt-10">
                <strong className="font-lg-bold color-brand-3 price-main mr-2">
                  {formatPrice(product.price)}
                </strong>
                {product.oldPrice && (
                  <span className="color-gray-500 price-line">{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              <p className="font-xs color-gray-500 mt-10 line-clamp-2">{product.description}</p>
              <div className="mt-20 flex items-center gap-2">
                <button className="btn btn-cart text-xs" onClick={handleAddToCart}>
                  Add To Cart
                </button>
                <button
                  className={`btn btn-wishlist btn-tooltip ${inWishlist ? "active" : ""}`}
                  onClick={() => toggleWishlist(product)}
                  title="Add To Wishlist"
                />
                <button
                  className={`btn btn-compare btn-tooltip ${inCompare ? "active" : ""}`}
                  onClick={() => addToCompare(product)}
                  title="Compare"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Grid Mode (Default card-grid-style-3)
  return (
    <>
      <CartToast name={product.name} visible={toastVisible} />
      <div className="card-grid-style-3">
        <div className="card-grid-inner">
          <div className="tools">
            <button
              className={`btn btn-wishlist btn-tooltip mb-10 ${inWishlist ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
              title="Add To Wishlist"
            ></button>
            <button
              className={`btn btn-compare btn-tooltip mb-10 ${inCompare ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); addToCompare(product); }}
              title="Compare"
            ></button>
            <button
              className="btn btn-quickview btn-tooltip"
              onClick={(e) => { e.preventDefault(); openQuickView(product); }}
              title="Quick view"
            ></button>
          </div>
          <div className="image-box">
            {product.badge && <span className="label bg-brand-2">{product.badge}</span>}
            <Link to={`/product/${product.slug}`}>
              <img src={product.images ? product.images[0] : ""} alt={product.name} />
            </Link>
          </div>
          <div className="info-right">
            <Link className="font-xs color-gray-500" to="/shop">
              {product.brand}
            </Link>
            <br />
            <Link className="color-brand-3 font-sm-bold" to={`/product/${product.slug}`}>
              {product.name}
            </Link>
            <div className="rating">
              {renderStars(product.rating)}
              <span className="font-xs color-gray-500">({product.reviewCount || 0})</span>
            </div>
            <div className="price-info">
              <strong className="font-lg-bold color-brand-3 price-main">
                {formatPrice(product.price)}
              </strong>
              {product.oldPrice && (
                <span className="color-gray-500 price-line">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            <div className="mt-20 box-btn-cart">
              <button className="btn btn-cart font-xs w-full text-center" onClick={handleAddToCart}>
                Add To Cart
              </button>
            </div>
            {product.specs && Object.keys(product.specs).length > 0 && (
              <ul className="list-features mt-15">
                {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                  <li key={key}>{val}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
