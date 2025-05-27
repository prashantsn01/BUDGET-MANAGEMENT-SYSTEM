// import React, { useState } from "react";
// import { FiUpload, FiX, FiCheck, FiCalendar, FiFileText } from "react-icons/fi";
// import { BiRupee } from "react-icons/bi";
// import { useTransactionStore } from "../../../store/transactionStore";
// import { useBudgetStore } from "../../../store/budgetStore";

// const ScanReceiptModal = ({
//       isOpen,
//       onClose,
//       budgetId,
//       userId,
//       categories,
// }) => {
//       const { scanReceipt, createTransaction, isLoading } =
//             useTransactionStore();
//       const { budgets } = useBudgetStore();
//       const budget = budgets.find((budget) => budget.budget_id === budgetId);
//       const [file, setFile] = useState(null);
//       const [form, setForm] = useState({
//             amount: "",
//             date: "",
//             description: "",
//       });
//       const [scanning, setScanning] = useState(false);

//       const handleFileChange = (e) => {
//             if (e.target.files && e.target.files[0]) {
//                   setFile(e.target.files[0]);
//             }
//       };

//       const handleInputChange = (e) => {
//             setForm({ ...form, [e.target.name]: e.target.value });
//       };

//       const handleScan = async () => {
//             if (!file) {
//                   alert("Please upload a receipt image");
//                   return;
//             }

//             setScanning(true);
//             try {
//                   const scannedData = await scanReceipt(
//                         file,
//                         userId,
//                         budgetId,
//                         categories
//                   );
//                   if (scannedData.transaction) {
//                         setForm({
//                               amount: Math.floor(
//                                     scannedData.transaction.amount ?? 0
//                               ),
//                               date: scannedData.transaction.transaction_date.split(
//                                     "T"
//                               )[0],
//                               description:
//                                     scannedData.transaction.description ?? "",
//                         });
//                   } else {
//                         alert(
//                               "Could not scan a valid receipt. Please check the image and try again."
//                         );
//                   }
//             } catch (error) {
//                   console.error("Scan error:", error);
//                   alert("Error scanning receipt. Please try again.");
//             } finally {
//                   setScanning(false);
//             }
//       };

//       const handleCreate = async () => {
//             if (!form.amount || !form.date) {
//                   alert("Please fill in all required fields");
//                   return;
//             }

//             try {
//                   await createTransaction(userId, budgetId, {
//                         ...form,
//                         transaction_type: "Expense",
//                         transaction_date: form.date,
//                         category: budget.category,
//                   });
//                   onClose();

//                   setForm({
//                         amount: "",
//                         date: "",
//                         description: "",
//                   });
//                   setFile(null);
//             } catch (error) {
//                   console.error("Create error:", error);
//             }
//       };

//       if (!isOpen) return null;

//       return (
//             <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-start md:items-center z-50 p-4 overflow-y-auto">
//                   <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto my-4 md:my-0 overflow-hidden">
//                         {/* Header */}
//                         <div className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-10">
//                               <h2 className="text-lg md:text-xl font-semibold">
//                                     Scan Receipt
//                               </h2>
//                               <button
//                                     onClick={onClose}
//                                     className="text-white hover:text-gray-300"
//                                     aria-label="Close modal"
//                               >
//                                     <FiX size={24} />
//                               </button>
//                         </div>

//                         {/* Body */}
//                         <div className="p-4 md:p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
//                               {/* File Upload */}
//                               <div className="space-y-2">
//                                     <label className="block text-sm font-medium text-gray-700">
//                                           Receipt Image
//                                     </label>
//                                     <div className="flex flex-col sm:flex-row items-center gap-4">
//                                           <label className="w-full sm:flex-1 cursor-pointer">
//                                                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-center hover:border-gray-400 transition-colors">
//                                                       <div className="flex flex-col items-center justify-center space-y-2">
//                                                             <FiUpload
//                                                                   className="text-gray-400"
//                                                                   size={20}
//                                                             />
//                                                             <span className="text-xs sm:text-sm text-gray-600 truncate max-w-full">
//                                                                   {file
//                                                                         ? file.name
//                                                                         : "Click to upload receipt"}
//                                                             </span>
//                                                       </div>
//                                                       <input
//                                                             type="file"
//                                                             accept="image/*"
//                                                             onChange={
//                                                                   handleFileChange
//                                                             }
//                                                             className="hidden"
//                                                       />
//                                                 </div>
//                                           </label>
//                                           {file && (
//                                                 <button
//                                                       onClick={handleScan}
//                                                       disabled={
//                                                             scanning ||
//                                                             isLoading
//                                                       }
//                                                       className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm sm:text-base rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
//                                                 >
//                                                       {scanning
//                                                             ? "Scanning..."
//                                                             : "Scan"}
//                                                 </button>
//                                           )}
//                                     </div>
//                                     {file && (
//                                           <div className="mt-2 border rounded-md p-2">
//                                                 <img
//                                                       src={URL.createObjectURL(
//                                                             file
//                                                       )}
//                                                       alt="Receipt Preview"
//                                                       className="max-h-40 mx-auto object-contain"
//                                                 />
//                                           </div>
//                                     )}
//                               </div>

