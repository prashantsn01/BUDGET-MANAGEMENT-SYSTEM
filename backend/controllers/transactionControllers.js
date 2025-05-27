import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function FinancialInsights(stats) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const netIncome = stats.totalIncome - stats.totalExpenses;

      // Format budget overspending info if available
      const overspentBudgets = stats.budgets
            ? stats.budgets
                    .filter((b) => b.spent_amount > b.total_amount)
                    .map(
                          (b) =>
                                `${b.budget_name} (Over by $${(
                                      b.spent_amount - b.total_amount
                                ).toFixed(2)})`
                    )
            : [];

      const prompt = `
    Analyze this user's overall financial data and provide 3 concise, actionable insights.
    Focus on spending patterns, overspending risks, savings opportunities, and practical advice.
    Be friendly and conversational.
    
    Overall Financial Data:
    - Total Income: ₹${stats.totalIncome.toFixed(2)}
    - Total Expenses: ₹${stats.totalExpenses.toFixed(2)}
    - Net Income: ₹${netIncome.toFixed(2)}
    - Expense Breakdown by Category: ${Object.entries(stats.byCategory)
          .map(([category, amount]) => `${category}: $${amount.toFixed(2)}`)
          .join(", ")}
    
    ${
          overspentBudgets.length > 0
                ? `Overspent Budgets: ${overspentBudgets.join(", ")}`
                : ""
    }
    
    Format the response as a JSON array of strings like:
    ["Insight 1", "Insight 2", "Insight 3"]
    `;

      try {
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = await response.text();
            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

            return JSON.parse(cleanedText);
      } catch (error) {
            console.error("Error generating insights:", error);
            return [
                  "Analyze your biggest spending categories to look for savings opportunities.",
                  "If you're overspending on specific budgets, try setting limits or alerts.",
                  "Keep track of your income vs. expenses to maintain a positive net income.",
            ];
      }
}

function generateStats({ transactions, budgets }) {
      const totalIncome = transactions
            .filter((txn) => txn.transaction_type === "Income")
            .reduce((sum, txn) => sum + txn.amount, 0);

      const totalExpenses = transactions
            .filter((txn) => txn.transaction_type === "Expense")
            .reduce((sum, txn) => sum + txn.amount, 0);

      const byCategory = transactions
            .filter((txn) => txn.transaction_type === "Expense")
            .reduce((acc, txn) => {
                  acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
                  return acc;
            }, {});

      return {
            totalIncome,
            totalExpenses,
            byCategory,
            budgets, // optionally include this if you want to enrich insights
      };
}

export const getFinancialInsights = async (req, res) => {
      try {
            const { user_id } = req.params;

            const transactions = await prisma.transaction.findMany({
                  where: { user_id },
            });

            const budgets = await prisma.budget.findMany({
                  where: { user_id },
            });

            const stats = generateStats({ transactions, budgets });
            const insights = await FinancialInsights(stats);
 
            res.status(200).json({ insights });
      } catch (error) {
            console.error("Error fetching financial insights:", error);
            res.status(500).json({ error: "Failed to generate insights" });
      }
};

export async function scanReceipt(file, budgetId, userId, categories) {
      try {
            // Validate file MIME type
            if (!file || !file.mimetype || !file.buffer) {
                  throw new Error("Invalid file format.");
            }

            const model = genAI.getGenerativeModel({
                  model: "gemini-1.5-flash",
            });

            const base64String = file.buffer.toString("base64");
            const categoryList = categories.join(", ");

            const prompt = `
Analyze this receipt image and extract the following information in JSON format:
- Total amount (just the number)
- Date (in ISO format)
- Description or items purchased (short summary of 4 to 8 words)
- Suggested category (one of: ${categoryList})

Only respond with valid JSON in this exact format:
{
  "amount": number,
  "date": "ISO date string",
  "description": "string",
  "category": "string"
}

If it's not a receipt, return an empty object.
`;

            // Send request to Gemini
            const result = await model.generateContent({
                  contents: [
                        {
                              parts: [
                                    {
                                          inlineData: {
                                                mimeType: file.mimetype, // ✅ Correct mimeType from multer
                                                data: base64String,
                                          },
                                    },
                                    { text: prompt },
                              ],
                        },
                  ],
            });

            const response = await result.response;
            const text = await response.text();
            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

            let parsedData;
            try {
                  parsedData = JSON.parse(cleanedText);
            } catch (err) {
                  console.error("Error parsing JSON response:", err);
                  throw new Error("Invalid response format from Gemini.");
            }

            // Return null if response is an empty object
            if (!parsedData || Object.keys(parsedData).length === 0)
                  return null;

            const { amount, date, description, category } = parsedData;

            const validCategory = categories.includes(category)
                  ? category
                  : categories[0];

            return {
                  budget_id: budgetId,
                  user_id: userId,
                  transaction_type: "Expense",
                  category: validCategory,
                  amount: parseFloat(amount),
                  description: description,
                  transaction_date: new Date(date),
            };
      } catch (error) {
            console.error("Error scanning receipt:", error);
            throw new Error("Failed to scan receipt");
      }
}

const transactionController = {
      // Create Transaction
      createTransaction: async (req, res) => {
            const { user_id, budget_id } = req.params;
            const {
                  transaction_type,
                  amount,
                  description,
                  category,
                  transaction_date,
            } = req.body;

            try {
                  const transaction = await prisma.transaction.create({
                        data: {
                              user_id,
                              budget_id,
                              transaction_type,
                              amount: parseFloat(amount),
                              description,
                              category,
                              transaction_date: new Date(transaction_date),
                        },
                  });

                  res.status(201).json(transaction);
            } catch (error) {
                  console.error("Error creating transaction:", error);
                  res.status(500).json({
                        error: error.message || "Failed to create transaction",
                  });
            }
      },

      // Update Transaction
      updateTransaction: async (req, res) => {
            const { user_id, transaction_id } = req.params;
            const { transaction_type, amount, description } = req.body;

            try {
                  const transaction = await prisma.transaction.update({
                        where: {
                              transaction_id,
                              user_id,
                        },
                        data: {
                              transaction_type,
                              amount: parseFloat(amount),
                              description,
                        },
                  });
                  res.status(200).json(transaction);
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },

      // Delete Transaction
      deleteTransaction: async (req, res) => {
            const { user_id, transaction_id } = req.params;

            try {
                  await prisma.transaction.delete({
                        where: {
                              transaction_id,
                              user_id,
                        },
                  });
                  res.status(200).json({
                        message: "Transaction deleted successfully",
                  });
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },

      // Get All Transactions for a User
      getAllTransactionsForUser: async (req, res) => {
            const { user_id } = req.params;

            try {
                  const transactions = await prisma.transaction.findMany({
                        where: { user_id },
                  });
                  res.status(200).json(transactions);
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },

      // Get All Transactions for a Budget
      getAllTransactionsForBudget: async (req, res) => {
            const { budget_id } = req.params;

            try {
                  const transactions = await prisma.transaction.findMany({
                        where: { budget_id },
                  });
                  res.status(200).json(transactions);
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },
};

export default transactionController;
