export const filterProducts = (products, filters) => {
  let result = [...products];

  if (!filters) return result;

  // 1. Search Query Filter
  if (filters.search && filters.search.trim() !== "") {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    );
  }

  // 2. Category Filter
  if (filters.category && filters.category !== "All categories" && filters.category !== "") {
    const cat = filters.category.toLowerCase();
    result = result.filter((p) => p.category.toLowerCase() === cat);
  }

  // 3. Price Filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter((p) => p.price >= min && p.price <= max);
  }

  // 4. Brand Filter
  if (filters.brands && filters.brands.length > 0) {
    const selectedBrands = filters.brands.map((b) => b.toLowerCase());
    result = result.filter((p) => selectedBrands.includes(p.brand.toLowerCase()));
  }

  // 5. Rating Filter
  if (filters.minRating) {
    result = result.filter((p) => p.rating >= parseFloat(filters.minRating));
  }

  // 6. Colors Filter
  if (filters.colors && filters.colors.length > 0) {
    result = result.filter((p) => {
      if (!p.variants || !p.variants.colors) return false;
      return p.variants.colors.some((c) => filters.colors.includes(c.name));
    });
  }

  // 7. Sort Options
  if (filters.sort) {
    switch (filters.sort) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id); // Higher ID means recently added
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }
  }

  return result;
};
