import React, { useState, useEffect } from "react";
import { useTransactionStore } from "../../../store/transactionStore";
import { useBudgetStore } from "../../../store/budgetStore";

const EditTransactionModal = ({
      isOpen,
      onClose,
      transaction,
      userId,
      budgetId,
}) => {
      const { budgets, updateBudget } = useBudgetStore();
      const { updateTransaction } = useTransactionStore();

      const budget = budgets.find((budget) => budget.budget_id === budgetId);

      const [formData, setFormData] = useState({
            amount: "",
            description: "",
            category: "",
            transaction_type: "",
            transaction_date: "",
      });

      useEffect(() => {
            if (transaction) {
                  setFormData({
                        amount: transaction.amount,
                        description: transaction.description,
                        category: transaction.category,
                        transaction_type: transaction.transaction_type,
                        transaction_date:
                              transaction.transaction_date.split("T")[0],
                  });
            }
      }, [transaction]);

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  // First calculate the difference this transaction makes to the budge
                  const newAmount = parseFloat(formData.amount);
                  const prevType = transaction.transaction_type;
                  const prevAmount = transaction.amount;
                  const newType = formData.transaction_type;
                  const budgetSpentAmount = budget.spent_amount;
                  let updatedAmount = 0;

                  if (newAmount === prevAmount && newType === prevType) {
                        // Case 1: No change in amount or type
                        updatedAmount = budgetSpentAmount;
                  } else if (prevType === newType) {
                        // Case 2: Type remains the same, amount changes
                        if (newType === "Expense") {
                              updatedAmount =
                                    budgetSpentAmount - prevAmount + newAmount;
                        } else {
                              // For income, we subtract the old amount and add the new amount
                              updatedAmount =
                                    budgetSpentAmount + prevAmount - newAmount;
                        }
                  } else {
                        // Case 3: Type changes (regardless of amount change)
                        if (prevType === "Expense" && newType === "Income") {
                              // Changing from expense to income: remove expense and add income
                              updatedAmount =
                                    budgetSpentAmount - prevAmount - newAmount;
                        } else {
                              // Changing from income to expense: add back income and add new expense
                              updatedAmount =
                                    budgetSpentAmount + prevAmount + newAmount;
                        }
                  }

                  // Update the transaction first
                  const endDateUpdate = budget.end_date.split("T")[0];
                  await updateTransaction(userId, transaction.transaction_id, {
                        ...formData,
                        end_date: endDateUpdate,
                        amount: parseFloat(formData.amount),
                  });

                  await updateBudget(userId, budgetId, {
                        ...budget,
                        spent_amount: parseFloat(updatedAmount),
                  });

                  setFormData({
                        amount: "",
                        description: "",
                        category: "",
                        transaction_type: "",
                        transaction_date: new Date()
                              .toISOString()
                              .split("T")[0],
                  });

                  onClose();
            } catch (error) {
                  console.error("Error updating transaction:", error);
            }
      };

      if (!isOpen || !transaction) return null;

      return (
            <div className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50  flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">
                              Edit Transaction
                        </h2>

                        <form onSubmit={handleSubmit}>
                              <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">
                                          Type
                                    </label>
                                    <select
                                          className="w-full p-2 border rounded"
                                          value={formData.transaction_type}
                                          onChange={(e) =>
                                                setFormData({
                                                      ...formData,
                                                      transaction_type:
                                                            e.target.value,
                                                })
                                          }
                                          required
                                    >
                                          <option value="Income">Income</option>
                                          <option value="Expense">
                                                Expense
                                          </option>
                                    </select>
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">
                                          Amount
                                    </label>
                                    <input
                                          type="number"
                                          step="0.01"
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
                                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                          Save Changes
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default EditTransactionModal;
