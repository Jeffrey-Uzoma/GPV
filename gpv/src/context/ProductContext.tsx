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
      } else {
        setProducts(fetched);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

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
