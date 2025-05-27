import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const FilterModal = ({
      showFilterModal,
      setShowFilterModal,
      filter,
      setFilter,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
}) => {
      const [tempFilter, setTempFilter] = useState(filter);
      const [tempStartDate, setTempStartDate] = useState(startDate);
      const [tempEndDate, setTempEndDate] = useState(endDate);

      const applyFilters = () => {
            setFilter(tempFilter);
            setStartDate(tempStartDate);
            setEndDate(tempEndDate);
            setShowFilterModal(false);
      };

      const resetFilters = () => {
            setTempFilter("All");
            setTempStartDate("");
            setTempEndDate("");
            setFilter("All");
            setStartDate("");
            setEndDate("");
            setShowFilterModal(false);
      };

      return (
            showFilterModal && (
                  <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                              <h3 className="text-lg font-medium mb-4">
                                    Filter Transactions
                              </h3>

                              <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Transaction Type
                                    </label>
                                    <select
                                          value={tempFilter}
                                          onChange={(e) =>
                                                setTempFilter(e.target.value)
                                          }
                                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                          <option value="All">
                                                All Transactions
                                          </option>
                                          <option value="Income">Income</option>
                                          <option value="Expense">
                                                Expense
                                          </option>
                                    </select>
                              </div>

                              <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Date Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                          <div>
                                                <label className="block text-xs text-gray-500 mb-1">
                                                      From
                                                </label>
                                                <input
                                                      type="date"
                                                      value={tempStartDate}
                                                      onChange={(e) =>
                                                            setTempStartDate(
                                                                  e.target.value
                                                            )
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-xs text-gray-500 mb-1">
                                                      To
                                                </label>
                                                <input
                                                      type="date"
                                                      value={tempEndDate}
                                                      onChange={(e) =>
                                                            setTempEndDate(
                                                                  e.target.value
                                                            )
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                          </div>
                                    </div>
                              </div>

                              <div className="flex justify-end gap-3 mt-6">
                                    <button
                                          onClick={resetFilters}
                                          className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                          Reset
                                    </button>
                                    <button
                                          onClick={applyFilters}
                                          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                          Apply Filters
                                    </button>
                              </div>
                        </div>
                  </div>
            )
      );
};

export default FilterModal;
