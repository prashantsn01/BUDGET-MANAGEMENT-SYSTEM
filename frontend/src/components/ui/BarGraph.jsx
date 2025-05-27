import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTransactionStore } from "../../store/transactionStore";
import { useAuthStore } from "../../store/authStore";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const transformTransactions = (transactions) => {
  const monthlyData = {};

  monthNames.forEach(month => {
    monthlyData[month] = { name: month, income: 0, expense: 0, net: 0 };
  });

  transactions.forEach(({ transaction_type, amount, transaction_date }) => {
    const month = monthNames[new Date(transaction_date).getMonth()];
    
    if (transaction_type === "Income") {
      monthlyData[month].income += amount;
      monthlyData[month].net += amount;
    } else if (transaction_type === "Expense") {
      monthlyData[month].expense += amount;
      monthlyData[month].net -= amount;
    }
  });

  return Object.values(monthlyData);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <div className="flex items-center mt-1">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm">Income: </span>
          <span className="text-sm font-medium ml-1">₹{payload[0].value.toFixed(2)}</span>
        </div>
        <div className="flex items-center mt-1">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm">Expense: </span>
          <span className="text-sm font-medium ml-1">₹{payload[1].value.toFixed(2)}</span>
        </div>
      </div>
    );
  }
  return null;
};

const BarGraph = () => {
  const { user } = useAuthStore();
  const { fetchUserTransactions, userTransactions } = useTransactionStore();
  const [activeIndex, setActiveIndex] = useState(null);
  const [timeRange, setTimeRange] = useState("12");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const timeRangeOptions = [
    { value: "3", label: "3 Months" },
    { value: "6", label: "6 Months" },
    { value: "12", label: "12 Months" }
  ];

  useEffect(() => {
    fetchUserTransactions(user.user_id);
  }, [user.user_id]);

  const transformedData = transformTransactions(userTransactions);
  const data = transformedData.slice(-parseInt(timeRange));

  const handleBarEnter = (_, index) => setActiveIndex(index);
  const handleBarLeave = () => setActiveIndex(null);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center px-2 pt-2">
        <h3 className="text-md font-semibold text-gray-800">Income vs Expenses</h3>
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
          >
            <span className="text-xs font-medium mr-1">
              {timeRangeOptions.find(opt => opt.value === timeRange)?.label}
            </span>
            <svg
              className="w-3 h-3 text-gray-600"
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

          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
              <div className="py-1 max-h-[7.5rem] overflow-y-auto">
                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTimeRange(option.value);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 text-xs ${
                      timeRange === option.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        {userTransactions?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              barGap={3}
            >
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="income"
                fill="#10B981"
                radius={[3, 3, 0, 0]}
                onMouseEnter={handleBarEnter}
                onMouseLeave={handleBarLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`income-${index}`}
                    fill={activeIndex === index ? "#059669" : "#10B981"}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="expense"
                fill="#EF4444"
                radius={[3, 3, 0, 0]}
                onMouseEnter={handleBarEnter}
                onMouseLeave={handleBarLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`expense-${index}`}
                    fill={activeIndex === index ? "#DC2626" : "#EF4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
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
            <p className="text-gray-500 text-xs">No transaction data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarGraph;