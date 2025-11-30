import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertOrderSchema, insertOrderItemSchema, type InsertUser } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { neon } from "@neondatabase/serverless";

const PgSession = ConnectPgSimple(session);

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Session middleware
  app.use(
    session({
      store: new PgSession({
        conString: process.env.DATABASE_URL!,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "inscape-floors-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      req.session.userId = user.id;
      
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(credentials.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const validPassword = await bcrypt.compare(credentials.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      req.session.userId = user.id;
      
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input" });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  });

  // User Routes
  app.get("/api/user/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.put("/api/user/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { name, phone, address } = req.body;
      const updated = await storage.updateUser(req.session.userId, { name, phone, address });
      
      if (!updated) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = updated;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Product Routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      console.error("Get products by category error:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Get product error:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Order Routes
  app.get("/api/orders/current", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const orders = await storage.getUserOrders(req.session.userId);
      const currentOrders = orders.filter(o => o.status === "processing" || o.status === "shipped");
      res.json(currentOrders);
    } catch (error) {
      console.error("Get current orders error:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/history", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const orders = await storage.getUserOrders(req.session.userId);
      const completedOrders = orders.filter(o => o.status === "delivered" || o.status === "cancelled");
      res.json(completedOrders);
    } catch (error) {
      console.error("Get order history error:", error);
      res.status(500).json({ message: "Failed to fetch order history" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { items } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must contain at least one item" });
      }

      // Calculate total
      const totalAmount = items.reduce((sum: number, item: any) => {
        return sum + (parseFloat(item.price) * item.quantity);
      }, 0);

      // Create order
      const order = await storage.createOrder({
        userId: req.session.userId,
        totalAmount: totalAmount.toFixed(2),
        status: "processing",
      });

      // Create order items
      const orderItems = await storage.createOrderItems(
        items.map((item: any) => ({
          orderId: order.id,
          productId: item.id,
          title: item.title,
          category: item.category || "",
          subcategory: item.subcategory || "",
          quantity: item.quantity,
          price: item.price,
        }))
      );

      res.json({ ...order, items: orderItems });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  return httpServer;
}
