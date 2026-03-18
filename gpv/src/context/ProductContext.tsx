// context/ProductContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Product, Review } from '../types';
import type { ReactNode } from 'react';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => Promise<void>;
  deleteReview: (productId: string, reviewId: string) => Promise<void>;
}

const sampleProducts: Omit<Product, 'id'>[] = [
  {
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
    name: 'Diamond Shine Foundation',
    price: 18500,
    rating: 4.8,
    quantity: 20,
    image: 'https://images.unsplash.com/photo-1631730319495-5b08986f0ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Cosmetics',
    description: 'Full-coverage foundation with a flawless natural finish. Dermatologist tested and suitable for all skin tones.',
    reviews: [
      { id: 'r5', user: 'Blessing E.', comment: 'Perfect match for my dark skin tone. Finally!', rating: 5, date: '2024-02-12' },
      { id: 'r6', user: 'Ngozi P.', comment: "Light on the skin but full coverage. I'm obsessed.", rating: 5, date: '2024-02-22' },
    ]
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeded, setSeeded] = useState(false);

  // Real-time listener — any change in Firestore instantly updates all devices
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), snapshot => {
      const fetched: Product[] = snapshot.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<Product, 'id'>)
      }));

      // Seed sample products only if the collection is completely empty
      if (fetched.length === 0 && !seeded) {
        setSeeded(true);
        seedSampleProducts();
      } else {
        setProducts(fetched);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const seedSampleProducts = async () => {
    try {
      await Promise.all(
        sampleProducts.map(p => addDoc(collection(db, 'products'), p))
      );
    } catch (err) {
      console.error('Failed to seed sample products:', err);
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await addDoc(collection(db, 'products'), product);
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    await updateDoc(doc(db, 'products', id), updatedFields);
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const addReview = async (productId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    await updateDoc(doc(db, 'products', productId), {
      reviews: arrayUnion(newReview)
    });
  };

  const deleteReview = async (productId: string, reviewId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const reviewToRemove = product.reviews.find(r => r.id === reviewId);
    if (!reviewToRemove) return;
    await updateDoc(doc(db, 'products', productId), {
      reviews: arrayRemove(reviewToRemove)
    });
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct, addReview, deleteReview }}>
      {children}
    </ProductContext.Provider>
  );
};
