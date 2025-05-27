import bcrypt from "bcrypt";
import prisma from "../models/prisma.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

const authController = {
      signup: async (req, res) => {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                  return res
                        .status(400)
                        .json({ error: "Please provide all fields" });
            }
            try {
                  const existinguser = await prisma.user.findUnique({
                        where: { email },
                  });
                  if (existinguser) {
                        return res
                              .status(400)
                              .json({ error: "User already exists" });
                  }

                  const existingUsername = await prisma.user.findUnique({
                        where: { username },
                  });
                  if (existingUsername) {
                        return res
                              .status(400)
                              .json({ error: "User name already exists" });
                  }
                  const hashedPassword = await bcrypt.hash(password, 10);
                  const newUser = await prisma.user.create({
                        data: {
                              username,
                              email,
                              password: hashedPassword,
                        },
                  });

                  generateTokenAndSetCookie(res, newUser.user_id);

                  res.status(201).json({
                        success: true,
                        message: "Logged in successfully",
                        user: { ...newUser, password: undefined },
                  });
            }
             catch (error) {
                  res.status(400).json({
                        message: "error in signup",
                        error: error.message,
                  });
            }
      },

      login: async (req, res) => {
            try {
                  const { email, password } = req.body;

                  // Find user by email
                  const user = await prisma.user.findUnique({
                        where: { email },
                  });

                  if (!user) {
                        return res.status(400).json({
                              success: false,
                              message: "Invalid credentials",
                        });
                  }
                  const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                  );
                  if (!isPasswordValid) {
                        return res.status(400).json({
                              success: false,
                              message: "Invalid credentials",
                        });
                  }

                  generateTokenAndSetCookie(res, user.user_id);

                  // Return user data, excluding the password
                  res.json({
                        success: true,
                        message: "Logged in successfully",
                        user: { ...user, password: undefined },
                  });
            } catch (error) {
                  console.log("Error in login ", error);
                  res.status(400).json({
                        success: false,
                        message: error.message,
                  });
            }
      },

      logout: async (req, res) => {
            res.clearCookie("token");
            res.status(200).json({ success: true, message: "Logged out" });
      },
};

export default authController;
