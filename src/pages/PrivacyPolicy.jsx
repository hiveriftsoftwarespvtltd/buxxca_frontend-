import React, { useState, useEffect } from 'react';
import { Shield, Clock, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('sec-1');

  const sections = [
    { id: 'sec-1', label: '1. Information We Collect' },
    { id: 'sec-2', label: '2. How We Use Your Information' },
    { id: 'sec-3', label: '3. Sharing of Information' },
    { id: 'sec-4', label: '4. Cookies' },
    { id: 'sec-5', label: '5. Data Security' },
    { id: 'sec-6', label: '6. Your Rights' },
    { id: 'sec-7', label: '7. Changes to This Policy' },
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
    <div className="min-h-screen bg-[#FFFDF7] page-transition">
      <Helmet>
        <title>Privacy Policy | BUXAA</title>
        <meta name="description" content="Read the privacy document explaining how we protect user personal data." />
      </Helmet>
      
      {/* ── Page Hero ── */}
      <div
        className="page-hero has-banner"
        style={{
          backgroundImage: `url('/images/privacypolicybanner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '3rem',
        }}
      >
        {/* Dark overlay for text readability when image is set */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,35,77,0.72) 0%, rgba(26,18,8,0.60) 100%)',
          zIndex: 0
        }} />
        <div
          className="container"
          style={{
            maxWidth: '1600px', margin: '0 auto', padding: '0 2rem',
            position: 'relative', zIndex: 1,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div className="flex items-center justify-center gap-2 text-[#D4A23A] mb-3">
            <Shield size={22} className="star-rating-fill" style={{ color: '#D4A23A' }} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white">Legal Document</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 font-bold tracking-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)', margin: 0 }}>
            Privacy Policy
          </h1>
          <p className="font-sans text-xs text-white/80 uppercase tracking-[0.1em] flex items-center justify-center gap-4 flex-wrap mt-3" style={{ margin: '0 auto', justifyContent: 'center' }}>
            <span className="flex items-center gap-1.5 pt-5"><Clock size={12} /> Effective Date: June 2026</span>
          </p>
        </div>
      </div>

      <div className="legal-container pb-16">
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
              <h3 className="font-serif text-lg text-[#1A1208] font-bold mb-2">Effective & Applicable</h3>
              <p className="font-sans text-[#4A3B1F] text-sm">
                This Privacy Policy is effective and applicable to all visitors and customers of BUXAA on <span className="font-semibold text-[#1A1208]">buxaa.com</span>. We are committed to protecting your personal data and ensuring your shopping experience is secure.
              </p>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">1. Information We Collect</h2>
              <p className="text-[#4A3B1F]">
                When you visit our website, browse our products, or place an order, we may collect certain personal information from you. This may include your name, email address, phone number, shipping and billing address, and payment details. We may also automatically collect non-personal information, such as your browser type, device information, and browsing behavior on our website, through cookies and similar technologies.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-[#4A3B1F]">
                The information we collect is used to process and fulfill orders, communicate with customers regarding their purchases, provide customer support, improve our website and services, and send promotional offers or updates to those who have opted in to receive them. Personal information is not used for any purpose other than those described in this policy without the customer's consent.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">3. Sharing of Information</h2>
              <p className="text-[#4A3B1F]">
                BUXAA does not sell, trade, or rent personal information to third parties. Information may be shared with trusted third-party service providers who assist in operating our website and conducting our business, such as payment gateways, shipping and logistics partners, and IT service providers, all of whom are required to keep such information confidential. Information may also be disclosed where required by law or to protect our legal rights.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">4. Cookies</h2>
              <p className="text-[#4A3B1F]">
                Our website uses cookies to enhance the browsing experience, remember preferences, and analyze website traffic. Cookies may be disabled through browser settings; however, doing so may affect certain features and functionality of the website.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">5. Data Security</h2>
              <p className="text-[#4A3B1F]">
                Reasonable administrative, technical, and physical security measures are implemented to protect personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and absolute security cannot be guaranteed.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">6. Your Rights</h2>
              <p className="text-[#4A3B1F]">
                Customers have the right to access, correct, or request deletion of their personal information held by BUXAA. To exercise these rights or for any questions regarding the handling of personal data, customers may contact us using the details provided on our website or directly at <a href="mailto:Buxaacustomercare@gmail.com" className="text-[#C9A84C] underline hover:text-[#8B6914] transition-colors duration-200">Buxaacustomercare@gmail.com</a>.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec-7" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">7. Changes to This Policy</h2>
              <p className="text-[#4A3B1F]">
                This Privacy Policy may be updated periodically to reflect changes in our practices or for legal and regulatory reasons. Any changes will be posted on this page along with an updated revision date.
              </p>
            </section>

            {/* Contact Card */}
            <div className="bg-[#FAF6EE] border border-[#E8DFC8] p-8 rounded-sm text-center flex flex-col items-center mt-12">
              <Mail className="text-[#C9A84C] mb-3" size={24} />
              <h4 className="font-serif text-[#1A1208] font-bold text-lg mb-1">Privacy & Data Enquiries</h4>
              <p className="text-xs text-[#8A7A5A] uppercase tracking-wider mb-3">BUXAA — Customer Support</p>
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