//                               {/* Form Fields */}
//                               <div className="space-y-3">
//                                     <div>
//                                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 Amount{" "}
//                                                 <span className="text-red-500">
//                                                       *
//                                                 </span>
//                                           </label>
//                                           <div className="relative">
//                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                       <BiRupee className="text-gray-400" />
//                                                 </div>
//                                                 <input
//                                                       type="number"
//                                                       name="amount"
//                                                       placeholder="0.00"
//                                                       value={form.amount}
//                                                       onChange={
//                                                             handleInputChange
//                                                       }
//                                                       className="pl-10 w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                                       step="0.01"
//                                                       min="0"
//                                                 />
//                                           </div>
//                                     </div>

//                                     <div>
//                                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 Date{" "}
//                                                 <span className="text-red-500">
//                                                       *
//                                                 </span>
//                                           </label>
//                                           <div className="relative">
//                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                       <FiCalendar className="text-gray-400" />
//                                                 </div>
//                                                 <input
//                                                       type="date"
//                                                       name="date"
//                                                       value={form.date}
//                                                       onChange={
//                                                             handleInputChange
//                                                       }
//                                                       className="pl-10 w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                                 />
//                                           </div>
//                                     </div>

//                                     <div>
//                                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 Description
//                                           </label>
//                                           <div className="relative">
//                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                       <FiFileText className="text-gray-400" />
//                                                 </div>
//                                                 <input
//                                                       type="text"
//                                                       name="description"
//                                                       placeholder="Brief description"
//                                                       value={form.description}
//                                                       onChange={
//                                                             handleInputChange
//                                                       }
//                                                       className="pl-10 w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                                 />
//                                           </div>
//                                     </div>
//                               </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 flex justify-end gap-2 sm:gap-3 sticky bottom-0 border-t">
//                               <button
//                                     onClick={onClose}
//                                     className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-100"
//                               >
//                                     Cancel
//                               </button>
//                               <button
//                                     onClick={handleCreate}
//                                     disabled={isLoading}
//                                     className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-1 sm:gap-2 disabled:opacity-50 text-sm sm:text-base"
//                               >
//                                     <FiCheck size={16} />
//                                     {isLoading ? "Creating..." : "Create"}
//                               </button>
//                         </div>
//                   </div>
//             </div>
//       );
// };

// export default ScanReceiptModal;

import React, { useState } from "react";
import { FiUpload, FiX, FiCheck, FiCalendar, FiFileText } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { useTransactionStore } from "../../../store/transactionStore";
import { useBudgetStore } from "../../../store/budgetStore";
import { useAIStore } from "../../../store/aiStore";

