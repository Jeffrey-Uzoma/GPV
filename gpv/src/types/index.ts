// types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  quantity: number;
  reviews: Review[];
  image: string;
  category: string;
  description: string;
}

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}
