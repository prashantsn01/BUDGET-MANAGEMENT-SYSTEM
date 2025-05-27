import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useTransactionStore } from "../../../store/transactionStore";

const PdfExportModal = ({ showPdfModal, setShowPdfModal, onExport }) => {
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const { userTransactions } = useTransactionStore();

      const handleSubmit = (e) => {
            e.preventDefault();
            onExport(startDate, endDate, userTransactions);
            setShowPdfModal(false);
      };

      const handleExportAll = () => {
            onExport("", "", userTransactions); // Empty dates for all transactions
            setShowPdfModal(false);
      };

      return (
            showPdfModal && (
                  <div className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50 flex items-center justify-center z-50 mx-2">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                              <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">
                                          Export Transactions to PDF
                                    </h3>
                                    <button
                                          onClick={() => setShowPdfModal(false)}
                                          className="text-gray-500 hover:text-gray-700"
                                    >
                                          <FaTimes />
                                    </button>
                              </div>

                              <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Start Date
                                          </label>
                                          <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) =>
                                                      setStartDate(
                                                            e.target.value
                                                      )
                                                }
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                          />
                                    </div>

                                    <div className="mb-6">
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                End Date
                                          </label>
                                          <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) =>
                                                      setEndDate(e.target.value)
                                                }
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                          />
                                    </div>

                                    <div className="flex justify-between gap-3">
                                          <button
                                                type="button"
                                                onClick={handleExportAll}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                          >
                                                Export All
                                          </button>
                                          <div className="flex gap-3">
                                                <button
                                                      type="button"
                                                      onClick={() =>
                                                            setShowPdfModal(
                                                                  false
                                                            )
                                                      }
                                                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                                >
                                                      Cancel
                                                </button>
                                                <button
                                                      type="submit"
                                                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                >
                                                      Export PDF
                                                </button>
                                          </div>
                                    </div>
                              </form>
                        </div>
                  </div>
            )
      );
};

export default PdfExportModal;
