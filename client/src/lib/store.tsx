import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getCurrentUser, logout as apiLogout } from "./api";
import type { User } from "@shared/schema";

type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category?: string;
  subcategory?: string;
};

type AppContextType = {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  login: (user: Omit<User, "password">) => void;
  logout: () => Promise<void>;
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartTotal: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Load user session on mount
  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data) {
          setUser(data.user);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart]);

  const login = (userData: Omit<User, "password">) => setUser(userData);
  
  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        imageUrl: product.imageUrl || product.image,
        quantity: 1,
        category: product.category,
        subcategory: product.subcategory,
      }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{ user, isLoading, login, logout, cart, addToCart, removeFromCart, clearCart, cartTotal }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
