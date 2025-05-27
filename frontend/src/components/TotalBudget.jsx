import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

const getProgressColor = (percentage) => {
      if (percentage < 0) return "bg-transparent";
      if (percentage < 25) return "bg-blue-500";
      if (percentage < 50) return "bg-green-500";
      if (percentage < 75) return "bg-orange-500";
      if (percentage < 100) return "bg-red-500";
      return "bg-red-900";
};

const getBudgetSuggestion = (percentage) => {
      if (percentage < 0) return "Income is more than expenditure!";
      if (percentage === 0) return "You're not using your budget yet.";
      if (percentage < 25) return "You're well within your budget!";
      if (percentage < 50) return "You're managing your budget efficiently.";
      if (percentage < 75) return "You're getting closer to your budget limit.";
      if (percentage < 100) return "Warning: You're nearing your budget cap.";
      if (percentage === 100) return "You've reached your budget limit.";
      return "Alert: You've exceeded your budget!";
};

const getSuggestionColor = (percentage) => {
      if (percentage < 0) return "text-gray-400";
      if (percentage === 0) return "text-gray-900";
      if (percentage < 25) return "text-green-500";
      if (percentage < 50) return "text-blue-500";
      if (percentage < 75) return "text-yellow-500";
      if (percentage < 100) return "text-orange-500";
      return "text-red-600";
};

const TotalBudget = ({ budgets }) => {
      const totalAmount = budgets.reduce(
            (sum, budget) => sum + budget.total_amount,
            0
      );
      const totalSpent = budgets.reduce(
            (sum, budget) => sum + budget.spent_amount,
            0
      );
      const percentage =
            totalAmount === 0 || totalSpent === 0
                  ? 0
                  : Math.floor((totalSpent / totalAmount) * 100);

      return (
            <Card className="p-4 rounded-2xl shadow-lg flex items-center gap-4 ">
                  <div className="flex-1">
                        <div className="flex-1 flex items-center justify-between">
                              <h3 className="text-lg font-semibold">
                                    Total Budget
                              </h3>
                        </div>
                        <div className="relative w-full mt-2">
                              <Progress
                                    value={percentage}
                                    className={`${getProgressColor(
                                          percentage
                                    )} h-2 rounded-full`}
                              />
                        </div>
                        <div className="flex justify-between w-full mt-1">
                              <p className="text-sm text-gray-900 mx-2">
                                    {totalSpent}/{totalAmount}
                              </p>
                              <p className="text-sm text-gray-400 mx-2">
                                    {percentage >= 0 ? percentage : 0}% used
                              </p>
                        </div>

                        <p
                              className={`text-sm font-medium mt-1 ${getSuggestionColor(
                                    percentage
                              )}`}
                        >
                              {budgets.length === 0
                                    ? "No Budgets!"
                                    : ` ${getBudgetSuggestion(percentage)}`}
                        </p>
                        {totalSpent < 0 && (
                              <p
                                    className={`text-sm font-medium mt-1 ${getSuggestionColor(
                                          percentage
                                    )}`}
                              >
                                    {`You have extra ${ totalSpent * -1} in your budget.`}
                              </p>
                        )}
                        {totalSpent > totalAmount&& (
                              <p
                                    className={`text-sm font-medium mt-1 ${getSuggestionColor(
                                          percentage
                                    )}`}
                              >
                                    {`You Spent extra ${
                                          totalSpent - totalAmount
                                    } from your budget.`}
                              </p>
                        )}
                  </div>
            </Card>
      );
};

export default TotalBudget;
