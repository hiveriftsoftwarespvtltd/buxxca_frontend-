import React, { useState, useEffect } from 'react';
import { RotateCcw, Clock, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function RefundPolicy() {
  const [activeSection, setActiveSection] = useState('sec-1');

  const sections = [
    { id: 'sec-1', label: '1. Returns and Exchanges' },
    { id: 'sec-2', label: '2. Non-Returnable Items' },
    { id: 'sec-3', label: '3. Refund Process' },
    { id: 'sec-4', label: '4. Shipping Costs' },
    { id: 'sec-5', label: '5. Damaged or Defective Items' },
    { id: 'sec-6', label: '6. How to Request a Refund' },
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
        <title>Refund & Returns Policy | BUXAA</title>
        <meta name="description" content="Review our 30-day moneyback guarantee and return/exchange instructions." />
      </Helmet>
      <div className="legal-container">
        
        {/* Header Hero */}
        <div className="text-center mb-16 border-b border-[#E8DFC8]/40 pb-12 relative">
          <div className="flex items-center justify-center gap-2 text-[#C9A84C] mb-3">
            <RotateCcw size={22} className="star-rating-fill" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold">Store Policy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1208] mb-4 font-bold tracking-tight">Refund Policy</h1>
          <p className="font-sans text-xs text-[#8A7A5A] uppercase tracking-[0.1em] flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 pt-3"><Clock size={12} /> Last Updated: June 2026</span>
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
            
            <div className="bg-[#FAF6EE] p-6 border-l-4 border-[#C9A84C] rounded-r-sm mb-8">
              <h3 className="font-serif text-lg text-[#1A1208] font-bold mb-2">Our Quality Guarantee</h3>
              <p className="font-sans text-[#4A3B1F] text-sm">
                We design and build BUXAA premium bags to last. If you are not fully satisfied with your purchase, please review our refund guidelines below.
              </p>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">1. Returns and Exchanges</h2>
              <p className="text-[#4A3B1F]">
                We aim to ensure complete customer satisfaction. If a customer is not satisfied with an item, a return or exchange may be requested within a reasonable period from the date of delivery, provided the item is unused, undamaged, and returned in its original packaging along with all tags, accessories, and proof of purchase.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">2. Non-Returnable Items</h2>
              <p className="text-[#4A3B1F]">
                Certain items are not eligible for return or exchange, including products that have been used, damaged due to misuse, or customized and personalized according to customer specifications. Items marked as final sale or clearance are also excluded from returns.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">3. Refund Process</h2>
              <p className="text-[#4A3B1F]">
                Once a returned item is received and inspected, the customer will be notified of the approval or rejection of the refund. Approved refunds will be processed to the original method of payment within a reasonable number of business days. Depending on the payment provider, additional time may be required for the refund to reflect in the customer's account.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">4. Shipping Costs</h2>
              <p className="text-[#4A3B1F]">
                Shipping charges incurred during the original purchase, and return shipping costs where applicable, are non-refundable. Customers are responsible for return shipping costs unless the return is due to an error on our part or a defective or damaged product.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">5. Damaged or Defective Items</h2>
              <p className="text-[#4A3B1F]">
                If a customer receives a damaged, defective, or incorrect item, our customer support team should be contacted immediately with photographs and order details, so that a replacement, repair, or refund can be arranged at no additional cost.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">6. How to Request a Refund</h2>
              <p className="text-[#4A3B1F]">
                To initiate a return or refund request, customers may contact our customer support team at <a href="mailto:Buxaacustomercare@gmail.com" className="text-[#C9A84C] underline hover:text-[#8B6914] transition-colors duration-200">Buxaacustomercare@gmail.com</a> along with their order number and reason for the return.
              </p>
            </section>

            {/* Contact Card */}
            <div className="bg-[#FAF6EE] border border-[#E8DFC8] p-8 rounded-sm text-center flex flex-col items-center mt-12">
              <Mail className="text-[#C9A84C] mb-3" size={24} />
              <h4 className="font-serif text-[#1A1208] font-bold text-lg mb-1">Return & Refund Help</h4>
              <p className="text-xs text-[#8A7A5A] uppercase tracking-wider mb-3">BUXAA — Customer Experience Team</p>
              <div className="flex flex-col gap-1.5 font-sans text-sm font-bold">
                <a href="mailto:Buxaacustomercare@gmail.com" className="text-[#C9A84C] hover:text-[#8B6914] transition-colors duration-200">
                  Buxaacustomercare@gmail.com
                </a>
              </div>
              <span className="text-[10px] text-[#8A7A5A] mt-3">www.buxaa.com</span>
            </div>

          </article>

        </div>

      </div>
    </div>
  );
}
