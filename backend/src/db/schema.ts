import {
    pgTable,
    serial,
    varchar,
    integer,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    age: integer("age").notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    gender: varchar("gender", { length: 50 }),
    interests: text("interests").array(),
    createdAt: timestamp("created_at").defaultNow(),
  });
  