import React from "react";
import { Link } from "react-router-dom";

export const BrandShowcase = () => {
  const brandImages = [
    {
      img: "/assets/imgs/page/homepage1/buxaa-brand-1.png",
      title: "Built for Durability",
      desc: "Premium luggage and travel bags built for everyday adventures.",
      link: "/shop?category=Travel%20Bags"
    },
    {
      img: "/assets/imgs/page/homepage1/buxaa-brand-2.png",
      title: "Sleek Organization",
      desc: "Premium hard case utility pouches for chargers, cables, and accessories.",
      link: "/shop?category=Organizers"
    },
    {
      img: "/assets/imgs/page/homepage1/buxaa-brand-3.png",
      title: "Travel in Comfort",
      desc: "Ergonomically designed backpacks and messenger bags for modern commuters.",
      link: "/shop?category=Backpacks"
    }
  ];

  return (
    <section className="section-box mt-50 mb-30">
      <div className="container">
        <div className="head-main text-center mb-40">
          <h3 className="mb-10">BUXXA Lifestyle</h3>
          <p className="font-base color-gray-500">Premium bags and hard case pouches crafted for modern life.</p>
        </div>
        <div className="row">
          {brandImages.map((item, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 col-sm-12 mb-30">
              <div className="card-grid-style-1 hover-up" style={{ padding: "0", overflow: "hidden", borderRadius: "16px", background: "#ffffff" }}>
                <div className="image-box" style={{ height: "300px", overflow: "hidden" }}>
                  <Link to={item.link}>
                    <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Link>
                </div>
                <div style={{ padding: "24px 20px", textAlign: "center" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#1A3DAA", marginBottom: "10px" }}>{item.title}</h4>
                  <p className="font-sm color-gray-500 mb-15">{item.desc}</p>
                  <Link className="btn btn-brand-2 btn-arrow-right text-xs" to={item.link}>Explore Collection</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
