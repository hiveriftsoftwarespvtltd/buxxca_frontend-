import React, { useState, useEffect } from 'react';
import { FileText, Clock, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState('sec-1');

  const sections = [
    { id: 'sec-1', label: '1. General' },
    { id: 'sec-2', label: '2. Use of Website' },
    { id: 'sec-3', label: '3. Products and Pricing' },
    { id: 'sec-4', label: '4. Orders and Payments' },
    { id: 'sec-5', label: '5. Shipping and Delivery' },
    { id: 'sec-6', label: '6. Intellectual Property' },
    { id: 'sec-7', label: '7. Limitation of Liability' },
    { id: 'sec-8', label: '8. Governing Law' },
    { id: 'sec-9', label: '9. Changes to Terms' },
    { id: 'sec-10', label: '10. Contact Us' },
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
        <title>Terms & Conditions | BUXAA</title>
        <meta name="description" content="Review the user agreements and policies governing standard website use." />
      </Helmet>
      
      {/* ── Page Hero ── */}
      <div
        className="page-hero has-banner"
        style={{
          backgroundImage: `url('/images/Terms&Conditio.png')`,
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
            <FileText size={22} className="star-rating-fill" style={{ color: '#D4A23A' }} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white">Legal Document</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 font-bold tracking-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)', margin: 0 }}>
            Terms & Conditions
          </h1>
          <p className="font-sans text-xs text-white/80 uppercase tracking-[0.1em] flex items-center justify-center gap-4 flex-wrap mt-3" style={{ margin: '0 auto', justifyContent: 'center' }}>
            <span className="flex items-center gap-1.5 pt-3"><Clock size={12} /> Last Updated: June 2026</span>
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
              <h3 className="font-serif text-lg text-[#1A1208] font-bold mb-2">Terms governing website and services</h3>
              <p className="font-sans text-[#4A3B1F] text-sm">
                Please read these terms carefully before accessing or using our services on <span className="font-semibold text-[#1A1208]">buxaa.com</span>.
              </p>
            </div>

            {/* Section 1 */}
            <section id="sec-1" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">1. General</h2>
              <p className="text-[#4A3B1F]">
                By accessing and using this website, users agree to comply with and be bound by the following terms and conditions. Users who do not agree with any part of these terms should refrain from using this website or its services.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">2. Use of Website</h2>
              <p className="text-[#4A3B1F]">
                Users agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of, or restrict and inhibit the use and enjoyment of, the website by any third party. Users must not misuse this website by knowingly introducing viruses, malware, or other material that is malicious or technologically harmful.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">3. Products and Pricing</h2>
              <p className="text-[#4A3B1F]">
                BUXAA strives to ensure that all product descriptions, images, and prices displayed on this website are accurate; however, we do not warrant that product descriptions or other content are entirely error-free. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information at any time without prior notice.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">4. Orders and Payments</h2>
              <p className="text-[#4A3B1F]">
                All orders placed through this website are subject to acceptance and product availability. BUXAA reserves the right to refuse or cancel any order for reasons including, but not limited to, product availability, pricing errors, or suspected fraudulent activity. Payment must be made in full through the payment methods available on this website at the time of checkout.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sec-5" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">5. Shipping and Delivery</h2>
              <p className="text-[#4A3B1F]">
                Orders are processed and shipped within the timeframes specified on this website. Delivery times are estimates and may vary due to factors beyond our control, including courier delays or unforeseen circumstances. BUXAA is not liable for delays caused by third-party logistics providers.
              </p>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-[#4A3B1F]">
                All content on this website, including text, graphics, logos, images, and software, is the property of BUXAA or its content suppliers and is protected under applicable intellectual property laws. No content from this website may be reproduced, distributed, or otherwise used without prior written consent from BUXAA.
              </p>
            </section>

            {/* Section 7 */}
            <section id="sec-7" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-[#4A3B1F]">
                To the fullest extent permitted by law, BUXAA shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website, or the purchase and use of our products.
              </p>
            </section>

            {/* Section 8 */}
            <section id="sec-8" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">8. Governing Law</h2>
              <p className="text-[#4A3B1F]">
                These terms and conditions shall be governed by and construed in accordance with the applicable laws of the jurisdiction in which BUXAA operates, without regard to conflict of law principles.
              </p>
            </section>

            {/* Section 9 */}
            <section id="sec-9" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-[#4A3B1F]">
                BUXAA reserves the right to revise these terms and conditions at any time without prior notice. Continued use of this website following any such changes constitutes acceptance of the revised terms.
              </p>
            </section>

            {/* Section 10 */}
            <section id="sec-10" className="legal-section">
              <h2 className="font-serif text-xl text-[#1A1208] font-bold mb-4">10. Contact Us</h2>
              <p className="text-[#4A3B1F]">
                For any questions regarding these policies, please contact us at <a href="mailto:Buxaacustomercare@gmail.com" className="text-[#C9A84C] underline hover:text-[#8B6914] transition-colors duration-200">Buxaacustomercare@gmail.com</a>.
              </p>
            </section>

            {/* Contact Card */}
            <div className="bg-[#FAF6EE] border border-[#E8DFC8] p-8 rounded-sm text-center flex flex-col items-center mt-12">
              <Mail className="text-[#C9A84C] mb-3" size={24} />
              <h4 className="font-serif text-[#1A1208] font-bold text-lg mb-1">Terms Enquiries</h4>
              <p className="text-xs text-[#8A7A5A] uppercase tracking-wider mb-3">BUXAA — Legal Team</p>
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
