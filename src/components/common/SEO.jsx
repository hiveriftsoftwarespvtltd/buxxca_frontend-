import React, { useEffect } from "react";

export const SEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | BUXAA - Travel in Style` : "BUXAA - Travel in Style";
    
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      } else {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        metaDesc.content = description;
        document.head.appendChild(metaDesc);
      }
    }
  }, [title, description]);

  return null;
};
