import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";
import { EmptyState } from "../../components/common/EmptyState";
import { useCompare } from "../../hooks/useCompare";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import { BarChart2 } from "lucide-react";

export const ComparePage = () => {
  const { items, removeFromCompare, clearCompare } = useCompare();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product, 1, product.variants?.colors?.[0]?.name || "");
    alert(`${product.name} added to cart!`);
  };

  if (items.length === 0) {
    return (
      <>
        <SEO title="Compare Products" description="Compare travel bags, luggage sizes, materials, weights, and specifications side-by-side." />
        <main className="main">
          <div className="section-box">
            <div className="breadcrumbs-div">
              <div className="container">
                <ul className="breadcrumb">
                  <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                  <li><Link className="font-xs color-gray-500" to="/shop">Shop</Link></li>
                  <li><span className="font-xs color-gray-500">Compare</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container py-5 text-center">
            <div className="max-w-md mx-auto py-5">
              <EmptyState
                icon={BarChart2}
                title="No products to compare"
                message="No products selected for comparison yet. Select up to 4 items on the shop pages and click the compare icon."
              >
                <Link to="/shop" className="btn btn-buy w-auto mt-20">
                  Start Browsing
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
      <SEO title="Compare Products" description="Compare tech gadgets, accessories, and electronics side-by-side." />
      <main className="main">
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><Link className="font-xs color-gray-500" to="/shop">Shop</Link></li>
                <li><span className="font-xs color-gray-500">Compare</span></li>
              </ul>
            </div>
          </div>
        </div>

        <section className="section-box shop-template">
          <div className="container">
            <div className="row mb-80">
              <div className="col-lg-1"></div>
              <div className="col-lg-10">
                <div className="flex flex-wrap items-center justify-between mb-20 gap-10">
                  <h4 className="color-brand-3 font-lg-bold">Compare Products Matrix</h4>
                  <button onClick={clearCompare} className="btn font-xs-bold btn-gray" style={{ padding: "8px 16px" }}>
                    Clear All Compare Items
                  </button>
                </div>
                
                <div className="box-compare-products">
                  <div className="table-responsive">
                    <table>
                      <tbody>
                        <tr>
                          <td><span>Products</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <img src={product.images ? product.images[0] : product.image} alt={product.name} />
                              <h6>
                                <Link className="text-brand-3" to={`/product/${product.slug}`}>
                                  {product.name}
                                </Link>
                              </h6>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td><span>Review</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <div className="rating">
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <img src="/assets/imgs/template/icons/star.svg" alt="star" />
                                <span className="font-xs color-gray-500"> ({product.reviewCount || 65})</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td><span>Brand</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <span>{product.brand || "Generic"}</span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td><span>Category</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <span>{product.category}</span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td><span>Price</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <span className="font-sm-bold color-brand-3">{formatPrice(product.price)}</span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td><span>Stock status</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <span className="btn btn-gray font-sm-bold">In Stock</span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td><span>Buy now</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <button onClick={() => handleAddToCart(product)} className="btn btn-buy w-auto">
                                Add to Cart
                              </button>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td><span>Remove</span></td>
                          {items.map((product) => (
                            <td key={product.id}>
                              <button onClick={() => removeFromCompare(product.id)} className="btn btn-delete"></button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
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

export default ComparePage;
