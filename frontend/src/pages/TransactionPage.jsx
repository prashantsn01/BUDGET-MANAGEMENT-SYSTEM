import React, { use, useEffect } from "react";
import TransactionTable from "../components/TransactionComponents/TransactionTable";
import { useTransactionStore } from "../store/transactionStore";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import TransactionSummary from "../components/TransactionComponents/TransactionSummary";

const TransactionPage = () => {
      const { budgetId } = useParams();

      const { budgetTransactions, fetchBudgetTransactions } =
            useTransactionStore();
      const { user } = useAuthStore();
      const currentUserId = user.user_id;
      useEffect(() => {
            fetchBudgetTransactions(budgetId);
      }, [budgetId, fetchBudgetTransactions]);

      return (
            <div className="p-6 w-full mx-auto">
                  {/* <TransactionSummary transactions={budgetTransactions} />
                  <TransactionTable
                        transactions={budgetTransactions}
                        budgetId={budgetId}
                  /> */}
                  <TransactionSummary
                        transactions={budgetTransactions}
                        budgetId={budgetId}
                        userId={currentUserId}
                  />
                  <TransactionTable
                        transactions={budgetTransactions}
                        userId={currentUserId}
                        budgetId={budgetId}
                  />
            </div>
      );
};

export default TransactionPage;
