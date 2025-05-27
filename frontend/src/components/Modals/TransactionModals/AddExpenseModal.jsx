import React, { useState } from "react";
import { useTransactionStore } from "../../../store/transactionStore";
import { useBudgetStore } from "../../../store/budgetStore";

const AddExpenseModal = ({ isOpen, onClose, budgetId, userId }) => {
      const [formData, setFormData] = useState({
            amount: "",
            description: "",
            category: "Food",
            transaction_date: new Date().toISOString().split("T")[0],
      });
      const { createTransaction } = useTransactionStore();
      const { budgets, updateBudget } = useBudgetStore();
      const budget = budgets.find((budget) => budget.budget_id === budgetId);

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  // Create transaction first
                  await createTransaction(userId, budgetId, {
                        ...formData,
                        amount: parseFloat(formData.amount),
                        transaction_type: "Expense",
                        category: budget.category,
                  });
                  // Then update budget
                  const endDateUpdate = budget.end_date.split("T")[0];
                  await updateBudget(userId, budgetId, {
                        ...budget,
                        end_date: endDateUpdate,
                        spent_amount:
                              parseFloat(budget.spent_amount) +
                              parseFloat(formData.amount),
                  });
                  // Reset form data
                  setFormData({
                        amount: "",
                        description: "",
                        category: "Food",
                        transaction_date: new Date()
                              .toISOString()
                              .split("T")[0],
                  });
                  onClose();
            } catch (error) {
                  console.error("Error:", error);
                  // Optionally implement rollback logic here
            }
      };

      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 bg-transparent backdrop-blur  bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md  shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-red-600">
                              Add Expense
                        </h2>

                        <form onSubmit={handleSubmit}>
                              <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">
                                          Amount
                                    </label>
                                    <input
                                          type="number"
                                          className="w-full p-2 border rounded"
                                          value={formData.amount}
                                          onChange={(e) =>
                                                setFormData({
                                                      ...formData,
                                                      amount: e.target.value,
                                                })
                                          }
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">
                                          Description
                                    </label>
                                    <input
                                          type="text"
                                          className="w-full p-2 border rounded"
                                          value={formData.description}
                                          onChange={(e) =>
                                                setFormData({
                                                      ...formData,
                                                      description:
                                                            e.target.value,
                                                })
                                          }
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">
                                          Date
                                    </label>
                                    <input
                                          type="date"
                                          className="w-full p-2 border rounded"
                                          value={formData.transaction_date}
                                          onChange={(e) =>
                                                setFormData({
                                                      ...formData,
                                                      transaction_date:
                                                            e.target.value,
                                                })
                                          }
                                          required
                                    />
                              </div>

                              <div className="flex justify-end gap-2">
                                    <button
                                          type="button"
                                          onClick={onClose}
                                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          type="submit"
                                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                          Add Expense
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default AddExpenseModal;
