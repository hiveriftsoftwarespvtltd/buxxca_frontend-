import React, { useState, useEffect } from "react";

export const ProductGallery = ({ images = [], badge }) => {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="gallery-image">
      <div className="galleries">
        <div className="detail-gallery">
          {badge && <label className="label bg-brand-2">{badge}</label>}
          <div className="product-image-slider" style={{ display: "block" }}>
            <figure className="border-radius-10" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "380px" }}>
              <img src={activeImage} alt="Product" className="img-fluid" style={{ maxHeight: "380px", width: "auto" }} />
            </figure>
          </div>
        </div>
        
        {images.length > 1 && (
          <div className="slider-nav-thumbnails mt-15 d-flex flex-wrap gap-2">
            {images.map((img, idx) => {
              const isActive = img === activeImage;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={`item-thumb ${isActive ? "active" : ""}`}>
                    <img src={img} alt="Thumbnail" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
