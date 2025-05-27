import React from "react";

const RecentTransactions = ({ transactions }) => {
      // Sort transactions by date (newest first) and take the first 5
      const recentTransactions = [...transactions]
            .sort(
                  (a, b) =>
                        new Date(b.transaction_date) -
                        new Date(a.transaction_date)
            )
            .slice(0, 5);

      const getCategoryColor = (category) => {
            const colors = {
                  Health: "bg-blue-100 text-blue-800",
                  Personal: "bg-indigo-100 text-indigo-800",
                  Business: "bg-purple-100 text-purple-800",
                  Emergency: "bg-red-100 text-red-800",
                  Travel: "bg-cyan-100 text-cyan-800",
                  Savings: "bg-green-100 text-green-800",
                  Education: "bg-amber-100 text-amber-800",
                  Shopping: "bg-pink-100 text-pink-800",
                  Food: "bg-amber-100 text-amber-800",
                  Salary: "bg-green-100 text-green-800",
                  Entertainment: "bg-purple-100 text-purple-800",
                  Transportation: "bg-gray-100 text-gray-800",
                  default: "bg-gray-100 text-gray-800",
            };
            return colors[category] || colors.default;
      };

      return (
            <div className="p-4 w-full mx-auto bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Recent Transactions
                  </h3>

                  {recentTransactions.length > 0 ? (
                        <>
                              {/* Mobile Cards View */}
                              <div className="sm:hidden space-y-3">
                                    {recentTransactions.map((transaction) => (
                                          <div
                                                key={transaction.transaction_id}
                                                className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                                          >
                                                <div className="flex justify-between items-start">
                                                      <div>
                                                            <p className="text-sm font-medium text-gray-700">
                                                                  {
                                                                        transaction.description
                                                                  }
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                  {new Date(
                                                                        transaction.transaction_date
                                                                  ).toLocaleDateString(
                                                                        "en-IN",
                                                                        {
                                                                              day: "numeric",
                                                                              month: "short",
                                                                              year: "numeric",
                                                                        }
                                                                  )}
                                                            </p>
                                                      </div>
                                                      <p
                                                            className={`text-sm font-medium ${
                                                                  transaction.transaction_type ===
                                                                  "Income"
                                                                        ? "text-green-600"
                                                                        : "text-red-600"
                                                            }`}
                                                      >
                                                            {transaction.transaction_type ===
                                                            "Income"
                                                                  ? "+"
                                                                  : "-"}
                                                            ₹
                                                            {transaction.amount.toLocaleString(
                                                                  "en-IN"
                                                            )}
                                                      </p>
                                                </div>
                                                <div className="mt-2">
                                                      <span
                                                            className={`${getCategoryColor(
                                                                  transaction.category
                                                            )} px-2 py-1 rounded-full text-xs font-medium`}
                                                      >
                                                            {
                                                                  transaction.category
                                                            }
                                                      </span>
                                                </div>
                                          </div>
                                    ))}
                              </div>

                              {/* Desktop Table View */}
                              <div className="hidden sm:block overflow-x-auto">
                                    <table className="w-full border-collapse">
                                          <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                      <th className="p-3 text-left text-gray-600 font-medium text-sm">
                                                            Date
                                                      </th>
                                                      <th className="p-3 text-left text-gray-600 font-medium text-sm">
                                                            Description
                                                      </th>
                                                      <th className="p-3 text-left text-gray-600 font-medium text-sm">
                                                            Category
                                                      </th>
                                                      <th className="p-3 text-left text-gray-600 font-medium text-sm">
                                                            Amount
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {recentTransactions.map(
                                                      (transaction) => (
                                                            <tr
                                                                  key={
                                                                        transaction.transaction_id
                                                                  }
                                                                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                                            >
                                                                  <td className="p-3 text-gray-700 text-sm">
                                                                        {new Date(
                                                                              transaction.transaction_date
                                                                        ).toLocaleDateString(
                                                                              "en-IN",
                                                                              {
                                                                                    day: "numeric",
                                                                                    month: "short",
                                                                                    year: "numeric",
                                                                              }
                                                                        )}
                                                                  </td>
                                                                  <td className="p-3 text-gray-700 text-sm">
                                                                        {
                                                                              transaction.description
                                                                        }
                                                                  </td>
                                                                  <td className="p-3">
                                                                        <span
                                                                              className={`${getCategoryColor(
                                                                                    transaction.category
                                                                              )} px-2 py-1 rounded-full text-xs font-medium`}
                                                                        >
                                                                              {
                                                                                    transaction.category
                                                                              }
                                                                        </span>
                                                                  </td>
                                                                  <td
                                                                        className={`p-3 font-medium text-sm ${
                                                                              transaction.transaction_type ===
                                                                              "Income"
                                                                                    ? "text-green-600"
                                                                                    : "text-red-600"
                                                                        }`}
                                                                  >
                                                                        {transaction.transaction_type ===
                                                                        "Income"
                                                                              ? "+"
                                                                              : "-"}
                                                                        ₹
                                                                        {transaction.amount.toLocaleString(
                                                                              "en-IN"
                                                                        )}
                                                                  </td>
                                                            </tr>
                                                      )
                                                )}
                                          </tbody>
                                    </table>
                              </div>
                        </>
                  ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                              No recent transactions
                        </div>
                  )}
            </div>
      );
};

export default RecentTransactions;
