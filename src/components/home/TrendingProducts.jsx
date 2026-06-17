import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, getImageUrl } from '../../constants/storeData';
import { ProductCardSkeleton } from '../SkeletonLoader';

export default function TrendingProducts() {
  const { showToast } = useToast();
  const { addToCart } = useCart();
  const { toggleWishlist, hasItem } = useWishlist();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products?t=' + Date.now());
        if (res.ok) {
          const raw = await res.json();
          // Only show products strictly marked as Top Product
          const featured = raw.filter(p => p.isBestseller);
          setProducts(featured);
        }
      } catch (err) {
        console.error('Error fetching trending products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingProducts();
  }, []);

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = (product.variants && product.variants[0]) ? product.variants[0].size : 'One Size';
    addToCart(product, defaultSize, 1);
    showToast(`Added ${product.name} to Cart!`, 'success');
  };

  // Hide the entire section if there are no featured products
  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="block text-[#0A234D] font-semibold tracking-[0.2em] text-xs font-sans uppercase mb-2">
              TRENDING PRODUCTS
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#1E1E1E]">
              Top Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#0A234D] hover:text-[#D4A23A] transition-colors duration-300"
          >
            View All Products &rarr;
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))
          ) : (
            products.map((product) => {
              const isWishlisted = hasItem(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  {/* Image Box */}
                  <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                    <img
                      src={getImageUrl(product.img)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Badges */}
                    {product.isNewArrival ? (
                      <span className="absolute top-3 left-3 bg-[#04152F] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
                        NEW
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 bg-[#D4A23A] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
                        {product.discount}% OFF
                      </span>
                    )}
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-100 ${
                        isWishlisted
                          ? 'text-[#EF4444]'
                          : 'text-gray-400 hover:text-[#EF4444]'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Details Box */}
                  <div className="p-5 flex-1 flex flex-col text-left space-y-2">
                    <h3 className="font-sans font-bold text-sm text-[#1E1E1E] group-hover:text-[#D4A23A] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[#D4A23A] text-xs">
                      {'★'.repeat(Math.floor(product.rating || 5))}
                      <span className="text-gray-400 text-[10px] ml-1 font-sans">
                        ({product.reviews || 0})
                      </span>
                    </div>

                    {/* Pricing and Quick Add row */}
                    <div className="flex items-center justify-between pt-2 mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#04152F] font-bold font-sans text-base">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-xs font-sans">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      {/* Dark Add to Cart Button */}
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="flex items-center justify-center w-10 h-10 rounded-md bg-[#04152F] hover:bg-[#D4A23A] text-white hover:text-[#04152F] transition-all duration-300 shadow-sm"
                        aria-label="Add to Cart"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
