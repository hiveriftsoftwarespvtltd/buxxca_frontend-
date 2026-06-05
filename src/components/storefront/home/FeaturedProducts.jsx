import React, { useState } from "react";
import { ProductCard } from "../shop/ProductCard";
import { products } from "../../../data/products";

export const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "bestseller", label: "Best seller" },
    { id: "mostviewed", label: "Most viewed" },
    { id: "topbrands", label: "Top Brands" }
  ];

  const getFilteredProducts = () => {
    if (activeTab === "all") return products.slice(0, 10);
    if (activeTab === "bestseller") return products.filter((p) => p.bestSeller).slice(0, 5);
    if (activeTab === "mostviewed") return products.filter((p) => p.trending).slice(0, 5);
    if (activeTab === "topbrands") return products.filter((p) => p.newArrival).slice(0, 5);
    return products.slice(0, 10);
  };

  const filtered = getFilteredProducts();

  return (
    <section className="section-box pt-50">
      <div className="container">
        {/* Header and Tabs Menu */}
        <div className="head-main">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <h3 className="mb-5">Best Sellers</h3>
              <p className="font-base color-gray-500">Special products in this month.</p>
            </div>
            <div className="col-xl-5 col-lg-6">
              <ul className="nav nav-tabs" role="tablist">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      className={activeTab === tab.id ? "active" : ""}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "10px 20px",
                        fontWeight: "600",
                        fontSize: "14px",
                        cursor: "pointer"
                      }}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tab Content Products List */}
        <div className="tab-content">
          <div className="tab-pane fade active show">
            <div className="list-products-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
