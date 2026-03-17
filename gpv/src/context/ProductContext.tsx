// context/ProductContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import type { Product, Review } from '../types';
import type { ReactNode } from 'react';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (productId: string, reviewId: string) => void;
}

const STORAGE_KEY = 'gpv_products_v2';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Gold Perfume',
    price: 45000,
    rating: 4.5,
    quantity: 15,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Perfumes',
    description: 'A luxurious fragrance with deep notes of vanilla, amber, and oud. Long-lasting and captivating.',
    reviews: [
      { id: 'r1', user: 'Chioma O.', comment: 'Absolutely divine! Lasts all day and gets so many compliments.', rating: 5, date: '2024-02-15' },
      { id: 'r2', user: 'Adaeze M.', comment: 'Worth every kobo. My signature scent now.', rating: 5, date: '2024-02-18' },
    ]
  },
  {
    id: '2',
    name: 'Golden Rose Lipstick',
    price: 12500,
    rating: 4,
    quantity: 30,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Cosmetics',
    description: 'Long-lasting matte lipstick with a subtle golden shimmer finish. Available in 12 shades.',
    reviews: [
      { id: 'r3', user: 'Amara N.', comment: 'Beautiful color, stays on for hours without touch-up!', rating: 4, date: '2024-02-10' },
      { id: 'r4', user: 'Funke A.', comment: 'Love the packaging and the colour payoff.', rating: 4, date: '2024-02-20' },
    ]
  },
  {
    id: '3',
    name: 'Diamond Shine Foundation',
    price: 18500,
    rating: 4.8,
    quantity: 20,
    image: 'https://images.unsplash.com/photo-1631730319495-5b08986f0ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Cosmetics',
    description: 'Full-coverage foundation with a flawless natural finish. Dermatologist tested and suitable for all skin tones.',
    reviews: [
      { id: 'r5', user: 'Blessing E.', comment: 'Perfect match for my dark skin tone. Finally!', rating: 5, date: '2024-02-12' },
      { id: 'r6', user: 'Ngozi P.', comment: 'Light on the skin but full coverage. I\'m obsessed.', rating: 5, date: '2024-02-22' },
    ]
  }
];

const safeLoadProducts = (): Product[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    console.warn('Failed to load products from storage.');
  }
  return null;
};

const safeSaveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.warn(
      'Storage quota exceeded. Your images may be too large. ' +
      'Products are still visible this session but may not persist after refresh. ' +
      'Try uploading smaller or compressed images.'
    );
  }
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = safeLoadProducts();
    return saved ?? sampleProducts;
  });

  // Save whenever products change
  useEffect(() => {
    safeSaveProducts(products);
  }, [products]);

  // Seed storage if empty
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      safeSaveProducts(sampleProducts);
    }
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: Date.now().toString() };
    setProducts(prev => {
      const updated = [...prev, newProduct];
      safeSaveProducts(updated);
      return updated;
    });
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      safeSaveProducts(updated);
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      safeSaveProducts(updated);
      return updated;
    });
  };

  const addReview = (productId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => {
      const updated = prev.map(p =>
        p.id === productId
          ? { ...p, reviews: [...p.reviews, newReview] }
          : p
      );
      safeSaveProducts(updated);
      return updated;
    });
  };

  const deleteReview = (productId: string, reviewId: string) => {
    setProducts(prev => {
      const updated = prev.map(p =>
        p.id === productId
          ? { ...p, reviews: p.reviews.filter(r => r.id !== reviewId) }
          : p
      );
      safeSaveProducts(updated);
      return updated;
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, addReview, deleteReview }}>
      {children}
    </ProductContext.Provider>
  );
};