"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    fullName: (0, pg_core_1.varchar)("full_name", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 20 }).notNull(),
    age: (0, pg_core_1.integer)("age").notNull(),
    city: (0, pg_core_1.varchar)("city", { length: 100 }).notNull(),
    gender: (0, pg_core_1.varchar)("gender", { length: 50 }),
    interests: (0, pg_core_1.text)("interests").array(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
