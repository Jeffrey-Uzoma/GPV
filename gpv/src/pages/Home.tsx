// pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: '100% Authentic',
      desc: 'Every product is verified and sourced directly from trusted manufacturers.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Fast Delivery',
      desc: 'Swift nationwide delivery across Nigeria with real-time updates.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'WhatsApp Orders',
      desc: 'Order directly via WhatsApp for a fast, personal shopping experience.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Premium Quality',
      desc: 'Luxury cosmetics and fragrances hand-picked for their quality and elegance.'
    },
  ];

  const categories = [
    { name: 'Perfumes', desc: 'Captivating fragrances for every moment', emoji: '🌸', bg: 'from-amber-900 to-amber-700' },
    { name: 'Cosmetics', desc: 'Premium makeup to enhance your beauty', emoji: '💄', bg: 'from-amber-700 to-amber-500' },
    { name: 'Skincare', desc: 'Nourish and radiate with golden care', emoji: '✨', bg: 'from-amber-800 to-amber-600' },
    { name: 'Fragrances', desc: 'Signature scents that leave an impression', emoji: '🧴', bg: 'from-amber-600 to-yellow-500' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-amber-950 pt-[5em]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Luxury cosmetics"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-amber-950/60 via-amber-950/40 to-amber-950/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase px-5 py-2 rounded-full mb-6 backdrop-blur-sm">
            Nigeria's Premium Beauty Store
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-9 tracking-tight">
            <span className="text-amber-400">Golden</span>{' '}
            <span className="text-amber-100">Premium</span>
            <br />
            <span className="text-white font-light text-3xl md:text-4xl tracking-widest">V E N T U R E S</span>
          </h1>
          <p className="text-amber-200 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed font-light">
            Discover luxury fragrances, premium cosmetics, and skincare essentials crafted for discerning men & women.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-amber-400 text-amber-950 px-8 py-4 rounded-full font-bold text-base hover:bg-amber-300 transition-all hover:scale-105 shadow-xl shadow-amber-900/40"
            >
              Shop the Collection
            </Link>
            <Link
              to="/about"
              className="border border-amber-400/50 text-amber-200 px-8 py-4 rounded-full font-medium text-base hover:bg-amber-400/10 transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-amber-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(f => (
              <div key={f.title} className="flex items-center gap-3 text-amber-100">
                <div className="text-amber-400 shrink-0">{f.icon}</div>
                <span className="text-sm font-medium">{f.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Hand-Picked for You</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900">Featured Products</h2>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🌸</p>
              <p>Products coming soon. Check back shortly.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-amber-900 text-amber-100 px-8 py-4 rounded-full font-semibold hover:bg-amber-800 transition-all hover:scale-105"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Browse By Category</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900">Shop Your Favourites</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className={`bg-linear-to-br ${cat.bg} rounded-2xl p-6 text-white group hover:scale-105 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="text-lg font-bold mb-1">{cat.name}</h3>
                <p className="text-xs text-white/80 leading-relaxed">{cat.desc}</p>
                <div className="mt-4 text-xs font-semibold text-amber-300 group-hover:text-white transition-colors">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial / Trust section */}
      <div className="bg-amber-900 py-16 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Why Customers Love Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Trusted by Thousands Across Nigeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { q: 'The perfume lasted all day and the delivery was super fast. Highly recommend!', name: 'Aisha B., Lagos' },
              { q: 'I\'ve been buying from GPV for 2 years. The quality is always consistent and authentic.', name: 'Ngozi A., Abuja' },
              { q: 'Ordered via WhatsApp and it was so easy. Got my foundation in 2 days. Love it!', name: 'Favour O., Port Harcourt' },
            ].map(t => (
              <div key={t.name} className="bg-amber-950/40 border border-amber-700/40 rounded-2xl p-6">
                <div className="text-amber-400 text-2xl mb-3">"</div>
                <p className="text-amber-100 text-sm leading-relaxed mb-4 italic">{t.q}</p>
                <p className="text-amber-400 text-xs font-semibold">— {t.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/products"
              className="inline-block bg-amber-400 text-amber-950 px-10 py-4 rounded-full font-bold text-base hover:bg-amber-300 transition-all hover:scale-105 shadow-xl shadow-amber-900/30"
            >
              Start Shopping Now
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;