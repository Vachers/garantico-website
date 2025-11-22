import { pgTable, serial, varchar, text, integer, boolean, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  nameTr: varchar("name_tr", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  order: integer("order").default(0),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  nameTr: varchar("name_tr", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  descriptionTr: text("description_tr"),
  descriptionEn: text("description_en"),
  specifications: jsonb("specifications"),
  imageUrl: varchar("image_url", { length: 500 }),
  isFeatured: boolean("is_featured").default(false),
  proteinMin: numeric("protein_min", { precision: 5, scale: 2 }),
  ashMax: numeric("ash_max", { precision: 5, scale: 2 }),
  moistureMax: numeric("moisture_max", { precision: 5, scale: 2 }),
  packagingOptions: jsonb("packaging_options"),
  certificates: jsonb("certificates"),
  createdAt: timestamp("created_at").defaultNow(),
  active: boolean("active").default(true),
});

// Product inquiries table
export const productInquiries = pgTable("product_inquiries", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  quantity: varchar("quantity", { length: 100 }),
  deliveryLocation: text("delivery_location"),
  message: text("message"),
  language: varchar("language", { length: 10 }).default("tr"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Page contents table
export const pageContents = pgTable("page_contents", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 100 }).notNull(),
  section: varchar("section", { length: 100 }).notNull(),
  contentTr: text("content_tr"),
  contentEn: text("content_en"),
  type: varchar("type", { length: 50 }).default("text"),
  order: integer("order").default(0),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

