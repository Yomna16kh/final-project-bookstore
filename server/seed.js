import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";
import User from "./models/User.js";

dotenv.config({ path: "./.env" });

await mongoose.connect(process.env.MONGODB_URI);

console.log("MongoDB connected...");

// 🧹 מוחק נתונים קיימים
await Book.deleteMany();
await User.deleteMany();

// 👤 משתמש admin
const adminUser = await User.create({
    name: "Admin User",
    email: "admin@book.com",
    password: "12345678",
    isAdmin: true,
});

// 📚 ספרים לדוגמה
const books = [
    {
        title: "ספר בדיקה",
        author: "יומנה",
        description: "ספר ראשון במערכת",
        price: 100,
        category: "ספרות",
        stock: 5,
    },
    {
        title: "מדע פשוט",
        author: "אלברט",
        description: "ספר מדעי",
        price: 80,
        category: "מדע",
        stock: 3,
    },
    {
        title: "היסטוריה עולמית",
        author: "דוד",
        description: "ספר היסטוריה",
        price: 120,
        category: "היסטוריה",
        stock: 7,
    },
];

await Book.insertMany(books);

console.log("✅ Seed data inserted!");
process.exit();