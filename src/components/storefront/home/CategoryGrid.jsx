import React from "react";
import { Link } from "react-router-dom";

export const CategoryGrid = () => {
  const brandLogos = [
    { img: "/assets/imgs/slider/logo/acer.svg", name: "acer" },
    { img: "/assets/imgs/slider/logo/nokia.svg", name: "nokia" },
    { img: "/assets/imgs/slider/logo/assus.svg", name: "asus" },
    { img: "/assets/imgs/slider/logo/casio.svg", name: "casio" },
    { img: "/assets/imgs/slider/logo/dell.svg", name: "dell" },
    { img: "/assets/imgs/slider/logo/panasonic.svg", name: "panasonic" },
    { img: "/assets/imgs/slider/logo/vaio.svg", name: "vaio" }
  ];

  const categories = [
    {
      title: "Travel Bags",
      img: "/assets/imgs/page/homepage1/outdoor.png",
      query: "category=Travel%20Bags",
      links: [
        { label: "Travel Organizers", query: "category=Travel%20Bags&subcategory=Travel%20Organizers" },
        { label: "Passport Holders", query: "category=Travel%20Bags&subcategory=Passport%20Holders" },
        { label: "Packing Cubes", query: "category=Travel%20Bags&subcategory=Packing%20Cubes" },
        { label: "Weekender Bags", query: "category=Travel%20Bags&subcategory=Weekender%20Bags" }
      ]
    },
    {
      title: "Laptop Bags",
      img: "/assets/imgs/page/homepage1/laptop.png",
      query: "category=Laptop%20Bags",
      links: [
        { label: "Office Laptop Bags", query: "category=Laptop%20Bags&subcategory=Office%20Laptop%20Bags" },
        { label: "Business Backpacks", query: "category=Laptop%20Bags&subcategory=Business%20Backpacks" },
        { label: "Messenger Bags", query: "category=Laptop%20Bags&subcategory=Messenger%20Bags" },
        { label: "Laptop Sleeves", query: "category=Laptop%20Bags&subcategory=Laptop%20Sleeves" }
      ]
    },
    {
      title: "Backpacks",
      img: "/assets/imgs/page/homepage1/computer.png",
      query: "category=Backpacks",
      links: [
        { label: "Casual Backpacks", query: "category=Backpacks&subcategory=Casual%20Backpacks" },
        { label: "Travel Backpacks", query: "category=Backpacks&subcategory=Travel%20Backpacks" },
        { label: "College Backpacks", query: "category=Backpacks&subcategory=College%20Backpacks" },
        { label: "Office Backpacks", query: "category=Backpacks&subcategory=Office%20Backpacks" }
      ]
    },
    {
      title: "Sling Bags",
      img: "/assets/imgs/page/homepage1/smartphone.png",
      query: "category=Sling%20Bags",
      links: [
        { label: "Crossbody Bags", query: "category=Sling%20Bags&subcategory=Crossbody%20Bags" },
        { label: "Mini Sling Bags", query: "category=Sling%20Bags&subcategory=Mini%20Sling%20Bags" },
        { label: "Travel Sling Bags", query: "category=Sling%20Bags&subcategory=Travel%20Sling%20Bags" },
        { label: "Everyday Sling Bags", query: "category=Sling%20Bags&subcategory=Everyday%20Sling%20Bags" }
      ]
    },
    {
      title: "Duffel Bags",
      img: "/assets/imgs/page/homepage1/gaming.png",
      query: "category=Duffel%20Bags",
      links: [
        { label: "Gym Bags", query: "category=Duffel%20Bags&subcategory=Gym%20Bags" },
        { label: "Travel Duffels", query: "category=Duffel%20Bags&subcategory=Travel%20Duffels" },
        { label: "Sports Bags", query: "category=Duffel%20Bags&subcategory=Sports%20Bags" },
        { label: "Weekend Bags", query: "category=Duffel%20Bags&subcategory=Weekend%20Bags" }
      ]
    },
    {
      title: "Organizer Pouches",
      img: "/assets/imgs/page/homepage1/electric.png",
      query: "category=Organizers",
      links: [
        { label: "Gadget Organizers", query: "category=Organizers&subcategory=Gadget%20Organizers" },
        { label: "Cable Organizers", query: "category=Organizers&subcategory=Cable%20Organizers" },
        { label: "Accessory Pouches", query: "category=Organizers&subcategory=Accessory%20Pouches" },
        { label: "Utility Cases", query: "category=Organizers&subcategory=Utility%20Cases" }
      ]
    },
    {
      title: "Corporate Collection",
      img: "/assets/imgs/page/homepage1/television.png",
      query: "category=Corporate%20Collection",
      links: [
        { label: "Custom Branding", query: "category=Corporate%20Collection&subcategory=Custom%20Branding" },
        { label: "Corporate Gifts", query: "category=Corporate%20Collection&subcategory=Corporate%20Gifts" },
        { label: "Event Merchandise", query: "category=Corporate%20Collection&subcategory=Event%20Merchandise" },
        { label: "Promotional Products", query: "category=Corporate%20Collection&subcategory=Promotional%20Products" }
      ]
    },
    {
      title: "New Arrivals",
      img: "/assets/imgs/page/homepage1/smartwatches.png",
      query: "category=Premium%20Collection",
      links: [
        { label: "Latest Designs", query: "category=Premium%20Collection&subcategory=New%20Arrivals" },
        { label: "Trending Products", query: "category=Premium%20Collection&subcategory=Best%20Sellers" },
        { label: "Premium Collection", query: "category=Premium%20Collection&subcategory=Premium%20Series" },
        { label: "Best Value Picks", query: "category=Premium%20Collection&subcategory=Limited%20Edition" }
      ]
    }
  ];

  return (
    <section className="section-box">
      <div className="container">
        {/* Featured Categories Heading + Brand Logos Row */}
        <div className="row items-center">
          <div className="col-lg-5">
            <h3>Premium Collection</h3>
            <p className="font-base">Discover stylish and functional bags designed for modern life.</p>
          </div>
          <div className="col-lg-7">
            <div className="list-brands">
              <div className="box-swiper">
                <div className="swiper-container">
                  <div className="flex items-center justify-between gap-4 overflow-x-auto py-2 custom-scrollbar">
                    {brandLogos.map((brand, i) => (
                      <Link key={i} to="/shop" className="flex-shrink-0 hover-up">
                        <img src={brand.img} alt={brand.name} style={{ height: "30px", width: "auto" }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Card Grid */}
        <div className="mt-50">
          <div className="row">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-30">
                <div className="card-grid-style-2 card-grid-style-2-small hover-up">
                  <div className="image-box">
                    <Link to={`/shop?${cat.query}`}>
                      <img src={cat.img} alt={cat.title} />
                    </Link>
                  </div>
                  <div className="info-right">
                    <Link className="color-brand-3 font-sm-bold" to={`/shop?${cat.query}`}>
                      <h6>{cat.title}</h6>
                    </Link>
                    <ul className="list-links-disc">
                      {cat.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <Link className="font-sm" to={`/shop?${link.query}`}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                    <Link className="btn btn-gray-abs text-xs font-semibold" to={`/shop?${cat.query}`}>View all</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
