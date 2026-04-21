// pages/Contact.tsx
import React, { useState } from 'react';
import Footer from '../components/Footer';

const WHATSAPP_NUMBER = '2348104264550';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hello, I'm reaching out from your website.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      (formData.subject ? `*Subject:* ${formData.subject}\n` : '') +
      `\n*Message:*\n${formData.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contactDetails = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone / WhatsApp',
      value: '+234 801 426 4550',
      sub: 'Mon – Sat, 9am – 8pm'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'jeffreyzhxade@gmail.com',
      sub: 'We reply within 24 hours'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Port Harcourt, Nigeria',
      sub: 'Nationwide delivery available'
    },
  ];

  const hours = [
    { day: 'Monday – Friday', time: '9:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
    { day: 'Sunday', time: '12:00 PM – 4:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[2em]">
      {/* Hero */}
      <div className="bg-linear-to-r from-amber-950 to-amber-800 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Get in Touch</h1>
          <p className="text-amber-200 text-lg">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form — wider column */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-1">Send us a Message</h2>
            <p className="text-gray-500 text-sm mb-6">Fill the form below and we'll open a WhatsApp conversation for you.</p>

            {sent && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                WhatsApp opened! Continue the conversation there.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Chioma Obi"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                >
                  <option value="">Select a subject...</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Order & Delivery">Order & Delivery</option>
                  <option value="Returns & Refunds">Returns & Refunds</option>
                  <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-200 active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.347-.219.462-.219s.256.004.368.018c.118.014.287-.045.449.346.162.391.55 1.347.598 1.444.049.097.081.202.016.327-.064.126-.096.202-.193.313-.097.111-.203.247-.29.332-.097.096-.197.201-.085.394.112.193.498.822 1.07 1.332.735.655 1.356.858 1.55.954.194.096.306.08.419-.049.112-.128.481-.563.61-.757.128-.194.256-.162.432-.097.176.065 1.119.528 1.311.624.192.096.32.144.368.224.048.08.048.464-.096.87z" />
                </svg>
                Send Message via WhatsApp
              </button>
            </form>
          </div>

          {/* Info column */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact details */}
            <div className="bg-linear-to-br from-amber-950 to-amber-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-amber-300 text-sm uppercase tracking-widest mb-5">Contact Details</h3>
              <div className="space-y-5">
                {contactDetails.map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-amber-400/20 rounded-xl flex items-center justify-center shrink-0 text-amber-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-amber-400 font-medium mb-0.5">{item.label}</p>
                      <p className="font-semibold text-sm text-white">{item.value}</p>
                      <p className="text-xs text-amber-300 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-amber-900 text-sm uppercase tracking-widest mb-4">Business Hours</h3>
              <div className="space-y-3">
                {hours.map(h => (
                  <div key={h.day} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{h.day}</span>
                    <span className="text-sm font-semibold text-amber-900">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.347-.219.462-.219s.256.004.368.018c.118.014.287-.045.449.346.162.391.55 1.347.598 1.444.049.097.081.202.016.327-.064.126-.096.202-.193.313-.097.111-.203.247-.29.332-.097.096-.197.201-.085.394.112.193.498.822 1.07 1.332.735.655 1.356.858 1.55.954.194.096.306.08.419-.049.112-.128.481-.563.61-.757.128-.194.256-.162.432-.097.176.065 1.119.528 1.311.624.192.096.32.144.368.224.048.08.048.464-.096.87z" />
              </svg>
              Chat with Us Directly
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;
