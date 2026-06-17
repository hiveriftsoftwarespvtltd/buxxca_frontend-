import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [dashoffset, setDashoffset] = useState(307.919);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Calculate how much the user has scrolled in percentage (0 to 1)
      const scrollableHeight = docHeight - windowHeight;
      if (scrollableHeight <= 0) return;

      const progress = scrollPos / scrollableHeight;
      
      // Calculate dashoffset for the SVG path
      // 307.919 is the total length of the circle border (2 * PI * r)
      const offset = 307.919 - (progress * 307.919);
      setDashoffset(offset);

      // Show button after scrolling down 300px
      if (scrollPos > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to handle initial load/refresh states
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`scroll-top ${isVisible ? 'show' : ''}`} 
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to top"
    >
      <svg className="progress-circle" width="100%" height="100%" viewBox="-1 -1 102 102">
        {/* Background Circle */}
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          stroke="rgba(201, 168, 76, 0.15)"
          strokeWidth="4.5"
          fill="none"
        />
        {/* Active Progress Circle */}
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          stroke="var(--gold)"
          strokeWidth="4.5"
          fill="none"
          strokeDasharray="307.919"
          strokeDashoffset={dashoffset}
        />
      </svg>
      <div className="scroll-top-arrow">
        <ArrowUp size={18} strokeWidth={2.5} />
      </div>
    </div>
  );
}
