import EditBudgetModal from "../Modals/BudgetModals/EditBudgetModal";
import DeleteBudgetModal from "../Modals/BudgetModals/DeleteBudgetModal";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import {
      FaPiggyBank,
      FaPlane,
      FaHeartbeat,
      FaGraduationCap,
      FaBriefcase,
      FaHome,
      FaGift,
      FaDumbbell,
      FaEllipsisV,
      FaEdit,
      FaTrash,
      FaExternalLinkAlt,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categoryIcons = {
      Savings: <FaPiggyBank className="text-blue-500" />,
      Travel: <FaPlane className="text-orange-500" />,
      Emergency: <FaHeartbeat className="text-red-500" />,
      Health: <FaDumbbell className="text-green-500" />,
      Education: <FaGraduationCap className="text-purple-500" />,
      Business: <FaBriefcase className="text-gray-500" />,
      Personal: <FaHome className="text-yellow-500" />,
};

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

const BudgetCard = ({ budget, isMenuOpen, onMenuToggle, menuRef }) => {
      const usedAmount = budget.spent_amount;
      const percentage = Math.floor((usedAmount / budget.total_amount) * 100);
      const [isEditBudgetModalOpen, setIsEditBudgetModalOpen] = useState(false);
      const [isDeleteBudgetModalOpen, setIsDeleteBudgetModalOpen] =
            useState(false);
      const navigate = useNavigate();

      const handleCardClick = (e) => {
            onMenuToggle();
            navigate(`/transaction/${budget.budget_id}`);
      };

      return (
            <Card className="p-4 rounded-2xl shadow-lg flex items-center gap-4 ">
                  <div className="text-3xl">
                        {categoryIcons[budget.category] || (
                              <FaGift className="text-gray-400" />
                        )}
                  </div>
                  <div className="flex-1">
                        <div className="flex-1 flex items-center justify-between">
                              <h3 className="text-lg font-semibold">
                                    {budget.budget_name}
                              </h3>
                              <div className="relative">
                                    <button
                                          onClick={(e) => {
                                                onMenuToggle();
                                          }}
                                          className="text-gray-500 hover:text-gray-700 z-10 cursor-pointer "
                                    >
                                          <FaEllipsisV />
                                    </button>
                                    {isMenuOpen && (
                                          <div
                                                className="absolute right-4 top-6 bg-gray-100 shadow-md rounded-md p-1 z-10"
                                                ref={menuRef}
                                          >
                                                <button
                                                      className="flex items-center gap-2 text-sm hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                                                      onClick={(e) => {
                                                            handleCardClick();
                                                      }}
                                                >
                                                      <FaExternalLinkAlt /> Open
                                                </button>
                                                <button
                                                      className="flex items-center gap-2 text-sm hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                                                      onClick={(e) => {
                                                            setIsEditBudgetModalOpen(
                                                                  true
                                                            );
                                                      }}
                                                >
                                                      <FaEdit /> Edit
                                                </button>
                                                <button
                                                      className="flex items-center gap-2 text-sm hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                                                      onClick={(e) => {
                                                            setIsDeleteBudgetModalOpen(
                                                                  true
                                                            );
                                                      }}
                                                >
                                                      <FaTrash /> Delete
                                                </button>
                                          </div>
                                    )}
                                    <EditBudgetModal
                                          budget={budget}
                                          isOpen={isEditBudgetModalOpen}
                                          onClose={(e) => {
                                                setIsEditBudgetModalOpen(false);
                                          }}
                                    />
                                    <DeleteBudgetModal
                                          isOpen={isDeleteBudgetModalOpen}
                                          onClose={(e) => {
                                                setIsDeleteBudgetModalOpen(
                                                      false
                                                );
                                          }}
                                          budgetId={budget.budget_id}
                                    />
                              </div>
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
                                    {usedAmount}/{budget.total_amount}
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
                              {getBudgetSuggestion(percentage)}
                        </p>
                        {usedAmount < 0 && (
                              <p
                                    className={`text-sm font-medium mt-1 ${getSuggestionColor(
                                          percentage
                                    )}`}
                              >
                                    {`You have extra ${
                                          usedAmount * -1
                                    } in your budget.`}
                              </p>
                        )}
                        {usedAmount > budget.total_amount && (
                              <p
                                    className={`text-sm font-medium mt-1 ${getSuggestionColor(
                                          percentage
                                    )}`}
                              >
                                    {`You Spent extra ${
                                          usedAmount - budget.total_amount
                                    } from your budget.`}
                              </p>
                        )}
                        
                  </div>
            </Card>
      );
};

export default BudgetCard;
