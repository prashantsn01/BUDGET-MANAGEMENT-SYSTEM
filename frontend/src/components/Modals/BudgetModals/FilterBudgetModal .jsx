import React from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

const FilterBudgetModal = ({
      isOpen,
      onClose,
      filters,
      setFilters,
      categories,
}) => {
      if (!isOpen) return null;

      const handleChange = (e) => {
            const { name, value, checked, type } = e.target;
            setFilters((prev) => ({
                  ...prev,
                  [name]: type === "checkbox" ? checked : value,
            }));
      };

      const handleCategoryChange = (category) => {
            setFilters((prev) => ({
                  ...prev,
                  categories: prev.categories.includes(category)
                        ? prev.categories.filter((c) => c !== category)
                        : [...prev.categories, category],
            }));
      };

      const resetFilters = () => {
            setFilters({
                  minAmount: "",
                  maxAmount: "",
                  startDate: "",
                  endDate: "",
                  categories: [],
                  activeOnly: false,
            });
            onClose();
      };

      return (
            <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                              <div className="flex items-center gap-2">
                                    <FaFilter className="text-blue-500 text-lg" />
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                                          Filter Budgets
                                    </h2>
                              </div>
                              <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors text-lg"
                              >
                                    <FaTimes />
                              </button>
                        </div>

                        <div className="space-y-4 md:space-y-5">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                          Amount Range
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                          <input
                                                type="number"
                                                name="minAmount"
                                                value={filters.minAmount}
                                                onChange={handleChange}
                                                placeholder="Minimum"
                                                className="w-full p-2 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          />
                                          <input
                                                type="number"
                                                name="maxAmount"
                                                value={filters.maxAmount}
                                                onChange={handleChange}
                                                placeholder="Maximum"
                                                className="w-full p-2 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          />
                                    </div>
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                          Date Range
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                          <input
                                                type="date"
                                                name="startDate"
                                                value={filters.startDate}
                                                onChange={handleChange}
                                                className="w-full p-2 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          />
                                          <input
                                                type="date"
                                                name="endDate"
                                                value={filters.endDate}
                                                onChange={handleChange}
                                                className="w-full p-2 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                          />
                                    </div>
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                          Categories
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full">
                                          {categories.map((category) => (
                                                <label
                                                      key={category}
                                                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
                                                >
                                                      <input
                                                            type="checkbox"
                                                            checked={filters.categories.includes(
                                                                  category
                                                            )}
                                                            onChange={() =>
                                                                  handleCategoryChange(
                                                                        category
                                                                  )
                                                            }
                                                            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                                      />
                                                      <span className="text-xs md:text-sm text-gray-700">
                                                            {category}
                                                      </span>
                                                </label>
                                          ))}
                                    </div>
                              </div>

                              <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                                    <input
                                          type="checkbox"
                                          name="activeOnly"
                                          checked={filters.activeOnly}
                                          onChange={handleChange}
                                          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-xs md:text-sm text-gray-700">
                                          Show active budgets only
                                    </span>
                              </label>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mt-4 md:mt-6 pt-4 border-t border-gray-100">
                              <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors order-2 sm:order-1"
                              >
                                    Reset Filters
                              </button>
                              <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-xs md:text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors order-1 sm:order-2"
                              >
                                    Apply Filters
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default FilterBudgetModal;
