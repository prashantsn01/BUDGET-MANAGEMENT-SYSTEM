import { useTransactionStore } from "../store/transactionStore";
import TransactionTable from "../components/TransactionComponents/TransactionTable";
import TransactionSummary from "../components/TransactionComponents/TransactionSummary";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const AllTransactions = () => {
      const { user } = useAuthStore();
      const { userTransactions, fetchUserTransactions } = useTransactionStore();
      useEffect(() => {
            fetchUserTransactions(user.user_id);
      }, []);

      return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex flex-col gap-2 w-full">
                        {/* Summary Section - Fixed width */}
                        <div className="w-full">
                              <TransactionSummary
                                    transactions={userTransactions}
                              />
                        </div>

                        {/* Table Section - Expands to fill space */}
                        <div className="flex-1 min-w-0 overflow-auto">
                              <TransactionTable
                                    transactions={userTransactions}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default AllTransactions;
