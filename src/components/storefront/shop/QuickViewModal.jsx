import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Modal } from "../../common/Modal";
import { RatingStars } from "../../common/RatingStars";
import { useUI } from "../../../hooks/useUI";
import { useCart } from "../../../hooks/useCart";
import { useWishlist } from "../../../hooks/useWishlist";
import { formatPrice } from "../../../utils/formatPrice";

export const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView } = useUI();
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  // Reset states on product changes
  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setMainImage(quickViewProduct.images ? quickViewProduct.images[0] : "");
      
      const colors = quickViewProduct.variants?.colors || [];
      const sizes = quickViewProduct.variants?.sizes || [];
      
      setSelectedColor(colors.length > 0 ? colors[0].name : "");
      setSelectedSize(sizes.length > 0 ? sizes[0] : "");
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    const variantText = [selectedColor, selectedSize].filter(Boolean).join(" / ");
    addItem(quickViewProduct, quantity, variantText);
    closeQuickView();
  };

  const colors = quickViewProduct.variants?.colors || [];
  const sizes = quickViewProduct.variants?.sizes || [];

  return (
    <Modal
      isOpen={!!quickViewProduct}
      onClose={closeQuickView}
      title={`${quickViewProduct.brand} Product Quick View`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Images */}
        <div className="space-y-4">
          <div className="w-full h-80 rounded overflow-hidden border border-brand-border bg-gray-50 flex items-center justify-center">
            <img
              src={mainImage}
              alt={quickViewProduct.name}
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
            />
          </div>
          {quickViewProduct.images && quickViewProduct.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto py-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 rounded overflow-hidden border flex items-center justify-center bg-gray-50 flex-shrink-0 ${
                    img === mainImage ? "border-brand-primary ring-1 ring-brand-primary" : "border-brand-border"
                  }`}
                >
                  <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-gold">
                {quickViewProduct.brand}
              </span>
              <h2 className="text-lg font-bold text-brand-dark mt-1 leading-snug">
                {quickViewProduct.name}
              </h2>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-brand-primary">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm line-through text-brand-muted">
                    {formatPrice(quickViewProduct.oldPrice)}
                  </span>
                )}
              </div>
              <RatingStars rating={quickViewProduct.rating} count={quickViewProduct.reviewCount} />
            </div>

            {/* Short Desc */}
            <p className="text-xs text-brand-muted leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Colors variant select */}
            {colors.length > 0 && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-brand-dark">Color: {selectedColor}</label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full border-2 focus:outline-none transition-all ${
                        selectedColor === c.name ? "border-brand-primary scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes variant select */}
            {sizes.length > 0 && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-brand-dark">Size: {selectedSize}</label>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-3 py-1.5 rounded border font-semibold transition-colors focus:outline-none ${
                        selectedSize === s
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "border-brand-border bg-white text-brand-dark hover:bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity select */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-brand-dark">Quantity:</span>
              <div className="flex items-center border border-brand-border rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-sm font-semibold hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-sm font-semibold hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add actions */}
          <div className="grid grid-cols-2 gap-3 mt-6 border-t border-brand-border pt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-brand-primary text-white text-xs font-bold py-2.5 rounded hover:bg-blue-800 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={() => {
                toggleWishlist(quickViewProduct);
                closeQuickView();
              }}
              className={`flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded border transition-colors ${
                isWishlisted(quickViewProduct.id)
                  ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                  : "bg-brand-light border-brand-border text-brand-dark hover:bg-gray-200"
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted(quickViewProduct.id) ? "fill-current" : ""}`} />
              Wishlist
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
export default QuickViewModal;
