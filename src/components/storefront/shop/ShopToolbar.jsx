import React, { useState } from "react";
import { useUI } from "../../../hooks/useUI";

export const ShopToolbar = ({
  totalItems,
  viewMode,
  setViewMode,
  sortValue,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange
}) => {
  const { toggleFilterSidebar } = useUI();
  const [sortOpen, setSortOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  // Map sort value to label
  const sortLabels = {
    featured: "Featured products",
    newest: "Latest products",
    "price-low-high": "Price: Low to High",
    "price-high-low": "Price: High to Low",
    rating: "Rating products"
  };

  const handleSortSelect = (val) => {
    onSortChange(val);
    setSortOpen(false);
  };

  const handleShowSelect = (limit) => {
    onItemsPerPageChange(limit);
    setShowOpen(false);
  };

  return (
    <div className="box-filters mt-0 pb-5 border-bottom w-100">
      <div className="row align-items-center">
        {/* All Filters Toggle Button */}
        <div className="col-xl-2 col-lg-3 mb-10 text-lg-start text-center">
          <a
            className="btn btn-filter font-sm color-brand-3 font-medium"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleFilterSidebar();
            }}
          >
            All Filters
          </a>
        </div>

        {/* Filters and View Toggles */}
        <div className="col-xl-10 col-lg-9 mb-10 text-lg-end text-center">
          <span className="font-sm color-gray-900 font-medium border-1-right span mr-15">
            Showing <strong className="color-brand-1">{totalItems}</strong> products
          </span>

          {/* Sort By Dropdown */}
          <div className="d-inline-block position-relative mr-15">
            <span className="font-sm color-gray-500 font-medium mr-5">Sort by:</span>
            <div className="dropdown dropdown-sort border-1-right d-inline-block">
              <button
                className="btn dropdown-toggle font-sm color-gray-900 font-medium"
                type="button"
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setShowOpen(false);
                }}
                aria-expanded={sortOpen}
              >
                {sortLabels[sortValue] || "Latest products"}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-light ${sortOpen ? "show" : ""}`}
                style={{
                  display: sortOpen ? "block" : "none",
                  position: "absolute",
                  inset: "auto auto 0px 0px",
                  margin: "0px",
                  transform: "translate(0px, 40px)",
                  zIndex: 1000
                }}
              >
                {Object.entries(sortLabels).map(([key, label]) => (
                  <li key={key}>
                    <a
                      className={`dropdown-item ${sortValue === key ? "active" : ""}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSortSelect(key);
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Show Limit Dropdown */}
          <div className="d-inline-block position-relative mr-15">
            <span className="font-sm color-gray-500 font-medium mr-5">Show:</span>
            <div className="dropdown dropdown-sort border-1-right d-inline-block">
              <button
                className="btn dropdown-toggle font-sm color-gray-900 font-medium"
                type="button"
                onClick={() => {
                  setShowOpen(!showOpen);
                  setSortOpen(false);
                }}
                aria-expanded={showOpen}
              >
                {itemsPerPage} items
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-light ${showOpen ? "show" : ""}`}
                style={{
                  display: showOpen ? "block" : "none",
                  position: "absolute",
                  inset: "auto auto 0px 0px",
                  margin: "0px",
                  transform: "translate(0px, 40px)",
                  zIndex: 1000
                }}
              >
                {[8, 12, 16, 24, 32].map((limit) => (
                  <li key={limit}>
                    <a
                      className={`dropdown-item ${itemsPerPage === limit ? "active" : ""}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShowSelect(limit);
                      }}
                    >
                      {limit} items
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grid vs List view buttons */}
          <div className="d-inline-block">
            <a
              className={`view-type-grid mr-5 ${viewMode === "grid" ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setViewMode("grid");
              }}
              title="Grid View"
            />
            <a
              className={`view-type-list ${viewMode === "list" ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setViewMode("list");
              }}
              title="List View"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopToolbar;
