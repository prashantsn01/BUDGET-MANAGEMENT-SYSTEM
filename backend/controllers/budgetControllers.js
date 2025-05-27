import { PrismaClient, BudgetCategory } from "@prisma/client";

const prisma = new PrismaClient();

const budgetController = {
      createBudget: async (req, res) => {
            const { user_id } = req.params;
            const {
                  budget_name,
                  total_amount,
                  start_date,
                  end_date,
                  category,
            } = req.body;

            try {
                  const parsedStartDate = new Date(start_date);
                  const parsedEndDate = new Date(end_date);

                  if (
                        isNaN(parsedStartDate.getTime()) ||
                        isNaN(parsedEndDate.getTime())
                  ) {
                        return res
                              .status(400)
                              .json({ error: "Invalid date format" });
                  }

                  const existingBudget = await prisma.budget.findFirst({
                        where: {
                              budget_name,
                              user_id,
                        },
                  });

                  if (existingBudget) {
                        return res
                              .status(400)
                              .json({
                                    error: "Budget already exists, Modify the same budget.",
                              });
                  }

                  // Create the budget
                  const budget = await prisma.budget.create({
                        data: {
                              user_id,
                              budget_name,
                              total_amount: parseFloat(total_amount),
                              spent_amount: 0, 
                              start_date: parsedStartDate,
                              end_date: parsedEndDate,
                              category,
                        },
                  });

                  res.status(201).json(budget);
            } catch (error) {
                  console.error("Error creating budget:", error);
                  res.status(500).json({
                        error: error.message || "Failed to create budget",
                  });
            }
      },

      // Update Budget
      updateBudget: async (req, res) => {
            const { user_id, budget_id } = req.params;
            const { budget_name, total_amount, end_date, category,spent_amount } = req.body;

            try {
                  const existingBudget = await prisma.budget.findFirst({
                        where: {
                              budget_name,
                              user_id,
                              NOT: {
                                    budget_id
                              },
                        },
                  });

                  if (existingBudget) {
                        return res
                              .status(400)
                              .json({
                                    error: "Budget  already exists with this name.",
                              });
                  }
                  const budget = await prisma.budget.update({
                        where: {
                              budget_id,
                              user_id,
                        },
                        data: {
                              budget_name,
                              total_amount,
                              spent_amount,
                              end_date: new Date(end_date),
                              category,
                        },
                  });
                  res.status(200).json(budget);
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },

      // Delete Budget
      deleteBudget: async (req, res) => {
            const { user_id, budget_id } = req.params;

            try {
                  await prisma.budget.delete({
                        where: {
                              budget_id,
                              user_id,
                        },
                  });
                  res.status(200).json({
                        message: "Budget deleted successfully",
                  });
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },

      // Get All Budgets by User ID
      getAllBudgets: async (req, res) => {
            const { user_id } = req.params;

            try {
                  const budgets = await prisma.budget.findMany({
                        where: { user_id },
                  });
                  res.status(200).json(budgets);
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },

      // Get Budget Categories
      getBudgetCategories: async (req, res) => {
            try {
                  const categories = Object.values(BudgetCategory);
                  res.status(200).json(categories);
            } catch (error) {
                  res.status(400).json({ error: error.message });
            }
      },
};

export default budgetController;
