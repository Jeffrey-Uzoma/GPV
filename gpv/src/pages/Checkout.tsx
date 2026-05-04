// pages/Checkout.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const DELIVERY_FEE = 4000;
const BUSINESS_WHATSAPP = '2348104264550';
const ACCOUNT_NUMBER = '8027348956';
const ACCOUNT_NAME = 'Golden Premium Ventures';
const BANK_NAME = 'Moniepoint Microfinance Bank';

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    fulfillment: 'delivery' as 'delivery' | 'pickup',
  });

  const [copied, setCopied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const deliveryFee = form.fulfillment === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFulfillment = (val: 'delivery' | 'pickup') => {
    setForm(prev => ({ ...prev, fulfillment: val }));
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const buildOrderSummary = () => {
    const lines = items.map(({ product, quantity }) =>
      `• ${product.name} × ${quantity} — ₦${(product.price * quantity).toLocaleString()}`
    );
    return lines.join('\n');
  };

  const handleSendReceipt = () => {
    const message =
      `Hello! I just made a payment for my order on Golden Premium Ventures.\n\n` +
      `👤 Name: ${form.fullName}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📍 ${form.fulfillment === 'delivery' ? `Delivery Address: ${form.address}` : 'Fulfillment: Pickup from shop'}\n\n` +
      `🛒 *Order Details:*\n${buildOrderSummary()}\n\n` +
      `💰 Subtotal: ₦${subtotal.toLocaleString()}\n` +
      (form.fulfillment === 'delivery' ? `🚚 Delivery Fee: ₦${DELIVERY_FEE.toLocaleString()}\n` : '') +
      `✅ *Total Paid: ₦${total.toLocaleString()}*\n\n` +
      `I'm sending my payment receipt now. Please confirm. Thank you! 🙏`;

    // Set order as placed
    setOrderPlaced(true);
    
    window.open(
      `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const isFormValid =
    form.fullName.trim() &&
    form.phone.trim() &&
    (form.fulfillment === 'pickup' || form.address.trim());

  const [step, setStep] = useState<'form' | 'payment'>('form');

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDoneShop = () => {
    clearCart();
    setOrderPlaced(true);
    navigate('/products');
  };

  // ─── Payment step ──────────────────────────────────────────────
  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-amber-950 to-amber-800 pt-24 pb-10 px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Almost there</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Complete Payment</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* Order summary card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-amber-900 text-lg mb-4 pb-3 border-b border-gray-100">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-4">{product.name} × {quantity}</span>
                  <span className="font-semibold text-gray-800 shrink-0">₦{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-700 font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              {form.fulfillment === 'delivery' && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="text-gray-700 font-medium">₦{DELIVERY_FEE.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-amber-900 text-lg pt-2 border-t border-gray-100 mt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 bg-amber-50 rounded-xl p-3 border border-amber-100 text-sm text-amber-800 space-y-0.5">
              <p><span className="font-semibold">Name:</span> {form.fullName}</p>
              <p><span className="font-semibold">Phone:</span> {form.phone}</p>
              {form.fulfillment === 'delivery'
                ? <p><span className="font-semibold">Deliver to:</span> {form.address}</p>
                : <p><span className="font-semibold">Fulfillment:</span> Pickup from shop</p>
              }
            </div>
          </div>

          {/* Bank transfer details */}
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="font-bold text-amber-900 text-lg">Bank Transfer Details</h2>
            </div>

            <p className="text-sm text-gray-500 mb-5">
              Transfer the exact amount below to the account details provided, then send your receipt via WhatsApp.
            </p>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Bank</p>
                <p className="font-bold text-gray-800">{BANK_NAME}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Account Name</p>
                <p className="font-bold text-gray-800">{ACCOUNT_NAME}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-600 uppercase tracking-widest mb-1">Account Number</p>
                  <p className="font-bold text-2xl text-amber-900 tracking-widest">{ACCOUNT_NUMBER}</p>
                </div>
                <button
                  onClick={copyAccountNumber}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    copied
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200'
                  }`}
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-amber-900 rounded-xl p-4 text-center">
                <p className="text-amber-300 text-xs uppercase tracking-widest mb-1">Amount to Transfer</p>
                <p className="text-white font-extrabold text-3xl">₦{total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Send receipt */}
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.347-.219.462-.219s.256.004.368.018c.118.014.287-.045.449.346.162.391.55 1.347.598 1.444.049.097.081.202.016.327-.064.126-.096.202-.193.313-.097.111-.203.247-.29.332-.097.096-.197.201-.085.394.112.193.498.822 1.07 1.332.735.655 1.356.858 1.55.954.194.096.306.08.419-.049.112-.128.481-.563.61-.757.128-.194.256-.162.432-.097.176.065 1.119.528 1.311.624.192.096.32.144.368.224.048.08.048.464-.096.87z" />
                </svg>
              </div>
              <h2 className="font-bold text-gray-800 text-lg">Send Payment Receipt</h2>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 flex gap-3">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-red-700 font-bold text-sm">Important Notice</p>
                <p className="text-red-600 text-sm mt-0.5 leading-relaxed">
                  Your order will <strong>not be acknowledged or processed</strong> until you send your payment receipt to our WhatsApp business line. Please do not skip this step.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              After transferring, tap the button below to open our WhatsApp and send your receipt. Your order details will be pre-filled in the message.
            </p>

            <button
              onClick={handleSendReceipt}
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-base transition-all hover:shadow-xl hover:shadow-green-200 active:scale-95"
            >
              <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.347-.219.462-.219s.256.004.368.018c.118.014.287-.045.449.346.162.391.55 1.347.598 1.444.049.097.081.202.016.327-.064.126-.096.202-.193.313-.097.111-.203.247-.29.332-.097.096-.197.201-.085.394.112.193.498.822 1.07 1.332.735.655 1.356.858 1.55.954.194.096.306.08.419-.049.112-.128.481-.563.61-.757.128-.194.256-.162.432-.097.176.065 1.119.528 1.311.624.192.096.32.144.368.224.048.08.048.464-.096.87z" />
              </svg>
              Send Receipt on WhatsApp
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Opens WhatsApp with your order summary pre-filled
            </p>
          </div>

          <button
            onClick={handleDoneShop}
            className="w-full text-sm text-gray-400 hover:text-gray-600 py-3 transition-colors"
          >
            Done — Return to Shop
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── Form step ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-950 to-amber-800 pt-24 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Final Step</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Order mini-summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-amber-900 mb-3 pb-2 border-b border-gray-100">Your Cart</h2>
          <div className="space-y-2 mb-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate mr-4">{product.name} × {quantity}</span>
                <span className="font-semibold text-gray-800 shrink-0">₦{(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-800">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Delivery fee</span>
              <span className="font-semibold text-gray-800">
                {form.fulfillment === 'delivery' ? `₦${DELIVERY_FEE.toLocaleString()}` : 'Free (Pickup)'}
              </span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-gray-100 font-bold text-amber-900">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-amber-900 text-lg mb-5 pb-3 border-b border-gray-100">Your Details</h2>

          <form onSubmit={handleProceedToPayment} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Chioma Okonkwo"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 08012345678"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              />
            </div>

            {/* Fulfillment toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fulfillment Option *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleFulfillment('delivery')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    form.fulfillment === 'delivery'
                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-amber-200'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <div className="text-center">
                    <p className="font-bold text-sm">Delivery</p>
                    <p className="text-xs text-amber-600 font-semibold">+₦4,000</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleFulfillment('pickup')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    form.fulfillment === 'pickup'
                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-amber-200'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div className="text-center">
                    <p className="font-bold text-sm">Pickup</p>
                    <p className="text-xs text-green-600 font-semibold">Free</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Delivery address — only shown for delivery */}
            {form.fulfillment === 'delivery' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your full delivery address including city and state"
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-amber-400 text-amber-950 py-4 rounded-xl font-bold text-base hover:bg-amber-300 transition-all hover:shadow-lg hover:shadow-amber-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Proceed to Payment
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
