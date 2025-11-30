import { db } from "./db";
import { users, products, orders, orderItems, type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder, type OrderItem, type InsertOrderItem } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItems(items: InsertOrderItem[]): Promise<OrderItem[]>;
  getUserOrders(userId: number): Promise<(Order & { items: OrderItem[] })[]>;
  getOrderWithItems(orderId: number): Promise<(Order & { items: OrderItem[] }) | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(userData).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return db.select().from(products).where(eq(products.category, category));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  // Orders
  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(order).returning();
    return result[0];
  }

  async createOrderItems(items: InsertOrderItem[]): Promise<OrderItem[]> {
    const result = await db.insert(orderItems).values(items).returning();
    return result;
  }

  async getUserOrders(userId: number): Promise<(Order & { items: OrderItem[] })[]> {
    const userOrders = await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
    
    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
        return { ...order, items };
      })
    );
    
    return ordersWithItems;
  }

  async getOrderWithItems(orderId: number): Promise<(Order & { items: OrderItem[] }) | undefined> {
    const order = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
    if (!order[0]) return undefined;
    
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
    return { ...order[0], items };
  }
}

export const storage = new DatabaseStorage();
