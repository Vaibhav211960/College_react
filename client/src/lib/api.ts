import type { User, Product, Order } from "@shared/schema";

// Auth API
export async function register(data: { name: string; email: string; password: string; phone?: string; address?: string }) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return res.json();
}

export async function logout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}

export async function getCurrentUser(): Promise<{ user: Omit<User, "password"> } | null> {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// Products API
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`/api/products/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Orders API
export async function getCurrentOrders(): Promise<(Order & { items: any[] })[]> {
  const res = await fetch("/api/orders/current", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch current orders");
  return res.json();
}

export async function getOrderHistory(): Promise<(Order & { items: any[] })[]> {
  const res = await fetch("/api/orders/history", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch order history");
  return res.json();
}

export async function createOrder(items: any[]) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create order");
  }
  return res.json();
}

// User API
export async function updateUser(data: { name?: string; phone?: string; address?: string }) {
  const res = await fetch("/api/user/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}
