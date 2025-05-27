import { useAuthStore } from "../store/authStore";
import { useBudgetStore } from "../store/budgetStore";
import { useEffect, useState } from "react";
import TotalBudget from "../components/TotalBudget";
import BarGraph from "../components/ui/BarGraph";
import SpendingPieChart from "../components/ui/SpendingPieChart";
import RecentTransactions from "../components/ui/RecentTransactions";
import { useTransactionStore } from "../store/transactionStore";
import { useAIStore } from "../store/aiStore";

const DashboardPage = () => {
      const { user } = useAuthStore();
      const { fetchBudgets, budgets } = useBudgetStore();
      const { isAILoading, fetchFinancialInsights, insights } = useAIStore();
      const { userTransactions } = useTransactionStore();

      useEffect(() => {
            fetchBudgets(user.user_id);
            setTimeout(() => {
                  if (budgets.length >= 0 && userTransactions.length >= 0) {
                        fetchFinancialInsights(user.user_id);
                  }
            }, 2000); // Delay to ensure budgets and transactions are fetched
      }, []);

      return (
            <div className="w-full space-y-6 p-4">
                  {/* Top Section - Total Budget (No background) */}
                  <TotalBudget budgets={budgets} />

                  {/* Middle Section - Graph and Chart (Side by Side) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 h-80 flex flex-col">
                              <div className="flex-1">
                                    <BarGraph />
                              </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 h-80 flex flex-col">
                              <div className="flex-1">
                                    <SpendingPieChart />
                              </div>
                        </div>
                  </div>

                  {/* Recent Transactions (Full Width) */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="h-96 overflow-y-auto">
                              <RecentTransactions
                                    transactions={userTransactions}
                              />
                        </div>
                  </div>

                  {/* AI insights */}
                  <div className="w-full bg-white rounded-2xl shadow-lg p-6">
                        <div className="max-w-7xl mx-auto">
                              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    💡 AI Financial Insights
                              </h2>

                              {isAILoading ? (
                                    <div className="flex items-center space-x-2 text-gray-500">
                                          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                          <span>Generating insights...</span>
                                    </div>
                              ) : (
                                    <div className="space-y-4">
                                          {insights && insights.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                      {insights.map(
                                                            (
                                                                  insight,
                                                                  index
                                                            ) => (
                                                                  <div
                                                                        key={
                                                                              index
                                                                        }
                                                                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                                                                  >
                                                                        <div className="flex items-start">
                                                                              <span className="text-blue-500 mr-2">
                                                                                    •
                                                                              </span>
                                                                              <p className="text-gray-700">
                                                                                    {
                                                                                          insight
                                                                                    }
                                                                              </p>
                                                                        </div>
                                                                  </div>
                                                            )
                                                      )}
                                                </div>
                                          ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 py-8">
                                                      <svg
                                                            className="w-12 h-12 mb-2 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="1"
                                                                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                      </svg>
                                                      <p className="text-sm text-center">
                                                            No transactions or
                                                            budgets available.
                                                            Please add a budget
                                                            or transaction to
                                                            see insights.
                                                      </p>
                                                </div>
                                          )}
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default DashboardPage;
