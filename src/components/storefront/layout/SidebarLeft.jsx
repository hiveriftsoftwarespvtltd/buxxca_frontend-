import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const SidebarLeft = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 760) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenSubmenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    setOpenSubmenuIndex(null);
  };

  const handleMenuClick = (index, e) => {
    // If screen is mobile/tablet, prevent navigation on click if it has children
    if (window.innerWidth < 992) {
      e.preventDefault();
      setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    }
  };

  const menuItems = [
    {
      title: "Backpacks",
      icon: "/assets/imgs/template/devices.svg",
      link: "/shop?category=Backpacks",
      submenu: [
        { name: "Laptop Backpacks", link: "/shop?category=Backpacks&subcategory=Laptop%20Backpacks" },
        { name: "Travel Backpacks", link: "/shop?category=Backpacks&subcategory=Travel%20Backpacks" },
        { name: "Office Backpacks", link: "/shop?category=Backpacks&subcategory=Office%20Backpacks" },
        { name: "Casual Backpacks", link: "/shop?category=Backpacks&subcategory=Casual%20Backpacks" }
      ]
    },
    {
      title: "Laptop Bags",
      icon: "/assets/imgs/template/monitor.svg",
      link: "/shop?category=Laptop%20Bags",
      submenu: [
        { name: "Messenger Bags", link: "/shop?category=Laptop%20Bags&subcategory=Messenger%20Bags" },
        { name: "Executive Bags", link: "/shop?category=Laptop%20Bags&subcategory=Executive%20Bags" },
        { name: "Laptop Sleeves", link: "/shop?category=Laptop%20Bags&subcategory=Laptop%20Sleeves" },
        { name: "Business Bags", link: "/shop?category=Laptop%20Bags&subcategory=Business%20Bags" }
      ]
    },
    {
      title: "Travel Bags",
      icon: "/assets/imgs/template/airport.svg",
      link: "/shop?category=Travel%20Bags",
      submenu: [
        { name: "Duffel Bags", link: "/shop?category=Travel%20Bags&subcategory=Duffel%20Bags" },
        { name: "Weekender Bags", link: "/shop?category=Travel%20Bags&subcategory=Weekender%20Bags" },
        { name: "Cabin Bags", link: "/shop?category=Travel%20Bags&subcategory=Cabin%20Bags" },
        { name: "Travel Organizers", link: "/shop?category=Travel%20Bags&subcategory=Travel%20Organizers" }
      ]
    },
    {
      title: "Sling Bags",
      icon: "/assets/imgs/template/mobile.svg",
      link: "/shop?category=Sling%20Bags",
      submenu: [
        { name: "Crossbody Bags", link: "/shop?category=Sling%20Bags&subcategory=Crossbody%20Bags" },
        { name: "Mini Sling Bags", link: "/shop?category=Sling%20Bags&subcategory=Mini%20Sling%20Bags" },
        { name: "Everyday Sling Bags", link: "/shop?category=Sling%20Bags&subcategory=Everyday%20Sling%20Bags" },
        { name: "Travel Sling Bags", link: "/shop?category=Sling%20Bags&subcategory=Travel%20Sling%20Bags" }
      ]
    },
    {
      title: "Corporate Gifting",
      icon: "/assets/imgs/template/voucher.svg",
      link: "/shop?category=Corporate%20Collection",
      submenu: [
        { name: "Custom Branding", link: "/shop?category=Corporate%20Collection&subcategory=Custom%20Branding" },
        { name: "Corporate Gift Sets", link: "/shop?category=Corporate%20Collection&subcategory=Corporate%20Gift%20Sets" },
        { name: "Promotional Bags", link: "/shop?category=Corporate%20Collection&subcategory=Promotional%20Bags" },
        { name: "Bulk Orders", link: "/shop?category=Corporate%20Collection&subcategory=Bulk%20Orders" }
      ]
    },
    {
      title: "Organizers",
      icon: "/assets/imgs/template/mouse.svg",
      link: "/shop?category=Organizers",
      submenu: [
        { name: "Gadget Organizers", link: "/shop?category=Organizers&subcategory=Gadget%20Organizers" },
        { name: "Cable Organizers", link: "/shop?category=Organizers&subcategory=Cable%20Organizers" },
        { name: "Document Holders", link: "/shop?category=Organizers&subcategory=Document%20Holders" },
        { name: "Utility Pouches", link: "/shop?category=Organizers&subcategory=Utility%20Pouches" }
      ]
    },
    {
      title: "Gym & Sports",
      icon: "/assets/imgs/template/game.svg",
      link: "/shop?category=Gym%20&%20Sports",
      submenu: [
        { name: "Gym Bags", link: "/shop?category=Gym%20&%20Sports&subcategory=Gym%20Bags" },
        { name: "Sports Duffels", link: "/shop?category=Gym%20&%20Sports&subcategory=Sports%20Duffels" },
        { name: "Shoe Bags", link: "/shop?category=Gym%20&%20Sports&subcategory=Shoe%20Bags" },
        { name: "Fitness Accessories", link: "/shop?category=Gym%20&%20Sports&subcategory=Fitness%20Accessories" }
      ]
    },
    {
      title: "Premium Collection",
      icon: "/assets/imgs/template/clock.svg",
      link: "/shop?category=Premium%20Collection",
      submenu: [
        { name: "New Arrivals", link: "/shop?category=Premium%20Collection&subcategory=New%20Arrivals" },
        { name: "Best Sellers", link: "/shop?category=Premium%20Collection&subcategory=Best%20Sellers" },
        { name: "Premium Series", link: "/shop?category=Premium%20Collection&subcategory=Premium%20Series" },
        { name: "Limited Edition", link: "/shop?category=Premium%20Collection&subcategory=Limited%20Edition" }
      ]
    }
  ];

  return (
    <div ref={sidebarRef} className={`sidebar-left ${sticky ? "stick" : ""}`}>
      <button className={`btn btn-open ${isOpen ? "open" : ""}`} onClick={toggleSidebar} aria-label="Toggle category sidebar"></button>
      <ul className="menu-icons hidden">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => { setIsOpen(true); setOpenSubmenuIndex(index); }}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "block" }}
              aria-label={item.title}
            >
              <img src={item.icon} alt={item.title} />
            </button>
          </li>
        ))}
      </ul>
      <ul className={`menu-texts ${isOpen ? "" : "menu-close"}`}>
        {menuItems.map((item, index) => {
          const isSubmenuOpen = openSubmenuIndex === index;
          return (
            <li key={index} className={`has-children ${isSubmenuOpen ? "submenu-open" : ""}`}>
              <Link to={item.link} onClick={(e) => handleMenuClick(index, e)}>
                <span className="img-link">
                  <img src={item.icon} alt="BUXAA" />
                </span>
                <span className="text-link">{item.title}</span>
              </Link>
              <ul className="sub-menu" style={{ display: isSubmenuOpen && window.innerWidth < 992 ? "block" : undefined }}>
                {item.submenu.map((sub, sIdx) => (
                  <li key={sIdx}>
                    <Link to={sub.link} onClick={() => setIsOpen(false)}>{sub.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarLeft;
