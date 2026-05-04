// pages/Cart.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const DELIVERY_FEE = 4000;

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 text-center">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Browse our luxury collection and add items you love.</p>
          <Link
            to="/products"
            className="bg-amber-400 text-amber-950 px-8 py-3 rounded-full font-bold hover:bg-amber-300 transition-all hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 to-amber-800 pt-24 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Your Selection</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-start"
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded-xl object-cover border border-gray-100 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-amber-900 mt-1 leading-snug">{product.name}</h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50 shrink-0"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{product.description}</p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-amber-900 hover:bg-amber-100 font-bold text-lg transition-colors"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-amber-900">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.quantity}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-amber-900 hover:bg-amber-100 font-bold text-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>

                    {/* Item total */}
                    <span className="font-bold text-amber-900 text-base">
                      ₦{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 font-medium mt-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-amber-900 mb-5 pb-3 border-b border-gray-100">Order Summary</h2>

              <div className="space-y-3 mb-5">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm text-gray-600">
                    <span className="truncate mr-2">{product.name} × {quantity}</span>
                    <span className="shrink-0 font-medium text-gray-800">₦{(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery fee</span>
                  <span className="font-semibold text-gray-800">₦{DELIVERY_FEE.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 mb-6">
                <div className="flex justify-between font-bold text-amber-900">
                  <span>Total</span>
                  <span className="text-xl">₦{(subtotal + DELIVERY_FEE).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-amber-400 text-amber-950 py-4 rounded-xl font-bold text-base hover:bg-amber-300 transition-all hover:shadow-lg hover:shadow-amber-200 active:scale-95 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                🔒 Secure checkout · Payment via bank transfer
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
