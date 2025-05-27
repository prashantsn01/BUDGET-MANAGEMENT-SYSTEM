import React from "react";
import { useTransactionStore } from "../../../store/transactionStore";
import { useBudgetStore } from "../../../store/budgetStore";
import { useAuthStore } from "../../../store/authStore";

const DeleteTransactionModal = ({
      isOpen,
      onClose,
      transactionId,
      userId,
      budgetId,
}) => {
      const { deleteTransaction, budgetTransactions } = useTransactionStore();
      const { budgets, updateBudget } = useBudgetStore();
      const budget = budgets.find((budget) => budget.budget_id === budgetId);
      const transaction = budgetTransactions.find(
            (transaction) => transaction.transaction_id === transactionId
      );
      const { user } = useAuthStore();

      const handleDelete = async () => {
            try {
                  const endDateUpdate = budget.end_date.split("T")[0];
                  const amount =
                        transaction.transaction_type === "Income"
                              ? parseFloat(budget.spent_amount) +
                                parseFloat(transaction.amount)
                              : parseFloat(budget.spent_amount) -
                                parseFloat(transaction.amount);
                  await deleteTransaction(userId, transactionId);
                  await updateBudget(user.user_id, budgetId, {
                        ...budget,
                        end_date: endDateUpdate,
                        spent_amount: amount,
                  });
                  onClose();
            } catch (error) {
                  console.error("Error deleting transaction:", error);
            }
      };

      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 bg-transparent backdrop-blur  bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">
                              Confirm Deletion
                        </h2>
                        <p className="mb-6">
                              Are you sure you want to delete this transaction?
                              This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-2">
                              <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                              >
                                    Cancel
                              </button>
                              <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                    Delete
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default DeleteTransactionModal;
