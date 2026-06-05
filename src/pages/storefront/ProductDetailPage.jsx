import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, BarChart2, CheckCircle, ShieldAlert, Award } from "lucide-react";
import { SEO } from "../../components/common/SEO";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ProductGallery } from "../../components/storefront/product/ProductGallery";
import { ProductTabs } from "../../components/storefront/product/ProductTabs";
import { RatingStars } from "../../components/common/RatingStars";
import { Badge } from "../../components/common/Badge";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useCompare } from "../../hooks/useCompare";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ProductCard } from "../../components/storefront/shop/ProductCard";
import "swiper/css";

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCompare, isCompared } = useCompare();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Find product by slug
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [slug]);

  // Set default variants when product loads
  useEffect(() => {
    if (product) {
      setQuantity(1);
      const colors = product.variants?.colors || [];
      const sizes = product.variants?.sizes || [];
      setSelectedColor(colors.length > 0 ? colors[0].name : "");
      setSelectedSize(sizes.length > 0 ? sizes[0] : "");
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-brand-dark mb-4">Product Not Found</h2>
        <Link to="/shop" className="bg-brand-primary text-white px-5 py-2.5 rounded text-xs font-bold hover:bg-blue-800 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const variantText = [selectedColor, selectedSize].filter(Boolean).join(" / ");
    addItem(product, quantity, variantText);
    alert(`${product.name} added to cart!`);
  };

  // Find related products (same category, excluding current product)
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const colors = product.variants?.colors || [];
  const sizes = product.variants?.sizes || [];
  const inWishlist = isWishlisted(product.id);
  const inCompare = isCompared(product.id);

  return (
    <>
      <SEO title={product.name} description={product.description} />

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
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link className="font-xs color-gray-500" to={`/shop?category=${product.category}`}>
                    {product.category}
                  </Link>
                </li>
                <li>
                  <span className="font-xs color-gray-500">{product.name}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <section className="section-box shop-template mt-30">
          <div className="container">
            <div className="row">
              {/* Left Column: Gallery */}
              <div className="col-lg-5">
                <ProductGallery images={product.images} badge={product.badge} />
              </div>

              {/* Right Column: Information */}
              <div className="col-lg-7">
                <h3 className="color-brand-3 mb-25">{product.name}</h3>
                
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-5 col-sm-4 mb-mobile">
                    <span className="bytext font-xs color-gray-500 font-medium">by </span>
                    <Link className="byAUthor color-gray-900 font-xs font-medium" to="/shop">
                      {product.brand}
                    </Link>
                    <div className="rating mt-5">
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
                      <span className="font-xs color-gray-500 font-medium">
                        {" "}
                        ({product.reviewCount || 0} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="col-lg-7 col-md-7 col-sm-8 text-start text-sm-end">
                    <a
                      className="mr-20"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                    >
                      <span className={`btn btn-wishlist mr-5 opacity-100 transform-none ${inWishlist ? "active" : ""}`} />
                      <span className="font-md color-gray-900">Add to Wish list</span>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCompare(product);
                      }}
                    >
                      <span className={`btn btn-compare mr-5 opacity-100 transform-none ${inCompare ? "active" : ""}`} />
                      <span className="font-md color-gray-900">Add to Compare</span>
                    </a>
                  </div>
                </div>

                <div className="border-bottom pt-10 mb-20" />

                <div className="box-product-price">
                  <h3 className="color-brand-3 price-main d-inline-block mr-10">
                    ${product.price.toFixed(2)}
                  </h3>
                  {product.oldPrice && (
                    <span className="color-gray-500 price-line font-xl line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="product-description mt-20 color-gray-900">
                  <p>{product.description}</p>
                </div>

                {/* Color swatches */}
                {colors.length > 0 && (
                  <div className="box-product-color mt-20">
                    <p className="font-sm color-gray-900">
                      Color: <span className="color-brand-2 nameColor">{selectedColor}</span>
                    </p>
                    <ul className="list-colors">
                      {colors.map((c) => (
                        <li
                          key={c.name}
                          className={selectedColor === c.name ? "active" : ""}
                          onClick={() => setSelectedColor(c.name)}
                          style={{ cursor: "pointer" }}
                        >
                          <span
                            style={{
                              display: "block",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              backgroundColor: c.hex,
                              border: "1px solid #ddd"
                            }}
                            title={c.name}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Size styles */}
                {sizes.length > 0 && (
                  <div className="box-product-style-size mt-20">
                    <p className="font-sm color-gray-900">
                      Size: <span className="color-brand-2 nameSize">{selectedSize}</span>
                    </p>
                    <ul className="list-sizes">
                      {sizes.map((s) => (
                        <li
                          key={s}
                          className={selectedSize === s ? "active" : ""}
                          onClick={() => setSelectedSize(s)}
                          style={{ cursor: "pointer" }}
                          title={s}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className="buy-product mt-30">
                  <p className="font-sm mb-20">Quantity</p>
                  <div className="box-quantity">
                    <div className="input-quantity">
                      <input
                        className="font-xl color-brand-3"
                        type="text"
                        value={quantity}
                        readOnly
                      />
                      <span
                        className="minus-cart"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      />
                      <span className="plus-cart" onClick={() => setQuantity((q) => q + 1)} />
                    </div>
                    
                    <div className="button-buy">
                      <a
                        className="btn btn-cart"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart();
                        }}
                      >
                        Add to cart
                      </a>
                      <a
                        className="btn btn-buy"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart();
                          navigate("/cart");
                        }}
                      >
                        Buy now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Reviews Tabs */}
            <div className="mt-12">
              <ProductTabs product={product} />
            </div>

            {/* Related Products list */}
            {related.length > 0 && (
              <div className="mt-50 border-t pt-40">
                <div className="head-main pb-20 border-brand-2 mb-20">
                  <h3 className="color-gray-900">Related Products</h3>
                </div>
                <div className="row">
                  {related.slice(0, 4).map((p) => (
                    <div key={p.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-30">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
export default ProductDetailPage;