const ScanReceiptModal = ({
      isOpen,
      onClose,
      budgetId,
      userId,
      categories,
}) => {
      const { createTransaction, isLoading } = useTransactionStore();
      const { scanReceipt } = useAIStore();
      const { budgets } = useBudgetStore();
      const budget = budgets.find((budget) => budget.budget_id === budgetId);
      const [file, setFile] = useState(null);
      const [form, setForm] = useState({
            amount: "",
            date: "",
            description: "",
      });
      const [scanning, setScanning] = useState(false);

      const handleFileChange = (e) => {
            if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
            }
      };

      const handleInputChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleScan = async () => {
            if (!file) {
                  alert("Please upload a receipt image");
                  return;
            }

            setScanning(true);
            try {
                  const scannedData = await scanReceipt(
                        file,
                        userId,
                        budgetId,
                        categories
                  );
                  if (scannedData.transaction) {
                        setForm({
                              amount: Math.floor(
                                    scannedData.transaction.amount ?? 0
                              ),
                              date: scannedData.transaction.transaction_date.split(
                                    "T"
                              )[0],
                              description:
                                    scannedData.transaction.description ?? "",
                        });
                  } else {
                        alert(
                              "Could not scan a valid receipt. Please check the image and try again."
                        );
                  }
            } catch (error) {
                  console.error("Scan error:", error);
                  alert("Error scanning receipt. Please try again.");
            } finally {
                  setScanning(false);
            }
      };

      const handleCreate = async () => {
            if (!form.amount || !form.date) {
                  alert("Please fill in all required fields");
                  return;
            }

            try {
                  await createTransaction(userId, budgetId, {
                        ...form,
                        transaction_type: "Expense",
                        transaction_date: form.date,
                        category: budget.category,
                  });
                  onClose();
            } catch (error) {
                  console.error("Create error:", error);
            }
      };

      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-start z-50 p-2 sm:p-4 overflow-y-auto">
                  <div className="bg-white rounded-md shadow-xl w-full max-w-[95vw] sm:max-w-md mx-auto my-2 sm:my-4 overflow-hidden">
                        {/* Header - Compact for small screens */}
                        <div className="bg-gray-800 text-white p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
                              <h2 className="text-base sm:text-lg font-semibold truncate">
                                    Scan Receipt
                              </h2>
                              <button
                                    onClick={onClose}
                                    className="text-white hover:text-gray-300"
                                    aria-label="Close modal"
                              >
                                    <FiX size={20} />
                              </button>
                        </div>

                        {/* Body - Optimized for small screens */}
                        <div className="p-3 sm:p-4 space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
                              {/* File Upload - Stacked on small screens */}
                              <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                          Receipt Image
                                    </label>
                                    <div className="flex justify-center items-center gap-4">
                                          <div className="flex flex-col gap-2">
                                                <label className="w-full cursor-pointer">
                                                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center hover:border-gray-400 transition-colors">
                                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                                  <FiUpload
                                                                        className="text-gray-400"
                                                                        size={
                                                                              18
                                                                        }
                                                                  />
                                                                  <span className="text-xs text-gray-600 truncate max-w-[80vw]">
                                                                        {file
                                                                              ? file.name
                                                                              : "Tap to upload receipt"}
                                                                  </span>
                                                            </div>
                                                            <input
                                                                  type="file"
                                                                  accept="image/*"
                                                                  onChange={
                                                                        handleFileChange
                                                                  }
                                                                  className="hidden"
                                                            />
                                                      </div>
                                                </label>
                                                {file && (
                                                      <button
                                                            onClick={handleScan}
                                                            disabled={
                                                                  scanning ||
                                                                  isLoading
                                                            }
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-xs sm:text-sm rounded-md flex items-center justify-center gap-1 disabled:opacity-50"
                                                      >
                                                            {scanning
                                                                  ? "Scanning..."
                                                                  : "Scan Receipt"}
                                                      </button>
                                                )}
                                          </div>
                                          {file && (
                                                <div className="mt-1 border rounded p-1">
                                                      <img
                                                            src={URL.createObjectURL(
                                                                  file
                                                            )}
                                                            alt="Receipt Preview"
                                                            className="max-h-32 mx-auto object-contain"
                                                      />
                                                </div>
                                          )}
                                    </div>
                              </div>

                              {/* Form Fields - Compact layout */}
                              <div className="space-y-2">
                                    <div>
                                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                Amount{" "}
                                                <span className="text-red-500">
                                                      *
                                                </span>
                                          </label>
                                          <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                                      <BiRupee className="text-gray-400 text-sm" />
                                                </div>
                                                <input
                                                      type="number"
                                                      name="amount"
                                                      placeholder="0.00"
                                                      value={form.amount}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="pl-8 w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                      step="0.01"
                                                      min="0"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                Date{" "}
                                                <span className="text-red-500">
                                                      *
                                                </span>
                                          </label>
                                          <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                                      <FiCalendar className="text-gray-400 text-sm" />
                                                </div>
                                                <input
                                                      type="date"
                                                      name="date"
                                                      value={form.date}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="pl-8 w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                Description
                                          </label>
                                          <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                                      <FiFileText className="text-gray-400 text-sm" />
                                                </div>
                                                <input
                                                      type="text"
                                                      name="description"
                                                      placeholder="Description"
                                                      value={form.description}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="pl-8 w-full border border-gray-300 rounded-md p-2 text-xs sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>

                        {/* Footer - Compact buttons */}
                        <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 flex justify-end gap-2 sticky bottom-0 border-t">
                              <button
                                    onClick={() => {
                                          onClose();
                                          setFile(null);
                                          setForm({
                                                amount: "",
                                                date: "",
                                                description: "",
                                          });
                                    }}
                                    className="px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                              >
                                    Cancel
                              </button>
                              <button
                                    onClick={handleCreate}
                                    disabled={isLoading}
                                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-1 disabled:opacity-50 text-xs sm:text-sm"
                              >
                                    <FiCheck size={14} />
                                    {isLoading ? "Processing..." : "Create"}
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default ScanReceiptModal;
