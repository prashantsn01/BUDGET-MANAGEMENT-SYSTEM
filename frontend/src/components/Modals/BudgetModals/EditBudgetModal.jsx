import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IndianRupeeIcon , Calendar, FileText } from "lucide-react";
import Input from "../../Input";
import { useBudgetStore } from "../../../store/budgetStore";
import { useAuthStore } from "../../../store/authStore";
import { toast } from "react-hot-toast";

const EditBudgetModal = ({ isOpen, onClose, budget }) => {
      const [formData, setFormData] = useState({
            budgetName: budget.budget_name,
            totalAmount: budget.total_amount,
            endDate: new Date(budget.end_date).toISOString().split("T")[0],
            category: budget.category,
      });

      const {
            updateBudget,
            isLoading,
            error,
            setError,
            fetchCategories,
            categories,
      } = useBudgetStore();
      const { user } = useAuthStore();

      useEffect(() => {
            if (isOpen) {
                  resetForm();
                  setError(null);
            }
      }, [isOpen]);

      useEffect(() => {
            fetchCategories(user.user_id);
      }, [fetchCategories, user.user_id]);

      const resetForm = () => {
            setFormData({
                  budgetName: budget.budget_name,
                  totalAmount: budget.total_amount,
                  endDate: new Date(budget.end_date)
                        .toISOString()
                        .split("T")[0],
                  category: budget.category,
            });
      };

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const today = new Date().toISOString().split("T")[0];

            const { budgetName, totalAmount, endDate, category } = formData;
            if (!budgetName || !totalAmount || !endDate || !category) {
                  toast.error("Please fill in all fields.");
                  return;
            }

            if (endDate <= today) {
                  toast.error("End date should be greater than today's date.");
                  return;
            }

            const budgetData = {
                  budget_name: budgetName,
                  total_amount: parseFloat(totalAmount),
                  end_date: endDate,
                  category,
            };

            try {
                  await updateBudget(
                        user.user_id,
                        budget.budget_id,
                        budgetData
                  );
                  toast.success("Budget updated successfully");
                  onClose();
                  resetForm();
            } catch (err) {
                  console.error("Failed to create budget:", err);
            }
      };

      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-4 sm:mx-auto">
                        <div className="p-6 sm:p-8">
                              <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                          Update Budget
                                    </h2>
                                    <button onClick={onClose}>
                                          <FaTimes className="text-gray-600 hover:text-red-500" />
                                    </button>
                              </div>

                              <form onSubmit={handleSubmit}>
                                    {[
                                          {
                                                label: "Budget Name",
                                                name: "budgetName",
                                                type: "text",
                                                icon: FileText,
                                          },
                                          {
                                                label: "Budget Amount",
                                                name: "totalAmount",
                                                type: "number",
                                                icon: IndianRupeeIcon ,
                                          },
                                          {
                                                label: "End Date",
                                                name: "endDate",
                                                type: "date",
                                                icon: Calendar,
                                          },
                                    ].map(({ label, name, type, icon }) => (
                                          <div className="mb-4" key={name}>
                                                <label className="block text-gray-700 font-semibold mb-1">
                                                      {label}
                                                </label>
                                                <Input
                                                      icon={icon}
                                                      type={type}
                                                      name={name}
                                                      placeholder={`Enter ${label.toLowerCase()}`}
                                                      value={formData[name]}
                                                      onChange={handleChange}
                                                />
                                          </div>
                                    ))}

                                    <div className="mb-4">
                                          <label className="block text-gray-700 font-semibold mb-1">
                                                Category
                                          </label>
                                          <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                          >
                                                <option value="">
                                                      Select a category
                                                </option>
                                                {categories.map((category) => (
                                                      <option
                                                            value={category}
                                                            key={category}
                                                      >
                                                            {category}
                                                      </option>
                                                ))}
                                          </select>
                                    </div>
                                    {error && (
                                          <p className="text-red-500 font-semibold text-sm sm:text-base mb-2">
                                                {error}
                                          </p>
                                    )}
                                    <button
                                          type="submit"
                                          disabled={isLoading}
                                          className="mt-4 w-full py-3 px-4 bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                                    >
                                          {isLoading
                                                ? "Updating..."
                                                : "Update Budget"}
                                    </button>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default EditBudgetModal;
