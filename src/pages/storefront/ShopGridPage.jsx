import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "../../components/common/SEO";
import { ShopToolbar } from "../../components/storefront/shop/ShopToolbar";
import { FilterSidebar } from "../../components/storefront/shop/FilterSidebar";
import { ActiveFilters } from "../../components/storefront/shop/ActiveFilters";
import { ProductCard } from "../../components/storefront/shop/ProductCard";
import { Pagination } from "../../components/common/Pagination";
import { products } from "../../data/products";
import { filterProducts } from "../../utils/filterProducts";

export const ShopGridPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Sync state filters with URL query parameters
  const activeFilters = useMemo(() => {
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const minPrice = parseInt(searchParams.get("minPrice") || "0", 10);
    const maxPrice = parseInt(searchParams.get("maxPrice") || "3500", 10);
    const brands = searchParams.get("brands") ? searchParams.get("brands").split(",") : [];
    const minRating = searchParams.get("minRating") || "";
    const colors = searchParams.get("colors") ? searchParams.get("colors").split(",") : [];
    const sort = searchParams.get("sort") || "featured";

    return {
      category,
      search,
      priceRange: [minPrice, maxPrice],
      brands,
      minRating,
      colors,
      sort
    };
  }, [searchParams]);

  // Handle URL searches update
  const updateUrlParams = (updatedFilters) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Category
    if (updatedFilters.category !== undefined) {
      if (updatedFilters.category) newParams.set("category", updatedFilters.category);
      else newParams.delete("category");
    }

    // Search
    if (updatedFilters.search !== undefined) {
      if (updatedFilters.search) newParams.set("search", updatedFilters.search);
      else newParams.delete("search");
    }

    // Price Range
    if (updatedFilters.priceRange !== undefined) {
      const [min, max] = updatedFilters.priceRange;
      if (min > 0 || max < 3500) {
        newParams.set("minPrice", String(min));
        newParams.set("maxPrice", String(max));
      } else {
        newParams.delete("minPrice");
        newParams.delete("maxPrice");
      }
    }

    // Brands
    if (updatedFilters.brands !== undefined) {
      if (updatedFilters.brands.length > 0) newParams.set("brands", updatedFilters.brands.join(","));
      else newParams.delete("brands");
    }

    // Min Rating
    if (updatedFilters.minRating !== undefined) {
      if (updatedFilters.minRating) newParams.set("minRating", updatedFilters.minRating);
      else newParams.delete("minRating");
    }

    // Colors
    if (updatedFilters.colors !== undefined) {
      if (updatedFilters.colors.length > 0) newParams.set("colors", updatedFilters.colors.join(","));
      else newParams.delete("colors");
    }

    // Sort
    if (updatedFilters.sort !== undefined) {
      if (updatedFilters.sort && updatedFilters.sort !== "featured") newParams.set("sort", updatedFilters.sort);
      else newParams.delete("sort");
    }

    setCurrentPage(1); // Reset page on filter update
    setSearchParams(newParams);
  };

  const handleFilterChange = (key, value) => {
    updateUrlParams({ [key]: value });
  };

  const handleRemoveFilter = (key, valToRemove = null) => {
    if (key === "brands") {
      const filtered = activeFilters.brands.filter((b) => b !== valToRemove);
      handleFilterChange("brands", filtered);
    } else if (key === "colors") {
      const filtered = activeFilters.colors.filter((c) => c !== valToRemove);
      handleFilterChange("colors", filtered);
    } else if (key === "priceRange") {
      handleFilterChange("priceRange", [0, 3500]);
    } else {
      handleFilterChange(key, "");
    }
  };

  const handleClearAll = () => {
    setSearchParams(new URLSearchParams());
    setCurrentPage(1);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return filterProducts(products, activeFilters);
  }, [activeFilters]);

  // Paginated Products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const breadcrumbItems = [{ name: "Shop", path: "/shop" }];
  if (activeFilters.category) {
    breadcrumbItems.push({ name: activeFilters.category, path: `/shop?category=${activeFilters.category}` });
  }

  return (
    <>
      <SEO
        title="Products Shop Catalog - BUXAA"
        description="Browse BUXAA electronics catalog, smartphones, laptops, smartwatches, headphones, tablets, and gaming accessories."
      />

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
                  <Link className="font-xs color-gray-500" to="/shop">
                    Electronics
                  </Link>
                </li>
                {activeFilters.category && (
                  <li>
                    <Link
                      className="font-xs color-gray-500"
                      to={`/shop?category=${activeFilters.category}`}
                    >
                      {activeFilters.category}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="section-box shop-template mt-30">
          <div className="container">
            <div className="row">
              {/* 1. Main Products catalog column */}
              <div className="col-lg-9 order-first order-lg-last">
                <div className="banner-ads-top mb-30">
                  <Link to="/shop">
                    <img src="/assets/imgs/page/shop/banner.png" alt="BUXAA" />
                  </Link>
                </div>

                {/* Toolbar */}
                <ShopToolbar
                  totalItems={filteredProducts.length}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  sortValue={activeFilters.sort}
                  onSortChange={(val) => handleFilterChange("sort", val)}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={(limit) => {
                    setItemsPerPage(limit);
                    setCurrentPage(1);
                  }}
                />

                {/* Active Filters list display */}
                <ActiveFilters
                  activeFilters={activeFilters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAll}
                />

                {/* Products listing */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="mb-3">No products found</h5>
                    <p className="text-muted mb-4">
                      We couldn't find any products matching your active filters.
                    </p>
                    <button onClick={handleClearAll} className="btn btn-buy w-auto">
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="row mt-20">
                      {paginatedProducts.map((p) => (
                        <div
                          key={p.id}
                          className={
                            viewMode === "grid"
                              ? "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-30"
                              : "col-12 mb-30"
                          }
                        >
                          <ProductCard product={p} viewMode={viewMode} />
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                      totalItems={filteredProducts.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </>
                )}
              </div>

              {/* 2. Sidebar Filters Column */}
              <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ShopGridPage;
