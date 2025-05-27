import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import CreateBudgetModal from "../Modals/BudgetModals/CreateBudgetModal";
import BudgetCard from "./BudgetCard";
import FilterBudgetModal from "../Modals/BudgetModals/FilterBudgetModal ";

const BudgetGrid = ({ budgets }) => {
      const [isCreateBudgetModalOpen, setisCreateBudgetModalOpen] =
            useState(false);
      const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
      const [openMenuId, setOpenMenuId] = useState(null);
      const [filters, setFilters] = useState({
            minAmount: "",
            maxAmount: "",
            startDate: "",
            endDate: "",
            categories: [],
            activeOnly: false,
      });
      const menuRef = useRef(null);

      const allCategories = [
            ...new Set(budgets.map((budget) => budget.category)),
      ];

      const handleMenuToggle = (budgetId) => {
            setOpenMenuId(openMenuId === budgetId ? null : budgetId);
      };

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (
                        menuRef.current &&
                        !menuRef.current.contains(event.target)
                  ) {
                        setOpenMenuId(null);
                  }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, []);

      const filterBudgets = () => {
            return budgets.filter((budget) => {
                  if (
                        filters.minAmount &&
                        budget.total_amount < Number(filters.minAmount)
                  )
                        return false;
                  if (
                        filters.maxAmount &&
                        budget.total_amount > Number(filters.maxAmount)
                  )
                        return false;

                  const budgetStartDate = new Date(budget.start_date);
                  const budgetEndDate = new Date(budget.end_date);

                  if (filters.startDate) {
                        const filterStartDate = new Date(filters.startDate);
                        if (budgetEndDate < filterStartDate) return false;
                  }

                  if (filters.endDate) {
                        const filterEndDate = new Date(filters.endDate);
                        if (budgetStartDate > filterEndDate) return false;
                  }

                  if (
                        filters.categories.length > 0 &&
                        !filters.categories.includes(budget.category)
                  ) {
                        return false;
                  }

                  if (filters.activeOnly) {
                        const today = new Date();
                        if (today < budgetStartDate || today > budgetEndDate) {
                              return false;
                        }
                  }

                  return true;
            });
      };

      const filteredBudgets = filterBudgets();

      return (
            <div className="w-full p-4 sm:p-6 ">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6  ">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                              Budgets
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                              <button
                                    onClick={() => setIsFilterModalOpen(true)}
                                    className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition-colors w-full sm:w-auto"
                              >
                                    <FaFilter className="text-gray-500" />
                                    Filter
                              </button>
                              <button
                                    onClick={() =>
                                          setisCreateBudgetModalOpen(true)
                                    }
                                    className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-sm transition-colors w-full sm:w-auto"
                              >
                                    <FaPlus />
                                    Create Budget
                              </button>
                        </div>
                  </div>

                  <div className="min-h-[100px] flex items-center justify-center">
                        {filteredBudgets.length === 0 ? (
                              <div className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm w-full">
                                    <p className="text-gray-500 mb-2 text-sm sm:text-base">
                                          {budgets
                                                ? "No Budgets"
                                                : "No budgets match your filters"}
                                    </p>
                                    {!budgets && (
                                          <button
                                                onClick={() =>
                                                      setFilters({
                                                            minAmount: "",
                                                            maxAmount: "",
                                                            startDate: "",
                                                            endDate: "",
                                                            categories: [],
                                                            activeOnly: false,
                                                      })
                                                }
                                                className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 font-medium"
                                          >
                                                Clear all filters
                                          </button>
                                    )}
                              </div>
                        ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full">
                                    {filteredBudgets.map((budget) => (
                                          <BudgetCard
                                                key={budget.budget_id}
                                                budget={budget}
                                                isMenuOpen={
                                                      openMenuId ===
                                                      budget.budget_id
                                                }
                                                onMenuToggle={() =>
                                                      handleMenuToggle(
                                                            budget.budget_id
                                                      )
                                                }
                                                menuRef={menuRef}
                                          />
                                    ))}
                              </div>
                        )}
                  </div>

                  <CreateBudgetModal
                        isOpen={isCreateBudgetModalOpen}
                        onClose={() => setisCreateBudgetModalOpen(false)}
                  />
                  <FilterBudgetModal
                        isOpen={isFilterModalOpen}
                        onClose={() => setIsFilterModalOpen(false)}
                        filters={filters}
                        setFilters={setFilters}
                        categories={allCategories}
                  />
            </div>
      );
};

export default BudgetGrid;
