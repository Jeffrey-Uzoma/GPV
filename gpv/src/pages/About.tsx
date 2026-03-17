// pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const values = [
    {
      icon: '✦',
      title: 'Quality First',
      desc: 'We never compromise on quality. Every product is carefully inspected and verified before it reaches you.'
    },
    {
      icon: '♡',
      title: 'Customer Focus',
      desc: 'Your satisfaction is our priority. Our team is always available to guide you to the perfect product.'
    },
    {
      icon: '◈',
      title: 'Authenticity',
      desc: 'All products are 100% authentic, sourced directly from manufacturers and verified suppliers.'
    },
  ];

  const stats = [
    { label: 'Happy Customers', value: '5,000+' },
    { label: 'Premium Products', value: '200+' },
    { label: 'Cities Served', value: '30+' },
    { label: 'Years of Excellence', value: '5+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-linear-to-br from-amber-950 to-amber-800 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-2 border-amber-400 rounded-full" />
          <div className="absolute bottom-10 left-10 w-40 h-40 border border-amber-300 rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            About Golden<br />
            <span className="text-amber-400">Premium Ventures</span>
          </h1>
          <p className="text-amber-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your premier destination for luxury cosmetics, fragrances, and skincare in Nigeria.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-amber-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-amber-300 mb-1">{stat.value}</div>
                <div className="text-amber-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Our luxury store"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-amber-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-amber-400 text-amber-950 px-4 py-2 rounded-full text-sm font-bold">
                  Since 2019
                </div>
              </div>
            </div>
            <div>
              <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-3xl font-bold text-amber-900 mb-5 leading-snug">
                Bringing Luxury Beauty<br />to Every Nigerian
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Golden Premium Ventures was founded with a clear vision: to make genuine luxury cosmetics
                and fragrances accessible to every woman in Nigeria. We believe that quality beauty products
                should not be a privilege — they should be a right.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Over the years, we've built strong relationships with top-tier brands and suppliers,
                allowing us to deliver only the finest and most authentic products. Every item on our store
                has passed through our quality verification process before reaching your hands.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-amber-900 text-amber-100 px-6 py-3 rounded-full font-semibold text-sm hover:bg-amber-800 transition-all"
              >
                Browse Our Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="text-3xl font-bold text-amber-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl text-amber-400 mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-linear-to-r from-amber-950 to-amber-800 py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Feel Luxurious?</h2>
        <p className="text-amber-200 mb-8 max-w-lg mx-auto">
          Browse our full collection and order directly via WhatsApp for a seamless shopping experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-amber-400 text-amber-950 px-8 py-4 rounded-full font-bold hover:bg-amber-300 transition-all hover:scale-105"
          >
            Shop Now
          </Link>
          <Link
            to="/contact"
            className="border border-amber-400/50 text-amber-200 px-8 py-4 rounded-full font-medium hover:bg-amber-400/10 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;