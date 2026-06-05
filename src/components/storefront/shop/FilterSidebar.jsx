import React from "react";
import { Link } from "react-router-dom";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { categories } from "../../../data/categories";
import { products } from "../../../data/products";
import { useUI } from "../../../hooks/useUI";

export const FilterSidebar = ({ activeFilters, onFilterChange, onClearAll }) => {
  const { filterSidebarOpen, toggleFilterSidebar } = useUI();

  const handleBrandChange = (brandName) => {
    const current = activeFilters.brands || [];
    const next = current.includes(brandName)
      ? current.filter((b) => b !== brandName)
      : [...current, brandName];
    onFilterChange("brands", next);
  };

  const handleColorChange = (colorName) => {
    const current = activeFilters.colors || [];
    const next = current.includes(colorName)
      ? current.filter((c) => c !== colorName)
      : [...current, colorName];
    onFilterChange("colors", next);
  };

  const brandsList = ["Apple", "Samsung", "Philips", "Lenovo", "ASUS", "Razer", "Kami Tech"];
  const colorsList = [
    { name: "Red", class: "color-red" },
    { name: "Green", class: "color-green" },
    { name: "Blue", class: "color-blue" },
    { name: "Purple", class: "color-purple" },
    { name: "Black", class: "color-black" },
    { name: "Gray", class: "color-gray" },
    { name: "Pink", class: "color-pink" },
    { name: "Brown", class: "color-brown" },
    { name: "Yellow", class: "color-yellow" }
  ];

  // Get 4 best seller products for sidebar list
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 4);

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

  const sidebarContent = (
    <>
      {/* 1. Categories List */}
      <div className="sidebar-border mb-30">
        <div className="sidebar-head">
          <h6 className="color-gray-900">Product Categories</h6>
        </div>
        <div className="sidebar-content">
          <ul className="list-nav-arrow">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onFilterChange("category", "");
                }}
                className={!activeFilters.category ? "active" : ""}
              >
                All Categories
              </a>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onFilterChange("category", activeFilters.category === cat.name ? "" : cat.name);
                  }}
                  className={activeFilters.category === cat.name ? "active" : ""}
                >
                  {cat.name}
                  <span className="number">{cat.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Filter Controls (Price, Brands, Color) */}
      <div className="sidebar-border mb-40">
        <div className="sidebar-head">
          <h6 className="color-gray-900">Products Filter</h6>
        </div>
        <div className="sidebar-content">
          <h6 className="color-gray-900 mt-10 mb-10">Price Range</h6>
          <div className="box-slider-range mt-20 mb-15">
            <PriceRangeSlider
              min={0}
              max={3500}
              value={activeFilters.priceRange}
              onChange={(val) => onFilterChange("priceRange", val)}
            />
          </div>

          <h6 className="color-gray-900 mt-20 mb-10">Brands</h6>
          <ul className="list-checkbox">
            {brandsList.map((brand) => {
              const isChecked = (activeFilters.brands || []).includes(brand);
              return (
                <li key={brand}>
                  <label className="cb-container">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span className="text-small">{brand}</span>
                    <span className="checkmark"></span>
                  </label>
                </li>
              );
            })}
          </ul>

          <h6 className="color-gray-900 mt-20 mb-10">Color</h6>
          <ul className="list-color">
            {colorsList.map((c) => {
              const isSelected = (activeFilters.colors || []).includes(c.name);
              return (
                <li key={c.name}>
                  <a
                    className={`${c.class} ${isSelected ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleColorChange(c.name);
                    }}
                    title={c.name}
                  ></a>
                  <span>{c.name}</span>
                </li>
              );
            })}
          </ul>

          <button
            onClick={onClearAll}
            className="btn btn-filter font-sm color-brand-3 font-medium mt-20 w-100"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* 3. Best Sellers List */}
      <div className="box-slider-item mb-30">
        <div className="head pb-15 border-brand-2">
          <h5 className="color-gray-900">Best seller</h5>
        </div>
        <div className="content-slider">
          <div className="swiper-wrapper pt-5 flex-column">
            {bestSellers.map((p) => (
              <div key={p.id} className="card-grid-style-2 card-grid-none-border border-bottom mb-10 w-100">
                <div className="image-box">
                  {p.badge && <span className="label bg-brand-2">{p.badge}</span>}
                  <Link to={`/product/${p.slug}`}>
                    <img src={p.images ? p.images[0] : ""} alt={p.name} />
                  </Link>
                </div>
                <div className="info-right">
                  <Link className="color-brand-3 font-xs-bold" to={`/product/${p.slug}`}>
                    {p.name}
                  </Link>
                  <div className="rating">
                    {renderStars(p.rating)}
                    <span className="font-xs color-gray-500"> ({p.reviewCount || 0})</span>
                  </div>
                  <div className="price-info">
                    <strong className="font-md-bold color-brand-3 price-main">
                      ${p.price.toFixed(2)}
                    </strong>
                    {p.oldPrice && (
                      <span className="color-gray-500 font-sm price-line">
                        ${p.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop View Sidebar */}
      <div className="col-lg-3 order-last order-lg-first d-none d-lg-block">
        {sidebarContent}
      </div>

      {/* Mobile Slide-out Off-canvas Drawer */}
      {filterSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay background */}
          <div className="fixed inset-0 bg-dark opacity-50" onClick={toggleFilterSidebar} style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
          {/* Sidebar content drawer */}
          <div className="relative w-75 max-w-xs bg-white h-100 shadow-lg z-50 p-4 overflow-y-auto" style={{ position: "fixed", left: 0, top: 0 }}>
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h5 className="mb-0">Filter Products</h5>
              <button className="btn btn-close" onClick={toggleFilterSidebar} aria-label="Close"></button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
