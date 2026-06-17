import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getImageUrl } from '../constants/storeData';
import { Heart, Eye } from 'lucide-react';


export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleWishlist, hasItem } = useWishlist();
  const { addToCart } = useCart();
  const [quickAddText, setQuickAddText] = useState('✦ Add to Cart');
  const [btnText, setBtnText] = useState('+');

  const isWishlisted = hasItem(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Quick Add default to first size or One Size
    const targetSize = product.sizes && product.sizes.length > 0 
      ? (product.sizes[0]) 
      : 'One Size';

    addToCart(product, targetSize, 1);
    
    setQuickAddText('✓ Added!');
    setBtnText('✓');
    
    setTimeout(() => {
      setQuickAddText('✦ Add to Cart');
      setBtnText('+');
    }, 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <article 
      className="product-card" 
      style={{ overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      
      {/* Product Image and badges */}
      <div className="product-img-box">
        <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <img
            src={getImageUrl(product.img)}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        {product.discount > 0 && (
          <span className="product-discount-badge">
            {product.discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="product-info-box">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans block mb-1">
          {product.brand}
        </span>
        <h3 className="product-name">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        
        {/* Rating */}
        <div className="product-rating">
          <span>{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-pale)', marginLeft: '0.25rem' }}>
            ({product.reviews})
          </span>
        </div>

        {/* Price & Add Button */}
        <div className="product-card-footer">
          <div className="price-tag">
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.originalPrice && (
               <span className="price-original">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleQuickAdd}
            className="cart-add-btn-square"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            {btnText}
          </button>
        </div>
      </div>

      {/* Quick Add overlay at the very bottom of the card */}
      <button
        onClick={handleQuickAdd}
        className="product-card-quick-add"
      >
        {quickAddText}
      </button>

    </article>
  );
}
