import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Disclaimer() {
  const [activeSection, setActiveSection] = useState('sec-1');

  const sections = [
    { id: 'sec-1', label: '1. General Information Disclaimer' },
    { id: 'sec-2', label: '2. Product Disclaimer' },
    { id: 'sec-3', label: '3. Material & Leather Advisory' },
    { id: 'sec-4', label: '4. Product Care & Weight Advisory' },
    { id: 'sec-5', label: '5. Pricing & Availability' },
    { id: 'sec-6', label: '6. Expanding Categories' },
    { id: 'sec-7', label: '7. Website Availability' },
    { id: 'sec-8', label: '8. Social Media & External Content' },
    { id: 'sec-9', label: '9. No Warranty' },
    { id: 'sec-10', label: '10. Indemnification' },
    { id: 'sec-11', label: '11. Changes to This Disclaimer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          if (scrollPos >= el.offsetTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] py-16 page-transition">
      <Helmet>
        <title>General Disclaimer | BUXAA</title>
        <meta name="description" content="Read standard limitations, material advisories, and bag care warnings on BUXAA." />
      </Helmet>
      <div className="legal-container">
        
        {/* Header Hero */}
        <div className="text-center mb-16 border-b border-[#E8DFC8]/40 pb-12 relative">
          <div className="flex items-center justify-center gap-2 text-[#C9A84C] mb-3">
            <AlertCircle size={22} className="star-rating-fill" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold">Legal Document</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1208] mb-4 font-bold tracking-tight">General Disclaimer</h1>
          <p className="font-sans text-xs text-[#8A7A5A] uppercase tracking-[0.1em] flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5"><Clock size={12} /> Effective Date: June 2025</span>
            <span>•</span>
            <span>Last Revised: June 2026</span>
          </p>
        </div>

        {/* Content Layout */}
        <div className="legal-layout">
          
          {/* Left Navigation (Sticky) */}
          <aside className="legal-sidebar">
            <h5 className="font-serif text-[#1A1208] font-bold text-sm tracking-wider uppercase mb-6 pb-2 border-b border-[#E8DFC8]">Outline</h5>
            <ul className="flex flex-col gap-3" style={{ paddingLeft: 0 }}>
              {sections.map((sec) => (
                <li key={sec.id} style={{ listStyle: 'none' }}>
                  <button
                     onClick={() => scrollToSection(sec.id)}
                     className={`legal-sidebar-btn ${
                       activeSection === sec.id ? 'active' : ''
                     }`}
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right Document Copy */}
          <article className="legal-content">
            
            <div className="bg-[#FAF6EE] p-6 border-l-4 border-[#C9A84C] rounded-r-sm mb-4">
              <h3 className="font-serif text-lg text-[#1A1208] font-bold mb-2">Important Notice</h3>
              <p className="font-sans text-[#4A3B1F] text-sm">
                Please review this Disclaimer carefully. It contains important limitations and clarifications regarding the information, products, and services provided by BUXAA on <span className="font-semibold text-[#1A1208]">buxaa.com</span>.
              </p>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">1. General Information Disclaimer</h2>
              <p className="text-[#4A3B1F]">
                The content published on buxaa.com — including product descriptions, capacity indicators, material guides, storage specifications, blog posts, styling guides, and any other informational material — is provided for general informational and educational purposes only. While we strive for accuracy, BUXAA makes no warranties or representations about the completeness, accuracy, reliability, suitability, or availability of any information on the website. Any reliance you place on such information is strictly at your own risk.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">2. Product Disclaimer</h2>
              <p className="mb-4 text-[#4A3B1F]">
                BUXAA takes pride in sourcing high-quality textiles and crafting premium bags and luggage to the highest standards. However, individual experiences with bag dimensions, layout, capacity, and lifestyle functionality may vary due to personal usage habits, load distribution, environmental factors, and subjective storage needs.
              </p>
              <ul className="flex flex-col gap-2 list-none pl-0 text-[#4A3B1F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>Capacity and weight recommendations are guidelines and may vary based on load distribution and item shapes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>Product photography aims to accurately represent items; colors and textures may appear slightly different on various digital screens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>Hardware finish (brass, zinc, alloy buckles, YKK zipper glides) may experience slight natural oxidization or wear over time under standard usage.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">3. Material & Leather Advisory</h2>
              <p className="mb-4 text-[#4A3B1F]">
                Our bag collection includes genuine full-grain leather, premium vegan leather, waxed canvas, and high-density ballistic polyester/nylon. Customers should note that:
              </p>
              <ul className="flex flex-col gap-2 list-none pl-0 mb-4 text-[#4A3B1F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>Natural leather hides may feature variations in color shading, organic wrinkles, or minor character marks. These are indicators of authentic leather and do not constitute product defects.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>Waxed canvas naturally creases and patinas with use, developing a rugged customized aesthetic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>Stitching and thread ends are secured manually; minor tension offsets are normal occurrences in handcrafted luggage.</span>
                </li>
              </ul>
              <p className="text-[#4A3B1F]">
                BUXAA is not liable for structural fatigue, stitching stress, or tear damage resulting from chemical exposure, washing machine usage, or extreme overstuffing beyond specified capacity levels.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">4. Product Care & Weight Advisory</h2>
              <p className="text-[#4A3B1F]">
                To maintain the shape and integrity of your BUXAA gear, do not load your backpack, suitcase, or sling bag beyond its intended weight threshold. Overloading may cause zipper splits, stitch stress, or strap fatigue. We recommend wiping bags clean with a damp cloth and avoiding immersion in water or exposure to heat sources.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">5. Pricing & Availability Disclaimer</h2>
              <p className="mb-4 text-[#4A3B1F]">
                While we make every effort to ensure pricing accuracy, errors may occasionally occur. In the event of a pricing error:
              </p>
              <ul className="flex flex-col gap-2 list-none pl-0 text-[#4A3B1F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>We reserve the right to cancel orders placed at incorrect prices, with full refunds issued.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>We will notify affected customers promptly and offer the option to reorder at the correct price.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A84C]">✦</span>
                  <span>Product availability is not guaranteed and may change without notice due to demand or supply chain factors.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">6. Expanding Product Categories Disclaimer</h2>
              <p className="text-[#4A3B1F]">
                BUXAA is an evolving brand. As we expand into new product categories — including travel accessories, corporate gifting, tech organizers, and specialty luggage collections — product-specific care and load limits will be updated accordingly on each product listing. Customers are encouraged to review the specific guidelines on product pages at the time of purchase.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec-7" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">7. Website Availability Disclaimer</h2>
              <p className="text-[#4A3B1F]">
                BUXAA endeavours to keep buxaa.com available at all times. However, we do not guarantee uninterrupted, error-free access to our website. We reserve the right to temporarily suspend access for maintenance, permanently discontinue any feature, or modify content without prior notice. We accept no liability for any loss or inconvenience arising from website downtime or temporary unavailability of any service.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sec-8" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">8. Social Media & External Content Disclaimer</h2>
              <p className="text-[#4A3B1F]">
                Content posted on BUXAA's social media channels is for marketing and engagement purposes. Influencer or brand collaborations are disclosed where required by applicable advertising standards. Third-party reviews and user-generated content reflect individual opinions and do not constitute endorsements by BUXAA. Results or experiences shared by customers or influencers may not be typical and are not guaranteed to be replicated by every user.
              </p>
            </section>

            {/* Section 9 */}
            <section id="sec-9" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">9. No Warranty</h2>
              <p className="text-[#4A3B1F]">
                To the fullest extent permitted by law, BUXAA expressly disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that products will meet your specific requirements or that the website will be free of defects or errors.
              </p>
            </section>

            {/* Section 10 */}
            <section id="sec-10" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">10. Indemnification</h2>
              <p className="text-[#4A3B1F]">
                By using our website and purchasing our products, you agree to indemnify and hold harmless BUXAA, its directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your misuse of the website, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            {/* Section 11 */}
            <section id="sec-11" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">11. Changes to This Disclaimer</h2>
              <p className="text-[#4A3B1F]">
                This Disclaimer may be updated at any time to reflect changes in our product range, legal requirements, or business operations. The revised version will be posted on this page with an updated effective date. Continued use of our website constitutes your acceptance of any revised Disclaimer.
              </p>
            </section>

            {/* Contact Card */}
            <div className="bg-[#FAF6EE] border border-[#E8DFC8] p-8 rounded-sm text-center flex flex-col items-center mt-6">
              <Mail className="text-[#C9A84C] mb-3" size={24} />
              <h4 className="font-serif text-[#1A1208] font-bold text-lg mb-1">Legal Enquiries</h4>
              <p className="text-xs text-[#8A7A5A] uppercase tracking-wider mb-3">BUXAA — Legal Team</p>
              <a href="mailto:Buxaacustomercare@gmail.com" className="font-sans text-sm font-bold text-[#C9A84C] hover:text-[#8B6914] transition-colors duration-200">
                Buxaacustomercare@gmail.com
              </a>
              <span className="text-[10px] text-[#8A7A5A] mt-2">buxaa.com</span>
            </div>

          </article>

        </div>

      </div>
    </div>
  );
}
