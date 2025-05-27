import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactionStore } from "../../store/transactionStore";

const SpendingPieChart = () => {
      const { userTransactions } = useTransactionStore();
      const [selectedMonth, setSelectedMonth] = useState("overall");
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const filteredTransactions = useMemo(() => {
            if (selectedMonth === "overall") {
                  return userTransactions || [];
            }
            const monthNum = Number(selectedMonth);
            return (
                  userTransactions?.filter((transaction) => {
                        const transactionMonth =
                              new Date(
                                    transaction.transaction_date
                              ).getMonth() + 1;
                        return transactionMonth === monthNum;
                  }) || []
            );
      }, [userTransactions, selectedMonth]);

      const categoryMap = useMemo(() => {
            return filteredTransactions.reduce((acc, transaction) => {
                  acc[transaction.category] =
                        (acc[transaction.category] || 0) + transaction.amount;
                  return acc;
            }, {});
      }, [filteredTransactions]);

      const data = useMemo(
            () =>
                  Object.entries(categoryMap)
                        .map(([name, amount]) => ({ name, amount }))
                        .sort((a, b) => b.amount - a.amount),
            [categoryMap]
      );

      const COLORS = [
            "#0088FE",
            "#00C49F",
            "#FFBB28",
            "#FF8042",
            "#A28DFF",
            "#FF6B6B",
            "#4ECDC4",
            "#FF9F1C",
            "#7BED9F",
            "#6A5ACD",
            "#FFA07A",
            "#20B2AA",
      ];

      const renderCustomLabel = ({
            name,
            percent,
            cx,
            cy,
            midAngle,
            outerRadius,
            fill,
      }) => {
            const RADIAN = Math.PI / 180;
            const radius = outerRadius + 15;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                  <text
                        x={x > cx ? x + 5 : x - 5}
                        y={y}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        fill={fill}
                        fontSize={10}
                        fontWeight="500"
                  >
                        {name.length > 10 ? `${name.substring(0, 8)}...` : name}
                        <tspan
                              x={x > cx ? x + 5 : x - 5}
                              dy="1.2em"
                              fontSize={8}
                              fill="#666"
                        >
                              {(percent * 100).toFixed(1)}%
                        </tspan>
                  </text>
            );
      };

      return (
            <div className="w-full h-full flex flex-col">
                  {/* Floating Month Selector Button */}
                  <div className="flex justify-between items-center m-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                              Spending by Category
                        </h3>
                        <div className="relative">
                              <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
                              >
                                    <span className="text-xs sm:text-sm font-medium mr-1">
                                          {selectedMonth === "overall"
                                                ? "Overall"
                                                : new Date(
                                                        0,
                                                        selectedMonth - 1
                                                  ).toLocaleString("default", {
                                                        month: "short",
                                                  })}
                                    </span>
                                    <svg
                                          className="w-4 h-4 text-gray-600"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                          />
                                    </svg>
                              </button>

                              {/* Scrollable Popup Menu */}
                              {isMenuOpen && (
                                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
                                          <div className="py-1 max-h-[7.5rem] overflow-y-auto">
                                                <button
                                                      onClick={() => {
                                                            setSelectedMonth(
                                                                  "overall"
                                                            );
                                                            setIsMenuOpen(
                                                                  false
                                                            );
                                                      }}
                                                      className={`block w-full text-left px-4 py-2 text-sm ${
                                                            selectedMonth ===
                                                            "overall"
                                                                  ? "bg-blue-50 text-blue-600"
                                                                  : "text-gray-700 hover:bg-gray-100"
                                                      }`}
                                                >
                                                      Overall Summary
                                                </button>
                                                {Array.from(
                                                      { length: 12 },
                                                      (_, i) => (
                                                            <button
                                                                  key={i + 1}
                                                                  onClick={() => {
                                                                        setSelectedMonth(
                                                                              String(
                                                                                    i +
                                                                                          1
                                                                              )
                                                                        );
                                                                        setIsMenuOpen(
                                                                              false
                                                                        );
                                                                  }}
                                                                  className={`block w-full text-left px-4 py-2 text-sm ${
                                                                        selectedMonth ===
                                                                        String(
                                                                              i +
                                                                                    1
                                                                        )
                                                                              ? "bg-blue-50 text-blue-600"
                                                                              : "text-gray-700 hover:bg-gray-100"
                                                                  }`}
                                                            >
                                                                  {new Date(
                                                                        0,
                                                                        i
                                                                  ).toLocaleString(
                                                                        "default",
                                                                        {
                                                                              month: "short",
                                                                        }
                                                                  )}
                                                            </button>
                                                      )
                                                )}
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* Chart Container - Takes full available space */}
                  <div className="w-full h-full">
                        {data.length === 0 ? (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
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
                                    <p className="text-xs sm:text-sm text-center">
                                          {selectedMonth === "overall"
                                                ? "No transactions to display"
                                                : `No data for ${new Date(
                                                        0,
                                                        selectedMonth - 1
                                                  ).toLocaleString("default", {
                                                        month: "long",
                                                  })}`}
                                    </p>
                              </div>
                        ) : (
                              <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                          <Pie
                                                data={data}
                                                dataKey="amount"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={70}
                                                paddingAngle={2}
                                                label={renderCustomLabel}
                                                labelLine={false}
                                          >
                                                {data.map((entry, index) => (
                                                      <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                  COLORS[
                                                                        index %
                                                                              COLORS.length
                                                                  ]
                                                            }
                                                      />
                                                ))}
                                          </Pie>
                                          <Tooltip
                                                formatter={(value) => [
                                                      `$${value.toFixed(2)}`,
                                                      "Amount",
                                                ]}
                                          />
                                    </PieChart>
                              </ResponsiveContainer>
                        )}
                  </div>
            </div>
      );
};

export default SpendingPieChart;
