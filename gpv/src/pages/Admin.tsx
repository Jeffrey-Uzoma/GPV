// pages/Admin.tsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import type { Product, Review } from '../types';

const emptyForm = {
  name: '',
  price: '',
  rating: '4.5',
  quantity: '',
  image: '',
  category: 'Perfumes',
  description: ''
};

const emptyReviewForm = { user: '', comment: '', rating: '5' };

const Admin: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, deleteReview } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [reviewList, setReviewList] = useState<Omit<Review, 'id' | 'date'>[]>([]);
  const [reviewForm, setReviewForm] = useState(emptyReviewForm);
  const [expandedProductReviews, setExpandedProductReviews] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddReviewToList = () => {
    if (!reviewForm.user.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in both reviewer name and comment.');
      return;
    }
    setReviewList(prev => [
      ...prev,
      { user: reviewForm.user.trim(), comment: reviewForm.comment.trim(), rating: Number(reviewForm.rating) }
    ]);
    setReviewForm(emptyReviewForm);
  };

  const handleRemoveReviewFromList = (index: number) => {
    setReviewList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct && !formData.image) {
      alert('Please enter an image URL.');
      return;
    }

    setSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const builtReviews: Review[] = reviewList.map((r, i) => ({
        ...r,
        id: `admin-${Date.now()}-${i}`,
        date: today
      }));

      if (editingProduct) {
        const existingReviews = editingProduct.reviews || [];
        await updateProduct(editingProduct.id, {
          name: formData.name,
          price: Number(formData.price),
          rating: Number(formData.rating),
          quantity: Number(formData.quantity),
          image: formData.image || editingProduct.image,
          category: formData.category,
          description: formData.description,
          reviews: [...existingReviews, ...builtReviews]
        });
      } else {
        await addProduct({
          name: formData.name,
          price: Number(formData.price),
          rating: Number(formData.rating),
          quantity: Number(formData.quantity),
          image: formData.image,
          category: formData.category,
          description: formData.description,
          reviews: builtReviews
        });
      }

      resetForm();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setReviewList([]);
    setReviewForm(emptyReviewForm);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      rating: product.rating.toString(),
      quantity: product.quantity.toString(),
      image: product.image,
      category: product.category,
      description: product.description
    });
    setReviewList([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product? This cannot be undone.')) {
      await deleteProduct(id);
    }
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((a, p) => a + p.quantity, 0);
  const totalReviews = products.reduce((a, p) => a + (p.reviews || []).length, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-[5em]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Admin Panel</h1>
            <p className="text-gray-500 mt-1">Manage your products and reviews</p>
          </div>
          <button
            onClick={() => { setShowForm(v => !v); if (showForm) resetForm(); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all ${
              showForm
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-amber-400 text-amber-950 hover:bg-amber-300 shadow-md hover:shadow-lg'
            }`}
          >
            {showForm ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Product
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Products', value: totalProducts, icon: '📦' },
            { label: 'Total Stock', value: totalStock, icon: '🗃️' },
            { label: 'Total Reviews', value: totalReviews, icon: '⭐' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-amber-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-amber-900 mb-6 pb-3 border-b border-gray-100">
              {editingProduct ? `Editing: ${editingProduct.name}` : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Product Details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price (₦)"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Stock Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <input
                  type="number"
                  name="rating"
                  placeholder="Display Rating (1–5)"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                >
                  <option value="Perfumes">Perfumes</option>
                  <option value="Cosmetics">Cosmetics</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Fragrances">Fragrances</option>
                </select>

                {/* Image URL input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      onError={e => (e.currentTarget.style.display = 'none')}
                      onLoad={e => (e.currentTarget.style.display = 'block')}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                </div>
              </div>

              <textarea
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none mb-6"
              />

              {/* Reviews section */}
              <div className="border border-amber-100 rounded-2xl bg-amber-50 p-5 mb-6">
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-4">
                  Pre-add Reviews <span className="normal-case font-normal text-amber-600">(these will appear as existing reviews on the product)</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Reviewer name (e.g. Chioma O.)"
                    value={reviewForm.user}
                    onChange={e => setReviewForm(f => ({ ...f, user: e.target.value }))}
                    className="px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm bg-white"
                  />
                  <select
                    value={reviewForm.rating}
                    onChange={e => setReviewForm(f => ({ ...f, rating: e.target.value }))}
                    className="px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm bg-white"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                    <option value="3">⭐⭐⭐ (3 stars)</option>
                    <option value="2">⭐⭐ (2 stars)</option>
                    <option value="1">⭐ (1 star)</option>
                  </select>
                </div>
                <textarea
                  placeholder="Review text..."
                  value={reviewForm.comment}
                  onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm bg-white resize-none mb-3"
                />
                <button
                  type="button"
                  onClick={handleAddReviewToList}
                  className="flex items-center gap-2 bg-amber-900 text-amber-100 px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Review to List
                </button>

                {reviewList.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-amber-700 font-medium">{reviewList.length} review(s) queued:</p>
                    {reviewList.map((r, i) => (
                      <div key={i} className="flex items-start justify-between bg-white rounded-xl px-4 py-3 border border-amber-100">
                        <div>
                          <span className="font-semibold text-sm text-amber-900 mr-2">{r.user}</span>
                          <span className="text-xs text-amber-500">{'★'.repeat(r.rating)}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{r.comment}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveReviewFromList(i)}
                          className="text-red-400 hover:text-red-600 ml-2 shrink-0"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-400 text-amber-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-amber-300 transition-all shadow hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-100 text-gray-600 px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-amber-900">All Products</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📦</p>
              <p className="font-medium">No products yet</p>
              <p className="text-sm">Click "Add New Product" to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest">
                    <th className="px-6 py-3 text-left font-semibold">Product</th>
                    <th className="px-6 py-3 text-left font-semibold">Category</th>
                    <th className="px-6 py-3 text-left font-semibold">Price</th>
                    <th className="px-6 py-3 text-left font-semibold">Stock</th>
                    <th className="px-6 py-3 text-left font-semibold">Reviews</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(product => {
                    const reviews = product.reviews || [];
                    return (
                      <React.Fragment key={product.id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                              />
                              <div>
                                <p className="font-semibold text-sm text-gray-800 leading-snug">{product.name}</p>
                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-100">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                            ₦{product.price.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              product.quantity > 10
                                ? 'bg-green-50 text-green-700'
                                : product.quantity > 0
                                ? 'bg-yellow-50 text-yellow-700'
                                : 'bg-red-50 text-red-700'
                            }`}>
                              {product.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                setExpandedProductReviews(expandedProductReviews === product.id ? null : product.id)
                              }
                              className="text-xs text-amber-700 hover:text-amber-900 font-semibold underline underline-offset-2"
                            >
                              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="text-xs text-red-600 hover:text-red-800 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded reviews row */}
                        {expandedProductReviews === product.id && (
                          <tr>
                            <td colSpan={6} className="bg-amber-50 px-6 py-4">
                              <p className="text-xs font-semibold text-amber-800 uppercase tracking-widest mb-3">
                                Reviews for {product.name}
                              </p>
                              {reviews.length === 0 ? (
                                <p className="text-sm text-gray-400">No reviews yet.</p>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {reviews.map(review => (
                                    <div
                                      key={review.id}
                                      className="flex items-start justify-between bg-white rounded-xl p-3 border border-amber-100 group"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                          <span className="font-semibold text-xs text-amber-900">{review.user}</span>
                                          <span className="text-amber-400 text-xs">{'★'.repeat(review.rating)}</span>
                                          <span className="text-xs text-gray-400">{review.date}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-2">{review.comment}</p>
                                      </div>
                                      <button
                                        onClick={async () => {
                                          if (window.confirm('Delete this review?')) {
                                            await deleteReview(product.id, review.id);
                                          }
                                        }}
                                        className="ml-2 shrink-0 text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                                        title="Delete review"
                                      >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
