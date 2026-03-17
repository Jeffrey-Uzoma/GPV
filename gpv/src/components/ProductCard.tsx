// components/ProductCard.tsx
import React, { useState } from 'react';
import type { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
}

const StarRating: React.FC<{ rating: number; size?: string }> = ({ rating, size = 'w-4 h-4' }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <svg
        key={i}
        className={`${size} ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const WHATSAPP_NUMBER = '2348104264550';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addReview, deleteReview } = useProducts();

  const [showReviews, setShowReviews] = useState(false);
  const [reviewForm, setReviewForm] = useState({ user: '', comment: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsApp = () => {
    const message =
      `Hello! I'm interested in purchasing *${product.name}*\n\n` +
      `💰 Price: ₦${product.price.toLocaleString()}\n` +
      `📦 Category: ${product.category}\n\n` +
      `Please confirm availability and provide payment details. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.user.trim() || !reviewForm.comment.trim()) return;
    setSubmitting(true);
    addReview(product.id, {
      user: reviewForm.user.trim(),
      comment: reviewForm.comment.trim(),
      rating: reviewForm.rating
    });
    setReviewForm({ user: '', comment: '', rating: 5 });
    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    : product.rating;

  const stockStatus = product.quantity > 10
    ? { label: 'In Stock', classes: 'bg-green-50 text-green-700 border border-green-200' }
    : product.quantity > 0
    ? { label: `Only ${product.quantity} left`, classes: 'bg-amber-50 text-amber-700 border border-amber-200' }
    : { label: 'Out of Stock', classes: 'bg-red-50 text-red-700 border border-red-200' };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-amber-900/90 backdrop-blur-sm text-amber-100 text-sm font-bold px-3 py-1.5 rounded-full">
            ₦{product.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-amber-900 mb-1 leading-snug">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={avgRating} />
          <span className="text-sm text-gray-500">
            {avgRating.toFixed(1)} · {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

        {/* Stock */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${stockStatus.classes}`}>
            {stockStatus.label}
          </span>
        </div>

        {/* WhatsApp CTA */}
        <button
          onClick={handleWhatsApp}
          disabled={product.quantity === 0}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-green-200 active:scale-95"
        >
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.159-.175.347-.219.462-.219s.256.004.368.018c.118.014.287-.045.449.346.162.391.55 1.347.598 1.444.049.097.081.202.016.327-.064.126-.096.202-.193.313-.097.111-.203.247-.29.332-.097.096-.197.201-.085.394.112.193.498.822 1.07 1.332.735.655 1.356.858 1.55.954.194.096.306.08.419-.049.112-.128.481-.563.61-.757.128-.194.256-.162.432-.097.176.065 1.119.528 1.311.624.192.096.32.144.368.224.048.08.048.464-.096.87z" />
          </svg>
          {product.quantity === 0 ? 'Out of Stock' : 'Buy on WhatsApp — ₦' + product.price.toLocaleString()}
        </button>

        {/* Reviews toggle */}
        <button
          onClick={() => setShowReviews(v => !v)}
          className="mt-3 w-full text-center text-sm text-amber-700 hover:text-amber-900 font-medium py-2 rounded-xl hover:bg-amber-50 transition-colors"
        >
          {showReviews ? '▲ Hide Reviews' : `▼ View Reviews (${product.reviews.length})`}
        </button>

        {/* Reviews section */}
        {showReviews && (
          <div className="mt-3 border-t border-gray-100 pt-4">

            {/* Existing reviews */}
            {product.reviews.length > 0 ? (
              <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
                {product.reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 rounded-xl p-3 relative group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-sm text-amber-900">{review.user}</span>
                          <StarRating rating={review.rating} size="w-3 h-3" />
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                      </div>
                      {isAuthenticated && (
                        <button
                          onClick={() => deleteReview(product.id, review.id)}
                          title="Delete review"
                          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-3 mb-4">No reviews yet. Be the first!</p>
            )}

            {/* Leave a review form */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-sm font-semibold text-amber-900 mb-3">Leave a Review</p>
              {submitted ? (
                <div className="text-center py-2">
                  <span className="text-green-600 text-sm font-medium">✓ Review submitted! Thank you.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={reviewForm.user}
                    onChange={e => setReviewForm(f => ({ ...f, user: e.target.value }))}
                    required
                    className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  />
                  {/* Star picker */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 mr-1">Rating:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                        className={`w-6 h-6 transition-colors ${star <= reviewForm.rating ? 'text-amber-400' : 'text-gray-300'} hover:text-amber-400`}
                      >
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Share your experience..."
                    value={reviewForm.comment}
                    onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    required
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white resize-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-amber-900 text-amber-100 py-2 rounded-lg text-sm font-semibold hover:bg-amber-800 transition-colors disabled:opacity-60"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;