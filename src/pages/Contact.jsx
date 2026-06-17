import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, MapPin, Lock, ChevronDown, ChevronUp, ClipboardList, Tag, Truck, RotateCcw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '../context/ToastContext';
import Swal from 'sweetalert2';

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqData = [
    {
      question: 'How can I track my order?',
      answer: <>Track your order through the <strong className="font-semibold">Track Order</strong> page.</>,
      icon: ClipboardList
    },
    {
      question: 'Do you offer bulk discounts?',
      answer: <>Yes, special pricing is available for corporate and bulk purchases.</>,
      icon: Tag
    },
    {
      question: 'How long does shipping take?',
      answer: <>Standard delivery takes 3–7 business days.</>,
      icon: Truck
    },
    {
      question: 'Can I return a product?',
      answer: <>Yes, according to our return policy.</>,
      icon: RotateCcw
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        title: 'Required Fields',
        text: 'Please fill out all required fields.',
        icon: 'warning',
        confirmButtonColor: '#0A234D',
        background: '#FFFFFF',
        color: '#04152F'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Swal.fire({
          title: 'Message Sent! ✉️',
          text: 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
          icon: 'success',
          confirmButtonColor: '#D4A23A',
          background: '#FFFFFF',
          color: '#04152F'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        Swal.fire({
          title: 'Failed to Send',
          text: data.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonColor: '#0A234D',
          background: '#FFFFFF',
          color: '#04152F'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Connection Error',
        text: 'Could not reach the server. Please check your connection and try again.',
        icon: 'error',
        confirmButtonColor: '#0A234D',
        background: '#FFFFFF',
        color: '#04152F'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-6 md:pt-10 lg:pt-12 pb-20 page-transition">
      <Helmet>
        <title>Contact Support & Sales | BUXAA</title>
        <meta name="description" content="Get in touch with BUXAA customer service, bulk sales, or partnership teams." />
      </Helmet>
      
      {/* ── Split Hero Section ── */}
      <section className="relative overflow-hidden border-b border-[#E8DFC8]/30 bg-[#FFFDF7] w-full">
        
        {/* Centered Content Container */}
        <div className="container mx-auto px-6 md:px-8 w-full relative z-20" style={{ maxWidth: '1600px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[500px] items-stretch gap-8">
            
            {/* Left Text Column (Takes 6 cols inside the grid) */}
            <div className="lg:col-span-6 flex flex-col justify-center pt-8 pb-12 lg:py-16 pr-0 lg:pr-12">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C9A84C] mb-4 block font-sans">
                Contact Us
              </span>
              <h1 className="font-serif text-4.5xl md:text-5.5xl xl:text-6.5xl text-[#1A1208] mb-6 font-medium tracking-tight leading-tight">
                Let's Connect
              </h1>
              
              {/* Custom Gold Underline */}
              <div className="w-12 h-[2px] bg-[#C9A84C] mb-8"></div>
              
              <p className="font-sans text-[#4A3B1F] text-base md:text-[17px] mb-4 max-w-xl leading-relaxed font-light">
                We're here to help with product inquiries, bulk orders, collaborations, and customer support.
              </p>
              <p className="font-sans text-[#4A3B1F] text-base md:text-[17px] mb-8 max-w-xl leading-relaxed font-light">
                Whether you have a question about a product or simply want to say hello, we'd love to hear from you.
              </p>
              
              <p className="font-serif italic text-[#C9A84C] text-lg md:text-xl mt-2 font-normal">
                "Every great journey begins with a conversation."
              </p>
            </div>

            {/* Right Image Column (Desktop only, inside container) */}
            <div className="hidden lg:block lg:col-span-6 relative overflow-hidden select-none pointer-events-none rounded-lg border border-[#E8DFC8]/40 shadow-xs my-8 z-10">
              <img 
                src="/images/contact.png" 
                alt="Premium leather bag on wooden desk with notebook" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Smooth linear gradient overlay fading from solid cream on the left to transparent on the right */}
              <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-[#FFFDF7] to-transparent"></div>
            </div>

            {/* Mobile Image (Inline, Mobile only) */}
            <div className="lg:hidden w-full overflow-hidden rounded-lg border border-[#E8DFC8]/40 shadow-xs mb-8">
              <img 
                src="/images/contact.png" 
                alt="Premium leather bag on wooden desk with notebook" 
                className="w-full h-auto block"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Main Details & Form Section ── */}
      <section className="container mx-auto px-6 md:px-8 mt-16 md:mt-20" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Info Sidebar Column (Left on Desktop) */}
          <div className="lg:col-span-4 bg-[#FAF6EE] border border-[#E8DFC8]/60 p-8 md:p-10 rounded-sm shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-xs uppercase font-extrabold tracking-widest text-[#1A1208] mb-2">
                Get In Touch
              </h3>
              <div className="w-8 h-[2px] bg-[#C9A84C] mb-8"></div>
              
              <div className="flex flex-col gap-6">
                
                {/* Visit Us */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A234D] flex items-center justify-center text-white flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#1A1208] mb-1 font-sans">
                      Visit Us
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed m-0 font-sans font-light">
                      8577 Third Floor NEW ROHTAK ROAD<br />
                      KAROL BAGH DELHI -110005
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A234D] flex items-center justify-center text-white flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#1A1208] mb-1 font-sans">
                      Call Us
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed m-0 font-sans font-medium">
                      01149409211
                    </p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A234D] flex items-center justify-center text-white flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#1A1208] mb-1 font-sans">
                      Email Us
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed m-0 font-sans font-medium">
                      Buxaacustomercare@gmail.com
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A234D] flex items-center justify-center text-white flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#1A1208] mb-1 font-sans">
                      Business Hours
                    </h4>
                    <p className="text-xs text-[#666666] leading-relaxed m-0 font-sans font-light">
                      Monday – Saturday<br />
                      10:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Follow Us Row */}
            <div className="border-t border-[#E8DFC8]/60 pt-6 mt-8">
              <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#8A7A5A] mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#0A234D] hover:bg-[#C9A84C] flex items-center justify-center text-white transition-colors">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#0A234D] hover:bg-[#C9A84C] flex items-center justify-center text-white transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#0A234D] hover:bg-[#C9A84C] flex items-center justify-center text-white transition-colors">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#0A234D] hover:bg-[#C9A84C] flex items-center justify-center text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.67 7.9 6.48 9.34-.1-.8-.2-2.03 0-2.9.2-.84 1.34-5.7 1.34-5.7s-.34-.68-.34-1.68c0-1.57.91-2.75 2.05-2.75.97 0 1.43.73 1.43 1.6 0 .97-.62 2.43-.94 3.78-.27 1.13.56 2.05 1.68 2.05 2.02 0 3.57-2.13 3.57-5.2 0-2.72-1.96-4.62-4.74-4.62-3.23 0-5.12 2.42-5.12 4.92 0 .98.38 2.02.85 2.58.1.11.11.2.08.3-.08.33-.27 1.1-.3 1.25-.05.19-.16.23-.37.14-1.38-.64-2.24-2.65-2.24-4.27 0-3.47 2.52-6.66 7.27-6.66 3.82 0 6.79 2.72 6.79 6.36 0 3.8-2.39 6.89-5.71 6.89-1.11 0-2.16-.58-2.52-1.26l-.69 2.62c-.25.96-.93 2.17-1.39 2.92C10.05 21.75 11 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column (Right on Desktop) */}
          <div className="lg:col-span-8 bg-white border border-[#E8DFC8]/60 p-8 md:p-10 rounded-sm shadow-xs">
            <h3 className="font-sans text-xs uppercase font-extrabold tracking-widest text-[#1A1208] mb-2">
              Send a Message
            </h3>
            <div className="w-8 h-[2px] bg-[#C9A84C] mb-8"></div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1208] mb-2 font-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFC8] rounded-sm px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors placeholder-[#B8A88A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1208] mb-2 font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFC8] rounded-sm px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors placeholder-[#B8A88A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1208] mb-2 font-sans">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full bg-[#FFFFFF] border border-[#E8DFC8] rounded-sm px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors placeholder-[#B8A88A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1208] mb-2 font-sans">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#FFFFFF] border border-[#E8DFC8] rounded-sm px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors text-[#1A1208]"
                  >
                    <option value="" disabled>Select a topic</option>
                    <option>General Inquiry</option>
                    <option>Product Information</option>
                    <option>Bulk Orders / Wholesale</option>
                    <option>Corporate Gifting</option>
                    <option>Returns & Exchanges</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1208] mb-2 font-sans">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  className="w-full bg-[#FFFFFF] border border-[#E8DFC8] rounded-sm px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors placeholder-[#B8A88A] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold flex items-center justify-center gap-2 py-3 rounded-sm font-semibold uppercase tracking-wider text-xs w-full transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Mail size={14} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[10px] text-[#8A7A5A] mt-1 font-sans justify-start">
                <Lock size={12} className="text-[#8A7A5A]" />
                <span>Your information is safe with us. We never share your details.</span>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* ── Corporate & FAQ Section ── */}
      <section className="container mx-auto px-6 md:px-8 mt-16 md:mt-20" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Corporate Gifting Card */}
          <div className="bg-[#0B1528] rounded-sm overflow-hidden shadow-xs border border-[#E8DFC8]/30 flex flex-col md:flex-row items-stretch">
            {/* Image half */}
            <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-auto">
              <img 
                src="/images/Gift.png" 
                alt="BUXAA Corporate Gift Box" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Content half */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-left">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C9A84C] mb-3 block font-sans">
                Corporate & Bulk Orders
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 font-bold tracking-tight leading-tight">
                Corporate Gifting Solutions
              </h3>
              <div className="w-8 h-[2px] bg-[#C9A84C] mb-6"></div>
              
              <p className="text-[13px] text-white/90 font-sans font-light leading-relaxed mb-4">
                Looking for premium gifting solutions for your team, clients, or events?
              </p>
              <p className="text-[13px] text-white/90 font-sans font-light leading-relaxed mb-6">
                Our corporate gifting specialists can help create memorable experiences with premium BUXAA products.
              </p>
              
              <div>
                <a 
                  href="mailto:Buxaacustomercare@gmail.com?subject=Corporate Gifting Inquiry" 
                  className="inline-block bg-[#C9A84C] text-[#0B1528] hover:bg-white hover:text-[#0B1528] transition-all duration-300 rounded-full py-3 px-8 font-bold uppercase tracking-widest text-[10px] text-center"
                >
                  Request A Quote
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-[#FAF6EE] border border-[#E8DFC8]/60 p-8 md:p-10 rounded-sm shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-xs uppercase font-extrabold tracking-widest text-[#1A1208] mb-2">
                FREQUENTLY ASKED QUESTIONS
              </h3>
              <div className="w-8 h-[2px] bg-[#C9A84C] mb-6"></div>
              
              <div className="flex flex-col">
                {faqData.map((faq, index) => {
                  const IconComponent = faq.icon;
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="border-b border-dashed border-[#E8DFC8]/80 last:border-b-0 py-4">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-start justify-between text-left focus:outline-none"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          {/* Icon Circle */}
                          <div className="w-10 h-10 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#0A234D] bg-white flex-shrink-0 mt-0.5">
                            <IconComponent size={18} />
                          </div>
                          
                          {/* Text (Question & Answer) */}
                          <div className="flex-1 mt-0.5">
                            <h4 className="text-sm font-bold text-[#0A234D] font-sans leading-snug">
                              {faq.question}
                            </h4>
                            {isOpen && (
                              <p className="text-xs text-[#555555] mt-2 leading-relaxed font-sans font-light">
                                {faq.answer}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Chevron Icon */}
                        <div className="text-[#8A7A5A] ml-2 mt-2 flex-shrink-0">
                          <ChevronDown size={16} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
