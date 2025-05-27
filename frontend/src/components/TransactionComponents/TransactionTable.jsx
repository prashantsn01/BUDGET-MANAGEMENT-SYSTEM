import React, { useState, useEffect, useRef } from "react";
import {
      FaEdit,
      FaTrash,
      FaSearch,
      FaFilter,
      FaFilePdf,
      FaCamera,
} from "react-icons/fa";
import FilterModal from "../Modals/TransactionModals/FilterModal";
import EditTransactionModal from "../Modals/TransactionModals/EditTransactionModal";
import DeleteTransactionModal from "../Modals/TransactionModals/DeleteTransactionModal";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PdfExportModal from "../Modals/TransactionModals/PdfExportModal";
import { useBudgetStore } from "../../store/budgetStore";
import ScanReceiptModal from "../Modals/TransactionModals/ScanReceiptModal";

const TransactionTable = ({ transactions, userId, budgetId }) => {
      const [searchTerm, setSearchTerm] = useState("");
      const [filter, setFilter] = useState("All");
      const [menuOpen, setMenuOpen] = useState(null);
      const [scanModalOpen, setScanModalOpen] = useState(false);
      const [showFilterModal, setShowFilterModal] = useState(false);
      const [showPdfModal, setShowPdfModal] = useState(false);
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const actionMenuRefs = useRef({});
      const location = useLocation();

      const { budgets, categories } = useBudgetStore();
      const budget = budgets.find((budget) => budget.budget_id === budgetId);

      // Close menu when clicking outside
      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (menuOpen) {
                        const menuElement = actionMenuRefs.current[menuOpen];
                        if (
                              menuElement &&
                              !menuElement.contains(event.target)
                        ) {
                              const actionButton = document.querySelector(
                                    `button[data-transaction="${menuOpen}"]`
                              );
                              if (
                                    !actionButton ||
                                    !actionButton.contains(event.target)
                              ) {
                                    setMenuOpen(null);
                              }
                        }
                  }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                  document.removeEventListener("mousedown", handleClickOutside);
      }, [menuOpen]);

      // Persistent color assignments using a memoized map
      const getCategoryColor = (() => {
            const colorPalette = [
                  "bg-blue-100 text-blue-800",
                  "bg-indigo-100 text-indigo-800",
                  "bg-purple-100 text-purple-800",
                  "bg-red-100 text-red-800",
                  "bg-cyan-100 text-cyan-800",
                  "bg-green-100 text-green-800",
                  "bg-amber-100 text-amber-800",
                  "bg-pink-100 text-pink-800",
                  "bg-emerald-100 text-emerald-800",
                  "bg-violet-100 text-violet-800",
            ];

            const assignedColors = new Map(); // Tracks category-color assignments

            return (category) => {
                  if (!category) return "bg-gray-100 text-gray-800";

                  // If we already have a color for this category, return it
                  if (assignedColors.has(category)) {
                        return assignedColors.get(category);
                  }

                  // Find first unused color from palette
                  const usedColors = new Set(assignedColors.values());
                  let availableColor = colorPalette.find(
                        (color) => !usedColors.has(color)
                  );

                  // If all colors are used, start recycling from beginning
                  if (!availableColor) {
                        availableColor =
                              colorPalette[
                                    assignedColors.size % colorPalette.length
                              ];
                  }

                  assignedColors.set(category, availableColor);
                  return availableColor;
            };
      })();

      const filteredTransactions = transactions.filter(
            (transaction) =>
                  (filter === "All" ||
                        transaction.transaction_type === filter) &&
                  transaction.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                  (startDate === "" ||
                        new Date(transaction.transaction_date) >=
                              new Date(startDate)) &&
                  (endDate === "" ||
                        new Date(transaction.transaction_date) <=
                              new Date(endDate))
      );

      const [editingTransaction, setEditingTransaction] = useState(null);
      const [deletingTransactionId, setDeletingTransactionId] = useState(null);

      const handleEdit = (transaction) => {
            setEditingTransaction(transaction);
            setMenuOpen(null);
      };

      const handleDelete = (transactionId) => {
            setDeletingTransactionId(transactionId);
            setMenuOpen(null);
      };

      const handlePdfExport = (pdfStartDate, pdfEndDate, transactions) => {
            if (!transactions || transactions.length === 0) {
                  alert("No transactions available.");
                  return;
            }

            // Convert string dates to Date objects (empty strings will result in null)
            const startDate = pdfStartDate
                  ? new Date(pdfStartDate + "T00:00:00")
                  : null;
            const endDate = pdfEndDate
                  ? new Date(pdfEndDate + "T23:59:59")
                  : null;

            // Filter transactions if dates are provided
            const transactionsToExport =
                  startDate || endDate
                        ? transactions.filter((transaction) => {
                                const transactionDate = new Date(
                                      transaction.transaction_date
                                );
                                return (
                                      (!startDate ||
                                            transactionDate >= startDate) &&
                                      (!endDate || transactionDate <= endDate)
                                );
                          })
                        : transactions; // Use all transactions if no dates provided

            if (transactionsToExport.length === 0) {
                  alert("No transactions found for the selected date range.");
                  return;
            }

            // Calculate totals
            const totalIncome = transactionsToExport
                  .filter((t) => t.transaction_type === "Income")
                  .reduce((sum, t) => sum + t.amount, 0);

            const totalExpenses = transactionsToExport
                  .filter((t) => t.transaction_type === "Expense")
                  .reduce((sum, t) => sum + t.amount, 0);

            const netBalance = totalIncome - totalExpenses;

            // Create PDF
            const doc = new jsPDF();

            // Header
            doc.setFillColor(41, 128, 185);
            doc.rect(0, 0, doc.internal.pageSize.getWidth(), 15, "F");
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            location.pathname === "/allTransactions"
                  ? doc.text("All Transactions Report", 105, 10, {
                          align: "center",
                    })
                  : doc.text(`${budget.budget_name}'s Report`, 105, 10, {
                          align: "center",
                    });

            // Date range
            if (pdfStartDate || pdfEndDate) {
                  doc.setFontSize(10);
                  doc.setTextColor(100);
                  let dateRangeText = "All Transactions";
                  if (pdfStartDate && pdfEndDate) {
                        dateRangeText = `From ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
                  } else if (pdfStartDate) {
                        dateRangeText = `From ${startDate.toLocaleDateString()}`;
                  } else if (pdfEndDate) {
                        dateRangeText = `Up to ${endDate.toLocaleDateString()}`;
                  }
                  doc.text(dateRangeText, 14, 25);
            }

            // Prepare table data with budget name
            const tableData = transactionsToExport.map((transaction) => {
                  const budgetName =
                        budgets.find(
                              (b) => b.budget_id === transaction.budget_id
                        )?.budget_name || "N/A";
                  return [
                        new Date(
                              transaction.transaction_date
                        ).toLocaleDateString(),
                        transaction.description || "N/A",
                        transaction.category || "N/A",
                        budgetName,
                        transaction.transaction_type === "Income"
                              ? "Credit"
                              : "Debit",
                        `Rs. ${transaction.amount.toLocaleString("en-IN")}`,
                  ];
            });

            // Add table (centered)
            autoTable(doc, {
                  head: [
                        [
                              "Date",
                              "Description",
                              "Category",
                              "Budget",
                              "Type",
                              "Amount",
                        ],
                  ],
                  body: tableData,
                  startY: pdfStartDate || pdfEndDate ? 30 : 25,
                  margin: { horizontal: "auto" }, // This centers the table
                  theme: "grid",
                  styles: {
                        fontSize: 9,
                        cellPadding: 3,
                        halign: "left",
                        valign: "middle",
                        textColor: [60, 60, 60],
                        lineColor: [220, 220, 220],
                        lineWidth: 0.2,
                  },
                  headStyles: {
                        fillColor: [41, 128, 185],
                        textColor: [255, 255, 255],
                        fontStyle: "bold",
                        fontSize: 10,
                        cellPadding: 5,
                        halign: "center",
                        lineWidth: 0.3,
                  },
                  columnStyles: {
                        0: { cellWidth: "auto", halign: "left" }, // Date
                        1: { cellWidth: "auto", halign: "left" }, // Description
                        2: { cellWidth: "auto", halign: "center" }, // Category
                        3: { cellWidth: "auto", halign: "center" }, // Budget
                        4: { cellWidth: "auto", halign: "center" }, // Type
                        5: { cellWidth: "auto", halign: "left" }, // Amount
                  },
                  alternateRowStyles: {
                        fillColor: [248, 248, 248],
                  },
                  tableWidth: "wrap",
            });

            // Get the final Y position after the table
            const finalY = doc.lastAutoTable.finalY;

            // Add description below the table
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text(
                  `Total Expenses: Rs. ${totalExpenses.toLocaleString(
                        "en-IN"
                  )}`,
                  14,
                  finalY + 15
            );
            doc.text(
                  `Total Income: Rs. ${totalIncome.toLocaleString("en-IN")}`,
                  14,
                  finalY + 25
            );

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Transaction Summary:`, 14, finalY + 35);
            doc.text(
                  `Total Records: ${transactionsToExport.length}`,
                  14,
                  finalY + 40
            );
            doc.text(
                  `Net Balance: Rs. ${netBalance.toLocaleString("en-IN")}`,
                  14,
                  finalY + 45
            );

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                  `Generated on ${new Date().toLocaleString()}`,
                  doc.internal.pageSize.getWidth() - 15,
                  doc.internal.pageSize.getHeight() - 5,
                  { align: "right" }
            );

            // Save the PDF
            doc.save(
                  `transactions_${new Date().toISOString().slice(0, 10)}.pdf`
            );
      };

      return (
            <div className="p-4 sm:p-6 w-full mx-auto bg-white rounded-lg shadow-sm">
                  <FilterModal
                        showFilterModal={showFilterModal}
                        setShowFilterModal={setShowFilterModal}
                        filter={filter}
                        setFilter={setFilter}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                  />

                  <PdfExportModal
                        showPdfModal={showPdfModal}
                        setShowPdfModal={setShowPdfModal}
                        onExport={handlePdfExport}
                  />
                  <ScanReceiptModal
                        isOpen={scanModalOpen}
                        onClose={() => setScanModalOpen(false)}
                        userId={userId}
                        budgetId={budgetId}
                        categories={categories}
                  />

                  {/* Search and Filter Bar - Mobile Optimized */}
                  <div
                        className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-3"
                        disabled={transactions.length === 0 ? true : false}
                  >
                        <div className="relative flex-grow">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSearch className="text-gray-400 text-sm sm:text-base" />
                              </div>
                              <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                          setSearchTerm(e.target.value)
                                    }
                                    disabled={
                                          transactions.length === 0
                                                ? true
                                                : false
                                    }
                                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                        </div>
                        <div className="flex gap-3">
                              {location.pathname !== "/allTransactions" && (
                                    <button
                                          onClick={() => setScanModalOpen(true)}
                                          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base"
                                    >
                                          <FaCamera className="text-blue-500" />
                                          <span>Scan Receipt</span>
                                    </button>
                              )}
                        </div>
                        <div className="flex gap-3">
                              <button
                                    onClick={() => setShowPdfModal(true)}
                                    disabled={
                                          transactions.length === 0
                                                ? true
                                                : false
                                    }
                                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base"
                              >
                                    <FaFilePdf className="text-red-500" />
                                    <span>Export PDF</span>
                              </button>

                              <button
                                    onClick={() => setShowFilterModal(true)}
                                    disabled={
                                          transactions.length === 0
                                                ? true
                                                : false
                                    }
                                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base"
                              >
                                    <FaFilter className="text-gray-500" />
                                    <span>Filters</span>
                                    {(filter !== "All" ||
                                          startDate ||
                                          endDate) && (
                                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                                {[
                                                      filter !== "All" ? 1 : 0,
                                                      startDate ? 1 : 0,
                                                      endDate ? 1 : 0,
                                                ].reduce((a, b) => a + b, 0)}
                                          </span>
                                    )}
                              </button>
                        </div>
                  </div>

                  {/* Rest of the component remains the same */}
                  {/* Transactions Table - Mobile Responsive */}
                  <div className="overflow-x-auto">
                        {filteredTransactions.length > 0 ? (
                              <>
                                    {/* Mobile Cards View */}
                                    <div className="sm:hidden space-y-3">
                                          {filteredTransactions.map(
                                                (transaction) => (
                                                      <div
                                                            key={
                                                                  transaction.transaction_id
                                                            }
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
                                                            <div className="flex justify-between items-center mt-2">
                                                                  <span
                                                                        className={`${getCategoryColor(
                                                                              transaction.category
                                                                        )} px-2 py-1 rounded-full text-xs font-medium`}
                                                                  >
                                                                        {
                                                                              transaction.category
                                                                        }
                                                                  </span>
                                                                  <div className="relative">
                                                                        <button
                                                                              data-transaction={
                                                                                    transaction.transaction_id
                                                                              }
                                                                              onClick={() =>
                                                                                    setMenuOpen(
                                                                                          menuOpen ===
                                                                                                transaction.transaction_id
                                                                                                ? null
                                                                                                : transaction.transaction_id
                                                                                    )
                                                                              }
                                                                              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                                                        >
                                                                              <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    className="h-5 w-5"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="currentColor"
                                                                              >
                                                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                              </svg>
                                                                        </button>
                                                                        {menuOpen ===
                                                                              transaction.transaction_id && (
                                                                              <div
                                                                                    ref={(
                                                                                          el
                                                                                    ) =>
                                                                                          (actionMenuRefs.current[
                                                                                                transaction.transaction_id
                                                                                          ] =
                                                                                                el)
                                                                                    }
                                                                                    className="absolute right-0 top-8 mt-1 w-32 bg-white rounded-md shadow-lg z-20 border border-gray-200 py-1"
                                                                              >
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleEdit(
                                                                                                      transaction
                                                                                                )
                                                                                          }
                                                                                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                                                    >
                                                                                          <FaEdit className="text-blue-500 text-sm" />
                                                                                          Edit
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleDelete(
                                                                                                      transaction.transaction_id
                                                                                                )
                                                                                          }
                                                                                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                                                    >
                                                                                          <FaTrash className="text-red-500 text-sm" />
                                                                                          Delete
                                                                                    </button>
                                                                              </div>
                                                                        )}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                )
                                          )}
                                    </div>

                                    {/* Desktop Table View */}
                                    <table className="hidden sm:table w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                                          <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                      <th className="p-3 sm:p-4 text-left text-gray-600 font-medium text-sm sm:text-base">
                                                            Date
                                                      </th>
                                                      <th className="p-3 sm:p-4 text-left text-gray-600 font-medium text-sm sm:text-base">
                                                            Description
                                                      </th>
                                                      <th className="p-3 sm:p-4 text-left text-gray-600 font-medium text-sm sm:text-base">
                                                            Category
                                                      </th>
                                                      <th className="p-3 sm:p-4 text-left text-gray-600 font-medium text-sm sm:text-base">
                                                            Amount
                                                      </th>
                                                      {location.pathname !==
                                                            "/allTransactions" && (
                                                            <th className="p-3 sm:p-4 text-left text-gray-600 font-medium text-sm sm:text-base">
                                                                  Actions
                                                            </th>
                                                      )}
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {filteredTransactions.map(
                                                      (transaction) => (
                                                            <tr
                                                                  key={
                                                                        transaction.transaction_id
                                                                  }
                                                                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                                            >
                                                                  <td className="p-3 sm:p-4 text-gray-700 text-sm sm:text-base">
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
                                                                  <td className="p-3 sm:p-4 text-gray-700 text-sm sm:text-base">
                                                                        {
                                                                              transaction.description
                                                                        }
                                                                  </td>
                                                                  <td className="p-3 sm:p-4">
                                                                        <span
                                                                              className={`${getCategoryColor(
                                                                                    transaction.category
                                                                              )} px-2 sm:px-3 py-1 rounded-full text-xs font-medium`}
                                                                        >
                                                                              {
                                                                                    transaction.category
                                                                              }
                                                                        </span>
                                                                  </td>
                                                                  <td
                                                                        className={`p-3 sm:p-4 font-medium text-sm sm:text-base ${
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
                                                                  {location.pathname !==
                                                                        "/allTransactions" && (
                                                                        <td className="p-3 sm:p-4 relative">
                                                                              <button
                                                                                    data-transaction={
                                                                                          transaction.transaction_id
                                                                                    }
                                                                                    onClick={() =>
                                                                                          setMenuOpen(
                                                                                                menuOpen ===
                                                                                                      transaction.transaction_id
                                                                                                      ? null
                                                                                                      : transaction.transaction_id
                                                                                          )
                                                                                    }
                                                                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                                                              >
                                                                                    <svg
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          className="h-5 w-5"
                                                                                          viewBox="0 0 20 20"
                                                                                          fill="currentColor"
                                                                                    >
                                                                                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                                    </svg>
                                                                              </button>
                                                                              {menuOpen ===
                                                                                    transaction.transaction_id && (
                                                                                    <div
                                                                                          ref={(
                                                                                                el
                                                                                          ) =>
                                                                                                (actionMenuRefs.current[
                                                                                                      transaction.transaction_id
                                                                                                ] =
                                                                                                      el)
                                                                                          }
                                                                                          className="absolute right-0 sm:left-[-150px] top-8 sm:top-[-30px] mt-1 w-32 sm:w-40 bg-white rounded-md shadow-lg z-20 border border-gray-200 py-1"
                                                                                    >
                                                                                          <button
                                                                                                onClick={() =>
                                                                                                      handleEdit(
                                                                                                            transaction
                                                                                                      )
                                                                                                }
                                                                                                className="flex items-center gap-2 w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                                                          >
                                                                                                <FaEdit className="text-blue-500" />
                                                                                                Edit
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() =>
                                                                                                      handleDelete(
                                                                                                            transaction.transaction_id
                                                                                                      )
                                                                                                }
                                                                                                className="flex items-center gap-2 w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                                                          >
                                                                                                <FaTrash className="text-red-500" />
                                                                                                Delete
                                                                                          </button>
                                                                                    </div>
                                                                              )}
                                                                        </td>
                                                                  )}
                                                            </tr>
                                                      )
                                                )}
                                          </tbody>
                                    </table>
                              </>
                        ) : (
                              <div className="p-4 text-center text-gray-500 text-sm sm:text-base">
                                    {filteredTransactions.length === 0 &&
                                    transactions.length > 0
                                          ? "No transactions found matching your criteria."
                                          : "No transactions available."}
                              </div>
                        )}
                  </div>

                  {/* Modals */}
                  <EditTransactionModal
                        isOpen={!!editingTransaction}
                        onClose={() => setEditingTransaction(null)}
                        transaction={editingTransaction}
                        userId={userId}
                        budgetId={budgetId}
                  />
                  <DeleteTransactionModal
                        isOpen={!!deletingTransactionId}
                        onClose={() => setDeletingTransactionId(null)}
                        transactionId={deletingTransactionId}
                        userId={userId}
                        budgetId={budgetId}
                  />
            </div>
      );
};

export default TransactionTable;
