import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
app.use(morgan("dev"));
const prisma = new PrismaClient();

const allowedOrigins = [
  "http://localhost:5173",
  "https://budget-management-awin.vercel.app"
];

app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

dotenv.config();
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/transaction", transactionRoutes);

const PORT = process.env.PORT || 5000;

async function checkDatabaseConnection() {
      try {
            await prisma.$connect();
            console.log("Successfully connected to the database!");
      } catch (error) {
            console.error("Error connecting to the database:", error.message);
      } finally {
            await prisma.$disconnect();
      }
}

app.listen(PORT, () => {
      checkDatabaseConnection();
      console.log(`Server running on port ${PORT}`);
});
